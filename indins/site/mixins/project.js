import { Filter, Get } from 'core-xhr';

export default {
  async asyncData({ app: { $xhr }, route }) {
    const filters = [
      new Filter('url', 'eq', route.path.split('/').reverse()[0]),
      new Filter('deletedAt', 'exists', false),
      new Filter('isActive', 'bool', true),
    ];
    const request = new Get('portfolio-item').entity().setFilter(filters);

    try {
      const project = await $xhr.send(request);
      const item = project.data.data.result;
      const { metaTitle, metaDescription, metaKeywords } = item;

      return {
        item,
        metaTitle,
        metaDescription,
        metaKeywords,
      };
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    pageTitle() {
      if (!this.item) return null;
      return {
        title: this.item.pageTitle,
      };
    },
    textBlock() {
      if (!this.item) return null;
      return {
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: this.item.tileTag,
      };
    },
    portLogo() {
      if (!this.item) return null;
      return {
        src: this.item.logo,
        alt: this.item.pageTitle,
      };
    },
    textBlockAdvanced() {
      if (!this.item) return null;
      return {
        areaClass: 'port-text',
        text: this.item.description,
      };
    },
    portTopPreview() {
      if (!this.item) return null;
      return {
        alt: this.item.pageTitle,
        srcDesk: {
          img: this.item.imageDesktop,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: this.item.imageMobile,
          action: 'adaptiveResizeMax',
          width: 195,
        },
      };
    },
  },
};
