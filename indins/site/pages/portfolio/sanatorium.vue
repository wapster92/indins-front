<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock_0"/>
      <TextBlock :data="TextBlock_0_1"/>
      <SectionTitle :data="SectionTitle_5"/>
      <InfoBlockGrid :data="InfoBlockGrid_3">
        <InfoBlockItem
          v-for="(item, key) in InfoBlockList_3"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
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
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock_1"/>
    <SectionTitle :data="SectionTitle_2"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_3"/>
    <TextBlock :data="TextBlock_3"/>
    <InfoBlockGrid :data="InfoBlockGrid_2">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_2"
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
const projectImgFolder = '/img/portfolioItems/sanatorium';

export default {
  name: 'Sanatorium',

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
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Санаторий имени Н. И. Пирогова Министерства обороны России — одно из ведущих многопрофильных санаторно-курортных учреждений России, осуществляющих медицинскую деятельность по 170 видам услуг.</p>',
      },
      TextBlock_0_1: {
        areaClass: 'port-text',
        text: '<p>Цель проекта: повысить уровень эффективности использования рабочего труда сотрудников с помощью оцифровки и автоматизации учета выполняемых работ.</p>',
      },
      TextBlock_3: {
        areaClass: 'port-text',
        text: '<p>Произведена оцифровка обмена информацией и внедрен учет рабочей нагрузки на всех сотрудников, отделы и подразделения, что позволило:</p>',
      },
      SectionTitle_5: {
        areaClass: 'realized',
        title: 'В проекте реализовано',
      },
      InfoBlockGrid_3: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_3: [
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sanatorium-icon--projects',
          text: 'Раздел проектов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sanatorium-icon--analytics',
          text: 'Аналитика по задачам',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sanatorium-icon--departments',
          text: 'Отделы и подразделения',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sanatorium-icon--issues',
          text: 'Раздел задач',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sanatorium-icon--works',
          text: 'Виды и типы работ',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sanatorium-icon--isolation',
          text: 'Изолированность системы',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sanatorium-icon--gant',
          text: 'Диаграмма Ганта',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sanatorium-icon--plan',
          text: 'План работ',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sanatorium-icon--time',
          text: 'Учет рабочего времени',
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
        title: 'Требования к проекту',
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
        title: 'Какая работа была проделана',
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
        title: 'Функции системы',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Внедрение функционального подхода в рабочий процесс при выполнении как разовых, так и постоянных работ',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Оцифровка информации в задачах, процессах постановки и контроле выполнения разовых работ',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Внедрение учета рабочего времени сотрудников, требуемого на выполнение с разделением на виды выполняемых работ',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Исключение бумажного документооборота, ускорение процессов обмена информацией за счет оцифровки информации',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Получение аналитики о выполнении задач по типам работ, включая регулярно выполняемые функции и разовые задачи',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Получение аналитики о рабочей нагрузке на отделы и подразделения организации',
        },
      ],
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Реализован изолированный контур для ограничения доступа к ИС в рамках инфраструктуры организации в целях обеспечения безопасности',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Организация персонального ограниченного (по ролевой модели) доступа всех сотрудников организации в ИС, система двухфакторной аутентификации',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Разделение работ по типам и видам, в том числе с разделением на разовые и постоянные работы',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Разделение отделов и подразделений в рамках иерархического построения структуры организации',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Распределение видов работ на отделы, к компетенции которых относятся данные виды работ',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Механизм постановки задач по ее типу, автоматически распределяемый нужному отделу для исполнения',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Система подтверждений необходимости выполнения работ руководством отделов и подразделений для своего подразделения',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Механизм работы дежурных сотрудников для выполнения оперативных работ без подтверждения выполнения и распределения руководством',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Контроль выполнения работ с механизмом подтверждения принятия результата работ инициатором задачи',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Анализ выполнения задачи несколькими сотрудниками с учетом трудозатрат каждого сотрудника в отдельности для выполнения задачи',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Создание плана постоянных работ на период времени с учетом требуемых трудозатрат каждого сотрудника по плану',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Раздел аналитики рабочего времени в разрезе типов задач, выполняемых в организации, и процентной нагрузки по отношению к общему объему работ',
        },
      ],
      InfoBlockGrid_2: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_2: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Получить данные для принятия управленческих решений',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Эффективней использовать кадровые ресурсы',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Повысить скорость выполнения работ',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Повысить качество выполнения работ',
        },
      ],

      PortFullImg: {
        src: `${projectImgFolder}/nominations.jpg`,
        alt: projectTitle,
        action: 'adaptiveResizeMax',
        width: '1140',
      },
      SectionTitle_3: {
        title: 'Результат',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Была разработана информационная система, обеспечивающая достижение поставленной цели. Заложен функционал единой ERP-системы управления ресурсами организации.</p>',
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
      // const description = 'Разработка сайта и системы управления данными для архитектороного конкурса Архпроект';
      // const keywords = 'Архпроект, сайт, разработка';

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
