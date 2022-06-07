<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <TextBlock :data="TextBlock_0"/>
      <TextBlock :data="TextBlock_0_1"/>
    </AngularBlock>
    <InfoBlockGrid :data="infoBlockGridSiteType">
      <InfoBlockItem
        v-for="(item, key) in infoBlockListSiteType"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <AngularBlock>
      <SectionTitle :data="sectionTitleActual"/>
      <QuotationBlock :data="quotationBlock"/>
    </AngularBlock>
    <HorizonList :data="horizonList_1"/>
    <SectionTitle :data="sectionTitleOutsource"/>
    <QuotationBlock :data="quotationBlock_0"/>

    <HorizonList
      :data="horizonList"
      class="technologies"
    />
    <SectionTitle :data="sectionTitleProject"/>
    <SliderBlock :tags="projectListTags"/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import TextBlock from '@/components/common/UI/TextBlock';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import AngularBlock from '~/components/common/AngularBlock';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import QuotationBlock from '~/components/common/QuotationBlock';
import SectionTitle from '~/components/common/UI/SectionTitle';
import HorizonList from '~/components/common/UI/HorizonList';
import SliderBlock from '~/components/common/SliderBlock';

export default {
  name: 'Development',

  components: {
    TextBlock,
    PageTitle,
    AngularBlock,
    InfoBlockGrid,
    InfoBlockItem,
    SectionTitle,
    HorizonList,
    SliderBlock,
    QuotationBlock,
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

    angularBlock: {
      areaClass: 'main-title',
      sawBottom: true,
    },

    pageTitle: {
      title: 'Разработка программного обеспечения',
    },

    sectionTitleSiteType: {
      title: 'Типы сайтов',
    },

    infoBlockGridSiteType: {
      gridClass: 'site-type-grid',
      areaClass: 'site-type-area',
      column: '4',
      gap: '20',
    },
    TextBlock_0: {
      areaClass: 'port-text',
      textClass: 'text-center',
      text: '<p>Компания ИНДИНС выполняет разработку программного обеспечения на заказ по индивидуальным требованиям. Для выполнения разработки вы можете предоставить четкие технические критерии или собственное техническое задание. </p>',
    },
    TextBlock_0_1: {
      areaClass: 'port-text',
      textClass: 'text-center',
      text: '<p>Вы можете не обладать специальными техническими знаниями. Мы являемся компанией полного цикла разработки, поэтому достаточно озвучить решаемую бизнес-задачу, и мы самостоятельно выполним проектирование информационной системы исходя из ваших требований, составим техническое задание, выполним разработку и внедрим программу в вашей компании. </p>',
    },

    infoBlockListSiteType: [
      {
        text: 'Полный цикл разработки',
        iconName: 'icon_chikl',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: '98% внедряемости',
        iconName: 'icon_inside',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: 'Объективная стоимость',
        iconName: 'icon_chena',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
      {
        text: 'Гарантия на продукт',
        iconName: 'icon_shild',
        titleClass: 'text-center',
        textClass: 'text-center',
      },
    ],
    sectionTitleActual: {
      title: 'Решение бизнес-задачи',
    },
    quotationBlock: {
      text: '<p>Мы понимаем, что с помощью информационной системы вам необходимо решить бизнес-задачу, а не получить набор программного кода. Помощь в проектировании информационных систем и подбор вариантов решения выполняются с учетом бизнес-задачи, а также уровня эффективности и рентабельности этого решения.</p>',
    },
    quotationBlock_0: {
      text: '<p>Если у вас крупная компания и имеются собственные программисты или технический отдел, вы можете разово делегировать разработку программного продукта нам, и далее осуществлять доработку и поддержку собственными силами. Высокие требования к качеству и соблюдение стандартов в нашей работе позволяют это сделать. Мы имеем успешный опыт работы в таком формате с крупными компаниями, имеющими собственные IT-департаменты.</p>',
    },
    sectionTitleTechnical: {
      title: 'Решение бизнес-задачи',
    },
    sectionTitleOutsource: {
      title: 'Аутсорс разработки',
    },

    horizonList: {
      title: 'Используемые технологии и стандарты',
      items: [
        {
          title: 'PHP 7.x',
          titleRight: 'PHP 7.x',
          text: '<p>PHP идеально подходит для создания большинства информационных систем для бизнеса. Для специфических задач мы можем использовать другие языки программирования. PHP -  это сочетание эффективности, гибкости, возможностей поддержки и развития при соблюдении стандартов разработки. Версия 7.4 на 17% быстрее версии 7.3 и в 3 раза быстрее версии 5.6.</p>',
          icon: '/img/InfoIcons/icon_process.svg',
        },
        {
          title: 'Symfony v.5',
          titleRight: 'Symfony v.5',
          text: '<p>Профессиональный PHP-фреймворк, основная цель использования которого - сократить ваши затраты на разработку. Позволяет делать масштабируемые и производительные информационные системы. Используется для интеграции со сторонними приложениями, а также с инструментами для фронтенд-разработки.</p>',
          icon: '/img/InfoIcons/icon_clouds.svg',
        },
        /* {
          title: 'ВАТС и Call-tracking',
          titleRight: 'ВАТС и Call-tracking',
          text: '<p>Собственные серверы виртуальных АТС и&nbsp;программная платформа колл-трекинга определяют источник трафика и&nbsp;запросы, с&nbsp;которых совершен звонок клиента. Это&nbsp;позволяет многократно увеличить эффективность рекламы.</p>',
          icon: '/img/InfoIcons/icon_processy.svg',
        }, */
        {
          title: 'Vue 2.x',
          titleRight: 'Vue 2.x',
          text: '<p>Реактивный фреймворк, впитавший в себя лучшие практики современных технологий. Позволяет работать с отдельными элементами интерфейса независимо от других элементов, что дает возможность строить современные интерактивные интерфейсы, перерисовывается только то, что претерпело изменения.</p>',
          icon: '/img/InfoIcons/icon_process.svg',
        },
        {
          title: 'Nuxt 2.x',
          titleRight: 'Nuxt 2.x',
          text: '<p>Как и все фреймворки - экономит ваши деньги и время на разработку, позволяя её ускорить. Это фреймворк высокого уровня, созданный с помощью Vue.js. Он позволяет создавать готовые к работе веб-приложения и призван упростить разработку web-интерфейсов информационных систем. Ускоряет загрузку интерфейсов повышая удобство работы с системой.</p>',
          icon: '/img/InfoIcons/icon_clouds.svg',
        },
        {
          title: 'Websocket',
          titleRight: 'Websocket',
          text: '<p>Сетевой протокол связи, используемый для обмена данными между сервером и приложением. Позволяет обновлять содержимое экрана, когда данные поменялись на сервере без использования постоянных запросов об изменении данных. Позволяет вам отслеживать изменения и работать с данными в режиме реального времени.</p>',
          icon: '/img/InfoIcons/icon_generate.svg',
        },
        {
          title: 'PSR',
          titleRight: 'PSR',
          text: '<p>Общие отработанные, проверенные и принятые мировым сообществом стандарты работы с программным кодом. Соблюдение этих стандартов делает проекты поддерживаемыми. Для проектов становится не критичным смена программиста на проекте и у вас есть возможность развивать проект в дальнейшем своими силами или сменить компанию разработки.</p>',
          icon: '/img/InfoIcons/icon_generate.svg',
        },
        {
          title: 'W3C',
          titleRight: 'W3C',
          text: '<p>Стандарт разметки страниц интерфейса, в соответствии с которым браузеры формируют интерфейс из разметки. При соблюдении этого стандарта можно быть уверенным, что любой браузер будет показывать интерфейс верно. Можно проверять, как показывается страница на разных браузерах, а можно соблюдать стандарт. Но проверять тоже надо.</p>',
          icon: '/img/InfoIcons/icon_generate.svg',
        },
      ],
    },
    horizonList_1: {
      title: 'Технические преимущества',
      items: [
        {
          title: 'Проектирование',
          titleRight: 'Проектирование',
          text: '<p>Мы самостоятельно соберем от вас сведения о задачах, которые должна выполнять информационная система и выполним техническое проектирование будущей системы. Вам не нужно обладать специальными техническими навыками.</p>',
          icon: '/img/InfoIcons/icon_project.svg',
        },
        {
          title: 'Соблюдение стандартов разработки',
          titleRight: 'Соблюдение стандартов разработки',
          text: '<p>Соблюдение стандартов позволит разобраться и далее работать с программным кодом любым другим разработчикам, в том числе и зарубежным. Мы соблюдаем принятые PSR стандарты.</p>',
          icon: '/img/InfoIcons/icon_standart.svg',
        },
        {
          title: 'Современный стек технологий',
          titleRight: 'Современный стек технологий',
          text: `<ul>
              <li>PHP v.7.4</li>
              <li>Symfony v.5</li>
              <li>Websocket</li>
              <li>Nodejs</li>
              <li>Nuxt</li>
              <li>Vue</li>
            </ul>`,
          icon: '/img/InfoIcons/icon_stack.svg',
        },
        {
          title: 'Выбор архитектуры',
          titleRight: 'Выбор архитектуры',
          text: '<p>В зависимости от задач и типа информационной системы могут использоваться разные варианты архитектуры. Выбор вариантов реализации производится на стадии проектирования.</p>',
          icon: '/img/InfoIcons/icon_arch.svg',
        },
        {
          title: 'Описание кода',
          titleRight: 'Описание кода',
          text: '<p>Подробность комментирования программного кода выполняется в соответствии с международными стандартами разработки. При необходимости может быть подготовлено дополнительное описание частей кода или описание технической реализации методов.</p>',
          icon: '/img/InfoIcons/icon_code.svg',
        },
      ],
    },

    sectionTitleProject: {
      title: 'Портфолио',
    },

    projectListTags: ['XRM', 'ERP'],
  }),
};
</script>
