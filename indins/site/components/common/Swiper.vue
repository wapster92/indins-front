<!-- eslint-disable -->
<template>
  <div class="swiper-area swiper-for-icons">
    <div class="swiper-area__container">
      <div
        v-swiper:mySwiper="swiperOptions"
        class="swiper-icons"
      >
        <div class="swiper-wrapper">
          <slot/>
        </div>
      </div>
      <div
        slot="pagination"
        class="swiper-pagination swiper-points swiper-first"
      />
      <div
        slot="button-prev"
        class="swiper-arrow-btn swiper-arrow-prev swiper-arrow-prev-first"
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="624.107px"
          height="444.802px"
          viewBox="94.286 193.371 624.107 444.802"
          enable-background="new 94.286 193.371 624.107 444.802"
          xml:space="preserve"
        >
          <g>
            <path
              d="M711.796,637.911L97.688,430.856c-2.007-0.678-3.37-2.546-3.401-4.664
                            c-0.031-2.119,1.276-4.028,3.263-4.763l614.105-227.745c2.057-0.764,4.374-0.095,5.709,1.649c1.335,1.743,1.375,4.153,0.101,5.941
                            L557.272,425.976l160.056,204.112c1.364,1.74,1.424,4.167,0.148,5.972c-0.956,1.351-2.492,2.113-4.083,2.113
                            C712.86,638.173,712.321,638.088,711.796,637.911z M114.27,425.893l584.861,197.195L547.096,429.202
                            c-1.368-1.743-1.424-4.177-0.14-5.983l152.922-214.502L114.27,425.893z"
            />
          </g>
        </svg>
      </div>
      <div
        slot="button-next"
        class="swiper-arrow-btn swiper-arrow-next swiper-arrow-next-first"
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="624.107px"
          height="444.801px"
          viewBox="94.286 193.371 624.107 444.801"
          enable-background="new 94.286 193.371 624.107 444.801"
          xml:space="preserve"
        >
          <g>
            <path
              d="M99.287,638.173c-1.591,0-3.127-0.762-4.083-2.113c-1.276-1.805-1.216-4.232,0.148-5.972l160.056-204.112
                    L95.215,201.274c-1.274-1.788-1.234-4.198,0.101-5.941c1.335-1.744,3.652-2.413,5.709-1.649L715.13,421.429
                    c1.987,0.735,3.294,2.644,3.263,4.763c-0.031,2.118-1.394,3.986-3.401,4.664L100.884,637.911
                    C100.359,638.088,99.82,638.173,99.287,638.173z M112.802,208.717l152.922,214.502c1.284,1.806,1.228,4.24-0.14,5.983
                    L113.549,623.088L698.41,425.893L112.802,208.717z"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-arrow-next-first',
          prevEl: '.swiper-arrow-prev-first',
        },
        pagination: {
          el: '.swiper-first',
        },
        breakpoints: {
          1203: {
            slidesPerView: 3,
          },
          769: {
            slidesPerView: 2,
          },
          479: {
            slidesPerView: 1,
          },
        },
      },
    };
  },
};
</script>
