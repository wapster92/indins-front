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
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock_1"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_2"/>
    <PortCascade :data="PortCascade_0"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_3"/>
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
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import PortCascade from '~/components/common/PortCascade';
import QuotationBlock from '~/components/common/QuotationBlock';

const projectTitle = 'Оконная компания N° 1';
const projectImgFolder = '/img/portfolioItems/oknokomp';

export default {
  components: {
    AngularBlock,
    PageTitle,
    TextBlock,
    PortLogo,
    PortTopPreview,
    PortFooter,
    SectionTitle,
    PortLineTreeImg,
    InfoBlockGrid,
    InfoBlockItem,
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
        title: 'Оконная компания N°&nbsp;1',
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
        text: '<p>Оконная компания №1 образована в 2007 году и является одной из надежных компаний на рынке Санкт-Петербурга в области оконных конструкций. Компания работает как для розничных, так и корпоративных клиентов. Руководство компании Нюьвин, работающей под брендом Оконная компания №1, обратилось к нам в 2015 году за советом и видением сайта. На тот момент над сайтом трудились другие разработчики и руководство решило не менять коней, ведь деньги уже были заплачены. Клиент получил от нас ценные рекомендации, а в сентябре 2016 года вернулся к нам за разработкой сайта со словами “Ну всё, мы попробовали 3-х разработчиков, потратили впустую миллион, теперь давайте делать по уму”.</p>',
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
        title: 'Маркетинг',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Можно боротся на существующем рынке с существующими запросами, а можно создать собственный запрос, чтобы оказаться на первом месте сразу. Был разработан бренд “Тепловые окна”. Для получения результата сразу было принято решение делать 2 сайта, один большой с системой автоматизации, и пока он делается, создать небольшой сайт для запуска рекламы и получения лидов сразу.</p>',
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
      SectionTitle_1: {
        title: 'Сайт',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Оба сайта, и небольшой и основной, отличают оригинальность. Оба сайта выполнены в едином стиле. Графики ровно столько, чтобы сделать сайт красивым, но не перегруженным. На обоих сайтах присутствует адаптивная верстка, которая позволяет удобно пользоваться всем функционалом с любых устройств. Отличительные особенности:</p>',
      },
      InfoBlockGrid_0: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_0: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Управление содержимым сайта</span> с минимумом кликов через систему управления контентом (CMS)',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Древовидная система каталога</span> позволяет управлять логикой поведения посетителя на сайте',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Микроразметка</span> для поисковых систем обеспечивает полную и качественную индексацию сайта',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Онлайн калькулятор</span> расчета стоимости окон позволяет сформировать и скачать расчет',
        },
      ],
      SectionTitle_2: {
        title: 'Автоматизация',
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
        text: '<p>Кроме основного сайта в рамках системы управления создана система автоматизации ведения заказа. В рамках системы каждый заказ двигается по статусам, при этом к заказам на определенных статусах имеют доступ только участвующие в процессе выполнения стадии сотрудники.</p>',
      },
      InfoBlockGrid_1: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_1: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          titleClass: 'text-center-xs',
          title: 'Доступы',
          text: 'Все пользователи системы, они же сотрудники организации, имеют персональный доступ в систему через систему авторизации. Доступ к необходимым разделам распределяется с помощью системы ролей.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          titleClass: 'text-center-xs',
          title: 'Работа с клиентами и заказами',
          text: 'Система управления заказами, в которой каждый заказ имеет стадию, включенный в заказ перечень номенклатуры услуг и товаров, их стоимость. Отдельно раздел работы с клиентами позволяет учитывать всех клиентов и общую сумму заказов клиентов.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          titleClass: 'text-center-xs',
          title: 'Пример стадии заказа',
          text: 'Замерщики видят только адрес, телефон и имя клиента, а также могут вписать данные замера и загрузить фото. Замерщик автоматически переходит к следующему заказу и едет к новому клиенту, а заказ переходит на стадию изготовления.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          titleClass: 'text-center-xs',
          title: 'Коллтрекинг',
          text: 'В рамках системы автоматизации разработана система коллтрекинга на основе Яндекс метрики и Яндекс номеров, позволяющая отслеживать источники звонков и эффективность рекламных кампаний.',
        },
      ],
      SectionTitle_3: {
        title: 'Реклама',
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
        text: '<p>Для клиента проводились рекламные кампании с отслеживанием эффективности через внутреннюю систему коллтрекинга и аналитики. Были получены данные о стоимости обращения в компанию и стоимости клиента.</p>',
      },
      AngularBlock_0: {
        areaClass: 'port-quotation',
      },
      QuotationBlock: {
        video: true,
        youtubeID: 'C4ghGT1XQJM',
        img: `${projectImgFolder}/client_photo.png`,
        alt: 'Сергей Володин',
        text: '<p class="text-primary">Сергей Володин<br>Оконная компания N°1, директор</p>',
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

      // const description = 'Разработка сайта, автоматизация процессов и проведение рекламных кампаний для оконной компании. Автоматизация процесса движения заказов, выездов, замеров, производства.';
      // const keywords = 'автоматизация, окна, замерщик';

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
