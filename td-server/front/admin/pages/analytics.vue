<template>
  <div class="fill-height">
    <PageBlock>
      <AnalyticsFilters
        v-model="filtersDate"
        @click="getData"
      />
    </PageBlock>
    <v-row>
      <v-col
        md="4"
        cols="12"
        class="pr-0"
      >
        <PageBlock title="Москва">
          <template #buttons>
            <IconButton
              icon="mdi-cloud-download"
              @click="downloadExel('Москва', 'moscow')"
            />
          </template>
          <CallsCityChart :chart-data="moscowData" />
        </PageBlock>
        <PageBlock title="Санкт-Петербург">
          <template #buttons>
            <IconButton
              icon="mdi-cloud-download"
              @click="downloadExel('Санкт-Петербург', 'spb')"
            />
          </template>
          <CallsCityChart :chart-data="spbData" />
        </PageBlock>
        <!--        <PageBlock title="Обработка интернет-заказов">-->
        <!--          <AnalyticsOrders :items="onlineOrders" />-->
        <!--        </PageBlock>-->
        <PageBlock title="Обработка заявок с сайта">
          <AnalyticsOrders :items="siteRequestions" />
        </PageBlock>
        <PageBlock title="Обработка звонков">
          <AnalyticsOrders :items="resultsCalls" />
        </PageBlock>
        <PageBlock>
          <AllCalls :all-calls="allCalls" />
        </PageBlock>
      </v-col>
      <v-col
        md="8"
        cols="12"
        class="pl-0"
      >
        <PageBlock
          title="Нагрузка"
          allow-minimize
        >
          <LoadChart
            :chart-data="loadData"
            :height="200"
          />
        </PageBlock>
        <PageBlock
          title="Активность"
          allow-minimize
          class="activity"
        >
          <template #buttons>
            <IconButton
              icon="mdi-cloud-download"
              @click="downloadActivityExel"
            />
          </template>
          <UserActivity :list="activesOperators" />
        </PageBlock>
        <PageBlock
          title="Проставленные теги"
          allow-minimize
          class="activity"
        >
          <template #buttons>
            <IconButton
              icon="mdi-cloud-download"
              @click="downloadActivityTags"
            />
          </template>
          <AnaliticsTags :items="tagsStatistic" />
        </PageBlock>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment';
import { Simple } from 'core-xhr';
import { mapState } from 'vuex';
import CallsCityChart from '../components/charts/CallsCityChart';
import LoadChart from '../components/charts/LoadChart';
import AnalyticsOrders from '../components/blocks/AnalyticsOrders';
import AllCalls from '../components/blocks/AllCalls';
import UserActivity from '~/components/blocks/UserActivity';
import AnalyticsFilters from '~/components/blocks/AnalyticsFilters';
import AnaliticsTags from '~/components/blocks/AnaliticsTags';
import {
  convertResponse, convertResponseCalls, convertResponseSite,
} from '~/utils/convertData';

export default {
  name: 'Analytics',
  meta: {
    breadcrumb: 'Аналитика',
  },
  components: {
    CallsCityChart,
    LoadChart,
    AnalyticsOrders,
    AllCalls,
    UserActivity,
    AnalyticsFilters,
    AnaliticsTags,
  },
  data() {
    return {
      allCalls: 0,
      moscowData: {
        labels: ['Входящие', 'Исходящие', 'Пропущенные'],
        datasets: [{
          data: [10, 15, 27],
        }],
      },
      spbData: {
        labels: ['Входящие', 'Исходящие', 'Пропущенные'],
        datasets: [{
          data: [10, 15, 27],
        }],
      },
      activesOperators: [

      ],
      loadData: {
        labels: ['9:00', '10:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
        datasets: [
          {
            data: [5, 14, 10, 550, 60, 280],
            label: 'Москва',
          },
          {
            data: [12, 94, 25, 340, 50, 2],
            label: 'Санкт-Петербург',
            backgroundColor: '#EBA844',
            borderColor: '#EBA844',
          },
        ],
      },
      tagsStatistic: [],
      siteRequestions: [],
      resultsCalls: [],
      // onlineOrders: [],
      filtersDate: [
        moment().set({ hour: 0, minute: 0 }).format('YYYY-MM-DD HH:mm'),
        moment().set({ hour: 23, minute: 59 }).format('YYYY-MM-DD HH:mm'),
      ],
      min: null,
      max: null,
    };
  },
  computed: {
    ...mapState({
      userId: state => state.auth.id,
    }),
    isAdmin() {
      return this.$store.getters['auth/hasRole']('ADMINISTRATOR');
    },
    isAnalytics() {
      return this.$store.getters['auth/hasRole']('ANALYTICS');
    },
  },
  watch: {
    filtersDate: {
      deep: true,
      immediate: true,
      handler() {
        if (moment(this.filtersDate[1]).diff(moment(this.filtersDate[0]), 'hour') > 23) this.viewDNDchart = false;
        else this.viewDNDchart = true;
      },
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const filterRoles = this.$store.getters['auth/hasRole'](['ANALYTICS', 'ADMINISTRATOR']);
        const res = {
          start: this.filtersDate[0],
          end: this.filtersDate[1],
          operator: filterRoles ? 0 : this.$store.state.auth.id,
        };
        const resCalls = {
          start: this.filtersDate[0],
          end: this.filtersDate[1],
        };
        const [tags, dnd, calls, tagsStatistic] = await Promise.all([
          this.$xhr.send(new Simple('/api/get_tags')),
          this.$xhr.send(new Simple('/api/get-dnds-analytics', res, 'POST')),
          this.$xhr.send(new Simple('/api/get_all_analytics_data', resCalls, 'POST')),
          this.$xhr.send(new Simple('/api/tags_statistic', resCalls, 'POST'))]);
        console.log(tagsStatistic);
        const resultCalls = convertResponseCalls(calls.data);
        const resultSiteRequestions = convertResponseSite(calls.data.siteRequisition, tags.data);
        const resultsCalls = convertResponseSite(calls.data.calls, tags.data);
        // const resultOnlineOrders = convertResponseOrders(calls.data.onlineOrders);
        const result = convertResponse(dnd.data);
        this.allCalls = resultCalls.allCalls;
        this.activesOperators = result.activesOperators;
        this.siteRequestions = resultSiteRequestions;
        this.resultsCalls = resultsCalls;
        // this.onlineOrders = resultOnlineOrders;
        this.moscowData = {
          labels: [`Входящие ${resultCalls.cities.moscow.types[0]}`, `Исходящие ${resultCalls.cities.moscow.types[1]}`, `Пропущенные ${resultCalls.cities.moscow.types[2]}`],
          datasets: [{
            data: resultCalls.cities.moscow.types,
          }],
        };
        this.spbData = {
          labels: [`Входящие ${resultCalls.cities.spb.types[0]}`, `Исходящие ${resultCalls.cities.spb.types[1]}`, `Пропущенные ${resultCalls.cities.spb.types[2]}`],
          datasets: [{
            data: resultCalls.cities.spb.types,
          }],
        };
        this.loadData = {
          labels: ['9:00', '10:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
          datasets: [
            {
              data: resultCalls.cities.moscow.hours,
              label: 'Москва',
            },
            {
              data: resultCalls.cities.spb.hours,
              label: 'Санкт-Петербург',
              backgroundColor: '#EBA844',
              borderColor: '#EBA844',
            },
          ],
        };
        this.tagsStatistic = tagsStatistic.data.result;
      } catch (e) {
        await this.$store.dispatch('snack/error', e.message || 'Произошла ошибка при получении данных');
      }
    },
    async downloadActivityTags() {
      try {
        const filter = {

          start: this.filtersDate[0],
          end: this.filtersDate[1],

        };
        const data = await this.$xhr.send(new Simple('/api/tags_export', filter, 'POST'));
        if (data.data.success) {
          const link = document.createElement('a');
          link.setAttribute('download', `activity_tags_${this.filtersDate[0]}-${this.filtersDate[0]}`);
          link.href = data.data.result.url;
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      } catch (e) {
        this.$store.dispatch('snack/error', e.message || 'Произошла ошибка при получении данных');
      }
    },
    async downloadActivityExel() {
      try {
        const filter = {

          start: this.filtersDate[0],
          end: this.filtersDate[1],

        };
        const data = await this.$xhr.send(new Simple('/api/export-activity-to-excel', filter, 'POST'));
        if (data.data.success) {
          const link = document.createElement('a');
          link.setAttribute('download', `activity_${this.filtersDate[0]}-${this.filtersDate[0]}`);
          link.href = data.data.file;
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      } catch (e) {
        this.$store.dispatch('snack/error', e.message || 'Произошла ошибка при получении данных');
      }
    },
    async downloadExel(city, name) {
      try {
        const filter = {
          dateFilters: {
            start: this.filtersDate[0],
            end: this.filtersDate[1],
          },
        };
        if (city) {
          filter.equalFilters = {
            'call.city': city,
          };
        }
        if (!(this.isAnalytics || this.isAdmin)) {
          filter.equalFilters = {
            'operator.id': this.userId,
          };
        }
        const data = await this.$xhr.send(new Simple('/api/export-calls-to-excel', filter, 'POST'));
        if (data.data.success) {
          const link = document.createElement('a');
          link.setAttribute('download', `${name}_${this.filtersDate[0]}-${this.filtersDate[0]}`);
          link.href = data.data.file;
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      } catch (e) {
        this.$store.dispatch('snack/error', e.message || 'Произошла ошибка при получении данных');
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.activity
  >>> .page-block-content
    padding: 0
</style>
