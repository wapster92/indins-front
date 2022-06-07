<!-- eslint-disable -->
<template>
  <div
    v-if="data.text"
    :class="data.areaClass"
    class="quotation-area"
  >
    <div class="quotation-area__container">
      <div class="quotation-block">
        <div
          v-if="!videoProp"
          :class="data.textClass"
          class="quotation-text"
          v-html="data.text"
        />
        <div
          v-if="videoProp"
          class="quotation-video"
        >
          <div
            v-if="data.img"
            class="quot-v-img"
          >
            <div
              class="quot-v-img-block"
              @click="showVideo"
            >
              <img
                loading="lazy"
                :src="data.img"
                :alt="data.alt"
              >
            </div>
          </div>
          <div class="quot-v-text">
            <div
              v-if="data.text"
              :class="data.textClass"
              class="quot-v-text-block"
              v-html="data.text"
            />
            <div class="quot-v-show-block">
              <div
                class="back-flex svg-hover svg-hover-accent"
                @click="showVideo"
              >
                <div class="text">Смотреть видеоотзыв</div>
                <div class="icon">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="201.649px"
                    height="381.737px"
                    viewBox="0 0 201.649 381.737"
                    enable-background="new 0 0 201.649 381.737"
                    xml:space="preserve"
                  >
                    <path
                      d="M198.538,183.261L18.46,3.179c-4.242-4.239-11.039-4.239-15.281,0c-4.239,4.242-4.239,11.039,0,15.281
                          l172.398,172.398L3.179,363.261c-4.239,4.238-4.239,11.039,0,15.277c2.082,2.082,4.879,3.199,7.601,3.199
                          c2.719,0,5.52-1.039,7.598-3.199L198.46,198.46C202.698,194.3,202.698,187.421,198.538,183.261z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuatationBlock',

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      videoProp: false,
    };
  },

  created() {
    if (this.data.video) {
      this.videoProp = this.data.video;
    }
  },

  methods: {
    showVideo() {
      if (this.data.youtubeID && this.videoProp) {
        this.$store.commit('modal/setOptions', {
          body: {
            component: () => import('~/components/forms/YoutubeModalBody'),
          },
          youtubeID: this.data.youtubeID,
        });
        this.$store.commit('modal/show');
      }
    },
  },
};
</script>
