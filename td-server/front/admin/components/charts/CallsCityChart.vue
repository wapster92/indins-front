<template>
  <div>
    <DoughnutChart
      :chart-data="chartData"
      :options="options"
    />
  </div>
</template>

<script>
import DoughnutChart from './main/DoughnutChart';

export default {
  name: 'CallsCityChart',
  components: {
    DoughnutChart,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        legend: {
          position: 'right',
        },

        elements: {
          arc: {
            backgroundColor: ['#7FCF87', '#61B7D9', '#F4947F'],
          },
        },
      },
    };
  },

};
</script>

<style scoped>

</style>
