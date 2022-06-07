<template>
  <div class="fork-area">
    <div class="fork-area__container">
      <div class="fork-flex">
        <div class="fork-item-title-block">
          <div class="fork-item-title">Вашему бизнесу нужны</div>
        </div>
        <div class="fork-item-icon-block icon-left">
          <nuxt-link
            to="/customers"
            class="fork-item-icon svg-hover secondary-hover"
          >
            <div class="is-icon">
              <svg-icon name="man"/>
            </div>
            <div class="is-title">Маркетинг и&nbsp;продажи</div>
          </nuxt-link>
        </div>
        <div class="fork-item-icon-block icon-right">
          <nuxt-link
            to="/automation"
            class="fork-item-icon svg-hover secondary-hover"
          >
            <div class="fork-item-icon">
              <div class="is-icon">
                <svg-icon name="code"/>
              </div>
              <div class="is-title">Автоматизация бизнеса</div>
            </div>
          </nuxt-link>
        </div>
        <div class="arrow-block-left">
          <div class="fork-arrow left">
            <nuxt-link
              to="/customers"
              class="is-arrow svg-hover"
            >
              <svg-icon name="left-arrow"/>
            </nuxt-link>
          </div>
        </div>
        <div class="arrow-block-right">
          <div class="fork-arrow right">
            <nuxt-link
              to="/automation"
              class="is-arrow svg-hover"
            >
              <svg-icon name="right-arrow"/>
            </nuxt-link>
          </div>
        </div>
        <div class="arrow-block-down">
          <div class="fork-arrow down">
            <span
              v-scroll-to="{ el: '.portfolio-angular-area' }"
              class="svg-hover"
            >
              <svg-icon name="right-arrow"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexFork',
};
</script>
