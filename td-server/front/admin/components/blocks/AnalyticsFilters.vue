<template>
  <div>
    <div class="filters">
      <SimpleButton
        :outlined="!buttonsActive[0]"
        @click="addToday"
      >
        Сегодня
      </SimpleButton>
      <SimpleButton
        :outlined="!buttonsActive[1]"
        @click="addWeek"
      >
        Неделя
      </SimpleButton>
      <SimpleButton
        :outlined="!buttonsActive[2]"
        @click="addMonth"
      >
        Месяц
      </SimpleButton>
      <v-menu
        v-model="open"
        :close-on-content-click="false"
        transition="scale-transition"
      >
        <template #activator="{ on }">
          <SimpleButton
            :outlined="!buttonsActive[3]"
            v-on="on"
          >
            Период
          </SimpleButton>
        </template>
        <v-card>
          <v-card-text class="d-flex pa-4">
            <v-date-picker
              v-model="dates"
              :type="type"
              :range="true"
              header-color="#416FC8"
              locale="ru"
              @change="addRangeDate"
            />
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'AnalyticsFilters',
  props: {
    value: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      dates: [],
      type: 'date',
      open: false,
      buttonsActive: [true, false, false, false],
    };
  },
  methods: {
    addToday() {
      this.buttonsActive = [true, false, false, false];
      this.dates = [
        moment().set({ hour: 0, minute: 0 }).format('YYYY-MM-DD HH:mm'),
        moment().set({ hour: 23, minute: 59 }).format('YYYY-MM-DD HH:mm'),
      ];
      this.$emit('input', this.dates);
      this.$emit('click');
    },
    addWeek() {
      this.buttonsActive = [false, true, false, false];
      this.dates = [
        moment().weekday(0).format('YYYY-MM-DD'),
        moment().weekday(6).format('YYYY-MM-DD'),
      ];
      this.$emit('input', this.dates);
      this.$emit('click');
    },
    addMonth() {
      this.buttonsActive = [false, false, true, false];
      this.dates = [
        moment().startOf('month').format('YYYY-MM-DD'),
        moment().endOf('month').format('YYYY-MM-DD'),
      ];
      this.$emit('input', this.dates);
      this.$emit('click');
    },
    addRangeDate(e) {
      this.buttonsActive = [false, false, false, true];
      if (e.length === 2) {
        const [start, end] = this.dates;
        this.dates = [
          moment(start).set({ hour: 0, minute: 0 }).format('YYYY-MM-DD HH:mm'),
          moment(end).set({ hour: 23, minute: 59 }).format('YYYY-MM-DD HH:mm'),
        ];
        this.open = false;
        this.$emit('input', this.dates);
        this.$emit('click');
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.filters
  display: flex
  gap 10px
</style>
