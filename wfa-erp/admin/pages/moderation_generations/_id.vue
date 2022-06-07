<template>
  <LitterModerateForm
    :value="item"
  />
</template>

<script>
import {
  Get, Filter,
} from 'core-xhr';
import LitterModerateForm from '@/components/forms/LitterModerateForm';

export default {
  name: 'PetModeratePopUp',
  components: { LitterModerateForm },
  meta: {
    breadcrumb() {
      return 'Реестр актировок';
    },
  },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const itemId = parseInt(route.params.id) || null;
    if (!itemId) return {};
    const data = await $xhr
      .send(new Get('moderation-generation').entity().addFilter(new Filter('id', 'eq', itemId)))
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
};
</script>
