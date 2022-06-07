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
    <TextBlock :data="TextBlock_1"/>
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_2"/>
    <PortCascade :data="PortCascade_1"/>
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

const projectTitle = 'Mедицинский центр СтомаМедСервис';
const projectImgFolder = '/img/portfolioItems/smeds';

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
    PortLineTreeImg,
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
        text: '<p>Разработка сайта, CRM-система, маркетинг</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Многопрофильный медицинский центр «СтомаМедСервис» уже&nbsp;более 20-ти лет оказывает медицинские услуги. Он&nbsp;ведет свою деятельность более чем&nbsp;по 20-ти направлениям и&nbsp;является крупнейшей негосударственной медицинской компанией в&nbsp;Ленинградской области. Для&nbsp;данной компании было необходимо увеличить количество входящих заявок и&nbsp;привести сайт к&nbsp;соответствию требованиям контролирующих органов.</p>',
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
        text: '<p>Для&nbsp;решения поставленной задачи было принято разработать сайт с&nbsp;такой структурой, в&nbsp;которой все разделы связаны между собой перекрестными ссылками (например, Отделения, Услуги, Специалисты и другие). Таким образом, клиенты медицинского центра могут сразу увидеть с&nbsp;каким специалистом предстоит взаимодействовать и&nbsp;узнать информацию о&nbsp;нем. Такой подход увеличил доверие к&nbsp;сайту, что привело к&nbsp;повышению конверсии.</p><p>На&nbsp;данном сайте также реализован такой функционал, как&nbsp;версия для&nbsp;людей с&nbsp;ограничением по&nbsp;зрению.</p>',
      },
      SectionTitle_1: {
        title: 'Call Tracking',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Также в&nbsp;рамках проекта организована система Call&nbsp;Tracking для&nbsp;определения эффективности работы сайта. Эта&nbsp;система взаимодействует по&nbsp;2-м направлениям.</p><p>Первое — все&nbsp;входящие звонки в&nbsp;зависимости от&nbsp;источника отслеживаются и&nbsp;сортируются по&nbsp;каналам и&nbsp;поисковым запросам. Второе — это&nbsp;заказ обратного звонка. Для&nbsp;того, чтобы эффективность заказа обратного звонка была выше, мы&nbsp;установили инициализацию вызова на&nbsp;указанный посетителем номер телефона. То&nbsp;есть после ввода номера телефона в&nbsp;форму заказа звонка и&nbsp;при нажатии на&nbsp;кнопку «Заказать» происходит автоматический вызов оператора Колл-центра, после чего делается вызов на&nbsp;оставленный посетителем номер.</p><p>Такой формат обратной связи работает с&nbsp;9:00&nbsp;до&nbsp;21:00, в&nbsp;часы работы медицинского центра, в&nbsp;остальное время обратный звонок работает традиционным способом, с&nbsp;помощью заявки, приходящей с&nbsp;сайта на&nbsp;электронную почту.</p>',
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
        title: 'SEO',
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
        text: '<p>Уже&nbsp;более 2-х лет мы&nbsp;сотрудничаем с&nbsp;медицинским центром «СтомаМедСервис» и&nbsp;за&nbsp;это&nbsp;время привлекли с&nbsp;помощью рекламы и&nbsp;SEO более 10000 новых клиентов.</p><p>На&nbsp;2018&nbsp;год среднее ежемесячное количество уникальных входящих обращений с&nbsp;сайта&nbsp;430, средняя стоимость обращения 133&nbsp;рубля.</p>',
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

      // const description = 'Разработка комплекса сайтов и проведение рекламных кампаний по направлениям деятельности медицинской организации, включающей диагностику, лечение, стоматологию и центр для пожилых людей.';
      // const keywords = 'медицина, сайт, разработка, реклама';

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
