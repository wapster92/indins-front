<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock2"/>
      <SectionTitle :data="SectionTitle_5"/>
      <InfoBlockGrid :data="InfoBlockGrid_2">
        <InfoBlockItem
          v-for="(item, key) in InfoBlockList_2"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <PortTopPreview :data="PortTopPreview"/>
    <!-- <ProjectHeader
      :page-title="pageTitle"
      :text-block="textBlock"
      :port-logo="portLogo"
      :text-block-advanced="textBlockAdvanced"
      :port-top-preview="portTopPreview"
    />-->
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
    <InfoBlockFlex :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockFlex>
    <SectionTitle :data="SectionTitle_2"/>
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_3"/>
    <TextBlock :data="TextBlock_3"/>
    <PortFullImg :data="PortFullImg"/>
    <SectionTitle :data="SectionTitle_4"/>
    <InfoBlockFlex :data="InfoBlockFlex_0">
      <PortStatItem
        v-for="(item, key) in PortStatItemList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockFlex>
    <PortFooter :data="PortFooter"/>
  </div>
</template>

<script>
import { Simple } from 'core-xhr';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import AngularBlock from '~/components/common/AngularBlock';
import TextBlock from '~/components/common/UI/TextBlock';
import PageTitle from '~/components/common/UI/PageTitle';
import PortTopPreview from '~/components/common/PortTopPreview';
import PortFooter from '~/components/common/PortFooter';
import SectionTitle from '~/components/common/UI/SectionTitle';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import PortCascade from '~/components/common/PortCascade';
import PortFullImg from '~/components/common/PortFullImg';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';
import PortLogo from '~/components/common/PortLogo';
import ProjectHeader from '../../components/common/ProjectHeader';

const projectTitle = 'Разработка сайта санатория им. Н. И. Пирогова';
const projectImgFolder = '/img/portfolioItems/sakipirogova';

export default {
  components: {
    ProjectHeader,
    AngularBlock,
    TextBlock,
    PageTitle,
    PortTopPreview,
    PortFooter,
    SectionTitle,
    InfoBlockGrid,
    InfoBlockItem,
    PortLineTreeImg,
    PortCascade,
    PortFullImg,
    PortLogo,
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
      pageTitle: {
        title: projectTitle,
      },
      angularBlock: {
        areaClass: 'main-title team-title',
        sawBottom: true,
      },
      SectionTitle_5: {
        areaClass: 'realized',
        title: 'В проекте реализовано',
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Санаторий имени Н.&nbsp;И.&nbsp;Пирогова Министерства обороны России – одно из&nbsp;ведущих многопрофильных санаторно-курортных учреждений России, осуществляющих медицинскую деятельность по&nbsp;170 видам услуг.</p>',
      },

      PortLogo: {
        src: `${projectImgFolder}/logo.svg`,
        alt: projectTitle,
      },
      SectionTitle_0: {
        title: 'Цели проекта',
      },
      InfoBlockGrid_2: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_2: [
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sakipirogova-icon--booking',
          text: 'Бронирование номеров',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sakipirogova-icon--loyalty',
          text: 'Система лояльности',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sakipirogova-icon--romi',
          text: 'Коллтрекинг и ROMI',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sakipirogova-icon--payment',
          text: 'Онлайн-оплата',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sakipirogova-icon--contract',
          text: 'Формирование договора',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'sakipirogova-icon--analytics',
          text: 'Аналитика',
        },
      ],
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Удобный интерфейс для&nbsp;подачи заявок на&nbsp;лечение от&nbsp;граждан льготной категории Министерства обороны',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Генерация запросов на&nbsp;санаторно-курортное лечение для&nbsp;частных лиц',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Сквозная аналитика при&nbsp;ведении рекламных кампаний по&nbsp;привлечению клиентов.',
        },
      ],
      PortLineTreeImg: {
        images: [
          {
            src: `${projectImgFolder}/line_1.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
          {
            src: `${projectImgFolder}/line_2.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
          {
            src: `${projectImgFolder}/line_3.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
        ],
      },
      SectionTitle_1: {
        title: 'Требования к проекту',
      },
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Интеграция во&nbsp;внутреннюю систему учета и&nbsp;регистрации обращений льготной категории граждан',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Разработка и&nbsp;внедрение собственной системы сквозной аналитики, включающей коллтрекинг и&nbsp;телефонию',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Структурированное представление информации о&nbsp;направлениях и&nbsp;методах лечения',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Обеспечение размещения информации в&nbsp;рамках единого корпоративного стиля организации',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Соблюдение требований к&nbsp;размещению информации в&nbsp;сети Интернет для&nbsp;государственных организаций',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Реализация версии сайта для&nbsp;людей с&nbsp;ограничениями по&nbsp;зрению',
        },
      ],
      SectionTitle_2: {
        title: 'Управление данными',
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
        text: '<p>Для&nbsp;размещения контента создана система управления контентом, содержащая 27 разделов. Она содержит разделы управления отзывами, услугами и&nbsp;ценами, номерами, систему аналитики обращений и&nbsp;коллтрекинга.</p><p>Несмотря на&nbsp;размеры системы управления данными, управление контентом не&nbsp;требует специальных знаний, нет&nbsp;необходимости знать принципы разметки, достаточно внести или изменить данные в&nbsp;соответствующем поле о&nbsp;площади номера или в&nbsp;отдельное поле добавить новое название услуги и&nbsp;цену. При&nbsp;этом информация появится на&nbsp;сайте в&nbsp;соответствующем месте и&nbsp;в&nbsp;соответствии с&nbsp;общим стилем сайта.</p>',
      },
      SectionTitle_3: {
        title: 'Аналитика и коллтрекинг',
      },
      TextBlock_3: {
        areaClass: 'port-text',
        text: '<p>Создана и&nbsp;интегрирована в&nbsp;код сайта собственная система комбинированного коллтрекинга, добавлено 14 номеров телефонов для&nbsp;ротации в&nbsp;рамках разного географического таргетинга. Этого достаточно для&nbsp;получения объективной статистики. В&nbsp;рамках интерфейса системы управления маркетолог организации может отслеживать по&nbsp;какому рекламному запросу и&nbsp;с&nbsp;какой рекламной площадки пришел позвонивший посетитель сайта. Все формы на&nbsp;сайте учитываются в&nbsp;системе аналитики, включая рекламные запросы и&nbsp;объявления, вне&nbsp;зависимости от&nbsp;номеров коллтрекинга. Подмена номеров производится внутренним кодом сайта сразу при&nbsp;загрузке внешней части сайта, а&nbsp;не&nbsp;подменой после загрузки страниц.</p>',
      },
      TextBlock: {
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: '<p>Разработка сайта, CRM-система, маркетинг</p>',
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
      PortFullImg: {
        src: `${projectImgFolder}/img_1.jpg`,
        alt: projectTitle,
        action: 'adaptiveResizeMax',
        width: '1140',
      },
      SectionTitle_4: {
        title: 'Статистика',
      },
      InfoBlockFlex_0: {
        column: '4',
        gap: '15',
      },
      PortStatItemList_1: [
        {
          title: '3,08',
          under: 'глубина просмотра',
          text: '(Яндекс Метрика)',
        },
        {
          title: '3:43',
          under: 'время на сайте',
          text: '(Яндекс Метрика)',
        },
        {
          title: '5,3',
          under: 'глубина просмотра',
          text: '(Google Analytics)',
        },
        {
          title: '4:51',
          under: 'время на сайте',
          text: '(Google Analytics)',
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

      // const description = 'Проект по разработке каталога брокеров Форекс, позволяющий быстрой найти нужного брокера с помощью гибкой системы фильтров. Проект включает SEO сайта.';
      // const keywords = 'сайт, форекс, портфолио, SEO';

      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
