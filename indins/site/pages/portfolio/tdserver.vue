<template>
  <div>
    <AngularBlock
      :data="angularBlock"
    >
      <PageTitle :data="{title: pageTitle.title}"/>
      <TextBlock
        :data="{...TextBlock}"
      />
      <PortLogo :data="PortLogo"/>
      <TextBlock
        :data="TextBlock0"
      />
      <SectionTitle
        :data="SectionTitle_0"
      />
      <InfoBlockGrid
        :data="InfoBlockGrid_0"
      >
        <InfoBlockItem
          v-for="(item, key) in InfoBlockList_0"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <PortTopPreview
      :data="PortTopPreview"
      class="td-project"
    />
    <SectionTitle :data="SectionTitle_1" />
    <TextBlock
      :data="TextBlock_1"
    />
    <SectionTitle :data="SectionTitle_2" />
    <TextBlock
      :data="TextBlock_2"
    />
    <SectionTitle :data="SectionTitle_3" />
    <InfoBlockGrid
      :data="InfoBlockGrid_1"
    >
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle
      :data="SectionTitle_4"
    />
    <TextBlock :data="TextBlock_4" />
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
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import PortCascade from '~/components/common/PortCascade';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';

const projectImgFolder = '/img/portfolioItems/tdserver';
const projectTitle = 'CRM-система для call-центра ТД «Сервер»';
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
    PortLineTreeImg,
    PortCascade,
    InfoBlockFlex,
    PortStatItem,
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
        text: '<p>CRM-система</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.webp`,
        alt: projectTitle,
      },
      TextBlock0: {
        areaClass: 'port-text',
        text: '<p>Компания Торговый Дом «Сервер» является поставщиком материалов и оборудования для производства корпусной мебели и работает по всей России. Для того, чтобы эффективно обслуживать клиентов и оперативно обрабатывать входящие потоки информации, звонки, заявки с сайта, интернет-заказы, компания ИНДИНС разработала информационную систему по обработке заявок, интегрированную с имеющейся у заказчика собственной системой телефонии.</p>',
      },
      PortTopPreview: {
        alt: projectTitle,
        srcDesk: {
          img: `${projectImgFolder}/top_back.webp`,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: `${projectImgFolder}/top_phone.webp`,
          action: 'adaptiveResizeMax',
          width: 195,
        },
      },
      SectionTitle_0: {
        areaClass: 'realized',
        title: 'В проекте реализовано',
      },
      InfoBlockGrid_0: {
        column: '2',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'td-server-icon--calls-section',
          text: 'Раздел звонков',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'td-server-icon--orders',
          text: 'Обработка интернет-заказов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'td-server-icon--divided-access',
          text: 'Разделенный доступ по ролям',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'td-server-icon--mails',
          text: 'Сбор почтовых писем',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'td-server-icon--call-notification',
          text: 'Уведомление о звонке',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'td-server-icon--phone-integration',
          text: 'Интеграция с телефонией клиента',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'td-server-icon--analytics',
          text: 'Аналитика работы операторов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'td-server-icon--calls-listening',
          text: 'Прослушивание звонков',
        },
      ],
      SectionTitle_1: {
        title: 'Цель проекта',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Автоматизировать работу call-центра и обеспечить работу бизнес-процессов по предварительной фильтрации входящего трафика в компанию. Это обеспечит попадание в CRM-систему заявок, связанных с непосредственной работой с клиентами компании, помогая распределить нагрузку.</p>',
      },
      SectionTitle_2: {
        title: 'Что было сделано',
      },
      TextBlock_2: {
        areaClass: 'port-text',
        text: '<p>Создан бизнес-процесс, по которому сначала все входящие заявки попадают в разработанную информационную систему call-центра, фильтруются от спама и прочей ненужной для реальной работы с клиентами информации и только потом операторами call-центра передаются менеджерам по работе с клиентами во внутреннюю CRM-систему заказчика.</p>',
      },
      SectionTitle_3: {
        title: 'Функции системы',
      },
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Разделение входящего потока в зависимости от источника звонка или заявки на Москву и Санкт-Петербург, автоматическая квалификация на основании технических данных.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Система сбора почтовых писем и их обработки, квалификация и фильтрация спама, определение тегов, загрузка писем и вложений, направление в отдел продаж.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Уведомление о звонке с выводом информации о клиенте компании в интерфейсе системы до поднятия трубки операторами, если звонит текущий клиент.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Обработка интернет-заказов с сайта, парсинг информации со структурированных писем с сайта, передача информации во внутреннюю CRM-систему.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Аналитика работы операторов по обработке интернет-заказов, заявок с сайта и входящих звонков в разрезе операторов и городов, а также результатов обработки заявок.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Разделение уровней доступа, операторов, администраторов системы, разделение и привязка операторов к рабочим местам и внутренним номерам телефонов.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Интеграция с сервером телефонии заказчика, основанном на Asterisk, индивидуальная настройка сервера телефонии под бизнес-процессы заказчика.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Интеграция с внутренней CRM-системой заказчика, определение клиентов, установка статусов заказов, передача информации о менеджерах и операторах.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Система обработки звонков с автоматическим открытием окна у оператора нужного города и показом информации о звонящем клиенте в момент поднятия трубки оператором.',
        },
      ],
      SectionTitle_4: {
        title: 'Система',
      },
      TextBlock_4: {
        areaClass: 'port-text port-under-title',
        text: '<p>Архитектура разработанной информационной системы позволяет её изменять, дорабатывать и дополнять новым функционалом без вреда для быстродействия и качества. При разработке соблюдены все международные стандарты и требования к качеству программного кода. Система в дальнейшем может дорабатываться как заказчиком самостоятельно, так и с помощью любых IT-компаний и специалистов. Все разрабатываемые нами системы принадлежат заказчикам, не требуют лицензий и могут быть изменены заказчиком самостоятельно.</p>'
        + '<p>Проектирование информационной системы заняло 2 месяца. Разработка информационной системы заняла 3 месяца. Внедрение в эксплуатацию и доводка 1 месяц. На март 2022 года нами проведено 2 этапа доработок информационной системы, связанных с добавлением дополнительного функционала.</p>',
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
      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style lang="stylus" scoped>
.td-project
  & >>> .portfolio-container
    padding: 0;
    & img
      box-shadow: none;
</style>
