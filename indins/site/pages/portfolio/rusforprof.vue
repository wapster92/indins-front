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

const projectTitle = 'Организация РОПРЯЛ';
const projectImgFolder = '/img/portfolioItems/rusforprof';

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
        text: '<p>Разработка сайта, CRM-система</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Проект разработан по заказу для РОПРЯЛ (Российское общество преподавателей русского языка и литературы) с целью обеспечения помощи специалистам различных сфер деятельности со всего мира в изучении русского языка как иностранного.</p>',
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
        title: 'Задача',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Основной задачей портала является возможность обмена опытом и конструктивного взаимодействия между вузами России и других стран, компаниями-работодателями, издательствами учебной литературы, национальными объединениями русистов, а также государственными и неправительственными  организациями в области гуманитарного сотрудничества.</p>',
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
        text: '<p>Несмотря на достаточно простую структуру, портал рассчитан на содержание большого объема информации. Для упрощения навигации по многостраничному сайту близкие по смыслу разделы были объединены внутренними ссылками. Так появились контекстные связки: вузы и совместные межвузовские программы, вузы и проекты, специалисты и вузы, и так далее.</p>',
      },
      SectionTitle_1: {
        title: 'Дизайн',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Данный портал также неразрывно связан с деятельностью организации МАПРЯЛ, поэтому решено было использовать акцентирующий синий цвет. Шрифт Lato, выбранный для данного проекта, прекрасно подходит для оформления большого количества текста.</p><p>После выявления точного портрета целевой аудитории и перед отрисовкой финальных макетов страниц портала, был подготовлен интерактивный прототип и проведено его тестирование. Раздел  «Международные мероприятия» является одним из важнейших и сконструирован таким образом, чтобы администратор смог самостоятельно поменять графический стиль страницы, исходя из стиля  мероприятия.</p>',
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
        title: 'Система администрирования',
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
        text: '<p>Проект должен быть удобен в использовании не только со стороны пользователя, но и со стороны сотрудника, управляющего контентом. Индивидуальная разработка позволила создать продукт, который обладает этой отличительной чертой. В интерфейсе администратора предусмотрены только самые востребованные инструменты, поэтому загрузить и обработать контент возможно при минимальном количестве кликов.</p>',
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

      // const description = 'Разработка информационного сайта для общественной организации Российское общество преподавателей русского языка и литературы.';
      // const keywords = 'ропрял, сайт, разработка';

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
