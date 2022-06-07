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
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_1"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_2"/>
    <PortCascade :data="PortCascade_0"/>
    <InfoBlockGrid :data="InfoBlockGrid_2">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_2"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
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
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import PortCascade from '~/components/common/PortCascade';
import QuotationBlock from '~/components/common/QuotationBlock';

const projectTitle = 'Торговый дом Поли-Р';
const projectImgFolder = '/img/portfolioItems/polir';

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
        text: '<p>Разработка сайта, CRM-система</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        srcClass: 'port-polir',
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Группа компаний ТД «ПОЛИ-Р» на российском рынке лакокрасочных материалов с 1994 года. Главный офис в городе Москва. Компания осуществляет профессиональный подбор лакокрасочных материалов. Качественное обслуживание, высокий уровень сервиса, комплексный подход — основные принципы, благодаря которым компания успешно развивается.</p>',
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
        title: 'С чем пришел клиент',
      },
      InfoBlockGrid_0: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_0: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Дизайн старого сайта устарел, нет мобильной версии и на основе старого сайта не сделать выгрузку на Яндекс.Маркет',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Потребность в смене поставщика услуг онлайн оплаты и необходимость изменения подачи товара посетителю',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Осуществление заказа и фильтрация при поиске товара неудобны для посетителей',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Система работы с поступившими заказами и система обратной связи требуют автоматизации',
        },
      ],
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
        title: 'Что клиент получил',
      },
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'красочный, уникальный дизайн, соответствующий всем требованиям клиента и отражающий специфику товара',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'авторизацию клиентов в системе через механизм отправки СМС с кодом подтверждения',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'систему управления заказами, стадии ведения, общие данные по клиентам и общей сумме заказов',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'интеграцию с 1С, загрузку товаров и данных о корпоративных клиентах, скидках, выгрузку заказов',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'собственную систему обратной связи в виде онлайн диалога с логикой распределения по менеджерам',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'систему управления товарами и товарными предложениями, включая перекрестные категории и назначение тегов',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'интеграцию с системами эквайринга, робомаркетом, соответствие работы с 54-ФЗ о применении ККМ',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'систему управления скидками с разделением на юридических и физических лиц, автоматический расчет скидок',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'интеграцию с Яндекс.Маркет на уровне API и оплатой через площадку с автоматическим обменом заказами',
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
        text: '<p>Кроме сайта в рамках системы управления сайтом разработана система автоматизации бизнес-процессов и работы с клиентами.</p><p>Пользователи системы, они же сотрудники организации, имеют персональный доступ в систему с использованием механизма аутентификации. Доступ к необходимым разделам распределяется с помощью системы ролей.</p>',
      },
      InfoBlockGrid_2: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_2: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Работа с заказами</span><br>осуществляется менеджером через систему управления. Существующие клиенты менеджером подключаются к заказам через быстрый поиск, производится автоматические заполнение данных клиента. Для полной интеграцией с Яндекс.Маркет статусы заказов разработаны в соответствие со статусами площадки.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Система скидок</span><br>разделена на физических лиц и корпоративных клиентов. Ценообразование для разных категорий производится с помощью разной логики и источников данных. Цены на номенклатуру рассчитываются автоматически как на сайте при авторизации пользователя, так и в системе управления.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Онлайн диалог</span><br>менеджер, имеющий доступ на общение с клиентом, ведет с клиентом через специально разработанный для проекта интерфейс. Менеджер получает уведомление в информационной системе о входящем диалоге. Менеджер может открыть диалог и начать общение с клиентом, может свернуть или передать диалог другому менеджеру.',
        },
      ],
      AngularBlock_0: {
        areaClass: 'port-quotation',
      },
      QuotationBlock: {
        text: '<p>Своевременно и оперативно исполняют поставленные задачи. Высокий уровень квалификации. Не приходится непрерывно дергать и напоминать о поставленных задачах. Разница, по сравнению с теми, с кем работали раньше - весьма ощутимая.</p><p class="quot-signature">Григорий Рудкевич<br>Торговый дом Поли-Р, проект-менеджер</p>',
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

      // const description = 'Разработка сайта и автоматизация процессов. Система распределения цен в зависимости от комплекса факторов для каждого клиента, партнерская система с личным кабинетом.';
      // const keywords = 'сайт, автоматизация, лаки, краски, кейс, портфолио';

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
