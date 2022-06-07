<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <SectionTitle :data="sectionTitle"/>
      <InfoBlockGrid :data="infoBlockGridTitle">
        <InfoBlockItem
          v-for="(item, key) in infoBlockListTitle"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <SectionTitle :data="sectionTitleGet"/>
    <InfoBlockGrid :data="infoBlockGridGet">
      <InfoBlockItem
        v-for="(item, key) in infoBlockListGet"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="sectionTitleProject"/>
    <SliderBlock :tags="projectListTags"/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import AngularBlock from '~/components/common/AngularBlock';
import SectionTitle from '~/components/common/UI/SectionTitle';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import SliderBlock from '~/components/common/SliderBlock';

export default {
  name: 'Netadv',

  components: {
    PageTitle,
    AngularBlock,
    SectionTitle,
    InfoBlockGrid,
    InfoBlockItem,
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
      title: 'Интернет-реклама',
    },

    sectionTitle: {
      title: 'Наши задачи',
    },

    infoBlockGridTitle: {
      column: '3', // Количество столбцов
      gap: '75', // Расстояние между столбцами
    },

    infoBlockListTitle: [
      {
        text: 'Выявить наиболее эффективные каналы рекламы. Тестируем, анализируем, выбираем лучшие и усиливаем их.',
        textClass: 'text-center',
        iconName: 'processes',
      },
      {
        text: 'Снизить для Вас стоимость привлечения клиента. Вы получите больше клиентов с тем же бюджетом.',
        textClass: 'text-center',
        iconName: 'systems',
      },
      {
        text: 'Увеличить ROMI, CTR, CR, Traffic, Profit, снизить CPC, CPM, CPL, CPO, CAC, BR, ДРР от Вашей рекламы.',
        textClass: 'text-center',
        iconName: 'paper',
      },
    ],

    sectionTitleGet: {
      title: 'Вы получаете:',
    },

    infoBlockGridGet: {
      column: '4', // Количество столбцов
      gap: '75', // Расстояние между столбцами
    },

    infoBlockListGet: [
      {
        title: 'Фиксированная<br>цена',
        titleClass: 'light-title text-center-xs',
        text: 'наших услуг не зависит от величины бюджета, поэтому мы не заинтересованы склонять вас к его увеличению',
        iconName: 'ticks',
      },
      {
        title: 'Индивидуальная<br>настройка',
        titleClass: 'light-title text-center-xs',
        text: 'работает. Одинаковая настройка по шаблонам «как у всех» провоцирует повышение ставок и увеличивает ваш расход',
        iconName: 'ticks',
      },
      {
        title: 'Регулярная<br>оптимизация',
        titleClass: 'light-title text-center-xs',
        text: 'позволяет ежедневно реагировать на действия конкурентов и восприятие ваших клиентов. Стоимость привлечения клиента регулярно снижается',
        iconName: 'ticks',
      },
      {
        title: 'Прозрачная<br>статистика',
        titleClass: 'light-title text-center-xs',
        text: 'гарантирует достоверность CPC. Мы работаем напрямую с рекламными системами, и в отчетах вы видите действительные конечные расходы',
        iconName: 'ticks',
      },
    ],

    sectionTitleProject: {
      title: 'Портфолио',
    },

    projectListTags: ['Маркетинг'],
  }),
};
</script>
