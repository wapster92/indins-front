<template>
  <AutoSaveBlock
    ref="autoSave"
    :no-padding="false"
    border
    fixed
    style="margin-bottom: 0!important;"
    @save="save"
    @cancel="reload"
  >

    <template v-slot:default="{ throttledSave }">
      <MobileMenu
        v-if="isMobileView"
        v-model="activeMenu"
        :items="[
          'Питомец',
          'Владелец',
          'Заводчик',
          'Родители',
          'Документы',
          'Клуб',
          'Питомник'
        ]"
        @back="$router.push({ name: 'pets-main' })"
      />
      <PageWrapper
        :class="{
          'pt-12': isMobileView,
          'pb-15': ($refs.autoSave || {}).showFooter,
        }"
        :sm="`
          auto / 100%
        `"
        :md="`
          minmax(auto, max-content) / 50% 50%
        `"
        md-class="overflow-hidden"
        class="pt-sm-1 px-sm-1"
      >
        <JoiningWrapper
          class="mr-md-1 overflow-auto"
        >
          <BlockWrapper
            v-if="!isMobileView || activeMenu === 'Питомец'"
            :show-title="!isMobileView"
            title="Питомец"
            class="mt-0"
          >
            <PetForm
              ref="PetForm"
              v-model="pet"
              :read-only="isClub"
              class="pa-4"
              @submit="save"
              @input="() => isClub ? (() => {})() : throttledSave()"
            />
          </BlockWrapper>
          <BlockWrapper
            v-if="!isMobileView || activeMenu === 'Владелец'"
            :show-title="!isMobileView"
            title="Владелец"
            class="mt-0 mt-sm-1"
          >
            <PetOwnerForm
              ref="PetOwnerForm"
              v-model="petOwner"
              :read-only="isClub"
              class="pa-4"
              @submit="save"
              @input="() => isClub ? (() => {})() : throttledSave()">
              <v-row
                v-if="!isClub"
                class="mx-4">
                <SimpleButton
                  class="ml-auto"
                  @click="$router.push({name: 'pets-id-changeOwner'})"
                >
                  Сменить
                </SimpleButton>
              </v-row>
            </PetOwnerForm>
          </BlockWrapper>
          <BlockWrapper
            v-if="!isMobileView || activeMenu === 'Заводчик'"
            :show-title="!isMobileView"
            title="Заводчик"
            class="mt-0 mt-sm-1"
          >
            <PetBreederForm
              ref="PetBreederForm"
              v-model="petBreeder"
              :read-only="isClub"
              class="pa-4"
            />
          </BlockWrapper>
          <BlockWrapper
            v-if="!isMobileView || activeMenu === 'Питомник'"
            :show-title="!isMobileView"
            title="Питомник"
            class="mt-0 mt-sm-1"
          >
            <PetShelterForm
              ref="PetShelterForm"
              v-model="shelter"
              :read-only="isClub"
              class="pa-4"
              @submit="save"
              @input="() => isClub ? (() => {})() : throttledSave()"
            />
          </BlockWrapper>
          <BlockWrapper
            v-if="!isMobileView || activeMenu && club === 'Клуб'"
            :show-title="!isMobileView"
            title="Клуб"
            class="mt-0 mt-sm-1"
          >
            <PetClubForm
              ref="PetClubForm"
              v-model="club"
              :read-only="true"
              class="pa-4"
            />
          </BlockWrapper>
        </JoiningWrapper>
        <JoiningWrapper class="overflow-auto">
          <BlockWrapper
            v-if="!isMobileView || activeMenu === 'Родители'"
            :show-title="!isMobileView"
            title="Родители"
            class="mt-0"
          >
            <PetParentForm
              ref="PetParentForm"
              v-model="petParents"
              :read-only="isClub"
              class="pa-4"
              @submit="save"
              @input="() => isClub ?(() => {})() : throttledSave()"
            />
          </BlockWrapper>
          <BlockWrapper
            v-if="!isMobileView || activeMenu === 'Документы'"
            :show-title="!isMobileView"
            title="Документы"
            class="mt-0 mt-sm-1"
          >
            <DynamicListing
              :headers="headers"
              :list="documentList"
              style="height: calc(100% - 48px);"
            >
              <template v-slot:noResultTable>
                <span>Нет файлов</span>
              </template>
              <template v-slot:columns>
                <TextColumn field="name" />
                <SlotColumn
                  field="id"
                  #default="{item, value}"
                >
                  <v-row no-gutters>
                    <v-col cols="10">
                      <div
                        v-if="!documentMap&&!titleMap"
                        style="opacity: 0.6"
                      >Не доступно</div>
                      <div
                        v-else-if="documentMap[item.name] || titleMap[item.name]"
                        style="width: 145px; text-align: center; padding-top: 8px"
                      >Сформирован</div>
                      <div v-else>
                        <SimpleButton
                          outlined
                          elevation="2"
                          @click="generateDocument(value, item.titleId)"
                        >Сформировать</SimpleButton>
                      </div>
                    </v-col>
                    <v-col cols="2">
                      <div v-if="documentMap[item.name] || titleMap[item.name]">
                        <SimpleButton
                          outlined
                          elevation="1"
                          @click="downloadPdf(item)"
                        >PDF</SimpleButton>
                      </div>
                    </v-col>
                  </v-row>
                </SlotColumn>
                <ActionColumn action-column>
                  <template v-slot:default="{ item }">
                    <template v-if="(files || []).some(createDocumentFileSearch(item))">
                      <SimpleButton
                        v-if="isClub"
                        outlined
                        elevation="1"
                        class="mr-auto"
                        @click="onClickPrint(
                          [...files].reverse().find(createDocumentFileSearch(item))
                        )"
                      >DOCX</SimpleButton>
                      <SimpleButton
                        v-else
                        outlined
                        class="mr-auto"
                        elevation="1"
                        @click="downloadDocx(
                          [...files]
                            .reverse()
                        .find(createDocumentFileSearch(item)).url)"
                      >DOCX</SimpleButton>
                      <CustomItem
                        v-if="item.name !== 'трансфер'"
                        icon="delete"
                        @click="() => {
                          deleteFile([...files]
                            .reverse()
                            .find(createDocumentFileSearch(item)))
                          pdfFiles.filter(createDocumentFileSearch(item)).forEach((file) => deleteFile(file))
                        }"
                      />
                    </template>
                  </template>
                </ActionColumn>
              </template>
            </DynamicListing>
          </BlockWrapper>
        </JoiningWrapper>
      </PageWrapper>
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
      <nuxt-child />
    </template>
  </AutoSaveBlock>
</template>

<script>
import {
  Put, Filter, Post, Simple, Delete,
} from 'core-xhr';
import PageWrapper from '@/components/blocks/PageWrapper';
import BlockWrapper from '@/components/blocks/BlockWrapper';
import PetForm from '@/components/forms/PetForm';
import PetOwnerForm from '@/components/forms/PetOwnerForm';
import PetBreederForm from '@/components/forms/PetBreederForm';
import PetParentForm from '@/components/forms/PetParentForm';
import MobileMenu from '@/components/menu/MobileMenu';
import JoiningWrapper from '@/components/blocks/JoiningWrapper';
import subscriberMixin from '@/mixins/subscriberMixin';
import { getPetData } from '@/utils';
import CustomItem from '@/components/listing/actions/CustomItem';
import PetShelterForm from '@/components/forms/PetShelterForm';
import PetClubForm from '@/components/forms/PetClubForm';
import Confirm from '@/components/popup/Confirm';
import Alert from '@/components/popup/Alert';

export default {
  name: 'PetPage',
  components: {
    Alert,
    Confirm,
    PetClubForm,
    PetShelterForm,
    CustomItem,
    JoiningWrapper,
    MobileMenu,
    PetForm,
    PetOwnerForm,
    PetBreederForm,
    PetParentForm,
    BlockWrapper,
    PageWrapper,
  },
  mixins: [subscriberMixin],
  meta: {
    breadcrumb() {
      return this.pet.name || 'Добавление';
    },
  },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN', 'MANAGER', 'CLUB'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  asyncData({
    app: { $xhr }, error, route, store,
  }) {
    const itemId = parseInt(route.params.id) || null;
    if (!itemId) {
      return {};
    }
    return getPetData($xhr, itemId, store, error);
  },
  data() {
    return {
      WFA_CHAMPION_TYPE_ID: 3,
      activeMenu: 'Питомец',
      pet: {
        name: null,
        gender: null,
        breedingNumber: null,
        breedingNumberIndex: null,
        dateOfBirth: null,
        breed: null,
        color: null,
        oldNumber: null,
        chipNumber: null,
        titles: [],
      },
      petOwner: {
        fullNameOfOwner: null,
        phoneOfOwner: null,
        nurseryOfOwner: null,
        addressOfOwner: null,
        shelter: null,
      },
      petBreeder: {
        fullNameOfBreeder: null,
        phoneOfBreeder: null,
      },
      petParents: {
        mother: null,
        father: null,
      },
      headers: [
        {
          name: 'Название', field: 'name', space: '200px', noSort: true,
        },
        {
          name: 'Формирование', field: 'id', space: '200px', noSort: true,
        },
        { name: '', field: 'special:listing-actions', space: '150px' },
      ],
      documentList: [],
      documentMap: null,
      pdfDocumentMap: null,
      titleMap: null,
      files: [],
      pdfFiles: [],
      club: null,
      shelter: null,
    };
  },
  computed: {
    isMobileView() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    isAddPage() {
      return this.$route.params.id === 'add';
    },
    isClub() {
      return this.$store.getters['auth/getData'].roles.every(el => el === 'CLUB');
    },
    entityRequest() {
      return this.isAddPage
        ? new Post('pet').entity()
        : new Put('pet')
          .entity()
          .addFilter(new Filter('id', 'eq', this.itemId));
    },
  },
  watch: {
    'shelter.translatedName': {
      handler(value, old) {
        if (!this.isAddPage) return false;
        if (old) {
          this.pet.name = `${value || ''} ${this.pet.name ? this.pet.name.replace(old, '') : ''}`;
          return false;
        }
        this.pet.name = `${value || ''} ${this.pet.name ? this.pet.name : ''}`;
      },
    },
    shelter(val) {
      if (!this.isAddPage) return false;
      if (this.petBreeder.fullNameOfBreeder === null) {
        this.petBreeder.fullNameOfBreeder = val.owner;
      }
      if (this.petBreeder.phoneOfBreeder === null) {
        this.petBreeder.phoneOfBreeder = val.phone;
      }
    },
  },
  mounted() {
    this.setSubscriber('Pet', this.update);
    this.setSubscriber('File', this.update);
    this.$eventBus.on('change:petOwner', () => {
      this.update();
    });
  },
  methods: {
    checkForm(form) {
      if (form) {
        return form.validate();
      }
      return true;
    },
    save() {
      if (
        !this.checkForm(this.$refs.PetForm)
          || !this.checkForm(this.$refs.PetOwnerForm)
          || !this.checkForm(this.$refs.PetBreederForm)
          || !this.checkForm(this.$refs.PetParentForm)
          || !this.checkForm(this.$refs.PetShelterForm)
          // || !this.checkForm(this.$refs.PetClubForm)
      ) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      this.$store.dispatch('snack/notify', 'Подождите...');
      const request = this.shelter?.id
        ? this.entityRequest.setData({
          ...this.pet,
          ...this.petOwner,
          ...this.petBreeder,
          shelter: { ...this.shelter },
          club: { id: this.shelter.club.id },
          isApproved: true,
          parents: Object.values(this.petParents).filter(parent => parent).map(parent => ({
            id: parent.id,
          })),
        })
        : this.entityRequest.setData({
          ...this.pet,
          ...this.petOwner,
          ...this.petBreeder,
          club: null,
          shelter: null,
          isApproved: true,
          parents: Object.values(this.petParents).filter(parent => parent).map(parent => ({
            id: parent.id,
          })),
        });
      this.$xhr
        .send(request)
        .then(resp => {
          this.$store.dispatch('snack/notify', 'Сохранено');
          if (this.isAddPage) {
            this.$router.replace({ params: { id: resp.data.data.created } }).then(() => {
              this.reload();
            });
          }
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
    },
    reload() {
      window.location.reload(true);
    },
    update() {
      getPetData(this.$xhr, this.itemId, this.$store).then(data => {
        this.pet = data.pet;
        this.petOwner = data.petOwner;
        this.petBreeder = data.petBreeder;
        this.petParents = data.petParents;
        this.petParents = data.petParents;
        this.documentMap = data.documentMap;
        this.titleMap = data.titleMap;
        this.documentList = data.documentList;
        this.files = data.files;
        this.pdfFiles = data.pdfFiles;
        this.shelter = data.shelter;
        this.club = data.shelter?.club || null;
      });
    },
    deleteFile(file) {
      if (file) {
        this.$xhr
          .send(
            (new Delete('files'))
              .entity()
              .addFilter(new Filter('id', 'eq', file.id)),
          )
          .then(resp => {
            if (!resp.data.success) {
              this.$store.dispatch('snack/error', resp.data.message || resp.data.error);
            } else {
              this.$store.dispatch('snack/notify', 'Файл удален');
            }
          })
          .catch(e => {
            this.$store.dispatch('snack/error', e.message || e.error);
          });
      }
    },
    generateDocument(typeId, titleId = null, isPdf = false) {
      this.$loader.start();
      return this.$xhr
        .send(
          (new Simple('/api/documents/create', {
            pet_id: this.itemId, type_id: typeId, title_id: titleId, isPdf,
          }, 'POST')).authorization(),
        )
        .then(resp => {
          if (!resp.data.success) {
            this.$store.dispatch('snack/error', resp.data.message || resp.data.error);
          } else {
            this.$store.dispatch('snack/notify', 'Сохранено');
          }
          return resp;
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        })
        .finally(resp => {
          this.$loader.stop();
          return resp;
        });
    },
    createDocumentFileSearch(item) {
      return el => (el.type || {}).name === item.name || (el.title || {}).name === item.name;
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
    downloadPdf(type) {
      const file = [...this.pdfFiles]
        .reverse()
        .find(this.createDocumentFileSearch(type));
      if (file) {
        window.open(file.url);
      } else {
        this.generateDocument(type.id, null, true)
          .then(resp => window.open(resp.data.result.url));
      }
    },
    downloadDocx(link) {
      if (!link) return this.$store.dispatch('snack/error', 'Произошла ошибка');
      window.open(link);
    },
  },
};
</script>

<style lang="stylus" scoped></style>
