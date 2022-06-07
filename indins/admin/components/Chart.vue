<script>
/* eslint-disable */

import { Line, mixins } from 'vue-chartjs';

export default {
  name: 'Chart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartdata', 'options'],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
