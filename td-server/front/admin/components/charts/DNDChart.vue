<template>
  <LineChart
    :chart-data="chartData"
    :options="options"
    :height="height"
  />
</template>

<script>

// import moment from 'moment';
import moment from 'moment';
import LineChart from './main/LineChart';

export default {
  name: 'DNDChart',
  components: {
    LineChart,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    height: {
      type: Number,
      default: 200,
    },
    min: {
      required: true,
    },
    max: {
      required: true,
    },
  },
  data() {
    return {
      options: {
        legend: false,
        scales: {
          xAxes: [{
            type: 'time',

            time: {
              round: true,
              unit: 'hour',
              min: moment().set({ hour: 9, minute: 0 }).format('YYYY-MM-DD HH:mm'), // moment(this.min).format('YYYY-MM-DD HH:mm'),
              max: moment().set({ hour: 18, minute: 59 }).format('YYYY-MM-DD HH:mm'),
              tooltipFormat: 'HH:mm DD-MM-YYYY',
              displayFormats: {
                second: 'HH:mm:ss',
                minute: 'HH:mm',
                hour: 'HH:mm',
                day: 'HH:mm DD-MM-YYYY',
              },
            },
          }],
          yAxes: [{
            type: 'category',
            /* ticks: {
              callback(value, index, values) {
                console.log(value, values, index);
                return `$${value}`;
              },
            }, */
            offset: true,
          }],
        },
        elements: {
          line: {
            tension: 0,
            fill: false,
            borderColor: '#8E43B1',
            borderWidth: 4,
          },
          point: {
            backgroundColor: '#8E43B1',
            borderWidth: 5,
            borderColor: '#8E43B1',
          },
        },
      },
    };
  },
};
</script>

<style scoped>

</style>
