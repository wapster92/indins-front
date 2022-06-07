<template>
  <FormPopup
    ref="form"
    :value="true"
    :close-route-to="{ name: 'pets-id' }"
    title="Сменить владельца"
    width="768"
    @click:confirm="save"
  >
    <PetOwnerForm
      ref="itemForm"
      v-model="item"
      :can-change-shelter="true"
      @submit="save"
    />
  </FormPopup>
</template>

<script>
import {
  Get, Put, Filter,
} from 'core-xhr';
import PetOwnerForm from '@/components/forms/PetOwnerForm';

export default {
  name: 'OwnerPage',
  components: { PetOwnerForm },
  meta: {
    breadcrumb() {
      return 'Смена владельца';
    },
  },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN', 'MANAGER'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const itemId = parseInt(route.params.id) || null;
    if (!itemId) {
      return {};
    }
    const data = await $xhr
      .send(
        new Get('pet').entity().addFilter(new Filter('id', 'eq', itemId)),
      )
      .then(response => response.data.data.result)
      .catch(
        reason => console.error(reason) ^ error(reason.message || reason.error),
      );

    const {
      fullNameOfOwner,
      phoneOfOwner,
      nurseryOfOwner,
      addressOfOwner,
      shelter,
    } = data;

    return {
      itemId,
      item: {
        fullNameOfOwner,
        phoneOfOwner,
        nurseryOfOwner,
        addressOfOwner,
        shelter,
      },
      oldItem: {
        oldOwnerFullName: fullNameOfOwner,
        oldOwnerPhone: phoneOfOwner,
        oldOwnerNursery: nurseryOfOwner,
        oldOwnerAddress: addressOfOwner,
        oldShelter: shelter,
      },
      entityRequest: new Put('pet')
        .entity()
        .addFilter(new Filter('id', 'eq', itemId)),
    };
  },
  data() {
    return {};
  },
  methods: {
    save() {
      if (!this.$refs.itemForm.validate()) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      this.$store.dispatch('snack/notify', 'Подождите...');
      const request = this.entityRequest.setData({
        ...this.item,
        ...this.oldItem,
      });
      this.$xhr
        .send(request)
        .then(() => {
          this.$store.dispatch('snack/notify', 'Владелец изменен. Трансфер сформирован');
          this.$refs.form.close();
          this.$eventBus.emit('change:petOwner');
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
