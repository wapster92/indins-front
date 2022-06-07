<template>
  <div>
    <LineChart
      class="chart"
      :chart-data="chartData"
      :options="options"
      :height="height"
    />
  </div>
</template>

<script>
import LineChart from './main/LineChart.js';

export default {
  name: 'LoadChart',
  components: { LineChart },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    height: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
        elements: {
          line: {
            tension: 0,
            fill: false,
            borderColor: '#8E43B1',
          },
          point: {
            backgroundColor: '#8E43B1',
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
            },
          }],
        },
      },
    };
  },
};
</script>

<style lang="stylus" scoped>

</style>
