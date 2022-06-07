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
    <PortCascade :data="PortCascade_1"/>
    <SectionTitle :data="SectionTitle_3"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_4"/>
    <TextBlock :data="TextBlock_0"/>
    <InfoBlockFlex :data="InfoBlockFlex_0">
      <PortStatItem
        v-for="(item, key) in PortStatItemList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockFlex>
    <SectionTitle :data="SectionTitle_5"/>
    <PortFullImg :data="PortFullImg"/>
    <TextBlock :data="TextBlock_1"/>
    <SectionTitle :data="SectionTitle_6"/>
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
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';
import PortFullImg from '~/components/common/PortFullImg';

const projectTitle = 'Фитнес-клуб Gala';
const projectImgFolder = '/img/portfolioItems/gala';

export default {
  name: 'Gala',
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
    PortLineTreeImg,
    InfoBlockFlex,
    PortStatItem,
    PortFullImg,
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
        text: '<p>Разработка сайта, CRM-система, маркетинг</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Современный подход к бизнесу владельца бизнес-центра Б5 коснулся и расположенного в бизнес-центре фитнес-клуба Gala. Современному спортивному комплексу — современный сайт, систему анализа трафика и рекламные кампании.</p>',
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
        title: 'Сайт',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'На сайте представлены связанные между собой разделы абонементов, залов, тренеров и групповых занятий. Это увеличивает количество просмотров страниц и улучшает показатели поведенческих факторов.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Просматривая групповое занятие, посетитель видит, в каком зале оно проходит и какие тренеры его ведут. Можно перейти к тренеру и прочитать про него, или перейти в зал и посмотреть фотографии.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'На странице зала можно посмотреть, какие занятия в нем проводятся, и получить подробную информацию об этих занятиях. Раздел статьи для естественного прироста информации сайта привязан к авторам статей — тренерам.',
        },
      ],
      SectionTitle_1: {
        title: 'Дизайн',
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
        text: '<p>Дизайн сайта выполнен в корпоративных цветах и общем стиле с сайтом бизнес-центра Б5, в котором расположен фитнес-клуб. На сайте гармонично сочетаются минимализм и анимация элементов интерфейса. Знакомиться с информацией, представленной в таком стиле, удобно и приятно. Нет раздражающих элементов и излишней нагрузки информацией.</p>',
      },
      SectionTitle_2: {
        title: 'Система управления и автоматизация',
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
        text: '<p>Для сайта разработана индивидуальная система управления контентом, позволяющая изменять информацию на сайте без наличия специальных знаний. Вся информация связана между собой с помощью удобного выбора нужных пунктов из списка.</p><p>Привязать статью к автору, групповое занятие к помещению или составить расписание групповых занятий можно с помощью простого выбора элементов из редактируемых списков.</p>',
      },
      SectionTitle_3: {
        title: 'Аналитика',
      },
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'В рамках системы управления сайтом создана система анализа входящего трафика. Она основана на собственной системе динамического коллтрекинга и сервере виртуальной АТС.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'В единую систему попадают звонки и заказы обратных звонков. Клиент точно знает, как работают рекламные кампании, сколько генерируется обращений, какие запросы и объявления приводят к звонкам.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Из системы управления сайтом можно прослушать звонки, что позволяет корректировать работу менеджеров отдела продаж.',
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
      SectionTitle_4: {
        title: 'Статистика',
      },
      TextBlock_0: {
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: '<p>Улучшение поведенческих факторов, таких как связанность разделов сайта и удобная навигация, влияет на позиции сайта в поисковых системах.</p>',
      },
      InfoBlockFlex_0: {
        column: '4',
        gap: '15',
      },
      PortStatItemList_1: [
        {
          title: '4,08',
          under: 'страниц на посетителя',
          text: '(Яндекс Метрика)',
        },
        {
          title: '2:37',
          under: 'время на сайте',
          text: '(Яндекс Метрика)',
        },
        {
          title: '3,7',
          under: 'страниц на посетителя',
          text: '(Google Analytics)',
        },
        {
          title: '2:32',
          under: 'время на сайте',
          text: '(Google Analytics)',
        },
      ],
      SectionTitle_5: {
        title: 'Индексация поисковыми системами',
      },
      PortFullImg: {
        src: `${projectImgFolder}/img_1.png`,
        alt: projectTitle,
        action: 'adaptiveResizeMax',
        width: '1140',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Осуществляется контроль индексации сайта поисковыми системами. Сайт успешно переиндексируется, чему способствует целенаправленная работа, наличие нужных технических файлов и метаданных на страницах.</p>',
      },
      SectionTitle_6: {
        title: 'Реклама',
      },
      InfoBlockGrid_2: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_2: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Услуга фитнес-клуба — геозависимый запрос. Людям важно месторасположение клуба, он должен быть рядом с домом или работой.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Местоположение сильно влияет на конверсию объявлений. Созданы и ведутся рекламные кампании с учетом геотаргетинга.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Подобран максимально эффективный радиус показа рекламы при минимальной стоимости генерации звонка клиента.',
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

      // const description = 'Разработка сайта и проведение рекламных кампаний для фитнес-клуба Gala. Проект включает комплекс работ по привлечению клиентов для покупки абонементов в фитнес центр.';
      // const keywords = 'реклама, фитнес, портфолио, кейс';

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
