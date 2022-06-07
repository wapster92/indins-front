<template>
  <div class="duoasia">
    <AngularBlock :data="angularBlock">
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock2"/>
      <SectionTitle :data="SectionTitle_2"/>
      <InfoBlockGrid :data="InfoBlockGrid_0">
        <InfoBlockItem
          v-for="(item, key) in InfoBlockList_0"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <PortTopPreview :data="PortTopPreview"/>
    <SectionTitle :data="SectionTitle_0"/>
    <TextBlock :data="TextBlock_0"/>
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock_1"/>
    <PortFooter :data="PortFooter"/>
  </div>
</template>

<script>
import { meta } from '@/mixins';
import checkMenu from '@/mixins/checkMenu';
import { Simple } from 'core-xhr';
import AngularBlock from '~/components/common/AngularBlock';
import PageTitle from '~/components/common/UI/PageTitle';
import TextBlock from '~/components/common/UI/TextBlock';
import PortLogo from '~/components/common/PortLogo';
import PortTopPreview from '~/components/common/PortTopPreview';
import PortFooter from '~/components/common/PortFooter';
import SectionTitle from '~/components/common/UI/SectionTitle';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';

const projectTitle = 'Ресторан Duo Asia';
const projectImgFolder = '/img/portfolioItems/duoasia';

export default {
  name: 'Duoasia',
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
  },
  mixins: [
    meta,
    checkMenu,
  ],

  data: () => ({
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
    // text: '<p>ERP-система</p>',
    },
    PortLogo: {
      src: `${projectImgFolder}/logo.png`,
      srcClass: 'duoasia-logo',
      alt: projectTitle,
    },
    TextBlock2: {
      areaClass: 'port-text',
      text: '<p>Сеть элитных ресторанов мировой кухни. В&nbsp;2019 году Ресторан «Harvest» занял 92&nbsp;место в&nbsp;ТОП-100 лучших ресторанов мира и 4&nbsp;место в&nbsp;рейтинге «Where&nbsp;to&nbsp;eat&nbsp;St.&nbsp;Peterburg». Ресторан «ТарТар&nbsp;Бар» в&nbsp;этом&nbsp;же рейтинге занял 9–е&nbsp;место. </p><p>Заказчик поставил перед нами следующие задачи: решение проблемы с&nbsp;постоянной переменой бронирования столов и выведение работы с клиентами на&nbsp;новый&nbsp;уровень. В&nbsp;глобальном отношении было необходимо предоставить клиентам возможность бронировать стол&nbsp;на&nbsp;любую дату из&nbsp;любой точки земного&nbsp;шара.</p>',
    },
    SectionTitle_2: {
      areaClass: 'realized',
      title: 'В проекте реализовано',
    },
    InfoBlockGrid_0: {
      column: '3',
      gap: '50',
    },
    InfoBlockList_0: [
      {
        areaClass: 'max-17-xs flex-start',
        iconName: 'duoasia-icon--phone',
        text: 'Телефония и смс',
      },
      {
        areaClass: 'max-17-xs flex-start',
        iconName: 'duoasia-icon--loyalty',
        text: 'Система лояльности',
      },
      {
        areaClass: 'max-17-xs flex-start',
        iconName: 'duoasia-icon--chairs',
        text: 'Учет посадочных мест',
      },
      {
        areaClass: 'max-17-xs flex-start',
        iconName: 'duoasia-icon--tables',
        text: 'Бронирование столиков',
      },
      {
        areaClass: 'max-17-xs flex-start',
        iconName: 'duoasia-icon--booking',
        text: 'Сетка бронирования',
      },
      {
        areaClass: 'max-17-xs flex-start',
        iconName: 'duoasia-icon--hostess',
        text: 'Терминал хостеса',
      },
      {
        areaClass: 'max-17-xs flex-start',
        iconName: 'duoasia-icon--clients',
        text: 'База клиентов сети',
      },
      {
        areaClass: 'max-17-xs flex-start',
        iconName: 'duoasia-icon--attendance',
        text: 'Учет посещаемости',
      },
      {
        areaClass: 'max-17-xs flex-start',
        iconName: 'duoasia-icon--process',
        text: 'Автоматизация процессов',
      },
    ],
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
      title: 'История проекта',
    },
    TextBlock_0: {
      areaClass: 'port-text',
      text: '<p>До обращения в&nbsp;нашу компанию все&nbsp;записи, касающиеся бронирования столиков для клиентов велись&nbsp;вручную. Это занимало много времени и&nbsp;не&nbsp;являлось удобным для&nbsp;сотрудников&nbsp;ресторана. Необходимо было создать систему, которая работает быстро&nbsp;и&nbsp;позволяет менять данные оперативно, для&nbsp;повышения лояльности постоянных клиентов заведения.</p><p>Была реализована сетка бронирования&nbsp;столов, которая позволила объединять в&nbsp;одну бронь несколько столов и менять последующую бронь&nbsp;между&nbsp;несколькими столами. Сетка бронирования — своеобразное представление диаграммы Ганта на&nbsp;каждый отдельный стол ресторана с&nbsp;возможностью фиксирования различных опций.</p>',
    },
    SectionTitle_1: {
      title: 'Автоматизация',
    },
    TextBlock_1: {
      areaClass: 'port-text',
      text: '<p>Автоматизация рабочих процессов стала комплексным решением проблем по&nbsp;увеличению эффективности наполнения заведений. Это&nbsp;решило проблему учёта пропущенных и&nbsp;входящих звонков (вплоть до&nbsp;иностранных&nbsp;клиентов) во&nbsp;время интенсивной работы хостесс, упростило регистрацию данных&nbsp;о&nbsp;заказах клиентов с&nbsp;учётом всех возможных изменений в бронировании мест, а&nbsp;также&nbsp;учёта вознаграждения партнёров. Сокращение количества ошибок при бронировании мест в&nbsp;заведении.</p>',
    },
  }),
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

      // const description = 'Сеть элитных ресторанов мировой кухни.';
      // const keywords = 'ресторан, японская кухня';

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
