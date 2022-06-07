<template>
  <div class="team">
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <TextBlock :data="textBlockHeader"/>
    </AngularBlock>
    <InfoBlockGrid :data="infoBlockGridData">
      <div
        v-for="(item, key) in items"
        v-if="item.imageBefore && item.imageAfter"
        :key="item.title + key.toString()"
        class="team__item"
      >
        <div
          class="team__item__one-desktop"
        >
          <div
            :class="{'team__item__img-block': true, 'hovered' : !!item.imageAfter}"
          >
            <img
              v-if="item.imageBefore"
              :src="item.imageBefore"
              :alt="item.name"
              loading="lazy"
              class="at-rest"
            >
            <img
              v-if="item.imageAfter"
              :src="item.imageAfter"
              :alt="item.name"
              loading="lazy"
              class="on-hover"
            >
          </div>
        </div>
        <div class="team__item__name-block">{{ item.name }}</div>
        <div
          v-if="item.position"
          class="team__item__info-block"
        >
          {{ item.position }}
        </div>
      </div>
    </InfoBlockGrid>
    <AngularBlock>
      <SectionTitle :data="sectionTitleData"/>
      <TextBlock :data="textBlockFooter"/>
      <FooterButton :value="footerButtonData"/>
    </AngularBlock>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import TextBlock from '~/components/common/UI/TextBlock';
import SectionTitle from '~/components/common/UI/SectionTitle';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import AngularBlock from '~/components/common/AngularBlock';
import FooterButton from '~/components/common/FooterButton';

export default {
  name: 'Team',

  components: {
    PageTitle,
    AngularBlock,
    TextBlock,
    SectionTitle,
    InfoBlockGrid,
    FooterButton,
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
    const employeeRequest = new Get('team').setFilter(filters);

    try {
      const metaSetting = await $xhr.send(metaRequest);
      const employees = await $xhr.send(employeeRequest);
      const { metaTitle, metaDescription, metaKeywords } = metaSetting.data.data.result;

      return {
        metaTitle,
        metaDescription,
        metaKeywords,
        items: employees.data.data.result,
      };
    } catch (e) {
      console.error(e);
    }
  },

  data: () => ({
    console,
    items: null,
    page: {
      menuBack: false,
      footerBack: false,
    },
    angularBlock: {
      areaClass: 'main-title team-title',
      sawBottom: true,
    },
    pageTitle: {
      title: 'Команда',
    },
    textBlockHeader: {
      textClass: 'text-center',
      text: '<p>Индивидуальная информационная система — сложный продукт. Каждая его часть и этап разрабатываются профильными специалистами. Нацеленность на общий результат команды помогает обеспечить высокое качество системы и слаженность ее работы.</p>',
    },
    textBlockFooter: {
      textClass: 'text-center',
      text: '<p>Люди — высшая ценность для нас. За многие годы в нашем коллективе сложился комфортный социально-психологический климат, который основан на взаимоуважении и дружбе. Мы обеспечиваем команду интересной деловой средой, а также поощряем людей к личностному развитию и самосовершенствованию. Предлагаем вам ознакомиться с нашими открытыми вакансиями. Быть может, вы — именно тот талантливый специалист, которого мы ищем!</p>',
    },
    sectionTitleData: {
      areaClass: 'max-width-18',
      title: 'Станьте частью нашей команды',
    },
    infoBlockGridData: {
      gridClass: 'team-step',
      column: '4', // Количество столбцов
      gap: '73', // Расстояние между столбцами
    },
    footerButtonData: {
      name: 'Посмотреть вакансии',
      link: '/vacancy',
    },
  }),

  methods: {
    clickHandler() {
      this.$router.push({ path: '/vacancy' });
    },
  },
};
</script>
