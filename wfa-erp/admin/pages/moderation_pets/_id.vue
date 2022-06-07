<template>
  <FormPopup
    ref="form"
    :value="true"
    :close-route-to="{ name: 'moderation_pets' }"
    :close-on-reject="false"
    title="Карточка питомца на модерации"
    width="900"
    confirm-text="Принять заявку"
    reject-text="Отклонить заявку"
    @click:confirm="makeNewPet($event)"
    @click:reject="rejectModeration"
  >
    <template #default="{validate}">
      <PetModerateForm
        :validate="validate"
        v-model="item.incomingParams"
        :application-date="item.createdAt"
        @change-existing-pet="changeExistingPet($event)"
      />
    </template>

  </FormPopup>
</template>

<script>
import {
  Filter, Get, Post, Put,
} from 'core-xhr';
import PetModerateForm from '@/components/forms/PetModerateForm';

export default {
  name: 'PetModeratePopUp',
  components: { PetModerateForm },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const itemId = parseInt(route.params.id) || null;
    if (!itemId) return {};
    const data = await $xhr
      .send(new Get('moderation-pet').entity().addFilter(new Filter('id', 'eq', itemId)))
      .then(response => response.data.data.result)
      .catch(reason => console.error(reason) ^ error(reason.message || reason.error));
    return {
      item: { ...data },
    };
  },
  data() {
    return {
      item: null,
    };
  },
  computed: {
    applicationId() {
      return this.$route.params.id;
    },
  },
  methods: {
    changeExistingPet(petId) {
      if (this.checkWasModerated()) return;
      const entityRequest = new Put('pet').entity().addFilter(new Filter('id', 'eq', petId));
      const data = {
        ...this.item.incomingParams,
        isApproved: true,
      };
      this.savePet(entityRequest, data)
        .then(existingPetId => {
          this.$store.dispatch('snack/notify', 'Данные питомеца изменены.');
          return this.changeApplication(2, existingPetId);
        })
        .then(() => {
          this.$store.dispatch('snack/notify', 'Модерация пройдена');
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        })
        .finally(() => {
          this.$refs.form.close(true);
        });
    },
    checkWasModerated() {
      if (this.item.moderationStatus.id !== 1) {
        this.$store.dispatch('snack/error', 'Модерация данного питомца уже была произведена');
        return true;
      }
      return false;
    },
    rejectModeration() {
      if (this.checkWasModerated()) return;
      this.changeApplication(3)
        .then(() => {
          this.$store.dispatch('snack/info', 'Модерация не пройдена');
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        })
        .finally(() => {
          this.$refs.form.close(true);
        });
    },
    makeNewPet(valid) {
      if (this.checkWasModerated()) return;
      if (!valid) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      const entityRequest = new Post('pet').entity();
      const data = {
        ...this.item.incomingParams,
        breedingNumberIndex: { id: 1 },
        isApproved: true,
      };
      this.savePet(entityRequest, data)
        .then(newPetId => {
          this.$store.dispatch('snack/notify', 'Создан новый питомец.');
          return this.changeApplication(2, newPetId);
        })
        .then(() => {
          this.$store.dispatch('snack/notify', 'Модерация пройдена');
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        })
        .finally(() => {
          this.$refs.form.close(true);
        });
    },
    async changeApplication(newStatusId, petId = null) {
      if (this.item.moderationStatus.id !== newStatusId) {
        let data = {
          moderationStatus: { id: newStatusId },
          incomingParams: { ...this.item.incomingParams },
        };
        if (petId) {
          data = {
            ...data,
            pet: { id: petId },
          };
        }
        const request = new Put('moderation-pet').entity().addFilter(new Filter('id', 'eq', this.applicationId))
          .setData(data);
        const res = await this.$xhr.send(request);
        return res;
      }
    },
    async savePet(entityRequest, data) {
      this.$store.dispatch('snack/notify', 'Подождите...');
      const request = entityRequest.setData(data);
      const res = await this.$xhr.send(request);
      return res.data?.data?.created || res.data?.data?.updated || null;
    },
  },
};
</script>
