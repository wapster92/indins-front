<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock2"/>
      <SectionTitle
        :data="SectionTitle_num"
      />
      <InfoBlockGrid
        :data="InfoBlockGrid_num"
        class="seaport-grid"
      >
        <InfoBlockItem
          v-for="(item, key) in InfoBlockList_num"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
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
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_2"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <PortCascade :data="PortCascade_1"/>
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

const projectImgFolder = '/img/portfolioItems/cds';
const projectTitle = 'ЦДС Партнер';

export default {
  name: 'Cds',
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
        text: '<p>CRM-система, поддержка</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>ЦДС Партнер — портал, через который агентства недвижимости работают с застройщиком.</p>',
      },
      SectionTitle_num: {
        areaClass: 'realized',
        title: 'В проекте реализовано',
      },
      InfoBlockGrid_num: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_num: [
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'cds--realtor',
          text: 'Личный кабинет риэлтора',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'cds--manager',
          text: 'Личный кабинет руководителя',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'cds--automation',
          text: 'Автоматизация цен',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'cds--calc',
          text: 'Кредитный калькулятор',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'cds--analytics',
          text: 'Аналитика продаж',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'cds--apartments',
          text: 'ЖК и квартиры',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'cds--agencies',
          text: 'Регистрация агентств',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'cds--management',
          text: 'Управление АН',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'cds--offers',
          text: 'Генератор КП',
        },
      ],
      PortTopPreview: {
        alt: projectTitle,
        srcDesk: {
          img: `${projectImgFolder}/top_back_CDS.png`,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: `${projectImgFolder}/top_phone_CDS.png`,
          action: 'adaptiveResizeMax',
          width: 195,
        },
      },
      SectionTitle_1: {
        title: 'Функции системы:',
      },
      InfoBlockGridOne: {
        column: '3',
        gap: '50',
      },
      InfoBlockListOne: [
        {
          areaClass: 'narrow-left',
          text: '<span class="text-primary text-normal">предоставление информации</span><br> — система дает актуальную информацию об объектах строительства и квартирах: статус, стоимость, скидка. Есть режим просмотра по этажам и стоякам, свободный поиск по параметрам',
          iconName: 'icon-left plus',
        },
        {
          areaClass: 'narrow-left',
          text: '<span class="text-primary text-normal">составление графиков</span><br> — план продаж, мониторинг уровня продаж. Графики учета соответствия плану, роста продаж к концу месяца на основе автоматической системы аналитики',
          iconName: 'icon-left plus',
        },
        {
          areaClass: 'narrow-left',
          text: '<span class="text-primary text-normal">аналитика</span><br> — измерение активности продаж в разрезе стояков и маркетинговых типов помещений. Корректировка цен на квартиры в зависимости от спроса и темпов продаж квартир для наиболее эффективной продажи',
          iconName: 'icon-left plus',
        },
        {
          areaClass: 'narrow-left',
          text: '<span class="text-primary text-normal">ипотечный калькулятор</span><br> — подбор кредитных программ по множеству условий: требования к заемщикам, изменения кредитных ставок, стоимость объектов, специальные условия',
          iconName: 'icon-left plus',
        },
        {
          areaClass: 'narrow-left',
          text: '<span class="text-primary text-normal">корзина</span><br> — автоматическое формирование коммерческих предложений для клиентов агентств или застройщика. Включает информацию о новостройке, квартирах, технических характеристиках объектов',
          iconName: 'icon-left plus',
        },
        {
          areaClass: 'narrow-left',
          text: '<span class="text-primary text-normal">бронирование квартир</span><br> — используется для автоматической продажи. Возможно закреплять клиентов к агентству',
          iconName: 'icon-left plus',
        },
      ],
      PortCascade_0: {
        images: [
          {
            src: `${projectImgFolder}/cad_1_CDS.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_2_CDS.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        text: '<p>Забронировать квартиру можно в три клика. Больше не нужны звонки, согласования, составления и отправления документов.</p><p>Ипотечный калькулятор в четыре раза сократил время подбора сложных кредитных программ для клиентов.</p><p>Сформировать КП можно одним кликом, при этом вы сами выбираете, что хотите в него включить.</p><p>Зарегистрировать агентство в системе легко — просто заполните форму и получите подтверждение менеджера.</p>',
      },
      SectionTitle_2: {
        title: 'В систему входят:',
      },
      InfoBlockGrid_1: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_1: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Пользователи и роли сотрудников ЦДС</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Регистрация и учет агентств недвижимости</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Аналитика продаж с разделением по проектам</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Автоматическая корректировка цен на квартиры</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Бронирование квартир для клиентов агентств</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Ипотечный калькулятор банковских программ</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Описание жилых комплексов</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Раздел новостей и корзина квартир</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Закрепление клиента за агентством</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Автоматическое формирование КП</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Учет договоров агентств и риелторов</span>',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Шахматка новостроек</span>',
        },
      ],
      PortCascade_1: {
        areaClass: 'port-cascade-with-phone',
        revers: true,
        images: [
          {
            srcClass: 'port-cascade-img-phone',
            src: `${projectImgFolder}/cad_32_CDS.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '306',
          },
          {
            src: `${projectImgFolder}/cad_4_CDS.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        text: '<p>На первом этапе информационная система автоматизировала представление внутренней информации о квартирах застройщика агентствам недвижимости.</p><p>В режиме постоянного развития автоматизировано множество смежных процессов. Для агентств недвижимости расширяется функционал, взаимодействие партнеров с компанией ЦДС комфортной и эффективной для всех участников процесса.</p><p>Больше рутинных процессов делается нажатием одной кнопки, освобождая время для полезных дел на благо клиентов и партнеров.</p>',
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
  /* mounted() {
    this.PortFooter.prev = `portfolio-${this.$store.getters['projects/getPrevLink'](this.$route.path)}`;
    this.PortFooter.next = `portfolio-${this.$store.getters['projects/getNextLink'](this.$route.path)}`;
  }, */
};
</script>
