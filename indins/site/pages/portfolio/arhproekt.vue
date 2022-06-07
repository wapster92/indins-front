<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock2"/>
      <SectionTitle
        :data="SectionTitle_num"
      />
      <InfoBlockGrid
        :data="InfoBlockGrid_num"
      >
        <InfoBlockItem
          v-for="(item, key) in InfoBlockList_num"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <PortTopPreview :data="PortTopPreview"/>
    <SectionTitle :data="SectionTitle_0"/>
    <TextBlock :data="TextBlock_0"/>
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_1"/>
    <PortCascade :data="PortCascade_1"/>
    <SectionTitle :data="SectionTitle_2"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <PortFullImg :data="PortFullImg"/>
    <SectionTitle :data="SectionTitle_3"/>
    <TextBlock :data="TextBlock_1"/>
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_4"/>
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
import SectionTitle from '~/components/common/UI/SectionTitle';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import PortCascade from '~/components/common/PortCascade';
import PortStatItem from '~/components/common/PortStatItem';
import PortFullImg from '~/components/common/PortFullImg';
import PortLogo from '~/components/common/PortLogo';
import PortTopPreview from '~/components/common/PortTopPreview';
import PortFooter from '~/components/common/PortFooter';

const projectTitle = 'Разработка сайта для конкурса архитекторов Архпроект';
const projectImgFolder = '/img/portfolioItems/arhproekt';

export default {
  name: 'Arhproekt',

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
      // text: '<p>Разработка сайта, CRM-система</p>',
      },

      PortLogo: {
        src: `${projectImgFolder}/logo.svg`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Этот проект разрабатывался для нашего постоянного клиента — Группы ЦДС, которая является одной из крупнейших строительных компаний Санкт-Петербурга и входит в список лидеров строительного рынка России. Задача для работы над данным проектом заключалась в переработке сайта “АРХпроект” — всероссийского профессионального конкурса архитектурных и дизайнерских проектов для студентов и молодых архитекторов.</p>',
      },
      SectionTitle_num: {
        areaClass: 'realized',
        title: 'В проекте реализовано',
      },
      InfoBlockGrid_num: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_num: [
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'arh--automation',
          text: 'Автоматизация конкурса',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'arh--exh',
          text: 'Выставка работ участников',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'arh--results',
          text: 'Результаты конкурса',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'arh--participant',
          text: 'Личный кабинет участников',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'arh--mentor',
          text: 'Личный кабинет менторов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'arh--auditorium',
          text: 'Лекторий',
        },
      ],
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
        text: '<p>«АРХпроект» — это ежегодный всероссийский профессиональный конкурс архитектурных и дизайнерских проектов для студентов, учрежденный и организуемый Группой ЦДС. Этот конкурс создан для того, чтобы специалисты данной сферы могли обмениваться своим опытом, обсуждать тренды градостроительства, и, конечно же, получать и дарить вдохновение. Также данное мероприятие призвано послужить дополнительной мотивацией для молодых специалистов и стать отличным стартом в их будущей карьере.</p>',
      },
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
        text: '<p>Кроме простой публикации информации о конкурсе необходимо было ввести учет участников конкурса, его стадии, а также результаты промежуточных этапов отбора. Кроме того, требовалось обеспечить быстрый обмен информацией между участниками и администрацией.</p><p>С 2019 года проекту потребовалось организовать тематический лекторий по архитектуре, урбанистике и дизайну. На старом сайте реализовать такой функционал было невозможно.</p>',
      },
      SectionTitle_1: {
        title: 'Индивидуальный подход',
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
        text: '<p>При реализации проекта мы главным образом опирались на бизнес-задачи клиента. Поэтому было принято решение создать совершенно новый функционал, которого не было в старой версии сайта.</p><p>В итоге мы получили совершенно новый индивидуальный проект, который идеально подходит для решения конкретных потребностей заказчика.</p>',
      },
      SectionTitle_2: {
        title: 'Функционал портала',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Лекторий</span><br>с возможностью записываться через сайт на лекции и отслеживать их график',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Личный кабинет участников</span><br>с возможностью загружать различные виды файлов и редактировать данные',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Личный кабинет менторов</span><br>с функцией выбора работ для наставничества',
        },
      ],
      PortFullImg: {
        src: `${projectImgFolder}/nominations.jpg`,
        alt: projectTitle,
        action: 'adaptiveResizeMax',
        width: '1140',
      },
      SectionTitle_3: {
        title: 'Дизайн',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Для данного сайта было принято решение сделать дизайн, объединяющий два стиля: цветовая гамма проекта в сочетании с отсылкой к корпоративному стилю Группы ЦДС, выраженной через формы элементов интерфейса. В итоге мы получили уникальный дизайн для «Архпроекта», в котором узнается общий стиль Группы ЦДС.</p>',
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
      SectionTitle_4: {
        title: 'Статистика',
      },
      InfoBlockFlex_0: {
        column: '4',
        gap: '15',
      },
      PortStatItemList_1: [
        {
          title: '5,63',
          under: 'глубина просмотра',
          text: '(Яндекс Метрика)',
        },
        {
          title: '4:16',
          under: 'время на сайте',
          text: '(Яндекс Метрика)',
        },
        {
          title: '3,85',
          under: 'глубина просмотра',
          text: '(Google Analytics)',
        },
        {
          title: '3:23',
          under: 'время на сайте',
          text: '(Google Analytics)',
        },
      ],

    };
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
  mounted() {
  // this.PortFooter.prev = `portfolio-${this.$store.getters['projects/getPrevLink'](this.$route.path)}`;
  // this.PortFooter.next = `portfolio-${this.$store.getters['projects/getNextLink'](this.$route.path)}`;
  },
};
</script>
