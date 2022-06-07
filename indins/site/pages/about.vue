<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <TextBlock :data="textBlock"/>
    </AngularBlock>
    <InfoBlockGrid :data="infoBlockGrid">
      <InfoBlockItem
        v-for="(item, key) in infoBlockList"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="sectionTitleChoose"/>
    <!--    <Swiper>-->
    <!--      <SwiperItem-->
    <!--        v-for="(item, key) in swiperItemsList"-->
    <!--        :key="key"-->
    <!--        :data="item"-->
    <!--      />-->
    <!--    </Swiper>-->
    <!--    <div style="display: flex; flex-flow: row; justify-content: center; margin-bottom: 100px;">
      <div
        v-for="(item, key) in swiperItemsList"
        :key="key"
      >
        <div
          v-if="item.icon"
          class="swipe-item"
          style="width: 300px; margin-bottom: -15px"
        >
          <div class="swipe-icon">
            <span
              v-if="item.icon"
              :style="`background-image: url(${item.icon})`"
              style="height: 75px"
              class="at-rest"
            />
          </div>
        </div>
        <div
          v-if="item.title"
          :class="item.titleClass"
          class="swipe-title"
          v-html="item.title"
        />
      </div>
    </div>-->
    <InfoBlockGrid :data="itemsListIncludeType">
      <InfoBlockItem
        v-for="(item, key) in itemsListInclude"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <AngularBlock class="mission-section--about">
      <SectionTitle :data="sectionTitleMission"/>
      <TextBlock :data="textBlockMission"/>
    </AngularBlock>
    <AngularBlock
      :data="angularBlockTransparent"
      class="team-section--about"
    >
      <SectionTitle :data="sectionTitleTeam"/>
      <TextBlock :data="textBlockTeam"/>
      <FooterButton class="footer-button-pd-about" :value="footerButtonData"/>
    </AngularBlock>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import AngularBlock from '~/components/common/AngularBlock';
import TextBlock from '~/components/common/UI/TextBlock';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import SectionTitle from '~/components/common/UI/SectionTitle';
import FooterButton from '~/components/common/FooterButton';
import Swiper from '~/components/common/Swiper';
import SwiperItem from '~/components/common/SwiperItem';

export default {
  components: {
    PageTitle,
    AngularBlock,
    TextBlock,
    InfoBlockGrid,
    InfoBlockItem,
    SectionTitle,
    Swiper,
    SwiperItem,
    FooterButton,
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

    angularBlockTransparent: {
      emptyBackground: true,
    },

    pageTitle: {
      title: 'О компании',
    },

    textBlock: {
      textClass: 'text-center',
      text: '<p>Особенность компании отображена в названии компании. ИНДИНС — сокращение от ИНДивидуальные ИНформационные Системы. Наш основной принцип работы заключен в разработке индивидуального решения для каждого клиента.</p><p>Клиенты пользуются нашими услугами с 2014-го года. В среднем опыт наших IT-специалистов в разработке сайтов и систем автоматизации — 10 лет. Сейчас для нанесения вам непоправимой пользы трудятся 15 сотрудников.</p>',
    },

    infoBlockGrid: {
      column: '3',
      gap: '75',
    },
    itemsListIncludeType: {
      gridClass: 'site-type-grid',
      areaClass: 'site-type-area',
      column: '4',
      gap: '20',
    },
    itemsListInclude: [
      {
        text: 'Сайт',
        titleClass: 'text-center',
        iconName: 'icon_site',
        textClass: 'info-block-item__text--center',
      },
      {
        text: 'CRM система',
        titleClass: 'text-center',
        iconName: 'icon_crm_sistema',
        textClass: 'info-block-item__text--center',
      },
      {
        text: 'Интернет-реклама',
        titleClass: 'text-center',
        iconName: 'icon_internet_reklama',
        textClass: 'info-block-item__text--center',
      },
      {
        text: 'Сквозная аналитика',
        titleClass: 'text-center',
        iconName: 'icon_skvoznaya_analitika',
        textClass: 'info-block-item__text--center',
      },
    ],

    infoBlockList: [
      {
        title: 'Подход',
        text: 'Любая информационная система: сайт, система автоматизации, CRM, ERP — это в первую очередь бизнес-процессы. Ваш бизнес должен получить результат от применении информационных систем, выраженный в деньгах.',
        titleClass: 'text-center',
        iconName: 'processes',
      },
      {
        title: 'Технологии',
        text: 'При индивидуальной разработке есть возможность использовать самые современные технологии. Эта возможность реализуется в каждом новом проекте.',
        titleClass: 'text-center',
        iconName: 'systems',
      },
      {
        title: 'Ценности',
        text: 'Во внутренних процессах нашей организации используются принципы разделения на функции и нацеленности на результат. Мы уважаем наших клиентов также, как себя. Уважаем других участников рынка, считая конкурентную среду полезной для развития отрасли.',
        titleClass: 'text-center',
        iconName: 'paper',
      },
    ],

    sectionTitleChoose: {
      areaClass: 'max-width-18',
      title: 'Выберем индивидуальное решение для вашего бизнеса',
    },

    swiperItemsList: [
      {
        title: 'Сайт',
        titleClass: 'text-center',
        icon: '/img/customers/site.svg',
        iconHover: '/img/customers/hover/site.svg',
        // link: '/development',
      },
      // {
      //   title: 'Коллтрекинг',
      //   titleClass: 'text-center',
      //   icon: '/img/customers/call_tracking.svg',
      //   iconHover: '/img/customers/hover/call_tracking.svg',
      //   // link: '#',
      // },
      // {
      //   title: 'Онлайн консультанты',
      //   titleClass: 'text-center',
      //   icon: '/img/customers/online_konsultanty.svg',
      //   iconHover: '/img/customers/hover/online_konsultanty.svg',
      //   // link: '#',
      // },
      // {
      //   title: 'Информирование клиента',
      //   titleClass: 'text-center',
      //   icon: '/img/customers/informirovanie_klienta.svg',
      //   iconHover: '/img/customers/hover/informirovanie_klienta.svg',
      //   // link: '#',
      // },
      {
        title: 'CRM система',
        titleClass: 'text-center',
        icon: '/img/customers/crm_sistema.svg',
        iconHover: '/img/customers/hover/crm_sistema.svg',
        // link: '/crm',
      },
      {
        title: 'Интернет-реклама',
        titleClass: 'text-center',
        icon: '/img/customers/internet_reklama.svg',
        iconHover: '/img/customers/hover/internet_reklama.svg',
        // link: '/netadv',
      },
      {
        title: 'Сквозная аналитика',
        titleClass: 'text-center',
        icon: '/img/customers/skvoznaya_analitika.svg',
        iconHover: '/img/customers/hover/skvoznaya_analitika.svg',
        // link: '#',
      },
      // {
      //   title: 'Телефония и виртуальная АТС',
      //   titleClass: 'text-center',
      //   icon: '/img/customers/telefoniya_i_virtualnaya_ats.svg',
      //   iconHover: '/img/customers/hover/telefoniya_i_virtualnaya_ats.svg',
      //   // link: '#',
      // },
    ],

    sectionTitleTeam: {
      areaClass: 'max-width-18',
      title: 'Наша команда',
    },

    textBlockTeam: {
      textClass: 'text-center',
      text: '<p>Системы автоматизации и современные сайты это сложный, но необходимый продукт для любого бизнеса. За качество отвечает не только хороший программный код, но и тщательная проработка проекта на стадии проектирования. Мы помогаем вам понять, как всё должно работать для получения ожидаемого результата, а благодаря разработке архитектуры системы или сайта, тестированию и поддержке у бизнеса больше возможностей для расширения. Разработка проекта — комплексный и многоэтапный процесс. Посмотрите, кто будет участвовать в разработке вашей системы.</p>',
    },

    footerButtonData: {
      name: 'Показать команду',
      link: '/team',
    },

    sectionTitleMission: {
      areaClass: 'max-width-18',
      title: 'Миссия',
    },

    textBlockMission: {
      textClass: 'text-center',
      text: 'Сохранять и продлевать жизнь людей. Жизнь дается человеку чтобы создавать, творить, мыслить, радоваться, наслаждаться, приносить пользу и реализовываться. Выполнять последовательности действий, заключенных в бизнес-процессы, могут создаваемые нами информационные системы. Не надо тратить время сотрудника, начальника, руководителя или владельца бизнеса на повторяющиеся процессы, которые может делать система автоматизации бизнеса. Сэкономленное на рутине время лучше потратить на жизнь и занятие действительно полезными вещами.',
    },
  }),
};
</script>

<style lang="stylus" scoped>
.footer-button-pd-about
  padding-bottom: 0

.mission-section--about
  padding-bottom: 4rem

.team-section--about
  margin: 0
  padding: 0
  padding-right: 4px

.team-section--about >>> .angular-back::before
    background-image: none
</style>
