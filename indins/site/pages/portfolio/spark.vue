<template>
  <div>
    <AngularBlock
      :data="angularBlock"
    >
      <PageTitle :data="{title: pageTitle.title}"/>
      <TextBlock
        :data="{...TextBlock}"
      />
      <PortLogo
        :data="PortLogo"
      />
      <TextBlock
        :data="TextBlock0"
      />
      <SectionTitle
        :data="SectionTitle_0"
      />
      <InfoBlockGrid
        :data="InfoBlockGrid_0"
      >
        <InfoBlockItem
          v-for="(item, key) in InfoBlockList_0"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <PortTopPreview
      :data="PortTopPreview"
      class="spark-project"
    />
    <SectionTitle :data="SectionTitle_1" />
    <TextBlock
      :data="TextBlock_1"
    />
    <SectionTitle :data="SectionTitle_2" />
    <InfoBlockGrid
      :data="InfoBlockGrid_2"
    >
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_2"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle
      :data="SectionTitle_3"
    />
    <TextBlock
      :data="TextBlock_3"
    />
    <SectionTitle :data="SectionTitle_4" />
    <TextBlock
      :data="TextBlock_4"
    />
    <SectionTitle :data="SectionTitle_5" />
    <TextBlock :data="TextBlock_5" />
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
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';

const projectImgFolder = '/img/portfolioItems/spark';
const projectTitle = 'CRM-система для продажи автозапчастей ';
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
    PortLineTreeImg,
    PortCascade,
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
        text: '<p>CRM-система, Автоматизация</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.svg`,
        alt: projectTitle,
      },
      TextBlock0: {
        areaClass: 'port-text port-under-title',
        text: '<p>Компания СПАРК занимается подбором и реализацией автомобильных запасных частей в такие регионы РФ, как Республика Коми, ЯНАО, Магаданская область, Иркутская область, Чукотский АО и другие. На рынке компания уже более 7 лет.</p>',
      },
      PortTopPreview: {
        alt: projectTitle,
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
          iconName: 'spark-icon--orders',
          text: 'Раздел заказов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'spark-icon--notifications',
          text: 'Система оповещений',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'spark-icon--1c',
          text: 'Интеграция с 1C',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'spark-icon--clients',
          text: 'Раздел клиентов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'spark-icon--reports',
          text: 'Формирование отчетов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'spark-icon--profit',
          text: 'Расчет прибыли с заказа',
        },
      ],
      SectionTitle_2: {
        title: 'Требования к проекту',
      },
      InfoBlockGrid_2: {
        gap: '50',
        column: '2',
      },
      InfoBlockList_2: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Организовать возможность работы с клиентами и заказами клиентов, историей работы с клиентами и заказами.</span>',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Разработать специальный функционал для автоматизированного расчета прибыли с каждого заказа.</span>',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Создать функцию оповещения пользователя о том, что заказ собран и не выдан в течение 14 дней, а также о том, что вышел срок поставки.</span>',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Осуществить формирование и вывод отчетов по различным критериям фильтров и поиска за определенный период времени.</span>',
        },
      ],
      SectionTitle_1: {
        title: 'Цель проекта',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Автоматизация обработки заказов и автоматизация формирования отчетных документов. Было необходимо сократить время на поиск информации о конкретном заказе и повысить контроль за своевременной выдачей заказов клиентам. </p>',
      },
      SectionTitle_3: {
        title: 'Раздел «Заказы»',
      },
      TextBlock_3: {
        areaClass: 'port-text',
        text: '<p>Разработан для создания и хранения данных о заказах. В рамках заказа данные о клиенте подставляются автоматически. Есть возможность редактирования списка товаров и добавлена функция внесения данных. Осуществляется контроль за датой поставки и датой отгрузки товара.</p>'
        + '<p>Создан инструментарий для авторасчета цены с помощью установки маржинальной наценки на каждую из позиций индивидуально. Для разграничения реальных заказов и проценки добавлен отдельный интерфейс. В нем есть возможность создавать из одной карточки проценки неограниченное количество заказов как на все позиции проценки, так и на конкретные. В рамках каждой карточки и списка заказов в целом рассчитываются показатели по суммам продаж, затратах на закупку и суммах прибыли.</p>',
      },
      SectionTitle_4: {
        title: 'Раздел «Клиенты»',
      },
      TextBlock_4: {
        areaClass: 'port-text',
        text: '<p>В разделе представлен список клиентов, где у каждого клиента есть собственная карточка. В карточке хранится необходимая информация о клиенте, его автомобилях и данные об автомобиле. Хранятся данные о сделанных данным клиентом заказах, а также предоставлена возможность создать заказ прямо из карточки клиента.</p>',
      },
      SectionTitle_5: {
        title: 'Отчеты и оповещения',
      },
      TextBlock_5: {
        areaClass: 'port-text',
        text: '<p>С помощью разработанного конфигуратора отчетов, руководство имеет возможность сгенерировать отчеты по установленным им параметрам, таким как период, менеджеры, города и прочее.</p>'
        + '<p>В рамках работы системы оповещений, производится контроль по срокам доставки на предмет их нарушения, а также происходит проверка выдачи заказов (выдали его вовремя или нет).</p>',
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
      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style lang="stylus" scoped>
.spark-project
  & >>> .portfolio-container
    padding: 0;
    & img
      box-shadow: none;
</style>
