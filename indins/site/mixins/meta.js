export const meta = {
  data() {
    return {
      metaTitle: 'ИНДИНС',
      metaDescription: null,
      metaKeywords: null,
      imageDesktop: null,
      deletedAt: null,
    };
  },

  head() {
    const host = 'https://indins.ru';
    const jsonLD = {
      '@context': 'http://schema.org',
      '@type': 'WebPage',
      name: this.metaTitle,
      description: this.metaDescription,
      publisher: {
        '@type': 'Organization',
        name: 'ИНДИНС',
        logo: {
          '@type': 'ImageObject',
          url: `${host}/img/logo.svg`,
        },
      },
    };

    return {
      title: this.metaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.metaKeywords,
        },
        {
          property: 'og:title',
          content: this.metaTitle,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:locale',
          content: 'ru_RU',
        },
        {
          property: 'og:site_name',
          content: 'ИНДИНС',
        },
        {
          property: 'og:description',
          content: this.metaDescription,
        },
        {
          property: 'og:url',
          content: host + this.$route.path,
        },
        {
          property: 'og:image',
          content: this.imageDesktop || `${host}/img/indins.jpg`,
        },
        {
          property: 'vk:image',
          content: this.imageDesktop || `${host}/img/vkimage.png`,
        },
        {
          property: 'url',
          content: host + this.$route.path,
        },
        {
          property: 'image',
          content: this.imageDesktop || `${host}/img/indins.jpg`,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `https://indins.ru${this.$route.path}`,
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ innerHTML: JSON.stringify(jsonLD), type: 'application/ld+json' }],
    };
  },
};
