<!-- eslint-disable -->
<template>
  <div class="back-next-panel">
    <div class="back-next-panel__container">
      <div class="back-next-panel__container_flex">
        <div class="is-back">
          <nuxt-link
            :to="backUrl"
            class="back-flex svg-hover svg-hover-accent"
          >
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
                  d="M3.188,198.46L183.27,378.538c2.078,2.16,4.879,3.199,7.598,3.199c2.722,0,5.519-1.117,7.601-3.199
                                    c4.239-4.238,4.239-11.039,0-15.277L26.071,190.858L198.469,18.46c4.239-4.242,4.239-11.039,0-15.281
                                    c-4.242-4.239-11.039-4.239-15.281,0L3.11,183.261C-1.05,187.421-1.05,194.3,3.188,198.46z"
                />
              </svg>
            </div>
            <div
              class="text"
              v-text="text"
            />
          </nuxt-link>
        </div>
        <div
          v-if="data"
          class="is-social"
        >
          <ShareSocial/>
        </div>
        <div
          v-if="data && data.nextURL"
          class="is-next"
        >
          <nuxt-link
            :to="nextURL"
            class="back-flex svg-hover svg-hover-accent"
          >
            <div class="text">Следующая статья</div>
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
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ShareSocial from './ShareSocial';

export default {
  name: 'BackNextPanel',

  components: { ShareSocial },

  props: {
    backUrl: {
      type: String,
      default: '',
    },
    data: {
      type: Object | null,
      default: null,
    },
    text: {
      type: String,
      default: '',
    },
  },

  computed: {
    nextURL() {
      return `${this.backUrl}/${this.data.nextURL}`;
    },
  },
};
</script>
