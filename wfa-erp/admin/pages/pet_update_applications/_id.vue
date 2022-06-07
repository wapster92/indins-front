<template>
  <FormPopup
    ref="form"
    :value="true"
    :close-route-to="{ name: 'pet_update_applications' }"
    :close-on-reject="false"
    title="Заявка на редактирование питомца"
    width="720"
    react-to-headers
    confirm-text="Принять заявку"
    reject-text="Отклонить заявку"
    @click:confirm="changeExistingPet"
    @click:reject="rejectModeration"
  >
    <DynamicListing
      :headers="headers"
      :list="list"
      @item-click="openPet()"
    >
      <template #columns>
        <TextColumn field="changingField"/>
        <TextColumn field="old"/>
        <TextColumn field="new"/>
      </template>
    </DynamicListing>
  </FormPopup>
</template>

<script>
import { Filter, Get, Put } from 'core-xhr';

export default {
  name: 'EditApplication',
  validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const itemId = parseInt(route.params.id) || null;
    if (!itemId) return {};
    const data = await $xhr
      .send(new Get('application').entity().addFilter(new Filter('id', 'eq', itemId)))
      .then(response => response.data.data.result)
      .catch(reason => console.error(reason) ^ error(reason.message || reason.error));

    const list = [];
    const oldData = data?.pet;
    const newData = data?.incomingParams?.editedData;

    const nameData = {
      changingField: 'Кличка',
      old: oldData?.name,
      new: newData?.name,
    };
    const chipNumberData = {
      changingField: 'Номер чипа',
      old: oldData?.chipNumber,
      new: newData?.chipNumber,
    };
    const colorData = {
      changingField: 'Окрас',
      old: oldData?.color?.code,
      new: newData?.color?.code,
    };
    const genderData = {
      changingField: 'Пол',
      old: oldData?.gender?.name,
      new: newData?.gender?.name,
    };
    list.push(nameData, chipNumberData, colorData, genderData);
    return {
      list,
      newData,
      petId: data?.incomingParams?.petId,
      moderationStatus: data?.moderationStatus,
    };
  },
  data() {
    return {
      headers: [
        { name: 'Изменяемые данные', field: 'changingField', space: '200px' },
        { name: 'Старое значение', field: 'old', space: '200px' },
        { name: 'Новое значение', field: 'new', space: '200px' },
      ],
      list: [],
      newData: {},
      petId: null,
      moderationStatus: {},
    };
  },
  computed: {
    applicationId() {
      return this.$route.params.id;
    },
  },
  methods: {
    openPet() {
      this.$router.push({ name: 'pets-id', params: { id: this.petId } });
    },
    changeExistingPet() {
      if (this.checkWasModerated()) return;
      const entityRequest = new Put('pet').entity().addFilter(new Filter('id', 'eq', this.petId));
      const data = {
        ...this.newData,
        isApproved: true,
      };
      this.savePet(entityRequest, data)
        .then(() => {
          this.$store.dispatch('snack/notify', 'Данные питомца изменены.');
          return this.changeApplication(2);
        })
        .then(() => {
          this.$store.dispatch('snack/notify', 'Статус заявки - принята.');
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        })
        .finally(() => {
          this.$refs.form.close(true);
        });
    },
    checkWasModerated() {
      if (this.moderationStatus.id !== 1) {
        this.$store.dispatch('snack/error', 'Данная заявка уже была обработана!');
        return true;
      }
      return false;
    },
    rejectModeration() {
      if (this.checkWasModerated()) return;
      this.changeApplication(3)
        .then(() => {
          this.$store.dispatch('snack/info', 'Заявка отклонена.');
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        })
        .finally(() => {
          this.$refs.form.close(true);
        });
    },
    async changeApplication(newStatusId) {
      if (this.moderationStatus.id !== newStatusId) {
        const data = {
          moderationStatus: { id: newStatusId },
        };
        const request = new Put('application').entity().addFilter(new Filter('id', 'eq', this.applicationId))
          .setData(data);
        const res = await this.$xhr.send(request);
        return res;
      }
    },
    async savePet(entityRequest, data) {
      this.$store.dispatch('snack/notify', 'Подождите...');
      const request = entityRequest.setData(data);
      const res = await this.$xhr.send(request);
      return res.data?.data?.updated || null;
    },
  },
};
</script>
