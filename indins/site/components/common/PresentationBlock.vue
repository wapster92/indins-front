<template>
  <div class="presentation-block">
    <div class="container flex-row">
      <div class="presentation-block__text">
        {{ text }}
      </div>
      <div class="presentation-block__btn">
        <Button
          @click="downloadFile"
        >
          <span class="btn">
            <span class="btn__text">Скачать презентацию</span>
            <span class="btn__icon"/>
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PresentationBlock',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      src: './presentation_compressed.pdf',
      text: 'Скачайте презентацию с информацией о компании, примерами проектов в области автоматизации и разработки CRM и ERP-систем',
    };
  },

  mounted() {

  },

  beforeMount() {
    if (this.value.src) this.src = this.value.src;
    if (this.value.text) this.src = this.value.text;
  },

  methods: {
    downloadFile() {
      if (window.gtag) {
        window.gtag('event', 'DownloadPresentation', {
          event_category: 'engagement',
        });
      }
      if (window.yaCounter26690535) {
        window.yaCounter26690535.reachGoal('DownloadPresentation');
      }
      if (!this.src) console.error('В блоке PresentationBlock передано неверное значение');
      const link = document.createElement('a');
      link.href = this.src;
      link.download = 'INDINS.pdf';
      link.click();
      link.remove();
    },
  },
};
</script>
