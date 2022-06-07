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
    <SectionTitle :data="SectionTitle_0"/>
    <TextBlock :data="TextBlock_3"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <TextBlock :data="TextBlock_4"/>
    <SectionTitle :data="SectionTitle_1"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <TextBlock :data="TextBlock_5"/>
    <SectionTitle :data="SectionTitle_2"/>
    <TextBlock :data="TextBlock_6"/>
    <InfoBlockGrid :data="InfoBlockGrid_2">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_2"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_3"/>
    <TextBlock :data="TextBlock_7"/>
    <InfoBlockGrid :data="InfoBlockGrid_3">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_3"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_4"/>
    <TextBlock :data="TextBlock_8"/>
    <SectionTitle :data="SectionTitle_5"/>
    <TextBlock :data="TextBlock_9"/>

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
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import PortCascade from '~/components/common/PortCascade';
import PortStatItem from '~/components/common/PortStatItem';

const projectImgFolder = '/img/portfolioItems/mining';

export default {
  name: 'Mining',
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
    PortLineTreeImg,
    PortCascade,
    PortStatItem,
  },
  mixins: [
    meta,
    checkMenu,
  ],

  async asyncData({ app: { $xhr }, route, error }) {
    const url = route.path.split('/')[2];
    const metaRequest = new Simple(`/api/project/meta-data/${url}`);
    try {
      const metaData = await $xhr.send(metaRequest)
        .then(res => res.data.data);

      if (metaData.deletedAt !== null) {
        return error({ statusCode: 404 });
      }

      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },

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
        title: this.tileTitle,
      },
      TextBlock: {
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: '<p>Разработка сайта, CRM-система, маркетинг</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: this.tileTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Уже 10 лет OOO «СПбЭК-Майнинг» работает в области горнорудной промышленности, оказывая инжиниринговые услуги и осуществляя поставки оборудования по автоматизации, автоматизированному электроприводу, электрооборудованию, электроснабжению. Предоставляет полный комплекс инженерно-технических услуг.</p>',
      },
      PortTopPreview: {
        alt: this.tileTitle,
        srcDesk: {
          img: `${projectImgFolder}/top_back.webp`,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: `${projectImgFolder}/top_phone.webp`,
          action: 'adaptiveResizeMax',
          width: 195,
        },
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
          iconName: 'mining--orders',
          text: 'Заказы на производство',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mining--card',
          text: 'Технологическая карта',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mining--operations',
          text: 'Учет операций',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mining--analytics',
          text: 'Аналитика готовности заказа',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mining--materials',
          text: 'Учет материалов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mining--automation',
          text: 'Автоматизация работы',
        },
      ],
      SectionTitle_0: {
        title: 'Почему обратились к нам',
      },
      TextBlock_3: {
        areaClass: 'port-text',
        text: '<p>Клиенту не подходили готовые решения, потому что они не решали его проблемы полностью. Отсутствовали системы учета, практически все записи велись только в таблицах в EXCEL.\n'
          + 'Слабым местом был учет технологических процессов на производстве, таких как:</p>',
      },
      InfoBlockGrid_0: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_0: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Реактивность работы системы. Если появляется потребность в материалах и выполнении операций, то сотрудники мгновенно об этом узнают',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Графики готовности и успеваемости позволяют в реальном времени реагировать на процесс производства, тем самым ускоряя его',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Разработка отдельного раздела для Руководства помогает гораздо лучше контролировать весь процесс производства',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Появилась возможность выгружать компоненты из 1С, благодаря тому, что была произведена синхронизация системы',
        },
      ],
      SectionTitle_1: {
        title: 'Система управления и автоматизации',
      },
      TextBlock_4: {
        areaClass: 'port-text',
        text: '<p>Самой важной проблемой клиента было отсутствие возможности контролировать производство в полной мере. Не было понимания, кто и чем занят в текущий момент, когда будет произведена поставка компонентов для производства, сколько компонентов осталось на складе, сделан ли заказ недостающих компонентов. Отсутствовала единая система для всех сотрудников, не было сквозной аналитики. Без автоматизации было сложно контролировать большое предприятие.</p>',
      },
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Отсутствие технологической карты производства изделий\n'
            + 'компании',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Контроль поставки компонентов производства и складской учет',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Назначение операций, контроль их выполнения и сроков производства',
        },
      ],
      SectionTitle_2: {
        title: 'Раздел «Заказы»',
      },
      TextBlock_5: {
        areaClass: 'port-text',
        text: '<p>Самой большой сложностью было продумать логику работы производств, снабженца и кладовщика. Самым важным было правильно выстроить последовательность работы системы (порядок действий и последующие результаты). Очень большое внимание уделялось согласованности действий.</p>',
      },
      InfoBlockGrid_2: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_2: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Согласование руководителя производства. Заказ может корректироваться, вносятся правки и после этого все утверждается нажатием одной кнопки',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'После согласования заказа руководителем менеджеру приходит уведомление со ссылкой на заказ',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Согласование с заказчиком. Есть возможность отмены заказа и отправки на согласование с техническим и коммерческим директорами ',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Директорам приходят оповещения о согласовании на почту. У каждого директора своя кнопка подтверждения, что позволяет всем видеть этапы согласования',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'После согласования директорами руководителю производства приходит уведомление. Далее из согласованного заказа создается Заявка',
        },
      ],
      InfoBlockGrid_3: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_3: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Для удобства работы созданы отдельные листы контроля за поставкой материалов по заявке, есть возможность браковать компоненты ',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Есть отдельный лист операций, где доступны функции принудительного запуска операций, если \n'
            + 'их что-то задерживает',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Созданы блоки комментариев, можно вести переписку со всеми сотрудниками, сообщения руководителя выделяются красным цветом',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Есть возможность контроля успеваемости производства с помощью графиков и коэффициентов ',
        },
      ],
      SectionTitle_3: {
        title: 'Раздел «Заявки на производство»',
      },
      PortCascade_0: {
        images: [
          {
            src: `${projectImgFolder}/cad_1.png`,
            alt: this.tileTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_2.png`,
            alt: this.tileTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        text: '<p>Разработаны рекламные кампании, учитывающие территориальные факторы. Встроенная в систему автоматизации система аналитики четко показывает в режиме реального времени результат ведения рекламных кампаний, количество обращений, по каким объявлениям, с каких рекламных источников и по каким запросам пришли обратившиеся клиенты.</p>',
      },
      PortLineTreeImg: {
        images: [
          {
            src: `${projectImgFolder}/line_1.png`,
            alt: this.tileTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
          {
            src: `${projectImgFolder}/line_2.png`,
            alt: this.tileTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
          {
            src: `${projectImgFolder}/line_3.png`,
            alt: this.tileTitle,
            action: 'adaptiveResizeMin',
            width: '340',
          },
        ],
      },
      TextBlock_6: {
        areaClass: 'port-text port-under-title',
        text: '<p>Поступивший заказ вводится менеджером в систему. Наполняется карточка заказа необходимыми данными, есть возможность ручного заполнения, а есть шаблоны (эталонные изделия, где прописаны наименования и полная структура изделий).  Далее менеджер отправляет заказ на согласование. Здесь 4 этапа: </p>',
      },
      TextBlock_7: {
        areaClass: 'port-text port-under-title',
        text: '<p>После создания заявки на производство руководитель начинает с ней работать. Наполняет изделия подчиненными изделиями – создает полную структуру технологической карты. Для удобства наполнения и создания структуры изделий в данном разделе также есть эталонные изделия (шаблоны). При создании нового изделия достаточно выбрать изделие из шаблона или изменить данные и сохранить эталонное изделие (например, если изменилось в процессе производства)</p>',
      },
      SectionTitle_4: {
        title: 'Раздел «Снабжение»',
      },
      TextBlock_8: {
        areaClass: 'port-text port-under-title',
        text: '<p>В данном сегменте два раздела. Первый раздел — это Заказ компонентов, там отображаются даты заказа, даты предварительного поступления материалов, дата фактического поступления и количество поступивших материалов. Второй раздел отвечает за обеспечение офиса и производства всем необходимым, в нем заказы могут размещать все работники компании.</p>',
      },
      SectionTitle_5: {
        title: 'Раздел «Кладовщик»',
      },
      TextBlock_9: {
        areaClass: 'port-text port-under-title',
        text: '<p>Данный раздел предназначен для выдачи компонентов в производство. Имеет дополнительные разделы и справочники для продуктивной работы производства. Система на данный момент продолжает развиваться.</p>',
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

  mounted() {
  // this.PortFooter.prev = `portfolio-${this.$store.getters['projects/getPrevLink'](this.$route.path)}`;
  // this.PortFooter.next = `portfolio-${this.$store.getters['projects/getNextLink'](this.$route.path)}`;
  },
};
</script>

<style lang="stylus" scoped>
.port-top-preview-area
  & >>> .portfolio-container
    .port-tp-desk > img {
      box-shadow: none;
    }
    padding: 0 14px;
</style>