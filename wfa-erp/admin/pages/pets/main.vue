<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :orders="[{field: 'createdAt', direction: 'DESC'}]"
      :multiple-search="['name', 'breedingNumber']"
      @item-click="openItem($event)"
    >
      <template v-slot:filters>
        <RelationFilter
          label="Порода"
          entity="breeds"
          name="breed.id"
          no-deleted-filter/>
        <RelationFilter
          label="Окрас"
          entity="colors"
          name="color.id"
          no-deleted-filter/>
        <TextFilter
          label="Владелец"
          name="fullNameOfOwner"
        />
      </template>
      <template v-slot:actions="{headers}">
        <AddItem
          v-if="!isClub"
          :route="{name: 'pets-id', params:{id: 'add'}}"
        />
        <ColumnToggler :headers="headers"/>
      </template>
      <template v-slot:columns>
        <RelationColumn field="breedingNumberIndex.name"/>
        <TextColumn field="breedingNumber"/>
        <TextColumn field="name"/>
        <RelationColumn field="breed.name"/>
        <RelationColumn field="color.name"/>
        <TextColumn field="fullNameOfOwner"/>
        <SlotColumn
          field="files.url"
          #default="{item}"
        >
          <DocumentPrintButton
            v-for="file in item.files.slice(0, VISIBLE_BUTTON_COUNT)"
            :key="file.id"
            :label="(file.type) ? file.type.name : 'без имени'"
            :href="file.url"
            @click.native.stop="() => isClub ? onClickPrint(file) : (() => {})()"
          />
          <v-menu
            v-if="item.files.length > VISIBLE_BUTTON_COUNT"
            offset-y>
            <template v-slot:activator="{ on, attrs }">
              <SimpleButton
                v-bind="attrs"
                color="lightgrey"
                class="black--text"
                v-on="on"
                @click.stop=""
              >Еще {{ (item.files.length - VISIBLE_BUTTON_COUNT) }}</SimpleButton>
            </template>
            <v-list>
              <v-list-item
                v-for="file in item.files.slice(VISIBLE_BUTTON_COUNT)"
                :key="file.id"
              >
                <v-list-item-title>
                  <DocumentPrintButton
                    :label="(file.type || {}).name"
                    :href="file.url"
                    @click.native.stop="() => isClub ? onClickPrint(file) : (() => {})()"
                  />
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </SlotColumn>
        <ActionColumn
          v-if="!isClub"
          action-column>
          <template v-slot:default="{item}">
            <DeleteItem
              :item="item"
              url-key="pets"/>
          </template>
        </ActionColumn>
      </template>
    </DynamicListing>
    <nuxt-child/>
    <Confirm
      ref="confirm"
      title="Продолжить?"
      text="За скачивание взимается 100 рублей. Продолжить?"
    />
    <Alert
      ref="alert"
      title="Мало средств"
      text="У вас недостаточно денег, свяжитесь с администрацией по телефону +7-921-874-90-96"
    />
    <DeletePopup/>
  </div>
</template>

<script>
import { Filter, Get, Simple } from 'core-xhr';
import Confirm from '@/components/popup/Confirm';
import Alert from '@/components/popup/Alert';
import DocumentPrintButton from '../../components/buttons/documentPrintButton';

export default {
  name: 'Pets',
  components: { Alert, Confirm, DocumentPrintButton },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN', 'MANAGER', 'CLUB'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  data: () => ({
    VISIBLE_BUTTON_COUNT: 3,
    headers: [
      { name: 'Индекс племенного №', field: 'breedingNumberIndex.name', space: '200px' },
      { name: '№ племенной', field: 'breedingNumber', space: '200px' },
      { name: 'Кличка', field: 'name', space: '200px' },
      { name: 'Порода', field: 'breed.name', space: '200px' },
      { name: 'Окрас', field: 'color.name', space: '200px' },
      { name: 'Владелец', field: 'fullNameOfOwner', space: '200px' },
      {
        name: 'Документы', field: 'files.url', space: '500px', noSort: true,
      },
      { name: '', field: 'special:listing-actions', space: '80px' },
    ],
  }),
  computed: {
    request() {
      const petRequest = (new Get(this.isClub ? 'pets-club' : 'pets'))
        .collection()
        .addFilter(new Filter({
          field: 'deletedAt',
          filter: 'exists',
          value: false,
          mandatory: true,
        }))
        .addFilter(new Filter({
          field: 'isApproved',
          filter: 'bool',
          value: true,
          mandatory: true,
        }))
        .pagination(true)
        .count(true)
        .limitStart(0)
        .limitShown(50);
      if (this.isClub) {
        petRequest.addFilter(new Filter({
          field: 'shelter.club.id',
          filter: 'eq',
          value: this.$store.getters['auth/getData'].clubId,
          mandatory: true,
        }));
      }
      return petRequest;
    },
    isClub() {
      return this.$store.getters['auth/getData'].roles.every(el => el === 'CLUB');
    },
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: 'pets-id', params: { id: item.id } });
    },
    async onClickPrint(file) {
      try {
        const canPay = await this.$xhr.send(
          new Simple(`/api/download/payment/check/${this.$store.getters['auth/getData'].id}`).authorization(),
        ).then(resp => resp.data.result.canPay);
        const url = await this.$refs[canPay ? 'confirm' : 'alert'].start()
          .then(() => this.$xhr.send(
            new Simple(`/api/download/payment/get/${file.id}/${this.$store.getters['auth/getData'].id}`).authorization(),
          ).then(resp => resp.data.result.url))
          .catch(() => {
          });
        if (url) {
          window.open(url);
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .document-print-button
    ::v-deep .v-btn__content
      width 100%
</style>
