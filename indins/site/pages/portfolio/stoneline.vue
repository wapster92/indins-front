<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock2"/>
    </AngularBlock>
    <PortTopPreview :data="PortTopPreview"/>
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock3"/>
    <SectionTitle :data="SectionTitle_2"/>
    <InfoBlockGrid :data="InfoBlockGridOne">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockListOne"
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

const projectTitle = 'Компания StoneLine';
const projectImgFolder = '/img/portfolioItems/stoneline';

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
    PortCascade,
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
        text: '<p>«Стоунлайн» — это транспортная компания, занимающаяся перевозкой декоративного камня и каменных слэбов. Данная компания, предоставляющая транспортные услуги, имеет автопарк из 12 ГАЗелей, штат из диспетчеров и бухгалтера.</p>'
            + '<p>Основной задачей заказчика было разобраться с расчётами прибыли и систематизировать эти процессы, которые до обращения к нам велись на бумаге.</p>',
      },
      TextBlock3: {
        areaClass: 'port-text',
        text: '<p>Для заказчика было важно разработать и реализовать систему распределения заказов по водителям в разделе «Диспетчеризация». В процессе работы над проектом некоторые разделы и интерфейс менялись, так как одной из основных задач было создать продукт, удобный для пользователей.</p>'
            + '<p>Предлагаемые нами решения основаны на аналитических данных, полученных в результате исследования бизнес-процессов клиента, что позволило создать систему, полностью исключающую бумажную бюрократию.</p>'
            + '<p>Разработанная система позволила увеличить прибыль владельца бизнеса за счёт сокращения затрачиваемого времени на ежедневные рабочие процессы.</p>',
      },

      PortTopPreview: {
        alt: projectTitle,
        srcDesk: {
          img: `${projectImgFolder}/top_back_stoneline.png`,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: `${projectImgFolder}/top_phone_stoneline.png`,
          action: 'adaptiveResizeMax',
          width: 195,
        },
      },
      SectionTitle_1: {
        title: 'О проекте',
      },
      InfoBlockGridOne: {
        column: '3',
        gap: '50',
      },
      InfoBlockListOne: [
        {
          areaClass: 'narrow-left',
          text: 'Систематизация долговых взаимоотношений с контрагентами за оказанные услуги. Приведение всей документации к общему образцу',
          iconName: 'icon-left plus',
        },
        {
          areaClass: 'narrow-left',
          text: 'Полный контроль доходов и расходов за счёт автоматизации рутинных процессов и выведения их на новый уровень работы',
          iconName: 'icon-left plus',
        },
        {
          areaClass: 'narrow-left',
          text: 'Фиксация оборота наличных средств за счёт оцифровки и автоматизации различных процессов, которые ранее велись на бумаге',
          iconName: 'icon-left plus',
        },
      ],
      SectionTitle_2: {
        title: 'Система автоматизации',
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

      // const description = 'Проект по автоматизации работы застройщика, включающий системы аналитики и корректировки цен, кредитные программы, взаимодействие с агентствами недвижимости и другие системы.';
      // const keywords = 'автроматизация, застройщик, строительство, бизнес';

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
