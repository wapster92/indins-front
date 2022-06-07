<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock2"/>
    </AngularBlock>
    <PortTopPreview :data="PortTopPreview"/>
    <SectionTitle :data="SectionTitle_0"/>
    <TextBlock :data="TextBlock_0"/>
    <PortCascade :data="PortCascade_0"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_1"/>
    <PortCascade :data="PortCascade_1"/>
    <SectionTitle :data="SectionTitle_2"/>
    <TextBlock :data="TextBlock_1"/>
    <InfoBlockFlex :data="InfoBlockFlex_0">
      <PortStatItem
        v-for="(item, key) in PortStatItemList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockFlex>
    <PortFooter :data="PortFooter"/>
  </div>
</template>

<script>
import { Simple } from 'core-xhr';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import AngularBlock from '~/components/common/AngularBlock';
import PageTitle from '~/components/common/UI/PageTitle';
import TextBlock from '~/components/common/UI/TextBlock';
import PortLogo from '~/components/common/PortLogo';
import PortTopPreview from '~/components/common/PortTopPreview';
import PortFooter from '~/components/common/PortFooter';
import SectionTitle from '~/components/common/UI/SectionTitle';
import PortCascade from '~/components/common/PortCascade';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';

const projectTitle = 'Сервисный центр Ремтех';
const projectImgFolder = '/img/portfolioItems/remtech';

export default {
  components: {
    AngularBlock,
    PageTitle,
    TextBlock,
    PortLogo,
    PortTopPreview,
    PortFooter,
    SectionTitle,
    PortCascade,
    InfoBlockGrid,
    InfoBlockItem,
    InfoBlockFlex,
    PortStatItem,
  },

  mixins: [
    meta,
    checkMenu,
  ],

  data() {
    return {
      page: {
        menuBack: false,
        footerBack: false,
      },
      angularBlock: {
        areaClass: 'main-title team-title',
        sawBottom: true,
      },
      pageTitle: {
        title: projectTitle,
      },
      TextBlock: {
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: '<p>Разработка сайта, маркетинг</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Компания имела производственные мощности по ремонту электроники, но полностью отсутствовал блок по генерации потока клиентов. Не было сайта, бренда и рекламы. Совместно с заказчиком был спланирован и реализован комплекс работ по генерации потока клиентов. Было создано все: от названия организации до рекламных кампаний.</p>',
      },

      PortTopPreview: {
        alt: projectTitle,
        srcDesk: {
          img: `${projectImgFolder}/top_back.png`,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: `${projectImgFolder}/top_phone.png`,
          action: 'adaptiveResizeMax',
          width: 195,
        },
      },
      SectionTitle_0: {
        title: 'Сайт',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Сайт создан по принципу связанных элементов. Это помогло увеличить глубину и время просмотров и напрямую повлияло на увеличеие  конверсии. Точки входа на сайт разделены на три направления: бренды, устройства и проблемы. Это позволило настроить рекламные кампании на целевые страницы исходя из рекламных запросов, например, «ремонт iphone», «ремонт ноутбука», «замена экрана на телефоне».</p>',
      },
      PortCascade_0: {
        images: [
          {
            src: `${projectImgFolder}/cad_1.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_2.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        text: '<p>Структура сайта спроектирована так, чтобы автоматически создавать страницы пересечения устройств и брендов. Это позволило автоматически генерировать целевые страницы для таких запросов, как:</p><p>«замена экрана на iphone»;<br>«ремонт ноутбука lenovo»;<br>«не работает микрофон на телефоне sony».</p>',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Подход дал результаты при проведении рекламных кампаний. Сгенерированные страницы были наполнены уникальным контентом.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Это обеспечило высокий уровень индексации, высокие позиции сайта в поисковых системах и дало органический трафик.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Логика поведения пользователя на сайте строится из возможности прийти к целевой странице через тип и бренд устройства.',
        },
      ],
      SectionTitle_1: {
        title: 'Система управления и автоматизация',
      },
      PortCascade_1: {
        images: [
          {
            src: `${projectImgFolder}/cad_3.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_4.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        revers: true,
        text: '<p>Разработана индивидуальная система управления контентом, позволяющая изменять информацию на сайте без наличия специальных знаний.</p><p>Стоимость разного типа ремонта находятся в централизованном справочнике. Достаточно заполнить цены для брендов и типов устройств, и эти позиции автоматически появляются на сайте в соответствующих разделах.</p>',
      },
      SectionTitle_2: {
        title: 'Реклама',
      },
      TextBlock_1: {
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: '<p>В рамках проведения рекламных кампаний генерировался трафик в количестве:</p>',
      },
      InfoBlockFlex_0: {
        column: '4',
        gap: '15',
      },
      PortStatItemList_1: [
        {
          title: '30',
          under: 'звонков в сутки',
        },
        {
          title: '254&nbsp;рубля',
          under: 'стоимость обращения',
        },
        {
          title: '986&nbsp;рублей',
          under: 'стоимость клиента',
        },
      ],
    };
  },
  computed: {
    PortFooter() {
      if (!this.portFooterUrl || !this.portFooterUrl.match(/:\/\/\w*[.]\w*/)) return {};
      const name = this.portFooterUrl.match(/:\/\/.*[.]\w*\/?/)[0].split('//')[1].split('/')[0];
      return {
        name,
        link: this.portFooterUrl,
      };
    },
  },

  async asyncData({ app: { $xhr }, route, error }) {
    const url = route.path.split('/')[2];
    const metaRequest = new Simple(`/api/project/meta-data/${url}`);
    try {
      const metaData = await $xhr.send(metaRequest)
        .then(res => res.data.data);

      if (metaData.deletedAt !== null) {
        return error({ statusCode: 404 });
      }

      // const description = 'Комплексный проект по привлечению клиентов в сервисный центр по ремонту телефонов планшетов и ноутбуков. Разработка бренда, названия компании, логотипа, стиля, сайта, рекламных кампаний, подключение телефонии и коллтрекинга.';
      // const keywords = 'сервис, техника, сайт, реклама';

      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },

  mounted() {
  // this.PortFooter.prev = `portfolio-${this.$store.getters['projects/getPrevLink'](this.$route.path)}`;
  // this.PortFooter.next = `portfolio-${this.$store.getters['projects/getNextLink'](this.$route.path)}`;
  },
};
</script>
