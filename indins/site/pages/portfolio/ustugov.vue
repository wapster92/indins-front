<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
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
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock_1"/>
    <PortLineTreeImg :data="PortLineTreeImg"/>
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
import PortCascade from '~/components/common/PortCascade';
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import QuotationBlock from '~/components/common/QuotationBlock';

const projectTitle = 'Актер Александр Устюгов';
const projectImgFolder = '/img/portfolioItems/ustugov';

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
    PortCascade,
    PortLineTreeImg,
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
        text: '<p>Разработка сайта</p>',
      },
      /* PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      }, */
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Цель проекта: продвижение личного бренда актера, публикация информации о предстоящих мероприятиях актера, за счет бренда личности развитие бренда музыкальной группы с возможностью публикации песен для прослушивания. Требования к сайту: нестандартный подход к дизайну, сочетание информативности и креативности, удобное управление мероприятиями, контентом, музыкой.</p>',
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
        title: 'Дизайн',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary">концепция дизайна</span><br>сайта строилась на статичном положении страницы на весь размер экрана. Пользователю нет нужды листать длинную страницу',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary">все страницы сайта</span><br>по структуре делятся на 2 зоны. Правая — информационная часть (меню, любая текстовая информация). Левая — визуальная часть (фотографии, афиши)',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary">сайт выполнен</span><br>в темных цветах с 2-составной текстурой, что придает мощному черному цвету выразительности',
        },
      ],
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
        text: '<p>Композицию держат описанная выше визуальная сетка и диагональные линии, являющиеся границей текстуры. Внутренняя часть, образованная этими линиями является рабочей зоной, где и размещается информация. Сами линии, благодаря нестандартному положению, добавляют странице динамики.</p><p>Структура сайта состоит из нескольких разделов, каждый из которых отвечает за свою тему и подает информацию в соответствующем виде.</p>',
      },
      SectionTitle_1: {
        title: 'Микроразметка',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Страницы сайта содержат тематическую микроразметку, что особенно актуально для разделов афиши, фильмографии и музыки. Размещаемая информация быстро индексируется поисковыми системами.</p>',
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
      AngularBlock_0: {
        areaClass: 'port-quotation',
      },
      QuotationBlock: {
        video: true,
        youtubeID: 'KfQJraK9aQQ',
        text: '<p>Хочу выразить благодарность компании ИНДИНС за разработку для меня сайта ustugov.ru. Ребята проявили себя как профессионалы, предложили варианты как лучше подать информацию, и всё сделали очень качественно и в срок. Всегда были на связи, изменения и корректировки при запуске делали очень быстро, и сделали больше чем требовалось и планировали изначально. Спасибо за работу.</p><p class="quot-signature">Александр Устюгов<br>актёр, режиссёр, музыкант</p>',
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

      // const description = 'Разработка индивидуального сайта для актера, музыканта и режиссера Александра Сергеевича Устюгова. Размещение информации об актере и музыкальных композиций группы Экибастуз.';
      // const keywords = 'устюгов, разработка, сайт';

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
