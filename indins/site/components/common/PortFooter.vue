<!-- eslint-disable max-len -->
<template>
  <div
    :class="data.areaClass"
    class="blog-content-footer-area port-footer-area"
  >
    <div class="portfolio-container">
      <div
        class="blog-content-footer-flex"
      >
        <div class="is-back">
          <nuxt-link
            :to="{path: `/portfolio/${prevProject}`}"
            class="back-flex svg-hover svg-hover-accent"
          >
            <div class="icon">
              <svg
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
            <div class="text">Предыдущий проект</div>
          </nuxt-link>
        </div>

        <div
          v-if="data.name"
          class="is-social port-footer-btn"
        >
          <noindex>
            <a
              :href="data.link"
              class="btn-project btn-project-transparent"
              target="_blank"
              rel="nofollow"
            >
              <span class="btn-area">
                <span class="name">{{ data.name }}</span>
              </span>
            </a>
          </noindex>
        </div>

        <div class="is-next">
          <nuxt-link
            :to="{path: `/portfolio/${nextProject}`}"
            class="back-flex svg-hover svg-hover-accent"
          >
            <div class="text">Следующий проект</div>
            <span class="icon">

              <svg
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

            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// TODO Заменить v-btn

import { Simple } from 'core-xhr';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      prevProject: null,
      nextProject: null,
    };
  },
  created() {
    this.getUrl();
  },
  methods: {
    async getUrl() {
      const { path } = this.$route;
      const url = path.split('/');
      try {
        const res = await this.$xhr.send(new Simple(`/api/next-project/${url[2]}`).authorization());
        const result = res.data.data;
        this.prevProject = result.prev.url;
        this.nextProject = result.next.url;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.btn-area .name
  font-size: 22px
  color: #637EA8;
  &:hover
    color: #E8A15A;
</style>
