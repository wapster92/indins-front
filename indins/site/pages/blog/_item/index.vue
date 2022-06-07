<template>
  <div class="blog-page">
    <div class="blog-page__container">

      <PageTitle
        :data="item.pageTitle"
      />
      <BlogContent
        :data="item.blogContent"
      />
    </div>
    <AngularBlock
      :data="angularBlock"
    >
      <BlogContentInfo
        :data="item.blogContentInfo"
      />
    </AngularBlock>
    <BackNextPanel
      :data="item.blogContentFooter"
      back-url="/blog"
      text="Назад к списку статей"
    />
  </div>
</template>

<script>
import {
  Filter, Get, Simple, Put,
} from 'core-xhr';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import AngularBlock from '~/components/common/AngularBlock';
import BlogContentInfo from '~/components/common/BlogContentInfo';
import BackNextPanel from '~/components/common/BackNextPanel';
import BlogContent from '~/components/common/BlogContent';

export default {
  name: 'Index',

  components: {
    AngularBlock,
    BlogContentInfo,
    BlogContent,
    PageTitle,
    BackNextPanel,
  },

  mixins: [
    meta,
    checkMenu,
  ],

  async asyncData({ app: { $xhr }, route, error }) {
    const filters = [
      new Filter('url', 'eq', route.params.item),
      new Filter('deletedAt', 'exists', false),
      new Filter('isActive', 'bool', true),
    ];
    const blogRequest = new Get('blog-item').entity().setFilter(filters);

    try {
      const article = await $xhr.send(blogRequest);
      const articleItem = article.data.data.result;
      const nextArticle = await $xhr.send(new Simple(`/api/next-article/${articleItem.id}`).authorization());

      const metaFromDB = {
        metaTitle: articleItem.metaTitle,
        metaKeywords: articleItem.metaKeywords,
        imageDesktop: `https://indins.ru${articleItem.image}`,
        metaDescription: articleItem.metaDescription,
      };

      const item = {
        id: articleItem.id,
        blogContent: {
          img: articleItem.image,
          imgAlt: articleItem.title,
          text: articleItem.text,
        },

        blogContentFooter: {
          nextTitle: nextArticle.data.data.title,
          nextURL: nextArticle.data.data.url,
        },

        blogContentInfo: {
          author: articleItem.author,
          views: articleItem.views,
        },

        pageTitle: {
          areaClass: 'max-width-18',
          title: articleItem.title,
        },
      };

      return {
        ...metaFromDB,
        item,
      };
    } catch (e) {
      error({});
    }
  },

  data: () => ({
    item: {},

    page: {
      menuBack: true,
      footerBack: false,
    },

    angularBlock: {
      areaClass: 'blog-content-info-angular',
      sawBottom: false,
    },
  }),
  mounted() {
    this.incrementViewsCount();
  },
  methods: {
    async incrementViewsCount() {
      const count = this.item.blogContentInfo.views + 1;
      try {
        await this.$xhr.send(new Put('blog-item-views').entity()
          .addFilter(new Filter('id', 'eq', this.item.id))
          .setData({ views: count }));
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
