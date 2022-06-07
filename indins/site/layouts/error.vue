<template>
  <div class="error">
    <div class="error__container">
      <div class="text-center">
        <img
          class="error__img"
          src="/img/fzf.svg"
          alt="Страница не найдена"
        >
        <h3 class="error__title">Страница не найдена</h3>
        <p>Страницы не существует или она была удалена.</p>
        <p>
          Если вы не обнаружили нужную информацию на сайте, перейдите, пожалуйста, на
          <nuxt-link to="/">главную страницу</nuxt-link>
          сайта или свяжитесь с нами любым удобным для вас способом, используя
          <nuxt-link to="/contacts">контактные данные</nuxt-link>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  methods: {
    intersect() {
      IntersectionObserver.prototype.POLL_INTERVAL = 100;
    },
    animate() {
      const start = Date.now() + this.duration;

      const step = () => {
        const remaining = start - Date.now();

        if (remaining < 0) {
          this.rate = 0;
        } else {
          this.rate = remaining / this.duration;
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    },
  },
};
</script>
