<template>
  <div class="vacancy">
    <PageTitle :data="pageTitle"/>
    <InfoBlockGrid
      v-if="items.length > 0"
      :data="infoBlockGrid"
    >
      <VacancyItem
        v-for="(item, i) in items"
        :key="`vacancy-item-${i}`"
        :data="item"
      />
    </InfoBlockGrid>
    <div
      v-else
      class="vacancy__container"
    >
      <div class="vacancy__container_empty">
        <span>На данный момент вакансий нет, но они регулярно появляются</span>
      </div>
    </div>
    <BackNextPanel
      v-if="isShowBackButton"
      back-url="/team"
      text="Назад к Команде"
    />
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import AngularBlock from '~/components/common/AngularBlock';
import TextBlock from '~/components/common/UI/TextBlock';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import BackNextPanel from '~/components/common/BackNextPanel';
import VacancyItem from '~/components/pages/vacancy/VacancyItem';
import { meta } from '~/mixins/meta';

export default {
  name: 'Vacancy',

  components: {
    PageTitle,
    AngularBlock,
    TextBlock,
    InfoBlockGrid,
    BackNextPanel,
    VacancyItem,
  },

  mixins: [
    meta,
    checkMenu,
  ],

  async asyncData({ app: { $xhr }, route }) {
    const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', route.path));
    const filters = [
      new Filter('deletedAt', 'exists', false),
      new Filter('isActive', 'bool', true),
    ];
    const vacancyRequest = new Get('vacancy').addOrder('createdAt', 'DESC').setFilter(filters);

    try {
      const metaSetting = await $xhr.send(metaRequest);
      const vacancies = await $xhr.send(vacancyRequest);

      const { metaTitle, metaDescription, metaKeywords } = metaSetting.data.data.result;

      return {
        metaTitle,
        metaDescription,
        metaKeywords,
        items: vacancies.data.data.result,
      };
    } catch (e) {
      console.error(e);
    }
  },

  data() {
    return {
      items: [],

      page: {
        menuBack: true,
        footerBack: false,
      },

      pageTitle: {
        title: 'Вакансии',
      },

      infoBlockGrid: {
        gridClass: 'blog-step',
        column: '3', // Количество столбцов
        gap: '36', // Расстояние между столбцами
      },

      isShowBackButton: false,
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      // eslint-disable-next-line no-param-reassign
      vm.isShowBackButton = from.name === 'team';
    });
  },
};
</script>
