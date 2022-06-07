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
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock_1"/>
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_2"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
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
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';

const projectImgFolder = '/img/portfolioItems/fish';
const projectTitle = 'Свежая рыбка';

export default {
  name: 'Fish',
  components: {
    AngularBlock,
    PageTitle,
    TextBlock,
    PortLogo,
    PortTopPreview,
    PortFooter,
    SectionTitle,
    PortCascade,
    PortLineTreeImg,
    InfoBlockGrid,
    InfoBlockItem,
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
        text: '<p>Разработка сайта</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>В феврале к нам обратились представители ООО "АрктикФишТрейд СПБ" с заказом на разработку сайта для уже существующего магазина доставки свежемороженой рыбы. Их товар, как и наш, отличает высокое качество. Цели заказчика: увеличение объема продаж и представительство компании в сети Интернет.</p>',
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
        text: '<p>Низкий ассортимент магазина компенсирован подходами в дизайне. Локомотивом является бренд "Изготовлено в море", на это и сделан упор. Изюминкой является качающийся на волнах корабль и плывущие облака.</p>',
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
        text: '<p>На сайте применено двойное разделение товаров. Товары могут входить сразу в несколько групп: по категориям (филе, морепродукты, икра, стейк) и по тегам (изготовлено в море, детское меню, праздничный стол, ужин за 15 минут)</p><p>На основе связей по категориям на странице каждого товара разработаны блоки “С этим товаром покупают”. Подобные панели на практике увеличивают средний чек на 20%.</p>',
      },
      SectionTitle_1: {
        title: 'Адаптивная верстка',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Сайт подстраивается под различные виды устройств и отображается корректно на всех используемых разрешениях.</p>',
      },
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
      SectionTitle_2: {
        title: 'Наполнение сайта',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Создан раздел "Статьи", написаны три уникальные тематические статьи на темы разделов сайта',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'На главной странице размещен текстовый блок с вступительной информацией о компании в целях SEO',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Создан и размещен уникальный контент для всех товаров, размещенных на сайте',
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
