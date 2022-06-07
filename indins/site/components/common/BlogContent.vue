<template>
  <div
    v-if="data.img || data.text"
    class="blog-content-area"
  >
    <div py-0>
      <div
        v-if="data.text"
        class="blog-content-block"
        v-html="data.text"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlogContent',

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    img: null,
    showModal: false,
    closing: false,
  }),

  mounted() {
    const imgList = document.querySelectorAll('.blog-content-area img');
    if (imgList.length > 0) {
      imgList.forEach(el => {
        el.addEventListener('click', this.openPopup);
      });
    }
  },

  beforeDestroy() {
    const imgList = document.querySelectorAll('.blog-content-area img');
    if (imgList.length > 0) {
      imgList.forEach(el => {
        el.removeEventListener('click', this.openPopup);
      });
    }
  },

  methods: {
    closePopup() {
      this.closing = true;
      this.showModal = false;
      setTimeout(() => {
        this.img = null;
        this.closing = false;
      }, 300);
    },
    openPopup(e) {
      if (this.closing) {
        setTimeout(() => {
          this.img = e.target.src;
          this.showModal = true;
        }, 300);
      } else {
        this.img = e.target.src;
        this.showModal = true;
      }
    },
  },
};
</script>
