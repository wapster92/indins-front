<template>
  <FormPopup
    ref="form"
    :value="true"
    :close-route-to="{ name: 'clubs-id' }"
    title="Логотип"
    width="768"
    @click:confirm="save"
  >
    <FileUploader
      :upload-request="uploadRequest"
      :value="logo ? {name: `clubId${itemId}`, url: logo} : null"
      accept="image/jpeg,image/pjpeg,image/png"
      @onUploaded="logo = $event.url"
      @onDeleteItem="logo = null"
    />
  </FormPopup>
</template>

<script>
import {
  Get, Put, Filter, Simple,
} from 'core-xhr';

export default {
  name: 'LogoPage',
  meta: {
    breadcrumb() {
      return 'Логотип';
    },
  },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const itemId = parseInt(route.params.id) || null;
    if (!itemId) {
      return {};
    }
    const data = await $xhr
      .send(
        new Get('club').entity().addFilter(new Filter('id', 'eq', itemId)),
      )
      .then(response => response.data.data.result)
      .catch(
        reason => console.error(reason) ^ error(reason.message || reason.error),
      );

    const {
      logo,
    } = data;

    return {
      itemId,
      logo,
      entityRequest: (new Put('club'))
        .entity()
        .addFilter(new Filter('id', 'eq', itemId)),
    };
  },
  data() {
    return {
      uploadRequest: new Simple(),
    };
  },
  methods: {
    save() {
      this.$store.dispatch('snack/notify', 'Подождите...');
      const request = this.entityRequest.setData({
        logo: this.logo,
      });
      this.$xhr
        .send(request)
        .then(() => {
          this.$store.dispatch('snack/notify', 'Сохранено');
          this.$refs.form.close();
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
