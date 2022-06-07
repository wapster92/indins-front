<template>
  <div>
    <PopupComponent
      v-model="visible"
      :close-route-to="closeRoute"
      :title="title"
      form-mode
      width="460"
      @click:confirm="saveFilter($event)"
    >
      <v-container
        fluid
        class="pa-0"
      >
        <v-row no-gutters>
          <v-col cols="12">
            <TextInput
              v-model="filter.name"
              label="Название"
              name="name"
              required
              input-type="standart"
            />
          </v-col>
          <v-col
            cols="12"
            class="pt-3"
          >
            <SimpleSliderRange
              v-model="r"
              slot-left
              slot-right
              label="Rmin - Rmax"
            />
          </v-col>
          <v-col
            cols="12"
            class="pt-3"
          >
            <SimpleSliderRange
              v-model="pd"
              slot-left
              slot-right
              label="Dmin - Dmax"
            />
          </v-col>
          <v-col
            cols="12"
            class="pt-3"
          >
            <SimpleSliderRange
              v-model="pw"
              slot-left
              slot-right
              label="Wmin - Wmax"
            />
          </v-col>
          <v-col
            cols="12"
            class="pt-3"
          >
            <SimpleSliderRange
              v-model="pm"
              slot-left
              slot-right
              label="Mmin - Mmax"
            />
          </v-col>
        </v-row>
      </v-container>
    </PopupComponent>
    <nuxt-child />
  </div>
</template>

<script>
import {
  Get, Filter, Post, Put,
} from 'core-xhr';

async function getFilter(xhr, store, filterId) {
  const request = new Get('filters')
    .addFilter(new Filter('id', 'eq', filterId));
  try {
    const response = await xhr.send(request);
    if (!response || !response.data.data.result[0]) return;
    return response.data.data.result[0];
  } catch (e) {
    store.dispatch('snack/error', 'Не удалось получить информацию о фильтре!');
  }
}

export default {
  name: 'FiltersPage',
  validate({ store }) { return store.getters['auth/hasRole']('ADMIN'); },
  async asyncData({ app: { $xhr }, store, params }) {
    if (params.id === 'add') return {};
    const filter = await getFilter($xhr, store, params.id);
    if (!filter) return {};
    return { filter };
  },
  data() {
    return {
      visible: true,
      filter: {
        name: '',
        rl: 0,
        rh: 0,
        pdl: 0,
        pdh: 0,
        pwl: 0,
        pwh: 0,
        pml: 0,
        pmh: 0,
      },
    };
  },
  computed: {
    title() {
      return `${this.isAddPage ? 'Создание' : 'Редактирование'} Фильтра`;
    },
    filterId() {
      return this.$route.params.id;
    },
    isAddPage() {
      return this.filterId === 'add';
    },
    closeRoute() {
      return { name: 'filters' };
    },
    r: {
      get() {
        return [this.filter.rl, this.filter.rh];
      },
      set([rl, rh]) {
        this.filter.rl = rl;
        this.filter.rh = rh;
      },
    },
    pd: {
      get() {
        return [this.filter.pdl, this.filter.pdh];
      },
      set([pdl, pdh]) {
        this.filter.pdl = pdl;
        this.filter.pdh = pdh;
      },
    },
    pw: {
      get() {
        return [this.filter.pwl, this.filter.pwh];
      },
      set([pwl, pwh]) {
        this.filter.pwl = pwl;
        this.filter.pwh = pwh;
      },
    },
    pm: {
      get() {
        return [this.filter.pml, this.filter.pmh];
      },
      set([pml, pmh]) {
        this.filter.pml = pml;
        this.filter.pmh = pmh;
      },
    },
  },
  methods: {
    async saveFilter(isValid) {
      if (!isValid) return;
      const request = this.isAddPage
        ? new Post('filters')
        : new Put('filters').addFilter(new Filter('id', 'eq', this.filterId));

      const requestData = { ...this.filter };
      request.setData(requestData);
      try {
        const response = await this.$xhr.send(request);
        if (!response) return;
        this.$store.dispatch('snack/info', 'Информация о фильтре сохранена.');
        this.visible = false;
      } catch (e) {
        this.$store.dispatch('snack/error', 'Не удалось сохранить информацию о фильтре!');
      }
    },
  },
};
</script>

<style scoped lang="stylus">
&::v-deep
  .slot-left
    left: 12px;
    color: #888a90;
</style>
