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
    <SectionTitle :data="SectionTitle_1"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_2"/>
    <TextBlock :data="TextBlock_1"/>
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_3"/>
    <PortCascade :data="PortCascade_1"/>
    <SectionTitle :data="SectionTitle_4"/>
    <TextBlock :data="TextBlock_2"/>
    <PortFullImg :data="PortFullImg"/>

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
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';
import PortFullImg from '~/components/common/PortFullImg';

const projectTitle = 'Компания КотоЧист';
const projectImgFolder = '/img/portfolioItems/kotochist';

export default {
  name: 'Kotochist',

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
    PortLineTreeImg,
    InfoBlockFlex,
    PortStatItem,
    PortFullImg,
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
        text: '<p>Разработка сайта, CRM-система</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.svg`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>КотоЧист — новая на рынке зоотоваров компания, производящая экологичный наполнитель для кошачьего туалета. От других данную компанию отличает наличие собственного производства, обеспечивающего высокое качество продукции, а также удержание демократичных цен для потребителя. И в дополнение к этому серьезный подход к развитию своего бренда.</p>',
      },

      PortTopPreview: {
        alt: projectTitle,
        srcDesk: {
          img: `${projectImgFolder}/top_back.jpg`,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: `${projectImgFolder}/top_phone.jpg`,
          action: 'adaptiveResizeMax',
          width: 195,
        },
      },
      SectionTitle_0: {
        title: 'О проекте',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>КотоЧист выбрал наиболее эффективный метод развития своего бизнеса, который представляет собой комплексный подход к созданию имиджа и продвижению нового бренда на рынке, включающий в себя создание сайта, дизайн упаковки и рекламную кампанию.</p>',
      },
      SectionTitle_1: {
        title: 'Что клиент получил',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Дизайн с нуля</span><br>Разработана айдентика, фирменный стиль, упаковка продукции и сопутствующая полиграфия',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Создание сайта</span><br>Разработан сайт, на котором предоставлена информация о бренде и производимой продукции',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Маркетинговая кампания</span><br>Запущены рекламные кампании в социальных сетях и на рекламных площадках',
        },
      ],
      PortCascade_0: {
        images: [
          {
            src: `${projectImgFolder}/cad_1.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_2.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        text: '<p>Дизайн сайта выполнен в минималистичном, но ярком и запоминающимся стиле, подходящем под целевую аудиторию покупателей.</p><p>Кроме того, стиль сайта перекликается с дизайном упаковки, которая будет узнаваема и заметна в розничных торговых точках среди остальных товаров других марок.</p>',
      },
      SectionTitle_2: {
        title: 'Адаптивная верстка',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Сайт обладает адаптивной версткой, таким образом, при переходе с любых устройств сайт отображается корректно и удобен для любого пользователя, с какого бы девайса тот не зашел (ПК, мобильный телефон или планшет).</p>',
      },
      PortLineTreeImg: {
        images: [
          {
            src: `${projectImgFolder}/line_1.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
          {
            src: `${projectImgFolder}/line_2.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
          {
            src: `${projectImgFolder}/line_3.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
        ],
      },
      SectionTitle_3: {
        title: 'Основная цель',
      },
      PortCascade_1: {
        images: [
          {
            src: `${projectImgFolder}/cad_3.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_4.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        revers: true,
        text: '<p>Основная цель проекта — привлечь потенциальных партнеров, а именно владельцев зоомагазинов, для оптовых продаж и дальнейшего сбыта продукции.</p><p>Поэтому на сайте размещена вся необходимая информация для повышения лояльности и заинтересованности покупателей: подробное описание производства, сертификаты качества и контактная информация.</p>',
      },
      SectionTitle_4: {
        title: 'Дизайн',
      },
      TextBlock_2: {
        areaClass: 'port-text',
        text: '<p>Мы постарались подойти к дизайну с креативом, чтобы упаковка товара была заметной среди других наполнителей на полках магазинов. Вместо использования стандартных решений сделали нечто забавное и цепляющее взгляд за счет яркого цвета и изображения с необычным котом. Это решение помогает выделить товар среди прочих и, тем самым, повысить спрос у рядовых потребителей, а следовательно, и заинтересованность оптовых покупателей в данном товаре.</p>',
      },
      PortFullImg: {
        src: `${projectImgFolder}/img_0.jpg`,
        alt: projectTitle,
        action: 'adaptiveResizeMax',
        width: '1140',
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
