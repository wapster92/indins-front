<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <InfoBlockGrid :data="infoBlockGrid">
        <InfoBlockItem
          v-for="(item, key) in infoBlockList"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <SectionTitle :data="{title: 'Что важно для современных сайтов'}"/>
    <div class="mini-articles">
      <MiniArticle
        v-for="(item, i) of miniArticles"
        :key="i"
        :icon="item.icon"
        :title="item.title"
      >{{ item.text }}</MiniArticle>
    </div>
    <AngularBlock
      :data="angularBlockDark"
      class="angular-area-form"
    >
      <LongForm title="Давайте обсудим ваш сайт"/>
    </AngularBlock>
    <div class="advantages">
      <SectionTitle :data="{title: 'Преимущества индивидуальной разработки'}"/>
      <InfoBlockGrid
        :data="infoBlockGridSiteType"
        class="advantages__list"
      >
        <InfoBlockItem
          v-for="(item, key) in infoBlockListSiteType"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </div>
    <AngularBlock>
      <SectionTitle :data="{title: 'SEO-пакет в подарок'}"/>
      <TextBlock
        :data="{text: `Соблюдение данных требований гарантирует индексацию сайта поисковыми системами
      и восприятие сайта поисковыми системами как качественного сайта.
      В совокупности с правильной работой над контентом сайта выполнение указанных технических требований
      гарантирует сайту высокие позиции в поисковой выдаче.`}"
      />
      <InfoBlockGrid
        :data="infoBlockGridSiteSEO"
        class="info-block-seo"
      >
        <InfoBlockItem
          v-for="(item, key) in infoBlockListSiteSEO"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <SectionTitle :data="{title: 'Порядок работы'}"/>
    <PortOrder :data="beginBlock"/>

    <AngularBlock
      :data="angularBlockDark"
      class="angular-area-form"
    >
      <LongForm title="Хотите обсудить проект?"/>
    </AngularBlock>
    <SectionTitle :data="sectionTitleProject"/>
    <SliderBlock :tags="projectListTags"/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import MiniArticle from '@/components/common/MiniArticle';
import LongForm from '@/components/forms/LongForm';
import TextBlock from '@/components/common/UI/TextBlock';
import PortOrder from '@/components/common/PortOrder';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import AngularBlock from '~/components/common/AngularBlock';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import SectionTitle from '~/components/common/UI/SectionTitle';
import SliderBlock from '~/components/common/SliderBlock';

export default {
  name: 'RazrabotkaSaita',

  components: {
    PageTitle,
    AngularBlock,
    InfoBlockGrid,
    InfoBlockItem,
    SectionTitle,
    SliderBlock,
    MiniArticle,
    LongForm,
    TextBlock,
    PortOrder,
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
      footerBack: false,
    },
    angularBlockDark: {
      areaClass: 'auto-to-scroll',
      // sawTop: true,
    },
    miniArticles: [
      {
        title: 'Мобильная версия', icon: 'mini-article/phone', text: `Сегодня с телефонов на сайты приходит больше посетителей, чем с компьютеров. Данный показатель будет только увеличиваться. Сайт не просто должен помещаться на телефоне или как-то выглядеть, он должен быть удобен
для просмотра с телефона. Это влияет на всё: на SEO, на показатель отказов, на конверсию. У поисковых систем существуют специальные требования к мобильной верстке. Для мобильных версий сайта нужно отдельно продумывать 
и проектировать расположение и размер элементов, отрисовывать дизайн. Набор используемых технологий 
при разработке сайта должен обеспечивать очень быструю скорость работы с сайтом с мобильных устройств.`,
      },
      {
        title: 'Сквозная аналитика', icon: 'mini-article/analitic', text: `Вам необходимо понимать, окупается ли реклама и во сколько обходится клиент с сайта. Без сквозной аналитики, коллтрекинга, интеграции с телефонией и CRM сайт - это просто набор программного кода и дизайна, а не инструмент бизнеса. В современных сайтах всё связано в единую информационную систему, заказы звонка и звонки автоматически попадают в CRM с информацией, по какому поисковому запросу пользователь пришел на сайт. Это позволяет менеджерам работать быстро, а руководителям оценивать эффективность. Собственникам это позволяет оценивать рентабельность своих инвестиций. Сквозная аналитика особенно важна для таких сайтов, как Интернет-магазины
и витрины товаров и услуг.`,
      },
      {
        title: 'Скорость загрузки', icon: 'mini-article/speed', text: `Скорость загрузки сайта определяет не только количество людей, закрывших сайт, не дождавшись загрузки,
но и является очень важным фактором поисковой оптимизации (SEO). Поисковые системы используют показатель скорости загрузки сайта как фактор качества сайта и предлагают посетителям сайты с более высокой скоростью загрузки. У поисковых систем есть наборы рекомендаций и требований к сайтам для обеспечения высокой скорости загрузки. При разработке сайта необходимо их соблюдать. Для соблюдения этих требований требуется использование самых современных технологий при разработке сайта. Обеспечение высокой скорости загрузки сайта начинается еще
на стадии проектирования и дизайна.`,
      },
    ],
    angularBlock: {
      areaClass: 'main-title',
      sawBottom: true,
    },

    pageTitle: {
      title: 'Разработка сайтов',
    },

    infoBlockGrid: {
      column: '3',
      gap: '75',
    },

    infoBlockList: [
      {
        text: 'Неограниченные возможности в структуре, дизайне, функциях и интеграции',
        textClass: 'info-block-item__text--center',
        iconName: 'pramid1',
      },
      {
        text: 'SEO-пакет и мобильная верстка в подарок',
        textClass: 'info-block-item__text--center',
        iconName: 'pramid2',
      },
      {
        text: 'Если мы нарушим сроки хотя бы на 1 день, вы получите сайт бесплатно',
        textClass: 'info-block-item__text--center',
        iconName: 'pramid3',
      },
    ],

    infoBlockGridSiteType: {
      gridClass: 'site-type-grid',
      areaClass: 'site-type-area',
      column: '3',
      gap: '80',
    },

    infoBlockListSiteType: [
      {
        text: 'Панель управления контентом индивидуальна, управление сайтом не требует специальных навыков',
        iconName: 'pazl',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: 'При разработке применяются все последние требования поисковых систем к качеству сайта',
        iconName: 'hand',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: 'Возможна интеграция с любыми системами: CRM, бухгалтерией, торговыми и аналитическими площадками',
        iconName: 'canvas',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: 'Cобcтвенная CRM-система, коллтрекинг, сквозная аналитика и анализ ROMI встроены в сайт',
        iconName: 'crm',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: 'Возможность последующего самостоятельного развития и поддержки',
        iconName: 'grafic',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: 'Отсутствие лицензионных платежей: разработанный сайт полностью принадлежит вам',
        iconName: 'kubok',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
    ],

    infoBlockGridSiteSEO: {
      gridClass: 'site-type-grid',
      areaClass: 'site-type-area',
      column: '4',
      gap: '20',
    },

    infoBlockListSiteSEO: [
      {
        text: 'Скорость загрузки сайта по GooglePageSpeed в зеленой зоне',
        iconName: 'icon-seo speed',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: `Микроразметка
JSON-LD на всех страницах сайта`,
        iconName: 'icon-seo json',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: `Микроразметка OG
на всех страницах
сайта`,
        iconName: 'icon-seo og',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: `W3C стандарты, валидированная
верстка`,
        iconName: 'icon-seo w3c',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: `Автоматическая генерация sitemap в соответствии
с контентом`,
        iconName: 'icon-seo sitemap',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: `Настройка правил индексации
в robots.txt`,
        iconName: 'icon-seo list',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: `Регистрация сайта в Яндекс.Вебмастер
и Google Search Console`,
        iconName: 'icon-seo register',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: 'Разовый контроль индексации через месяц после запуска сайта',
        iconName: 'icon-seo raketa',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
    ],

    sectionTitleProject: {
      title: 'Портфолио',
    },
    beginBlock: {
      items: [
        {
          icon: 'port-order/man',
          title: 'Обращение',
          text: '<p>Вы связываетесь с нами и мы знакомимся. Вы сообщаете, какие бизнес-задачи должен решать сайт. Вы делитесь своим представлением \n'
            + 'о том, как он должен выглядеть, какие нужны разделы и как они должны работать. Мы с вами назначаем встречу для обсуждения проекта.</p>',
        },
        {
          icon: 'port-order/group',
          title: 'Предварительное проектирование',
          text: '<p>Мы с вами встречаемся, формируем общее понимание результата и обсуждаем проект. Определяется предварительная структура сайта. Производится предварительная оценка стоимости и определяются сроки разработки сайта. Оценивается стоимость работ по проектированию.</p>',
        },
        {
          icon: 'port-order/tools',
          title: 'Макеты и техническое проектирование',
          text: '<p>Мы осуществляем работы по проектированию: составляем карту интерфейсов, подготавливаем прототипы, составляем техническое задание. Каждый этап будет согласован с вами. По итогам проектирования составляется смета на разработку.</p>',
        },
        {
          icon: 'port-order/cloud',
          title: 'Разработка сайта',
          text: '<p>Вы оплачиваете 50% стоимости разработки. Мы подготавливаем дизайн-макеты, которые вы сможете скорректировать при необходимости. Дизайн может быть вынесен в отдельный этап. Производим верстку сайта, создаем базу данных и программную часть. Осуществляем сборку на нашем сервере под нашим доменом, выполняем техническую подготовку к запуску. Тестируем, наполняем контентом.</p>',
        },
        {
          icon: 'port-order/final',
          title: 'Внедрение',
          text: '<p>Вы принимаете готовый, наполненный контентом сайт, созданный в срок. Мы подготавливаем сайт для индексации поисковыми системами. Вы оплачиваете оставшуюся стоимость работ. При необходимости мы переносим сайт на ваш сервер и домен. Помогаем настроить почту и другие сервисы. Вы пользуетесь сайтом.</p>',
        },
      ],
    },
    projectListTags: ['Сайт'],
  }),
};
</script>

<style lang="stylus" scoped>
.mini-articles
  margin: 60px 0 59px;
.advantages
  padding-top: 10px;
  &__list
    padding: 13px 0 0 0;
    >>> .info-block-grid
      gap: 56px
.angular-area-form
  padding: 0
  margin-top: 75px
  >>> .angular-back
  &:before
    opacity: 1
    background-image: url(/img/angular_hd_dark.webp) !important;

</style>

<style lang="stylus">
.info-block-seo
  margin-top: 67px
.icon-seo
  height: 50px;
</style>
