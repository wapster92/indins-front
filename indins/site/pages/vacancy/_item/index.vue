<template>
  <div class="vacancy-content-block">
    <div class="vacancy-page-id">
      <div
        v-if="item.description"
        class="content-wrapper"
      >
        <PageTitle :data="{title: item.title}"/>
        <div
          class="vacancy-description"
          v-html="item.description"
        />
        <div
          class="vacancy-disclaimer"
          v-html="`${longText.fragment1} ${longText.fragment2} ${longText.fragment3}`"
        />
      </div>
    </div>
    <BackNextPanel
      back-url="/vacancy"
      text="Назад к списку вакансий"
    />
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import PageTitle from '~/components/common/UI/PageTitle';
import SectionTitle from '~/components/common/UI/SectionTitle';
import BackNextPanel from '~/components/common/BackNextPanel';
import { meta } from '~/mixins/meta';

export default {
  name: 'VacancyDescription',

  components: {
    BackNextPanel,
    PageTitle,
    SectionTitle,
  },
  mixins: [
    meta,
  ],
  async asyncData({ app: { $xhr }, route, error }) {
    const filters = [
      new Filter('url', 'eq', route.params.item),
      new Filter('deletedAt', 'exists', false),
      new Filter('isActive', 'bool', true),
    ];
    const vacancyRequest = new Get('vacancy-item').entity().addOrder('createdAt', 'DESC').setFilter(filters);

    try {
      const vacancy = await $xhr.send(vacancyRequest);
      const item = vacancy.data.data.result;
      if (item.length <= 0) return error({ statusCode: 404 });
      return {
        item,
        metaTitle: item.metaTitle,
        metaDiscription: item.metaDiscription,
        metaKeywords: item.metaKeywords,
      };
    } catch (e) {
      console.error(e);
    }
  },

  data: () => ({
    page: {
      menuBack: true,
      footerBack: false,
    },
    item: null,
    longText: {
      fragment1: 'Отправляйте нам свой отклик по электронной почте на адрес',
      fragment2: '<a href="mailto:manager@indins.ru">manager@indins.ru</a>,',
      fragment3: 'и мы с удовольствием рассмотрим вашу кандидатуру!',
    },
  }),
};
</script>
