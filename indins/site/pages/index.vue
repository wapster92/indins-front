<template>
  <div>
    <InfoBlockGrid :data="infoBlockGrid">
      <InfoBlockSpriteList
        v-for="(item, key) in infoBlockList"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <AngularBlock class="main-page-info-block">
      <PageTitle :data="{title: 'ИНДИНС — разработка информационных систем', titleClass: 'page-title-semi'}"/>
      <TextBlock :data="TextBlock_0"/>
    </AngularBlock>
    <!--<SectionTitle :data="{title: 'Решения для автоматизации бизнеса'}"/>
    <InfoBlockGrid :data="infoBlockGrid_0">
      <InfoBlockSmallIcons
        v-for="(item, key) in infoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>-->
    <SectionTitle :data="{title: 'Портфолио'}"/>
    <LazyHydrate
      v-if="viewPort >= 599"
      when-visible
    >
      <PortfolioGrid
        class="main-page"
      >
        <PortfolioTile
          v-for="(item, index) in computedItems"
          :key="item.url + index"
          :value="item"
        />
      </PortfolioGrid>
    </LazyHydrate>

    <MoreProjectButton
      :data="btnData"
    />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import { Get, Filter } from 'core-xhr';
import InfoBlockGrid from '@/components/common/UI/InfoBlockGrid';
import InfoBlockSpriteList from '@/components/common/UI/InfoBlockSpriteList';
import SectionTitle from '@/components/common/UI/SectionTitle';
import TextBlock from '@/components/common/UI/TextBlock';
import PageTitle from '@/components/common/UI/PageTitle';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import portfolioGrid from '../mixins/portfolioGrid';
import AngularBlock from '~/components/common/AngularBlock';
import { portfolioTileData } from '~/constants';
import MoreProjectButton from '~/components/common/MoreProjectButton';
import InfoBlockSmallIcons from '~/components/common/UI/InfoBlockSmallIcons';

export default {
  name: 'Index',

  components: {
    PageTitle,
    InfoBlockSmallIcons,
    InfoBlockGrid,
    InfoBlockSpriteList,
    AngularBlock,
    PortfolioGrid: () => import('~/components/pages/portfolio/PortfolioGrid'),
    PortfolioTile: () => import('~/components/pages/portfolio/PortfolioTile'),
    MoreProjectButton,
    LazyHydrate,
    SectionTitle,
    TextBlock,
  },

  mixins: [
    meta,
    checkMenu,
    portfolioGrid,
  ],

  async asyncData({ app: { $xhr }, route }) {
    const filters = [
      new Filter('deletedAt', 'exists', false),
      new Filter('isActive', 'bool', true),
      new Filter('isShowOnMain', 'bool', true),
    ];
    const projectRequest = new Get('project').collection().setFilter(filters).addOrder('sort', 'DESC');
    const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', route.path));

    try {
      const metaData = await $xhr.send(metaRequest)
        .then(res => res.data.data.result);
      const projects = await $xhr.send(projectRequest)
        .then(res => res.data.data.result);
      let metaResults = {};
      if (metaData.id) {
        metaResults = { ...metaData };
      }
      return {
        ...metaResults,
        items: projects,
      };
    } catch (e) {
      console.error(e);
    }
  },

  data: () => ({
    items: null,
    page: {
      menuBack: false,
      footerBack: false,
    },
    angularBlock: {
      areaClass: 'portfolio-angular-area',
      sawTop: true,
      sawBottom: true,
    },
    btnData: {
      text: 'Портфолио',
      url: '/portfolio',
    },
    viewPort: 0,
    infoBlockGrid: {
      column: '3',
      gap: '75',
    },

    infoBlockList: [
      {
        title: 'Автоматизация бизнеса',
        text: 'Разработка индивидуальных CRM, XRM и ERP-систем для автоматизации бизнеса',
        iconName: 'man_v2',
        link: '/automation',
      },
      {
        title: 'Привлечение клиентов',
        text: 'Сайты и система сквозной аналитики, проведение рекламных кампаний',
        iconName: 'clients',
        link: '/customers',
      },
      {
        title: 'Разработка <br> ПО',
        text: 'Программные решения и приложения для точечного решения бизнес-задач',
        iconName: 'code',
        link: '/razrabotka-programmnogo-obespechenia',
      },
    ],

    infoBlockGrid_0: {
      column: '4',
      gap: '15',
    },

    infoBlockList_0: [
      {
        text: 'Телеграм бот',
        iconName: 'telegram',
      },
      {
        text: 'API интеграция',
        iconName: 'api',
      },
      {
        text: 'Интернет эквайринг',
        iconName: 'money',
      },
      {
        text: 'Генератор документов',
        iconName: 'generate',
      },
      {
        text: 'Проектирование <br> системы',
        iconName: 'proekt',
      },
      {
        text: 'Экспертное <br> сопровождение',
        iconName: 'ekspert',
      },
      {
        text: 'Интеграция с 1С',
        iconName: 'ic',
      },
      {
        text: 'Составление ТЗ',
        iconName: 'tz',
      },
    ],

    TextBlock_0: {
      // areaClass: 'text-center',
      text: '<p>Компания ИНДИНС занимается разработкой информационных систем для автоматизации бизнес-процессов. Каждая спроектированная, разработанная и внедренная информационная система делает ваш бизнес эффективнее, снижает издержки, позволяет сотрудникам тратить меньше времени на рутину и быть более эффективными для компании. \n'
          + 'Мы постоянно занимаемся развитием методологии ведения проектов и совершенствуем подходы, чтобы всегда решать поставленные задачи качественно и делать это в запланированный срок.</p>',
    },
  }),

  computed: {
    computedItems() {
      if (!this.items) {
        return [];
      }

      const arr = this.items.slice(0, 12);

      return arr.reduce((acc, item, index) => {
        // const tags = item.tags.map(tag => tag.name);

        // if (!this.activeFilters?.size || tags.some(tag => this.activeFilters.has(tag))) {

        if (index === 9) {
          // console.log(item);
          acc.push({
            ...item,
            ...portfolioTileData[item.url],
            styles: this.getStyle(1),
          });
          return acc;
        }

        acc.push({
          ...item,
          ...portfolioTileData[item.url],
          styles: this.getStyle(index),
          // tags,
        });

        // }

        if (index === 11) {
          acc.push({
            url: 'to-project',
            tileTag: 'Портфолио',
            ...portfolioTileData['to-project'],
            styles: this.getStyle(1),
          });
        }

        return acc;
      }, []);
    },
  },

  mounted() {
    this.viewPort = window.innerWidth;
    window.addEventListener('resize', () => {
      this.viewPort = window.innerWidth;
    });
  },
};
</script>
