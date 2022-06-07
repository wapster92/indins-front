<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock2"/>
      <SectionTitle :data="SectionTitle_3"/>
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
    <TextBlock :data="TextBlock_3"/>
    <TextBlock :data="TextBlock_4"/>
    <TextBlock :data="TextBlock_5"/>
    <SectionTitle :data="SectionTitle_1"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_2"/>
    <TextBlock :data="TextBlock_6"/>
    <TextBlock :data="TextBlock_7"/>
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

const projectImgFolder = '/img/portfolioItems/andy';

export default {
  name: 'Andy',
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
        text: '<p>ANDY lab — ведущий производитель корпоративных подарков и брендированных шоколадных наборов. Компания располагает собственным производством, включающим лазерный цех, цех по печати, упаковочный цех, столярный цех, что позволяет производить подарки в короткие сроки по разумным ценам.\n</p>'
        + '<p>Основной целью проекта было создать простую и удобную систему для ведения заказов и работы с клиентами. До обращения в нашу компанию заказы велись только в Excel-таблицах, что выливалось в длительное время обработки заказов и снижало качество их учета. \n</p>',
      },
      SectionTitle_3: {
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
          iconName: 'andy-icon--orders',
          text: 'Раздел заказов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'andy-icon--done',
          text: 'Учет готовности',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'andy-icon--issues',
          text: 'Задачи к заказам',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'andy-icon--clients',
          text: 'Раздел клиентов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'andy-icon--prices',
          text: 'Автоматизация цен',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'andy-icon--roles',
          text: 'Распределение ролей',
        },
      ],
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
      SectionTitle_0: {
        title: 'Задачи',
      },
      TextBlock_3: {
        areaClass: 'port-text',
        text: '<p> Учет. Было необходимо вывести учет работы с клиентами, результатами сделок, информацией по заказам. Заказчик должен понимать, на каком этапе находится заказ, кто работает над ним и какую задачу выполняет, актуальное количество остатков на складе. </p>',
      },
      TextBlock_4: {
        areaClass: 'port-text',
        text: '<p>Контроль. Была потребность автоматизации бизнес-процессов для того, чтобы эффективно управлять и контролировать работу на разных уровнях и этапах сделок. Контроль остатков, сделок и процессов позволяет своевременно вносить коррективы в работу и актуализировать данные.\n</p>',
      },
      TextBlock_5: {
        areaClass: 'port-text',
        text: '<p>Удобство. Нужна была такая система, которая является функциональной, но простой и удобной. Для того, чтобы систему было удобно использовать, она должна быть понятной всем пользователем и иметь необходимые в работе разделы, фильтры, статусы\n</p>',
      },
      SectionTitle_1: {
        title: 'Система',
      },
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Справочники типов задач, единиц измерения, статусов заказов (они отличаются по цветам и меняются автоматически), группы товаров и наборы подарков. Это позволяет разграничивать задачи и быстрее в них ориентироваться',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Наборы товаров. Этот справочник наполняется товарами и их количеством в наборе, в набор включены упаковочные материалы и материалы для декора подарка. Есть возможность наполнить новый заказ материалами отдельно',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Раздел товаров на складе. Он показывает резервы: какое количество товаров забронировано для каждого заказа и отдельный столбец с чистым остатком. Снабженцу понятно, сколько товаров необходимо заказать и для каких заказов',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Раздел заказы. Информация по заказу клиента: сумма, себестоимость, информация по доставке. При изменении цены отдельного товара общая сумма изменяется автоматически. В панели задач отражены все задачи и их статусы',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Раздел задач. Добавление новых задач из данного раздела или из карточки заказа. Пользователь видит только свои задачи. Есть возможность ставить задачи на других пользователей, менять ответственного по задаче. ',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Раздел клиентов. Можно добавлять его как из данного раздела, так и при создании нового заказа. Раздел показывает все данные по клиенту, включая дату последнего заказа, количество заказов в работе и общее количество сделанных заказов',
        },
      ],
      SectionTitle_2: {
        title: 'Итог',
      },
      TextBlock_6: {
        areaClass: 'port-text port-under-title',
        text: '<p>Было: Отсутствие каких-либо инструментов, которые помогают систематизировать заказы, не считая Excel-таблицы. Невозможность оперативно вносить изменения в заказы из-за отсутствия отслеживания актуального статуса. Отсутствие контроля за процессами работы.\n</p>',
      },
      TextBlock_7: {
        areaClass: 'port-text port-under-title',
        text: '<p>Стало: Автоматизированная система создания и ведения заказов, учета и контроля на всех его этапах. Возможность автоматически рассчитывать сумму заказа индивидуально для каждого клиента в зависимости от условий каждой конкретной сделки, а также себестоимость всех заказов. Раздел постановки и выполнения задач.\n</p>',
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
