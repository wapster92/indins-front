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
    <PortFullImg :data="PortFullImg"/>
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock_1"/>
    <SectionTitle :data="SectionTitle_2"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
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
import PortFullImg from '~/components/common/PortFullImg';

const projectTitle = 'Проект-Монтаж';
const projectImgFolder = '/img/portfolioItems/proektmontag';

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
        text: '<p>ERP-система</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Проектная организация ООО&nbsp;Проект-Монтаж обратилась в&nbsp;компанию ИНДИНС за&nbsp;информационной системой для&nbsp;систематизации данных клиентов и&nbsp;изготавливаемых проектов. В&nbsp;ходе совместного обсуждения и&nbsp;исследования деятельности организации были выявлены процессы, автоматизация которых значительно ускорила&nbsp;бы&nbsp;работу с&nbsp;документами.</p>',
      },

      PortTopPreview: {
        alt: projectTitle,
        srcDesk: {
          img: `${projectImgFolder}/top_back_pr.png`,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: `${projectImgFolder}/top_phone_pr.png`,
          action: 'adaptiveResizeMax',
          width: 195,
        },
      },
      SectionTitle_0: {
        title: 'Функции системы:',
      },
      InfoBlockGrid_0: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_0: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Учет всех клиентов организации',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Учет всех проектов организации',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Контроль стадий ведения проектов',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Хранение документов по проекту',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Ведение проекта, комментарии сотрудников',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Распределенный доступ сотрудников и учет действий',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Контроль и учет электронного и бумажного документооборота',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Контроль сроков окончания проекта (с предупреждающими оповещениями)',
        },
      ],
      PortFullImg: {
        src: `${projectImgFolder}/img_2.png`,
        alt: projectTitle,
        action: 'adaptiveResizeMax',
        width: '1140',
      },
      SectionTitle_1: {
        title: 'Автоматизация',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Для&nbsp;клиента была разработана система автоматизации учета клиентов и&nbsp;проектов. Информационная система была спроектирована и&nbsp;построена на&nbsp;основе параметров, по&nbsp;которым необходимо фильтровать данные. Для&nbsp;проектов внедрены стадии производства, внесены специальные параметры для&nbsp;гибкой фильтрации и&nbsp;экспорт данных в&nbsp;Excel. Внедрен учет оплат и&nbsp;учет обмена как&nbsp;электронными, так&nbsp;и&nbsp;бумажными документами. Система комментирования и&nbsp;хранения файлов к&nbsp;проектам сделала ведение проектов более прозрачным и&nbsp;наглядным. Специальная подсистема контроля сроков предупреждает о&nbsp;скором приближении сроков сдачи проекта и&nbsp;запускает процессы активизации работы и&nbsp;повышенного контроля за&nbsp;данными проектами.</p>',
      },
      SectionTitle_2: {
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
          text: 'распределен доступ всех сотрудников организации, каждый из&nbsp;которых имеет ограниченный своими функциями доступ к&nbsp;системе',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'система автоматизации сэкономила значительное время менеджеров на&nbsp;ведение и&nbsp;управление проектами',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'система автоматизации сэкономила две&nbsp;трети рабочего времени администратора на&nbsp;учет проектов и&nbsp;документооборота',
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

      // const description = 'Автоматизация учета и ведения проектов для проектной организации. Единый реестр проектов, система поиска, отчетов и уведомлений, возможность работать с внутренним хранилищем файлов проектов.';
      // const keywords = 'проектная, организация, автоматизация, кейс';

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
