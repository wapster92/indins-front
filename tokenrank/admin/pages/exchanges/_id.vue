<template>
  <FormValidator v-slot="{ validate }">
    <v-container
      fluid
      class="pa-0"
    >
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
        >
          <MainInfo
            :exc="exchange"
            @input="throttledSave(validate)"
          />
          <PageBlock title="Ссылки">
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
              >
                <TextInput
                  v-model="exchange.url"
                  label="URL"
                  placeholder="Текст ссылки"
                  input-type="standart"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
              >
                <TextInput
                  v-model="exchange.link"
                  label="Ссылка на биржу"
                  placeholder="Текст ссылки"
                  input-type="standart"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
              >
                <TextInput
                  v-model="exchange.referral"
                  label="Реферальная ссылка"
                  placeholder="Текст ссылки"
                  input-type="standart"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
              >
                <TextInput
                  v-model="exchange.linkToken"
                  label="Ссылка на токен"
                  placeholder="Текст ссылки"
                  input-type="standart"
                />
              </v-col>
            </v-row>
          </PageBlock>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <PageBlock
            title="Текстовый редактор"
            no-padding
          >
            <div class="pa-0">
              <client-only :key="key">
                <SimpleWysiwyg
                  v-model="customText1"
                />
              </client-only>
            </div>
          </PageBlock>
          <PageBlock no-padding>
            <div class="pa-0">
              <client-only :key="key">
                <SimpleWysiwyg
                  v-model="customText2"
                />
              </client-only>
            </div>
          </PageBlock>
        </v-col>
      </v-row>
    </v-container>
  </FormValidator>
</template>

<script>
import {
  Filter, Get, Post, Put,
} from 'core-xhr';
import MainInfo from '../../components/exchanges/MainInfo';

async function getExchange(xhr, store, exchangeId) {
  const request = new Get('exchange')
    .addFilter(new Filter('id', 'eq', exchangeId));
  try {
    const response = await xhr.send(request);
    if (!response || !response.data.data.result[0]) return;
    return response.data.data.result[0];
  } catch (e) {
    store.dispatch('snack/error', 'Не удалось получить информацию о бирже!');
  }
}
export default {
  name: 'Id',
  components: {
    MainInfo,
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
        return route.params.id === 'add' ? 'Новая биржа' : this.exchange.name;
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
    const exchange = await getExchange($xhr, store, params.id);
    if (!exchange) return {};
    if (exchange?.logo) {
      exchange.logo = {
        url: exchange.logo,
      };
    }
    return { exchange };
  },
  data() {
    return {
      exchange: {
      },
      key: 0,
      customText1: 'Hello!',
      customText2: 'Hello world!',
    };
  },
  computed: {
    exchangeId() {
      return this.$route.params.id;
    },
    isAddPage() {
      return this.exchangeId === 'add';
    },
  },
  methods: {
    throttledSave(valid) {
      this.$store.dispatch('autosaveStore/toggle', {
        isVisible: true,
        confirmHandler: () => this.saveExchange(valid),
        rejectHandler: () => {
          this.reject();
        },
      });
    },
    async saveExchange(valid) {
      if (!valid()) return;
      const request = this.isAddPage
        ? new Post('exchange')
        : new Put('exchange').addFilter(new Filter('id', 'eq', this.exchangeId));
      const requestData = { ...this.exchange, logo: this.exchange.logo?.url };
      request.setData(requestData);
      try {
        await this.$xhr.send(request);
        this.$store.dispatch('snack/info', 'Информация о бирже успешно обновлена');
      } catch (e) {
        this.$store.dispatch('snack/error', 'Не удалось сохранить информацию о бирже.');
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
.form-validator-component
  width: 100%;
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
