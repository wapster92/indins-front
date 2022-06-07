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
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_1"/>
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_2"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_3"/>
    <PortCascade :data="PortCascade_1"/>
    <SectionTitle :data="SectionTitle_4"/>
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
import PortLogo from '~/components/common/PortLogo';
import PortTopPreview from '~/components/common/PortTopPreview';
import PortFooter from '~/components/common/PortFooter';
import SectionTitle from '~/components/common/UI/SectionTitle';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import PortCascade from '~/components/common/PortCascade';

const projectTitle = 'ЦДС Messenger';
const projectImgFolder = '/img/portfolioItems/messenger';

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
        text: '<p>ERP-система, поддержка</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>CDS&nbsp;Messenger - гибкая и&nbsp;универсальная система обмена быстрыми сообщениями клиентов с&nbsp;менеджерами на&nbsp;различных информационных площадках компании ЦДС.</p>',
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
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Интеграция процесса обмена сообщениями во&nbsp;внутреннюю систему лидогенерации компании',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Автоматическое создание лидов во&nbsp;внутренней системе при&nbsp;указании клиентом контактных данных',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Безопасность данных, хранение общения с&nbsp;клиентом на&nbsp;внутренних серверах компании',
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
      SectionTitle_2: {
        title: 'Гибкость системы',
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
      SectionTitle_3: {
        title: 'Платформа для ведения диалогов',
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
