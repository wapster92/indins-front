<template>
  <footer class="footer">
    <span class="footer__text">2021 Tokenrank.ru</span>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
.footer {
  background: $primary-blue;
  @include flex-center;
  height: 70px;
  &__text {
    color: $secondary-white;
  }
}
</style>
