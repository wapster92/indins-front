<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <SectionTitle
        :data="sectionTitle"
        class="crm-page"
      />
      <InfoBlockGrid :data="infoBlockGrid">
        <InfoBlockItem
          v-for="(item, key) in infoBlockList"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <QuotationBlock :data="quotationBlock"/>
    <InfoBlockGrid :data="infoBlockGridCrmInclude">
      <InfoBlockItem
        v-for="(item, key) in infoBlockListCrmInclude"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <AngularBlock>
      <SectionTitle :data="sectionTitleActual"/>
      <InfoBlockGrid :data="infoBlockGridActual">
        <InfoBlockItem
          v-for="(item, key) in infoBlockListActual"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <SectionTitle :data="sectionTitleAdvantage"/>
    <!--    <AccordionSimple :data="accordionAdvantage">-->
    <InfoBlockGrid :data="infoBlockGridAdvantage">
      <InfoBlockItem
        v-for="(item, key) in infoBlockListAdvantage"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <!--    </AccordionSimple>-->
    <HorizonList :data="horizonList"/>
    <SectionTitle :data="sectionTitleBegin"/>
    <PortOrder :data="beginBlock"/>
    <FormBlock/>
    <PresentationBlock/>
    <SectionTitle :data="sectionTitleProject"/>
    <SliderBlock :tags="projectListTags"/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import PortOrder from '@/components/common/PortOrder';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import SectionTitle from '~/components/common/UI/SectionTitle';
import AngularBlock from '~/components/common/AngularBlock';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import QuotationBlock from '~/components/common/QuotationBlock';
// import AccordionSimple from '~/components/common/UI/AccordionSimple';
import HorizonList from '~/components/common/UI/HorizonList';
import SliderBlock from '~/components/common/SliderBlock';
import PresentationBlock from '~/components/common/PresentationBlock';
import FormBlock from '~/components/forms/FormBlock';

export default {
  name: 'Crm',

  components: {
    PageTitle,
    AngularBlock,
    SectionTitle,
    InfoBlockGrid,
    InfoBlockItem,
    QuotationBlock,
    PresentationBlock,
    // AccordionSimple,
    FormBlock,
    PortOrder,
    HorizonList,
    SliderBlock,
  },

  mixins: [
    meta,
    checkMenu,
  ],

  async asyncData({ app: { $xhr }, route }) {
    const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', route.path));
    try {
      const metaData = await $xhr.send(metaRequest)
        .then(res => res.data.data.result);

      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },

  data: () => ({
    page: {
      menuBack: false,
      footerBack: true,
    },

    angularBlock: {
      areaClass: 'main-title',
      sawBottom: true,
    },

    pageTitle: {
      title: 'Разработка CRM-системы',
    },

    sectionTitle: {
      title: 'Разработанная CRM-система включает в себя:',
      titleClass: 'text-thin',
    },

    infoBlockGrid: {
      column: '4', // Количество столбцов
      gap: '75', // Расстояние между столбцами
    },

    infoBlockList: [
      {
        text: 'Все процессы ведения клиента и сделок в одной системе',
        iconName: 'generate',
      },
      {
        text: 'Ускорение и повышение эффективности процессов работы менеджеров',
        iconName: 'customer',
      },
      {
        text: 'Индивидуальный функционал в соответствии с процессами отдела продаж',
        iconName: 'make',
      },
      {
        text: 'Аналитика по важным вам метрикам и KPI, оценка эффективности отдела',
        iconName: 'process',
      },
    ],

    quotationBlock: {
      text: '<p>CRM-система — это программный продукт, призванный повысить эффективность отдела продаж за счет оцифровки и фиксации процессов, связанных с ведением клиентом и заказов. CRM-система может быть интегрирована с внешними системами, например бухгалтерией, для отслеживания поступления оплат или наличия товара на складе. Система может оптимизировать процессы документооборота, автоматически генерировать комплекты документов, составлять коммерческие предложения по алгоритмам расчета и выводить КП, оформленные в стиле организации. Может быть интегрирована с существующей телефонией или могут использоваться наши ВАТС.</p><p>Основной функцией CRM-систем является ведение сделок по воронке продаж и фиксация всех взаимодействий с клиентами, таких как звонки, письма, встречи. Составление и ведение плана работы. Не должен быть забыт ни один контакт с клиентом.</p><p>Разработка собственной системы подходит компаниям, уже пробовавшим шаблонные системы и сделавшим вывод о том, что простейший функционал и стандартные механизмы недостаточны, нужна кастомизация, изменения под требования компании. Когда функционала просто движения по воронке сделки недостаточно и необходим генератор КП, связь с 1С, генерация документов, которые очень значительно сокращают рутинные процессы менеджеров.</p><p>Выбор разработки собственного функционала против шаблонных систем – решение для развивающейся компании и дальновидного руководителя, умеющего оценивать эффективность инструментов.</p><p>Система полностью индивидуальна и строится под организацию. Может дорабатываться и дополняться новыми модулями. Некоторые из возможностей CRM-системы:</p>',
    },

    infoBlockGridCrmInclude: {
      column: '4', // Количество столбцов
      gap: '75', // Расстояние между столбцами
    },

    infoBlockListCrmInclude: [
      {
        text: 'Сквозная аналитика от обращения через сайт или по телефону, до закрытия сделки',
        textClass: 'text-primary text-center-xs',
        iconName: 'ticks',
      },
      {
        text: 'Полный контроль менеджера за своими клиентами и сделками, руководителя за работой отдела',
        textClass: 'text-primary text-center-xs',
        iconName: 'ticks',
      },
      {
        text: 'Оценка работы менеджеров по KPI, автоматизация расчета зарплат менеджеров по любым показателям',
        textClass: 'text-primary text-center-xs',
        iconName: 'ticks',
      },
      {
        text: 'Генерация договоров, счетов, коммерческих предложений, автоматическая отправка клиентам',
        textClass: 'text-primary text-center-xs',
        iconName: 'ticks',
      },
    ],

    sectionTitleActual: {
      title: 'Для вас это актуально, если вы:',
    },

    infoBlockGridActual: {
      gridClass: 'flex-grid',
      column: '3',
    },

    infoBlockListActual: [
      {
        areaClass: 'flex-item',
        text: 'вручную выполняете процессы учета поставщиков, заказов, финансовой аналитики',
        textClass: 'text-center',
        iconName: 'processes',
      },
      {
        areaClass: 'flex-item',
        text: 'пользуетесь информационными системами: сайт, CRM, телефония, но данные находятся в разных системах',
        textClass: 'text-center',
        iconName: 'systems',
      },
      {
        areaClass: 'flex-item',
        text: 'платите за лицензии поставщиков услуг по автоматизации вашего бизнеса',
        textClass: 'text-center',
        iconName: 'paper',
      },
      {
        areaClass: 'flex-item',
        text: 'используете шаблонные системы, но вас что-то не устраивает',
        textClass: 'text-center',
        iconName: 'copy',
      },
      {
        areaClass: 'flex-item',
        text: 'храните базу данных клиентов на сторонних серверах и сервисах',
        textClass: 'text-center',
        iconName: 'clouds',
      },
    ],

    sectionTitleAdvantage: {
      areaClass: 'max-width-18',
      title: 'Преимущества разработки собственной CRM-системы',
    },

    accordionAdvantage: {
      headerClass: 'nav-solo',
      arrowNameClose: 'Скрыть',
      arrowNameOpen: 'Показать',
    },

    infoBlockGridAdvantage: {
      column: '3', // Количество столбцов
      gap: '50', // Расстояние между столбцами
    },

    infoBlockListAdvantage: [
      {
        areaClass: 'narrow-left',
        text: 'система строится под ваши процессы, а не устанавливает свои',
        iconName: 'icon-left plus',
      },
      {
        areaClass: 'narrow-left',
        text: 'действия сотрудников организации находятся в единой системе',
        iconName: 'icon-left plus',
      },
      {
        areaClass: 'narrow-left',
        text: 'экран руководителя делается индивидуально и показывает важные для вас метрики эффективности',
        iconName: 'icon-left plus',
      },
      {
        areaClass: 'narrow-left',
        text: 'сквозная аналитика, начиная с обратного звонка до формирования заказа, производства продукта и расчета ROI',
        iconName: 'icon-left plus',
      },
      {
        areaClass: 'narrow-left',
        text: 'данные клиентов и процессов организации находятся на изолированном сервере, а не в базах поставщиков услуг',
        iconName: 'icon-left plus',
      },
      {
        areaClass: 'narrow-left',
        text: 'никаких оплат и ежемесячных трат за ведение, лицензии, количество пользователей — продукт принадлежит вам',
        iconName: 'icon-left plus',
      },
    ],

    horizonList: {
      title: 'Свойства системы',
      items: [
        {
          areaClass: '',
          title: 'Распределенный доступ сотрудников',
          titleRight: 'Распределенный доступ сотрудников',
          titleClass: '',
          text: '<p>У&nbsp;сотрудника есть доступ в&nbsp;систему, где он&nbsp;выполняет различные роли: например, работа с&nbsp;клиентами, с&nbsp;поставщиками, с&nbsp;отчетной статистикой. Роли соответствуют функциям в&nbsp;бизнесе.</p>',
          textClass: '',
          icon: '/img/InfoIcons/icon_generate.svg',
        },
        {
          areaClass: '',
          title: 'Доступ с&nbsp;компьютера, планшета и&nbsp;телефона',
          titleRight: 'Доступ с&nbsp;компьютера, планшета и&nbsp;телефона',
          titleClass: '',
          text: '<p>Благодаря адаптивной верстке с&nbsp;системой удобно работать на&nbsp;любом устройстве. Для&nbsp;работы нужен только браузер.</p>',
          textClass: '',
          icon: '/img/InfoIcons/icon_complex.svg',
        },
        {
          areaClass: '',
          title: 'Удобство выполнения задач',
          titleRight: 'Удобство выполнения задач',
          titleClass: '',
          text: '<p>Вы&nbsp;сами выбираете, как&nbsp;будет выглядеть интерфейс. Он&nbsp;проектируется индивидуально, исходя из&nbsp;ваших потребностей. Это&nbsp;обеспечивает удобство выполнения задач.</p>',
          textClass: '',
          icon: '/img/InfoIcons/icon_process.svg',
        },
        {
          areaClass: '',
          title: 'Работа только с&nbsp;необходимой информацией',
          titleRight: 'Работа только с&nbsp;необходимой информацией',
          titleClass: '',
          text: '<p>В&nbsp;шаблонных системах большая часть функционала не&nbsp;нужна, и&nbsp;для&nbsp;получения результата выполняется много действий. Мы&nbsp;проектируем систему так, чтобы для&nbsp;выполнения цели нужно было использовать минимальное количество действий.</p>',
          textClass: '',
          icon: '/img/InfoIcons/icon_processy.svg',
        },
        {
          areaClass: '',
          title: 'Экран руководителя',
          titleRight: 'Экран руководителя',
          titleClass: '',
          text: '<p>Вся работа организации на&nbsp;одном или&nbsp;нескольких экранах руководителя в&nbsp;рамках\n                                        одного интерфейса. Эффективность работы компании по&nbsp;важным для руководителя\n                                        метрикам, например эффективность сотрудников, закрытие заказов, отгрузки\n                                        или&nbsp;продажи.</p>',
          textClass: '',
          icon: '/img/InfoIcons/icon_individual.svg',
        },
      ],
    },

    sectionTitleBegin: {
      title: 'Порядок работы',
    },

    beginBlock: {
      items: [
        {
          icon: 'port-order/man',
          title: 'Обращение',
          text: '<p>Вы связываетесь с нами и сообщаете какие бизнес-задачи необходимо решать с помощью информационной системы. Возможно у вас уже есть собственное описание того что требуется.</p>',
        },
        {
          icon: 'port-order/group',
          title: 'Предварительное проектирование',
          text: '<p>Мы встречаемся, формируем и предлагаем техническое видение решения поставленных задач. Определяем предварительную примерную стоимость и сроки проекта.</p>',
        },
        {
          icon: 'port-order/tools',
          title: 'Техническое проектирование',
          text: '<p>Мы выполняем полное техническое проектирование информационной системы, составляем прототипы интерфейсов и техническое задание. Определяем конечную неизменяемую смету и сроки проекта.</p>',
        },
        {
          icon: 'port-order/cloud',
          title: 'Создание информационной системы',
          text: '<p>После оплаты 50% стоимости мы выполняем разработку информационной системы соблюдая все стандарты качества и безопасности, описанные в техническом задании и точно в срок. Тестируем совместно с вами.</p>',
        },
        {
          icon: 'port-order/final',
          title: 'Внедрение',
          text: '<p>Вы принимаете информационную систему, оплачиваете оставшиеся 50%. Мы помогаем с внедрением, сопровождением и дальнейшим развитием системы. При возникновении ошибок, бесплатно устраняем в рамках гарантии.</p>',
        },
      ],
    },

    sectionTitleProject: {
      title: 'Портфолио',
    },

    projectListTags: ['CRM', 'XRM'],
  }),
};
</script>
