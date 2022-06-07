<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <InfoBlockGrid :data="infoBlockGrid">
        <InfoBlockItem
          v-for="(item, key) in infoBlockList"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <SectionTitle :data="sectionTitleWeDo"/>
    <InfoBlockGrid :data="infoBlockGridWeDo">
      <InfoBlockItem
        v-for="(item, key) in infoBlockListWeDo"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="sectionTitleSupport"/>
    <SliderBlock :tags="projectListTags"/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import AngularBlock from '~/components/common/AngularBlock';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import SectionTitle from '~/components/common/UI/SectionTitle';
import SliderBlock from '~/components/common/SliderBlock';

export default {
  components: {
    PageTitle,
    AngularBlock,
    InfoBlockGrid,
    InfoBlockItem,
    SectionTitle,
    SliderBlock,
  },

  mixins: [
    meta,
    checkMenu,
  ],

  async asyncData({ app: { $xhr }, route }) {
    const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', route.path));
    try {
      const metaData = await $xhr.send(metaRequest)
        .then(res => res.data.data.result);
      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },

  data: () => ({
    page: {
      menuBack: false,
      footerBack: true,
    },

    angularBlock: {
      areaClass: 'main-title',
      sawBottom: true,
    },

    pageTitle: {
      title: 'Поддержка',
    },

    infoBlockGrid: {
      column: '3',
      gap: '75',
    },

    infoBlockList: [
      {
        title: 'Сервис',
        text: 'К Вашим услугам всегда на связи компетентный персональный менеджер. Скорость реакции и выполнения задач — в течение рабочего дня.',
        titleClass: 'text-center',
        iconName: 'processes',
      },
      {
        title: 'Профессионализм',
        text: 'Мы разрабатываем и поддерживаем сайты-визитки и крупные корпоративные порталы, написанные на любых платформах.',
        titleClass: 'text-center',
        iconName: 'systems',
      },
      {
        title: 'Честная цена',
        text: 'Хватит платить просто так. Платите только за выполненные работы как в рамках пакетов, так и за отдельные действия.',
        titleClass: 'text-center',
        iconName: 'paper',
      },
    ],

    sectionTitleWeDo: {
      title: 'Что мы делаем в рамках поддержки',
    },

    infoBlockGridWeDo: {
      column: '3',
      gap: '50',
    },

    infoBlockListWeDo: [
      {
        title: 'Контент',
        text: 'написание, рерайтинг и размещение на сайте контента, текстов, изображений, наполнение каталога товарами, корректировка цен и предложений. Написание SEO, продающих текстов и метаинформации.',
        areaClass: 'narrow-left',
        titleClass: 'small-title',
        iconName: 'icon-left plus',
      },
      {
        title: 'Дизайн',
        text: 'отрисовка и размещение баннеров, изготовление и исправление графических элементов сайта, оформление новых страниц, оформление товарных предложений.',
        areaClass: 'narrow-left',
        titleClass: 'small-title',
        iconName: 'icon-left plus',
      },
      {
        title: 'Программирование',
        text: 'разработка программных разделов и модулей, изменение программной части и логики работы информационных систем и сайтов, написание программного кода.',
        areaClass: 'narrow-left',
        titleClass: 'small-title',
        iconName: 'icon-left plus',
      },
    ],

    sectionTitleSupport: {
      areaClass: 'max-width-18',
      title: 'Мы поддерживаем',
    },

    projectListTags: ['Сайт', 'ERP', 'CRM'],
  }),
};
</script>
