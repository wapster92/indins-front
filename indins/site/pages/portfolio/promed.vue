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
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_1"/>
    <InfoBlockFlex :data="InfoBlockFlex_0">
      <PortStatItem
        v-for="(item, key) in PortStatItemList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockFlex>
    <PortFullImg :data="PortFullImg"/>
    <AngularBlock :data="AngularBlock_0">
      <QuotationBlock :data="QuotationBlock"/>
    </AngularBlock>
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
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';
import PortFullImg from '~/components/common/PortFullImg';
import QuotationBlock from '~/components/common/QuotationBlock';

const projectTitle = 'Сеть медицинских центров Промед';
const projectImgFolder = '/img/portfolioItems/promed';

export default {
  components: {
    AngularBlock,
    PageTitle,
    TextBlock,
    PortLogo,
    PortTopPreview,
    PortFooter,
    SectionTitle,
    InfoBlockGrid,
    InfoBlockItem,
    PortLineTreeImg,
    InfoBlockFlex,
    PortStatItem,
    PortFullImg,
    QuotationBlock,
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
        text: '<p>Сеть медицинских центров «Промед Плюс» предлагает консультационные услуги в области травматологии и ортопедии. Врачи Клиники успешно справляются с лечением травм, врожденных нарушений, возрастными заболеваниями опорно-двигательного аппарата. На момент знакомства у клиента был устаревший сайт и отсутствовала какая-либо реклама в интернете. Звонки генерировались агрегатором медицинских услуг в количестве до 300 в месяц по 600 рублей.</p>',
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
        title: 'Было сделано',
      },
      InfoBlockGrid_0: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_0: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Внедрена система аналитики, позволившая вычислить стоимость звонка с сайта.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Запущена реклама в баннерной системе Яндекс с рекордно низкой стоимостью звонка в 127 рублей.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Запущены рекламные кампании в Google Adwords. Это стало значимым источником трафика.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Дальше Google Adwords дополнился поисковой кампанией «только номер телефона».',
        },
      ],
      PortLineTreeImg: {
        images: [
          {
            src: `${projectImgFolder}/line_1.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
          {
            src: `${projectImgFolder}/line_2.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
          {
            src: `${projectImgFolder}/line_3.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
        ],
      },
      SectionTitle_1: {
        title: 'Результат работы в цифрах',
      },
      InfoBlockFlex_0: {
        column: '4',
        gap: '15',
      },
      PortStatItemList_1: [
        {
          title: '142&nbsp;067',
          under: 'посетителей сайта',
        },
        {
          title: '2:14&nbsp;мин.',
          under: 'среднее время нахождения на&nbsp;сайтее',
        },
        {
          title: '18,7&nbsp;%',
          under: 'средняя конверсия в&nbsp;звонки',
        },
        {
          title: '243&nbsp;руб.',
          under: 'средняя стоимость звонка',
        },
      ],
      PortFullImg: {
        src: `${projectImgFolder}/img_2.jpg`,
        alt: projectTitle,
        action: 'adaptiveResizeMax',
        width: '1140',
      },
      AngularBlock_0: {
        areaClass: 'port-quotation',
      },
      QuotationBlock: {
        video: true,
        youtubeID: '_yynvEvHmQ0',
        img: '',
        alt: '',
        text: '<p>Отзыв о компании ИНДИНС от сети клиник Промед</p>',
      },
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

      // const description = 'Разработка сайта и ведение рекламных кампаний, комплексная работа по привлечению клиентов в медицинские клиники и на услуги МРТ. Реклама медицинских клиеник и медицинских услуг.';
      // const keywords = 'медицина, клиника, реклама, кейс, проект, портфолио'

      return { ...metaData };
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
