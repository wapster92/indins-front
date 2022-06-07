<template>
  <div>
    <div class="container">
      <SliderBase :dots="false">
        <BinanceBanner/>
        <GateBanner/>
        <TkMexcBanner/>
      </SliderBase>
    </div>

  </div>
</template>

<script>
import SliderBase from '../components/main/SliderBase';
import BinanceBanner from '../components/banners/BinanceBanner';
import GateBanner from '../components/banners/GateBanner';
import TkMexcBanner from '../components/banners/TkMexcBanner';

export default {
  name: 'Slider',
  components: {
    SliderBase,
    BinanceBanner,
    GateBanner,
    TkMexcBanner,
  },
};
</script>

<style scoped>

</style>
