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
    <SectionTitle :data="SectionTitle_1"/>
    <PortCascade :data="PortCascade_0"/>
    <TextBlock :data="TextBlock_1"/>
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

const projectTitle = 'Компания Завод Контакт';
const projectImgFolder = '/img/portfolioItems/zavodkontakt';

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
        text: '<p>Завод Контакт - компания, занимающаяся изготовлением металлических изделий и&nbsp;имеющая большой опыт в&nbsp;сфере металлообработки. Для&nbsp;деятельности завода, как и&nbsp;для любого промышленного предприятия, самыми важными факторами являются контроль сроков, поставок, качества и&nbsp;конечно рентабельность.</p>'
            + '<p>Цель проекта - снижение количества срывов сроков и&nbsp;автоматизация расчета рентабельности заказов.</p>',
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
      SectionTitle_0: {
        title: 'Задачи:',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'распределенный ролевой ограниченный доступ для&nbsp;работы с&nbsp;ИС различными специалистами только в&nbsp;рамках их&nbsp;функциональных обязанностей',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'учет всех клиентов и&nbsp;заказов предприятия, возможность быстрого поиска по&nbsp;комплексу критериев',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'уведомления и&nbsp;система контроля сроков, имеющая свою уникальную для&nbsp;предприятия логику',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'учет в&nbsp;заказах всех типов и&nbsp;этапов работ по&nbsp;производству металлоизделий, автоматический расчет рентабельности по&nbsp;заказам',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'изменяемый интерфейс под&nbsp;каждого пользователя с&nbsp;возможностью создать собственный вид таблиц и&nbsp;отчетов',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'автоматическое формирование отчетов на&nbsp;основе выборки данных и&nbsp;комплекса фильтров, с&nbsp;учетом разделения доступа на&nbsp;данные',
        },
      ],
      SectionTitle_1: {
        title: 'Описание проекта',
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
        text: '<p>Инженер создает заказ путем сканирования QR-кода из&nbsp;карточки, сформированной в&nbsp;1С&nbsp;менеджерами. При&nbsp;этом, если заказ уже&nbsp;существует, он&nbsp;открывается, если нет, автоматически создается с&nbsp;переносом всех данных из&nbsp;кода в&nbsp;систему. Наполняет данные, с&nbsp;выбором типов работ, необходимых для&nbsp;создания изделия. Добавляет необходимые файлы или заполняет нужные для производства данные. Устанавливает предполагаемый срок готовности.</p><p>Экономист, сканируя код, получает карточку и&nbsp;заполняет нормочасы для выполнения заказа а&nbsp;также вносит финансовые показатели, доступные для просмотра только ему и&nbsp;руководителю.</p><p>Инженер ОТК после выполнения производства принимает и&nbsp;проверяет детали, вносит данные в&nbsp;систему о&nbsp;том, сколько принято, а&nbsp;сколько забраковано.</p>',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Кладовщик принимает детали на&nbsp;склад и&nbsp;вносит количество принятых деталей в&nbsp;систему, при этом автоматически проставляется объем работ и&nbsp;заказ считается выполненным.</p><p>Если предполагаемый срок окончания работ по&nbsp;заказу прошел, однако детали не&nbsp;поступили на&nbsp;склад, всем инженерам ежедневно при входе в&nbsp;систему показывается уведомление о&nbsp;необходимости срочно принять меры по&nbsp;устранению просрочки с&nbsp;возможностями внести комментарий или изменить предполагаемую дату готовности.</p><p>Все действия с&nbsp;каждым заказом фиксируются, изменение каждого поля. Хронологию работы с&nbsp;заказом можно посмотреть с&nbsp;помощью интерфейса временной шкалы заказа.</p><p>Информационная система разработана индивидуально под задачи клиента. Клиент получил программное решение, решающее поставленные бизнес-задачи.</p>',
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

      // const description = 'Проект по автоматизации учета заказов производственной компании, операций производственного цикла, автоматического расчета рентабельности заказов.';
      // const keywords = 'завод, автоматизация, система';

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
