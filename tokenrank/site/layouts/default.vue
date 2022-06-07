<template>
  <div
    class="app"
  >
    <Header class="header"/>
    <main class="main">
      <nuxt/>
    </main>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Footer from '../components/main/Footer';
import Header from '../components/main/Header';

export default {
  components: {
    Footer, Header,
  },
  mounted() {
    if (process.client) {
      this.$store.commit('screen/changeWidth', window.innerWidth);
      window.addEventListener('resize', () => {
        this.$store.commit('screen/changeWidth', window.innerWidth);
      });
    }
  },
};
</script>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: $secondary-medium-black;
  font-size: 16px;
  font-family: Roboto, sans-serif;
}
.main {
  flex: 1;
  padding-top: 30px;
  @include min-media($md) {
    padding-top: 40px;
  }
}
</style>
