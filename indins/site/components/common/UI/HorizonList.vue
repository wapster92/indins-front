<!-- eslint-disable -->
<template>
  <div class="horizon-list-area">
    <div class="horizon-list-desktop">
      <SectionTitle :data="{title: sectionTitle}"/>
      <div class="horizon-list-container">
        <div class="horizon-list-flex">
          <div class="horizon-list-side-left">
            <div class="angular-area saw-left saw-left-hidden-sm saw-left-hidden-xs">
              <span class="angular-back"><span/></span>
              <HorizonItem
                :data="itemsList[activeID]"
                :visible="visible"
              />
            </div>
          </div>
          <div class="horizon-list-side-right">
            <div class="horizon-nav-flex">
              <div
                v-for="(item, i) in itemsList"
                :key="i"
                :class="{'active': i === activeID}"
                class="horizon-nav-item"
              >
                <div class="icon">
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
                  class="name"
                  @click="switchActive(i)"
                  v-html="item.titleRight"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="horizon-list-mobile">
      <div class="angular-area">
        <span class="angular-back"><span/></span>
        <SectionTitle :data="{title: sectionTitle}"/>

        <div class="swiper-area swiper-for-horizon">
          <div class="swiper-for-horizon__container">
            <div v-swiper:mySwiperPartners="swiperOption">
              <div class="swiper-wrapper">
                <div
                  v-for="(block, key) in itemsList"
                  :key="key"
                  class="swiper-slide"
                >
                  <div class="horizon-swipe-item">
                    <div
                      v-if="block.icon"
                      class="is-icon"
                    >
                      <span :style="`background-image: url('` + block.icon + `')`"/>
                    </div>
                    <h3
                      v-if="block.title"
                      class="is-title text-center"
                      v-html="block.title"
                    />
                    <div
                      v-if="block.text"
                      class="is-text"
                      v-html="block.text"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              slot="pagination"
              class="swiper-pagination swiper-points swiper-points-horizon"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper';
import SectionTitle from '~/components/common/UI/SectionTitle';
import HorizonItem from '~/components/common/UI/HorizonItem';
import 'swiper/swiper-bundle.css';

export default {
  name: 'HorizonList',

  components: {
    SectionTitle,
    HorizonItem,
  },
  directives: {
    swiper: directive,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      visible: true,
      itemsList: [],
      activeID: 0,
      sectionTitle: '',
      swiperOption: {
        loop: true,
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-points-horizon',
        },
        breakpoints: {
          959: {
            slidesPerView: 1,
          },
        },
      },
    };
  },

  created() {
    if (this.data.items) {
      this.itemsList = this.data.items;
    }
    if (this.data.title) {
      this.sectionTitle = this.data.title;
    }
  },

  methods: {
    switchActive(id) {
      this.visible = false;

      setTimeout(() => {
        this.visible = true;
      }, 300);

      if (id !== this.activeID) {
        this.activeID = id;
      }
    },
  },
};
</script>
