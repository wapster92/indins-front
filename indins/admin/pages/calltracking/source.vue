<template>
  <div class="item-page fill-height px-1 py-1 chart">
    <PageBlock>
      <div class="chart__filter">
        <SimpleDateRange
          v-model="filterModel"
          label="Дата"
        />
        <SimpleSwitch
          v-model="uniqid"
          label="Уникальный"
          class="ml-5"
        />
      </div>
      <Chart
        :height="120"
        :chart-data="chartData"
      />
      <table class="view-table">
        <tr
          v-for="(row, index) in dataTable"
          :key="index"
        >
          <td>{{ row.name }}</td>
          <td>{{ row.points }}</td>
        </tr>
      </table>
      <v-btn
        text
        color="green"
        class="download-button"
        @click="download()"
      >
        <v-icon>get_app</v-icon>
        Скачать отчёт
      </v-btn>
    </PageBlock>
  </div>
</template>

<script>
import { Simple } from 'core-xhr';
import moment from 'moment';
import Chart from '../../components/Chart';

export default {
  name: 'CalltrackingSource',
  components: { Chart },
  async validate({ app: { store } }) {
    const accessRoles = ['ROLE_ADMIN', 'ROLE_APPEAL'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Аналитика по источнику',
  },
  data() {
    return {
      filterModel: [
        `${moment().subtract(1, 'months').format('YYYY-MM-DD')}T00:00:00`,
        `${moment().add(1, 'day').format('YYYY-MM-DD')}T23:59:59`,
      ],
      data: [],
      dataTable: [],
      chartOptions: [],
      labels: [],
      uniqid: false,
    };
  },
  computed: {
    chartDataset() {
      return this.data.map((item, key) => ({
        backgroundColor: this.getLabelColor(key),
        borderColor: this.getLabelColor(key),
        borderWidth: '1',
        data: item.points,
        fill: false,
        label: item.name,
      }));
    },
    chartLabels() {
      return this.labels;
    },
    chartData() {
      return {
        labels: this.chartLabels,
        datasets: this.chartDataset,
      };
    },
  },
  watch: {
    filterModel: {
      handler() {
        this.getData();
      },
      deep: true,
    },
    uniqid: {
      handler() {
        this.getData();
      },
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    reportLink() {
      return `/api/calltracking/report/source?from=${this.filterModel[0]}&to=${this.filterModel[1]}`;
    },
    download() {
      if (window.location.port === '3001') {
        window.location.href = `http://localhost:8000${this.reportLink()}`;
        return;
      }
      window.location.href = this.reportLink();
    },
    async getData() {
      if (this.filterModel.length < 2) {
        return;
      }
      const request = new Simple(
        /* eslint-disable max-len, no-undef */
        $nuxt.context.isDev
          ? `http://localhost:8000/api/calltracking/chart/source?from=${this.filterModel[0]}&to=${this.filterModel[1]}${this.uniqid ? `&uniqid=${this.uniqid}` : ''}`
          : `/api/calltracking/chart/source?from=${this.filterModel[0]}&to=${this.filterModel[1]}${this.uniqid ? `&uniqid=${this.uniqid}` : ''}`,
        {},
        'GET',
        false,
        /* eslint-enable max-len, no-undef */
      ).authorization();
      // noinspection JSUnresolvedVariable
      const data = await this.$xhr.send(request).then(res => res.data.result);
      this.data = data.events;
      // noinspection JSUnresolvedVariable
      this.dataTable = data.eventsNameValue;
      this.labels = data.labels;
    },
    getLabelColor(index) {
      const colorsList = [
        '#555555',
        '#2319DC',
        '#315EFB',
        '#4285F4',
        '#FF0000',
        '#800000',
        '#800080',
        '#36a2eb80',
        '#4bc0c080',
        '#ff638480',
      ];
      return colorsList[index % colorsList.length];
    },
  },
};
</script>
