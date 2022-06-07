<template>
  <div>
    <!--    <AngularBlock :data="angularBlock">-->
    <!--      <PageTitle :data="pageTitle"/>-->
    <!--      <InfoBlockGrid :data="infoBlockGrid">-->
    <!--        <InfoBlockItem-->
    <!--          v-for="(item, key) in infoBlockList"-->
    <!--          :key="key"-->
    <!--          :data="item"-->
    <!--        />-->
    <!--      </InfoBlockGrid>-->
    <!--    </AngularBlock>-->
    <!--    <SectionTitle :data="sectionTitleSiteType"/>-->
    <!--    <InfoBlockGrid :data="infoBlockGridSiteType">-->
    <!--      <InfoBlockItem-->
    <!--        v-for="(item, key) in infoBlockListSiteType"-->
    <!--        :key="key"-->
    <!--        :data="item"-->
    <!--        on-hover-->
    <!--      />-->
    <!--    </InfoBlockGrid>-->
    <!--    <HorizonList :data="horizonList"/>-->
    <!--    <SectionTitle :data="sectionTitleProject"/>-->
    <!--    <SliderBlock :tags="projectListTags"/>-->
  </div>
</template>

<script>
// import { Filter, Get } from 'core-xhr';
// import { meta } from '~/mixins/meta';
// import checkMenu from '~/mixins/checkMenu';
// import PageTitle from '~/components/common/UI/PageTitle';
// import AngularBlock from '~/components/common/AngularBlock';
// import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
// import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
// import SectionTitle from '~/components/common/UI/SectionTitle';
// import HorizonList from '~/components/common/UI/HorizonList';
// import SliderBlock from '~/components/common/SliderBlock';

export default {
  name: 'Development',

  // components: {
  //   PageTitle,
  //   AngularBlock,
  //   InfoBlockGrid,
  //   InfoBlockItem,
  //   SectionTitle,
  //   HorizonList,
  //   SliderBlock,
  // },

  // mixins: [
  //   meta,
  //   checkMenu,
  // ],

  // async asyncData({ app: { $xhr }, route }) {
  //   const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', route.path));
  //   try {
  //     const metaData = await $xhr.send(metaRequest)
  //       .then(res => res.data.data.result);
  //
  //     return {
  //       ...metaData,
  //     };
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },

  asyncData({ redirect, route }) {
    redirect({ name: 'razrabotka-saita', query: route.query });
  },

  // data: () => ({
  //   page: {
  //     menuBack: false,
  //     footerBack: false,
  //   },
  //
  //   angularBlock: {
  //     areaClass: 'main-title',
  //     sawBottom: true,
  //   },
  //
  //   pageTitle: {
  //     title: 'Разработка сайтов',
  //   },
  //
  //   infoBlockGrid: {
  //     column: '3',
  //     gap: '75',
  //   },
  //
  //   infoBlockList: [
  //     {
  //       title: 'Маркетинг',
  //       text: 'Перед разработкой сайта мы проектируем потенциальное поведение посетителей сайта для достижения максимальной конверсии в целевое действие.',
  //       titleClass: 'text-center',
  //       iconName: 'processes',
  //     },
  //     {
  //       title: 'Разработка',
  //       text: 'Индивидуальная разработка проекта позволяет построить уникальную структуру в соответствии с Вашими потребностями и маркетинговыми требованиями.',
  //       titleClass: 'text-center',
  //       iconName: 'systems',
  //     },
  //     {
  //       title: 'Исполнение',
  //       text: 'При разработке используются самые современные технологии и решения. Разработка соответствует требованиям поисковых систем и мировым стандартам качества.',
  //       titleClass: 'text-center',
  //       iconName: 'paper',
  //     },
  //   ],
  //
  //   sectionTitleSiteType: {
  //     title: 'Типы сайтов',
  //   },
  //
  //   infoBlockGridSiteType: {
  //     gridClass: 'site-type-grid',
  //     areaClass: 'site-type-area',
  //     column: '4',
  //     gap: '20',
  //   },
  //
  //   infoBlockListSiteType: [
  //     {
  //       title: 'Интернет-магазин',
  //       text: 'Сайт, основными функциями которого являются продажа продукции организации',
  //       iconName: 'online-store',
  //       titleClass: 'text-center',
  //       textClass: 'text-center',
  //     },
  //     {
  //       title: 'Портал',
  //       text: 'Его особеность заключается в максимальной читаемости и длительном взаимодействии с пользователем',
  //       iconName: 'portal',
  //       titleClass: 'text-center',
  //       textClass: 'text-center',
  //     },
  //     {
  //       title: 'Корпоративный сайт',
  //       text: 'Сайт организации, основной целью которого является демонстрация информации о деятельности организации',
  //       iconName: 'corporate-website',
  //       titleClass: 'text-center',
  //       textClass: 'text-center',
  //     },
  //     {
  //       title: 'Имиджевый сайт',
  //       text: 'Имиджевый сайт представляет компанию или человека в Интернете в соответствии с их статусом',
  //       iconName: 'image-site',
  //       titleClass: 'text-center',
  //       textClass: 'text-center',
  //     },
  //   ],
  //
  //   horizonList: {
  //     title: 'Используемые технологии',
  //     items: [
  //       /* {
  //         title: 'W3C',
  //         titleRight: 'W3C',
  //         text: '<p>Вёрстка проходит проверку на&nbsp;соответствие стандартам. Это&nbsp;гарантирует правильное отображение в&nbsp;браузерах и&nbsp;качественную индексацию поисковыми системами.</p>',
  //         icon: '/img/InfoIcons/icon_complex.svg',
  //       }, */
  //       {
  //         title: 'Websocket',
  //         titleRight: 'Websocket',
  //         text: '<p>Сетевой протокол связи, используемый для обмена данными между сервером и приложением. Позволяет обновлять содержимое экрана, когда данные поменялись на сервере без использования постоянных запросов об изменении данных. Позволяет вам отслеживать изменения и работать с данными в режиме реального времени.</p>',
  //         icon: '/img/InfoIcons/icon_generate.svg',
  //       },
  //       {
  //         title: 'PHP 7.x',
  //         titleRight: 'PHP 7.x',
  //         text: '<p>PHP идеально подходит для создания большинства информационных систем для бизнеса. Для специфических задач мы можем использовать другие языки программирования. PHP -  это сочетание эффективности, гибкости, возможностей поддержки и развития при соблюдении стандартов разработки. Версия 7.4 на 17% быстрее версии 7.3 и в 3 раза быстрее версии 5.6.</p>',
  //         icon: '/img/InfoIcons/icon_process.svg',
  //       },
  //       {
  //         title: 'Symfony v.5',
  //         titleRight: 'Symfony v.5',
  //         text: '<p>Профессиональный PHP-фреймворк, основная цель использования которого - сократить ваши затраты на разработку. Позволяет делать масштабируемые и производительные информационные системы. Используется для интеграции со сторонними приложениями, а также с инструментами для фронтенд-разработки.</p>',
  //         icon: '/img/InfoIcons/icon_clouds.svg',
  //       },
  //       /* {
  //         title: 'ВАТС и Call-tracking',
  //         titleRight: 'ВАТС и Call-tracking',
  //         text: '<p>Собственные серверы виртуальных АТС и&nbsp;программная платформа колл-трекинга определяют источник трафика и&nbsp;запросы, с&nbsp;которых совершен звонок клиента. Это&nbsp;позволяет многократно увеличить эффективность рекламы.</p>',
  //         icon: '/img/InfoIcons/icon_processy.svg',
  //       }, */
  //       {
  //         title: 'Vue 2.x',
  //         titleRight: 'Vue 2.x',
  //         text: '<p>Реактивный фреймворк, впитавший в себя лучшие практики современных технологий. Позволяет работать с отдельными элементами интерфейса независимо от других элементов, что дает возможность строить современные интерактивные интерфейсы, перерисовывается только то, что претерпело изменения.</p>',
  //         icon: '/img/InfoIcons/icon_process.svg',
  //       },
  //       {
  //         title: 'Nuxt 2.x',
  //         titleRight: 'Nuxt 2.x',
  //         text: '<p>Как и все фреймворки - экономит ваши деньги и время на разработку, позволяя её ускорить. Фреймворк высокого уровня, созданный с помощью Vue.js. Он позволяет создавать готовые к работе веб-приложения и призван упростить разработку SPA. Nuxt рендерит и отдает на клиент статические HTML страницы, что ускоряет первую отрисовку контента (First Contentful Paint) и значительно улучшает UX и PageSpeed.</p>',
  //         icon: '/img/InfoIcons/icon_clouds.svg',
  //       },
  //     ],
  //   },
  //
  //   sectionTitleProject: {
  //     title: 'Проекты',
  //   },
  //
  //   projectListTags: ['Сайт'],
  // }),
};
</script>
