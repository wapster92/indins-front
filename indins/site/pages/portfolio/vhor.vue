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
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_1"/>
    <PortCascade :data="PortCascade_1"/>
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
import PortCascade from '~/components/common/PortCascade';
import QuotationBlock from '~/components/common/QuotationBlock';

const projectTitle = 'Бизнес-тренер Всеволод Хорунжий';
const projectImgFolder = '/img/portfolioItems/vhor';

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
      // text: '<p>Разработка сайта</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        srcClass: 'port-vhor',
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Всеволод Хорунжий — эксперт публичных выступлений, бизнес-тренер, эксперт бизнес-школы. Его сайт, представляющий собой визитную карточку, был создан в 2013 году. На сайте размещена информация о деятельности бизнес-тренера.</p>',
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
        title: 'Адаптивная верстка',
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
        text: '<p>Страницы сайта имеют адаптивную верстку, позволяя знакомиться с информацией с любого типа устройств и повышая конверсию сайта при просмотре с мобильных устройств.</p>',
      },
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
        text: '<p>Для сайта разработана индивидуальная система управления контентом, позволяющая изменять информацию на сайте без наличия специальных знаний.</p>',
      },
      AngularBlock_0: {
        areaClass: 'port-quotation',
      },
      QuotationBlock: {
        video: true,
        youtubeID: 'VTz9Met5M40',
        text: '<p>Я очень ценю клиентоориентированность. И здесь я, как клиент, получил и внимание, и уважение, и, главное, качественное исполнение заказа.</p><p class="quot-signature">Всеволод Хорунжий,<br>бизнес-тренер</p>',
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

      // const description = 'Разработка сайта с целью позиционирования и публикации материалов по программам обучения бизнес-тренера Всеволода Хорунжего.';
      // const keywords = 'Хорунжий, сайт, разработка';

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
