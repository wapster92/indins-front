<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <TextBlock :data="TextBlock"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock2"/>
    </AngularBlock>
    <PortTopPreview :data="PortTopPreview"/>
    <SectionTitle :data="SectionTitle_0"/>
    <TextBlock :data="TextBlock_0"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <TextBlock :data="TextBlock_0_0"/>
    <TextBlock :data="TextBlock_0_1"/>
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock_1"/>
    <TextBlock :data="TextBlock_1_0"/>
    <SectionTitle :data="SectionTitle_2"/>
    <TextBlock :data="TextBlock_2_0"/>
    <TextBlock :data="TextBlock_2_1"/>
    <TextBlock :data="TextBlock_2_2"/>
    <SectionTitle :data="SectionTitle_3"/>
    <TextBlock :data="TextBlock_3_0"/>
    <TextBlock :data="TextBlock_3_1"/>
    <TextBlock :data="TextBlock_3_2"/>

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

const projectTitle = 'ЦДС «УКиСП» Сервис';
const projectImgFolder = '/img/portfolioItems/ukisp';

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
        text: '<p>XRM-система</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: `<p>УКиСП — управление кредитования и специальных программ. УКиСП Сервис —информационная система для автоматизации деятельности отдела кредитования. Заказчиком данной системы является известный многим застройщик Группа ЦДС. Компания является одним из лидеров в сфере строительства в Северо-Западном регионе. </p>
            <p>Для Группы ЦДС мы реализовали уже несколько проектов, которые автоматизируют деятельность организации. У компании сформирован правильный подход к созданию проектов: заказ у профессиональных компаний информационных систем, которые автоматизируют деятельность определенной группы бизнес-процессов или отделов. Это позволяет компании организовывать свою деятельность таким образом, чтобы бизнес-процессы становились эффективнее.</p>`,
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Разработанная система предназначена для автоматизации получения решений по кредитам. До её внедрения отправка заявок на получение кредита выполнялась вручную, путем сбора документов от клиента, составления бумаг по формам разных банков и в соответствии с требованиями каждого из банков. Это занимало много времени как у сотрудников, так и у клиентов, увеличивало срок принятия решения, а соответственно и сделки. Компанией ЦДС было принято решение автоматизировать этот процесс и сделать его эффективнее.</p>',
      },
      TextBlock_0_0: {
        areaClass: 'port-text',
        text: '<p>Задача была нестандартной и сложной, потому что её решение зависело от других участников и других информационных систем, а именно банков и внутренней системы Группы ЦДС. Необходимо было инкапсулировать процесс работы с кредитами так, чтобы он оставался частью корневого бизнес-процесса компании.</p>',
      },
      TextBlock_0_1: {
        areaClass: 'port-text',
        text: '<p>Основная идея проекта в том, что сотрудники УКиСП работают в отдельной системе, (УКиСП Сервис), куда попадает заявка клиента, который намерен привлечь кредитные средства для покупки. В систему передается вся необходимая информация, дополняется данными для банков и отправляется им для получения одобрений по кредитам в электронном виде. Выполняются действия для оформления кредита, заявка с одобренным кредитом возвращается в корневой бизнес-процесс и основную информационную систему компании.</p>',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Техническая сложность была в том, что каждый банк имеет свои методы интеграции, протоколы обмена данными и свою структуру данных, которую требует предоставлять для обработки. Например, один банк требует предоставлять срок работы на последнем месте в количестве месяцев, другой в годах, третий текстом, а четвертый содержит собственный справочник и если срок от 1 до 3-х лет, то нужно передать единицу. Для решения этой задачи был создан специальный конвертер на шлюзе обмена данными с банками. По причине того, что каждый банк имеет свою спецификацию обмена (один в формате json, другой в xml, а третий требует использовать сертификаты шифрования), для каждого банка был создан отдельный шлюз обмена данными, работающий с уже унифицированными данными из общего шлюза.</p>',
      },
      TextBlock_1_0: {
        areaClass: 'port-text',
        text: '<p>Еще одной проблемой было то, что каждый банк требует свои данные, и, например, двум банкам обязательно нужны скан-копии трудовых книжек, трем другим — СНИЛС, а еще одному — подписанное разрешение на обработку персональных данных. Для оптимизации работы был реализован механизм, при котором менеджер и клиент выбирают банки, в которые будет подана заявка и заполняют только те данные, которые требуются именно для этих банков, чтобы избежать избыточности наполнения и лишней траты времени.</p>',
      },
      TextBlock_2_0: {
        areaClass: 'port-text',
        text: '<p>Для более эффективного распределения времени было реализовано решение, при котором менеджер и клиент могут работать с одними данными. Например, одни данные получены из центральной информационной системы вместе с заявкой, другие заполняет кредитный менеджер вместе с клиентом в офисе или, что сейчас актуально, удаленно. Например, у клиента при себе нет необходимого документа или данных, но он может зайти в свою анкету из дома, прикрепить нужные файлы или данные и проверить уже заполненную информацию.</p>',
      },
      TextBlock_2_1: {
        areaClass: 'port-text',
        text: '<p>Когда данных достаточно для отправки анкеты в один из банков, в этот банк можно отправить анкету нажатием одной кнопки.</p>',
      },
      TextBlock_2_2: {
        areaClass: 'port-text',
        text: '<p>Для банков, в которых нет системы автоматизации с API (интерфейс для обмена информацией) реализована отправка анкеты через e-mail. При создании анкеты менеджер видит, каким образом банк может обмениваться информацией. При отправке по e-mail автоматически формируется письмо со всеми необходимыми данными и отправляется в заранее внесенное в систему отделение банка выбранному специалисту. При этом в системе реализована возможность распознавать ответы банка по почте. В заголовок письма включается номер анкеты, по которой отправлена заявка. Текст письма считывается и анализируется на предмет специальных маркеров и в 80% случаев определяет, положительно или отрицательно банк ответил на анкету.</p>',
      },
      TextBlock_3_0: {
        areaClass: 'port-text',
        text: '<p>Система содержит разветвленную настраиваемую подсистему уведомлений на десятки событий и на несколько каналов получения. Например, каждый менеджер может настроить получение уведомлений на получение новой заявки, получение ответов банков по анкетам, обновление данных клиентом по СМС, e-mail, в телеграм. Специальный телеграм-бот уведомляет руководителей и координаторов о различных ситуациях, например, если менеджер медлит с открытием заявки и взятием её в работу.</p>',
      },
      TextBlock_3_1: {
        areaClass: 'port-text',
        text: '<p>Информационная система содержит более 10 видов отчетов для руководителей, подсистему поиска и решения проблемных технических ситуаций, историю действий, систему напоминаний и задач и еще много индивидуальных «фишек» и полезных функций, которые делают работу отдела и менеджеров проще и эффективнее, экономят время клиентов. Сокращение затрат времени на процесс влияет и на эффективность продаж.</p>',
      },
      TextBlock_3_2: {
        areaClass: 'port-text',
        text: '<p>В итоге получилась достаточно сложная и эффективная система автоматизации работы отдела. Система успешно внедрена и функционирует на благо компании и её клиентов.</p>',
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
        title: 'Цели проекта',
      },
      SectionTitle_2: {
        title: 'Описание проекта',
      },
      SectionTitle_3: {
        title: 'Система',
      },
      InfoBlockGrid_0: {
        column: '2',
        gap: '24',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'ticks',
          text: 'Повышение эффективности работы компании',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'ticks',
          text: 'Сокращение времени на оформление документов',
        },
      ],
      SectionTitle_1: {
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
        text: '<p>Интеграция в&nbsp;информационную инфраструктуру компании;</p><p>Полные права на&nbsp;разработку, отсутствие лицензий, дополнительных оплат и&nbsp;использования продуктов третьих лиц;</p><p>Шифрование обмена сообщениями, хранение информации на&nbsp;внутренних серверах компании;</p><p>Обеспечение поддержки проекта в&nbsp;режиме обращений по&nbsp;требованию в&nbsp;рамках 24/7;</p><p>Гибкая архитектура, позволяющая дополнять систему новыми модулями;</p><p>Логика работы, соответствующая бизнес-процессам компании;</p>',
      },
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Информационная система спроектирована и&nbsp;создана на&nbsp;базе клиент-серверной архитектуры в&nbsp;виде web-сервиса',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Возможность встраивать внешний клиентский диалог на&nbsp;любые сайты и&nbsp;ресурсы компании',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Возможность настраивать поля начала диалога, поля ведения диалога, определять набор данных для начала диалога для различных площадок',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Присвоение операторов к&nbsp;нескольким группам, проверка на&nbsp;спамовые или агентские номера телефонов, классификация входящих сообщений',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Возможность проверки через API наличия в&nbsp;системе номера договора или номера телефона клиента во&nbsp;внутренней базе компании',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Возможность направлять диалоги разных площадок на&nbsp;разные группы операторов, группируя варианты по&nbsp;своему усмотрению',
        },
      ],
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
        text: '<h3>Интерфейс операторов</h3><p>Распределенный по&nbsp;ролям доступ, общая авторизация с&nbsp;внутренней корпоративной системой;</p><p>Разделение операторов на&nbsp;группы и&nbsp;диалоги (соответствие площадкам диалогов и&nbsp;наборам полей);</p><p>Передача диалогов между операторами;</p><p>Карусель распределения диалогов в&nbsp;соответствии с&nbsp;бизнес-логикой компании;</p><p>Система push-уведомлений о&nbsp;событиях диалогов;</p><p>Обмен файлами, скриншотами, стикерами с&nbsp;клиентами;</p>',
      },
      SectionTitle_4: {
        title: 'Интерфейс администраторов',
      },
      InfoBlockGrid_2: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_2: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Система аналитики и&nbsp;эффективности в&nbsp;разрезах точек контактов, операторов и&nbsp;объектов недвижимости.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Архивы сообщений с&nbsp;системой поиска по&nbsp;операторам, точкам контактов, объектам недвижимости',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Распределение операторов по&nbsp;группам и&nbsp;назначение групп для&nbsp;типов диалогов и&nbsp;площадок',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Настройка диалогов и&nbsp;точек контакта, площадок, в&nbsp;том числе отдельных страниц площадок',
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

      // const description = 'Проект по созданию мессенджера, интегрированного во внутреннюю информационную среду заказчика с возможностью встраивания на любые ресурсы и имеющего большие возможности аналитики.';
      // const keywords = 'мессенджер, ЦДС, проект, система';

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
