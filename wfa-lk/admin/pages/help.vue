<template>
  <FormValidator v-slot="{ validate }">
    <AutoSaveBlock
      v-slot="{ throttledSave }"
      class="fill-height"
      fixed
      @save="save(validate)"
    >
      <PageBlock
        :title="metaBlockTitle"
        class="pt-1"
      >
        <EditorOne
          v-model="body"
          class="editor"
          @input="throttledSave"
        />
      </PageBlock>
    </AutoSaveBlock>
  </FormValidator>
</template>

<script>
import EditorOne from '@/components/fields/EditorOne';
import { Get, Filter, Put } from 'core-xhr';

export default {
  name: 'Help',
  components: {
    EditorOne,
  },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  async asyncData({ app: { $xhr } }) {
    const result = await $xhr.send(new Get('pages').entity().addFilter(new Filter('name', 'eq', 'help')));
    const { body } = result.data.data.result;
    return { body };
  },
  meta: {
    breadcrumb: 'Помощь',
  },
  data() {
    return {
      metaBlockTitle: 'Заполните поле',
      body: null,
    };
  },
  methods: {
    async save() {
      try {
        await this.$xhr.send(new Put('pages')
          .entity()
          .addFilter(new Filter('name', 'eq', 'help'))
          .setData({ body: this.body }));
      } catch (e) {
        this.$store.dispatch('snack/error', e);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.editor
  min-height 100%
</style>
