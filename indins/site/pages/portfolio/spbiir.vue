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
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_1"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_2"/>
    <PortCascade :data="PortCascade_1"/>
    <SectionTitle :data="SectionTitle_3"/>
    <TextBlock :data="TextBlock_3"/>
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
import PageTitle from '~/components/common/UI/PageTitle';
import TextBlock from '~/components/common/UI/TextBlock';
import PortLogo from '~/components/common/PortLogo';
import PortTopPreview from '~/components/common/PortTopPreview';
import PortFooter from '~/components/common/PortFooter';
import SectionTitle from '~/components/common/UI/SectionTitle';
import PortCascade from '~/components/common/PortCascade';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';

const projectTitle = 'Санкт-Петербургский институт искусств и реставрации';
const projectImgFolder = '/img/portfolioItems/igospb';

export default {
  components: {
    AngularBlock,
    PageTitle,
    TextBlock,
    PortLogo,
    PortTopPreview,
    PortFooter,
    SectionTitle,
    PortCascade,
    InfoBlockGrid,
    InfoBlockItem,
    PortLineTreeImg,
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
        text: '<p>Разработка сайта, CRM, поддержка</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/SPBIIR_logo.svg`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Санкт-Петербургский институт гуманитарного образования был реорганизован, а&nbsp;на&nbsp;носу был&nbsp;новый 2018 учебный год и&nbsp;набор студентов. Новое руководство обратилось в&nbsp;компанию ИНДИНС за&nbsp;конечной задачей — обеспечить институт студентами. Именно такие задачи «под&nbsp;ключ» выполняются максимально эффективно, так&nbsp;как&nbsp;весь комплекс мероприятий проектируется и&nbsp;проводится в&nbsp;одном информационном поле. Привлеченные внешние маркетологи заказчика предрекали конверсию сайта из&nbsp;средней по&nbsp;нише 0,5%&nbsp;со&nbsp;стоимостью звонка студента 4000 рублей и&nbsp;стоимостью привлечения студента 40000 рублей. Мы&nbsp;данные предположения отвергли и&nbsp;сделали, как и&nbsp;обещали, более эффективный результат. На данный момент институт вырос и реорганизован в <a href="https://szu.ru">Северо-Западный университет</a>. Но&nbsp;обо&nbsp;всем подробнее.</p>',
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
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Сайт Санкт-Петербургского института гуманитарного образования был&nbsp;создан для&nbsp;решения конкретной задачи — привлечения абитуриентов и&nbsp;конвертации их&nbsp;в&nbsp;лидов.</p><p>На&nbsp;сайте спроектированы и&nbsp;размещены разделы, необходимые для&nbsp;выполнения данной задачи: «Направления&nbsp;обучения», «Стоимость&nbsp;обучения», «Абитуриентам». Логично выстроена информация, предоставляющая абитуриентам информацию о&nbsp;порядке действий при&nbsp;поступлении.</p><p>Учитывая специфику деятельности организации и&nbsp;наличие абитуриентов из&nbsp;других городов, на&nbsp;каждой странице сайта размещены панели заказа обратного звонка.</p>',
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
        text: '<p>В&nbsp;рамках единой системы автоматизации раздел управления данными на&nbsp;сайте также автоматизирован. При&nbsp;изменении стоимости обучения или&nbsp;проходного балла на&nbsp;одном из&nbsp;направлений обучения контент на&nbsp;сайте также изменяется. Изменения автоматически происходят на&nbsp;всех страницах, содержащих данный контент.</p>',
      },
      SectionTitle_1: {
        title: 'Аналитика',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Внедрена собственная комбинированная система коллтрекинга, которая точно определяет источники звонков.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Все обращения поступают в единую систему работы с клиентом, где звонки записываются для последующего анализа.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Учитываются все рекламные запросы и объявления, по которым перешли клиенты и заказали обратный звонок.',
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
      SectionTitle_2: {
        title: 'CRM система',
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
        text: '<p>Все обращения автоматически попадают в&nbsp;специально разработанную в&nbsp;рамках единой системы автоматизации CRM&nbsp;систему. Она обрабатывает и&nbsp;фильтрует данные абитуриентов, а&nbsp;именно такие параметры, как&nbsp;проходной балл, номер диплома и&nbsp;другие специализированные данные.</p><p>Для удобства обработки информации о&nbsp;клиентах были созданы разделы «Личное&nbsp;посещение», «Договор», «Тестирование», «Оплата», «Зачисление».</p>',
      },
      SectionTitle_3: {
        title: 'Статистика',
      },
      TextBlock_3: {
        areaClass: 'port-text',
        textClass: 'text-center',
        text: '<p>В&nbsp;рамках проведения рекламных кампаний генерировался трафик в&nbsp;количестве 30&nbsp;звонков в&nbsp;сутки.</p>',
      },
      InfoBlockFlex_0: {
        column: '4',
        gap: '15',
      },
      PortStatItemList_1: [
        {
          title: '522 рубля',
          under: 'стоимость<br>обращения',
        },
        {
          title: '4&nbsp;434 рубля',
          under: 'стоимость<br>клиента',
        },
        {
          title: '4,26',
          under: 'страниц на&nbsp;посетителя',
          text: '(Яндекс Метрика)',
        },
        {
          title: '2:54',
          under: 'время на&nbsp;сайте',
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

      // const description = 'Автоматизация института и набор абитуриентов в институт. Проект включает разработку бренда, логотипа, создание сайта, CRM-системы, проведение рекламных кампаний по набору абитуриентов.';
      // const keywords = 'институт, реклама, автоматизация, абитуриенты';

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
