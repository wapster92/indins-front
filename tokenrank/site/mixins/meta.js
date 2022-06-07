export const metaMixin = {
  data() {
    return {
      metaTags: {
        metaTitle: null,
        metaDescription: null,
        metaKeywords: null,
        metaImage: null,
        deletedAt: null,
      },
    };
  },
  head() {
    const jsonLD = {
      '@context': 'http://schema.org',
      '@type': 'WebPage',
      name: this.metaTags.metaTitle || 'TokenRank',
      description: this.metaTags.metaDescription || 'TokenRank',
      publisher: {
        '@type': 'Organization',
        name: this.$config.baseName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.$config.baseUrl}/meta-img/logo.svg`,
        },
      },
    };
    return {
      title: this.metaTags.metaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaTags.metaDescription,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.metaTags.metaKeywords,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.metaTags.metaTitle,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: 'ru_RU',
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: this.$config.baseName,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metaTags.metaDescription,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$config.baseURL + this.$route.path,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.metaTags.metaImage || `${this.$config.baseURL}/meta-img/tokenrank.jpg`,
        },
        {
          hid: 'vk:image',
          property: 'vk:image',
          content: this.metaTags.metaImage || `${this.$config.baseURL}/meta-img/tokenrank.jpg`,
        },
        {
          hid: 'url',
          property: 'url',
          content: this.$config.baseURL + this.$route.path,
        },
        {
          hid: 'image',
          property: 'image',
          content: this.metaTags.metaImage || `${this.$config.baseURL}/meta-img/tokenrank.jpg`,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseURL}${this.$route.path}`,
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ hid: 'jsonLD', innerHTML: JSON.stringify(jsonLD), type: 'application/ld+json' }],
    };
  },
};
