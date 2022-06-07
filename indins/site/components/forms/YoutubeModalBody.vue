<template>
  <div class="youtube-modal">
    <iframe
      ref="youtubeFrame"
      :src="'https://www.youtube.com/embed/' + youtubeID + '?version=3&enablejsapi=1'"
      class="prj-modal-youtube-frame"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  name: 'YoutubeModalBody',

  computed: {
    modalIsShow() {
      return this.$store.getters['modal/show'];
    },
    youtubeID() {
      return this.$store.state.modal.options.youtubeID;
    },
  },

  watch: {
    modalIsShow(value) {
      if (!value) {
        this.$refs.youtubeFrame.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      }
    },
  },
};
</script>
