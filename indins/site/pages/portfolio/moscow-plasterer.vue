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
    <InfoBlockGrid :data="InfoBlockGridOne">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockListOne"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_2"/>
    <TextBlock :data="TextBlock3"/>
    <SectionTitle :data="SectionTitle_3"/>
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
import PortCascade from '~/components/common/PortCascade';

const projectTitle = 'Московский штукатур';
const projectImgFolder = '/img/portfolioItems/moscow-plasterer';

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
        text: '<p>CRM-система</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Московский штукатур — это компания, занимающаяся машинной штукатуркой в Москве и московской области. '
            + 'Основным желанием заказчика была система автоматизации, которая позволит максимально точно контролировать '
            + 'все этапы заказа, а также поможет равномерно распределить нагрузку на бригады и позволит избежать простоев '
            + 'в работе. </p>',
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
      SectionTitle_1: {
        title: 'До обращения к нам:',
      },
      InfoBlockGridOne: {
        column: '3',
        gap: '50',
      },
      InfoBlockListOne: [
        {
          areaClass: 'narrow-left',
          text: '<span class="text-primary text-normal">До начала сотрудничества</span><br>все заметки и документация велась в Exсel, что сказывалось на качестве и скорости работы сотрудников.',
          iconName: 'icon-left plus',
        },
        {
          areaClass: 'narrow-left',
          text: '<span class="text-primary text-normal">Не было удобного</span><br> инструментария для ведения и фиксации заказов, контроля сроков выполнения заказов, некоторые данные терялись.',
          iconName: 'icon-left plus',
        },
        {
          areaClass: 'narrow-left',
          text: '<span class="text-primary text-normal">Отсутствовало понимание</span><br> загруженности бригад, поэтому нагрузка иногда распределялась некорректно или же бригады простаивали.',
          iconName: 'icon-left plus',
        },
      ],
      SectionTitle_2: {
        title: 'Какая работа была проделана',
      },
      TextBlock3: {
        areaClass: 'port-text',
        text: '<p>Была разработана ERP-система под нужды заказчика для упрощения и ускорения работы сотрудников.<br/> '
            + 'Введен инструментарий для более качественного ведения заказов. </p>',
      },
      SectionTitle_3: {
        title: 'Функции системы:',
      },
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary">Контроль загрузки станков</span><br/> с помощью календаря, а также возможность контролировать все стадии заказов.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary">Назначение бригад для работ</span><br/> над заказом, выбор типа работ, индикаторы занятых дат и бригад в календаре.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary">Удобное ведение заказов,</span><br/> контроль сроков их выполнения, контроль количества замеров и отказных заявок.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary">Формирование необходимых</span><br/> документов для разных заказчиков (2 шаблона договора) из имеющихся в базе данных.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary">Удобный справочник хранения</span><br/> юридических лиц с возможностью добавления клиента с разными статусами клиента (ООО, ИП, физ. лицо).',
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

      // const description = 'Разработали ERP-систему для компании "Московский штукатур", которая позволила автоматизировать рабочие процессы и равномерно распределить нагрузку на бригады. Это позволило повысить эффективность и избежать простоев в работе.';
      // const keywords = 'ведение, заказов, справочник, контроль, московский, штукатур, ERP, система';

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
