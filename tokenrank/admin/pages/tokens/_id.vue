<template>
  <div class="w-100">
    <FormValidator v-slot="{validate}">
      <v-row no-gutters>
        <v-col md="6">
          <TabsBlock
            v-model="currentTab"
            :tabs="tabs"
            allow-content
          >
            <v-tabs-items
              v-model="currentTab"
            >
              <v-tab-item
                key="main-info"
              >
                <MainInfo
                  v-model="token"
                  @input="throttledSave(validate)"
                />
              </v-tab-item>
              <v-tab-item
                key="meta-data"
              >
                <MetaData
                  v-model="token"
                  @input="throttledSave(validate)"
                />
              </v-tab-item>
              <v-tab-item
                key="indicators"
              >
                <IndicatorsData :token="token" />
              </v-tab-item>
            </v-tabs-items>
          </TabsBlock>
        </v-col>
        <v-col md="6">
          <PageBlock
            no-padding
            title="Текстовый редактор"
          >
            <client-only
              :key="key"
              placeholder="Загрузка"
            >
              <SimpleWysiwyg
                v-model="hardTesting"
              />
            </client-only>
          </PageBlock>
        </v-col>
      </v-row>
    </FormValidator>
  </div>
</template>

<script>

import {
  Filter, Get, Post, Put,
} from 'core-xhr';
import MainInfo from '../../components/tokens/MainInfo';
import MetaData from '../../components/tokens/MetaData';
import IndicatorsData from '../../components/tokens/IndicatorsData';

async function getToken(xhr, store, tokenId) {
  const request = new Get('tokens')
    .addFilter(new Filter('id', 'eq', tokenId));
  try {
    const response = await xhr.send(request);
    if (!response || !response.data.data.result[0]) return;
    return response.data.data.result[0];
  } catch (e) {
    store.dispatch('snack/error', 'Не удалось получить информацию о странице!');
  }
}
export default {
  name: 'Id',
  components: {
    MainInfo,
    MetaData,
    IndicatorsData,
    SimpleWysiwyg: async () => {
      if (process.client) {
        // eslint-disable-next-line no-return-await
        return await import('indify/src/components/subsidiary/SimpleWysiwyg');
      }
    },
  },
  meta: {
    breadcrumb: {
      immediate: false,
      handler({ route }) {
        return route.params.id === 'add' ? 'Новая монета' : this.token.name;
      },
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      ++vm.key;
    });
  },
  async asyncData({ app: { $xhr }, store, params }) {
    if (params.id === 'add') return {};
    const token = await getToken($xhr, store, params.id);
    if (!token) return {};
    if (token?.logo) {
      token.logo = {
        url: token.logo,
      };
    }
    return { token };
  },
  data() {
    return {
      token: {
        logo: '',
        name: '',
        metaTitle: '',
        metaKeywords: '',
        metaDescription: '',
        description: '',
        github: '',
        visible: null,
        isDeleted: null,
      },
      tabs: [
        { key: 'main-info', title: 'Основная информация' },
        { key: 'meta-data', title: 'Meta данные' },
        { key: 'indicators', title: 'Показатели' },
      ],
      key: 0,
      currentTab: 'main-info',
      hardTesting: '',
    };
  },
  computed: {
    isAddPage() {
      return this.$route.params.id === 'add';
    },
  },
  methods: {
    throttledSave(validate) {
      this.$store.dispatch('autosaveStore/toggle', {
        isVisible: true,
        confirmHandler: () => this.save(validate),
        rejectHandler: () => this.reject(),
      });
    },
    async save(valid) {
      if (!valid()) return false;
      const request = this.isAddPage
        ? new Post('tokens')
        : new Put('tokens').addFilter(new Filter('id', 'eq', this.$route.params.id));
      const requestData = { ...this.token, logo: this.token.logo?.url };
      request.setData(requestData);
      try {
        const res = await this.$xhr.send(request);
        if (res.data.success) {
          this.$router.push({ name: 'tokens' });
          this.$store.dispatch('snack/info', 'Информация сохранена.');
        }
      } catch (e) {
        this.$store.dispatch('snack/error', 'Не удалось сохранить информацию!');
      }
    },
    reject() {
      this.$store.dispatch('autosaveStore/toggle', {
        isVisible: false,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.tabs-block
  & >>> .tabs-block-content
    border: 1px solid #dadada;
    margin-top: 2px;
.wysiwyg
  & >>> .ck
    &.ck-editor__main
      & > .ck-editor__editable
        padding: 0 24px
        &:not(.ck-focused)
          border: 1px solid transparent
          border-top: 1px solid #dadada
        &.ck-focused
          border-radius: 0 !important
          border: 1px solid #416FC8
    &.ck-toolbar
      border: none !important
</style>
