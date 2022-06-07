<template>
  <v-container
    fluid
  >
    <v-list>
      <v-list-item
        v-for="item of itemKeys"
        :key="item.key"
        class="list-item"
      >
        <v-list-item-content class="pt-2 pb-2">
          <v-list-item-subtitle>{{ item.label }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="pt-2 pb-2">
          <v-list-item-title>{{ token[item.key] || 0 }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'IndicatorsData',
  props: {
    token: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      itemKeys: [
        { key: 'totalSupply', label: 'Общее предложение' },
        { key: 'circulatingSupply', label: 'Циркулирующее предложение' },
        { key: 'liquidityScore', label: 'Оценка ликвидности' },
        { key: 'developerScore', label: 'Оценка разработчиков' },
        { key: 'coingeckoRank', label: 'Рейтинг CoinGecko' },
        { key: 'marketCapRank', label: 'Оценка рыночной капитализации' },
        { key: 'coingeckoScore', label: 'Оценка CoinGecko' },
        { key: 'communityScore', label: 'Оценка активности' },
        { key: 'publicInterestScore', label: 'Оценка публичного интереса' },
        { key: 'athUsd', label: 'ATH' },
        { key: 'rate', label: 'Рейтинг' },
      ],
    };
  },
  computed: {
    listItems() {
      return Object.keys(this.token);
    },
  },
};
</script>

<style lang="stylus" scoped>
.list-item
  min-height 20px
</style>
