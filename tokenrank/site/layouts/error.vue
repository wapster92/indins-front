<template>
  <div
    class="app"
  >
    <Header class="header"/>
    <main class="main">
      <NotFound/>
    </main>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Header from '@/components/main/Header';
import Footer from '@/components/main/Footer';
import NotFound from '@/components/main/NotFound';

export default {
  components: {
    Header,
    Footer,
    NotFound,
  },
  props: {},
  layout: 'errorLayout',
  data: () => ({}),
};
</script>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main {
  flex: 1;
  padding: 29px 0 60px;
}
</style>

