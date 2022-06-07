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
    <InfoBlockFlex :data="InfoBlockFlex_00">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockItem_00"
        :key="key"
        :data="item"
      />
    </InfoBlockFlex>
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_1"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <PortFullImg :data="PortFullImg"/>
    <SectionTitle :data="SectionTitle_2"/>
    <TextBlock :data="TextBlock_2"/>
    <InfoBlockFlex :data="InfoBlockFlex_0">
      <PortStatItem
        v-for="(item, key) in PortStatItemList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockFlex>
    <AngularBlock :data="AngularBlock_0">
      <QuotationBlock :data="QuotationBlock"/>
    </AngularBlock>
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
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import PortFullImg from '~/components/common/PortFullImg';
import PortStatItem from '~/components/common/PortStatItem';
import QuotationBlock from '~/components/common/QuotationBlock';

const projectTitle = 'ПодборАвто';
const projectImgFolder = '/img/portfolioItems/podborauto';

export default {
  components: {
    AngularBlock,
    PageTitle,
    TextBlock,
    PortLogo,
    PortTopPreview,
    PortFooter,
    SectionTitle,
    InfoBlockFlex,
    InfoBlockItem,
    PortLineTreeImg,
    InfoBlockGrid,
    PortFullImg,
    PortStatItem,
    QuotationBlock,
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
        text: '<p>Разработка сайта, CRM-система, маркетинг</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Компания «ПодборАвто» помогает своим клиентам в&nbsp;подборе и&nbsp;покупке автомобилей более 10-ти лет. В&nbsp;2015-ом году руководитель компании Денис Ерёменко принял решение сделать редизайн сайта. В&nbsp;ходе изучения деятельности компании и&nbsp;проведения анализа выяснилось, что информация о&nbsp;клиентах компании хранилась в&nbsp;трех разных базах, документы формировались вручную. При индивидуальной разработке все эти проблемы можно было решить единым продуктом.</p>',
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
        title: 'Было сделано',
      },
      InfoBlockFlex_00: {
        gridClass: 'fill-two-center-port',
        column: '3',
      },
      InfoBlockItem_00: [
        {
          title: 'Новый сайт',
          text: 'Новый дизайн<br>Логичная структура<br>Адаптивная верстка<br>Микроразметка для поисковых систем<br>Рекламные посадочные страницы<br>Автоматическая публикация портфолио<br>Коллтрекинг и контроль рекламы',
          areaClass: 'narrow-left max-17-xs',
          iconName: 'icon-left ticks',
        },
        {
          title: 'Автоматизация',
          text: 'Размещение информации на сайте<br>Обработка вопросов с сайта<br>Единая база клиентов<br>Ведение договоров подбора и ДКП<br>Формирования документов для ДП и ДКП<br>Статистика деятельности организации<br>Отчеты по сотрудникам и договорам',
          areaClass: 'narrow-left max-17-xs',
          iconName: 'icon-left ticks',
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
      SectionTitle_1: {
        title: 'Новый сайт и автоматизация',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<p class="text-primary text-normal">Поисковая оптимизация</p><p><span class="text-primary">Было:</span><br>Высокие позиции по прямому запросу названия компании Подбор авто. Отсутствие в результатах поиска дополнительных ссылок.</p><p><span class="text-primary">Стало:</span><br>Наличие микроразметки, точная выдача описаний, структурированная индексации, появление дополнительных ссылок, повышение позиций по коммерческим запросам.</p>',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<p class="text-primary text-normal">Система управления и доступ</p><p><span class="text-primary">Было:</span><br>Разрозненные файлы с данными редактировались всеми сотрудниками, отсутствовал контроль и возникала путанница.</p><p><span class="text-primary">Стало:</span><br>Каждый сотрудник имеет персональный доступ в систему и разрешающие роли на работу с информацией. Нельзя скопировать базу клиентов.</p>',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<p class="text-primary text-normal">Учет клиентов и договоров</p><p><span class="text-primary">Было:</span><br>Сделки и клиенты хранились в разных файлах, частично дублировались. Отсутствие возможности видеть единую картину.</p><p><span class="text-primary">Стало:</span><br>Объединение баз в единую связанную  систему. После завершения подобра автоматическая публикация в портфолио на сайте.</p>',
        },
      ],
      PortFullImg: {
        src: `${projectImgFolder}/img_2.jpg`,
        alt: projectTitle,
        action: 'adaptiveResizeMax',
        width: '1140',
      },
      SectionTitle_2: {
        title: 'Результат работы в&nbsp;цифрах',
      },
      TextBlock_2: {
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: '<p>Общая статистика за&nbsp;2017&nbsp;год</p>',
      },
      InfoBlockFlex_0: {
        column: '4',
        gap: '15',
      },
      PortStatItemList_1: [
        {
          title: '97&nbsp;612',
          under: 'посетителей сайта',
        },
        {
          title: '742&nbsp;730',
          under: 'просмотров страниц',
        },
        {
          title: '3,7',
          under: 'глубина просмотра',
        },
        {
          title: '3:52',
          under: 'время на сайте',
        },
      ],
      AngularBlock_0: {
        areaClass: 'port-quotation',
      },
      QuotationBlock: {
        text: '<p>В ходе выполнения работ ребята из ООО “ИНДИНС” всегда были на связи и оперативно реагировали на все мои капризы. Сроки выполнения работ удивили, результатом остался доволен. Огромное спасибо всему коллективу ООО “ИНДИНС”.</p><p class="quot-signature">Денис Еременко<br>ООО "ПодборАвто", генеральный директор</p>',
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

      // const description = 'Разработка сайта и системы автоматизации бизнес-процессов, проведение рекламных кампаний. Автоматизация включает в себя учет клиентов, договоров подбора автомобилей, автоматизацию составления и вывода договоров.';
      // const keywords = 'подбор, авто, автоматизация, сайт, портфолио, кейс, проект';

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
