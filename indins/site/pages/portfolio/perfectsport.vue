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
    <TextBlock :data="TextBlock_0"/>
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_1"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <PortFullImg :data="PortFullImg"/>
    <PortCascade :data="PortCascade_1"/>
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
import PortCascade from '~/components/common/PortCascade';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import PortFullImg from '~/components/common/PortFullImg';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';
import QuotationBlock from '~/components/common/QuotationBlock';

const projectTitle = 'Компания Perfectsport';
const projectImgFolder = '/img/portfolioItems/perfectsport';

export default {
  components: {
    AngularBlock,
    PageTitle,
    TextBlock,
    PortLogo,
    PortTopPreview,
    PortFooter,
    SectionTitle,
    PortCascade,
    InfoBlockGrid,
    InfoBlockItem,
    PortFullImg,
    InfoBlockFlex,
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
        text: '<p>Компания Perfect появилась на рынке спортивного питания в 2015-ом году. В 2016-ом году мы познакомились. Весь товар реализовывался через один офлайновый магазин. Компания хотела выйти в онлайн и увеличить продажи. Для этого было решено создать сайт. Изначально планировалась разработка сайта-витрины с выкладкой товаров. В ходе работ была поставлена новая цель — разработать полноценный интернет-магазин.</p>',
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
        title: 'Задача:',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Создать современный Интернет-магазин спортивного питания с уникальным дизайном, индивидуальной разработкой и встроенной информационной системой. Также была поставлена задача по поисковой оптимизации и ведению Интернет-рекламы.</p><p>Мы проанализировали Интернет-магазины спортивного питания. Первые места в поисковой выдаче занимают сайты с устаревшим дизайном, ошибками в верстке и плохой навигацией. Первые позиции им обеспечивает возраст и отсутствие достойных конкурентов. Некоторым сайтам больше 10-ти лет. Это означает, что если разработать современный сайт с удобной навигацией, в работе которого не будет ошибок, он будет иметь сильное конкурентное преимущество.</p>',
      },
      PortCascade_0: {
        images: [
          {
            src: `${projectImgFolder}/cad_1.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_2.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        text: '<p>Сайт оптимизирован под экраны всех устройств. Клиент может посмотреть каталог товарови совершить покупку с компьютера, планшета или смартфона. Сайты с адаптивной версткой выше оцениваются поисковыми системами.</p><p>48% пользователей сайта покупают спортивное питание с телефонов. Это показывает важность адаптивной верстки — половине клиентов удобнее пользоваться телефоном, чем другими устройствами.</p>',
      },
      SectionTitle_1: {
        title: 'Система администрирования',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'В рамках администрирования сайтом изготовлена удобная система работы с заказами и клиентами. С ее помощью ведутся заказы, которые поступили с сайта и по телефону.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Удобная система навигации и поиска по заказам — по каждому клиенту хранится информация об общем количестве и стоимости заказов.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Установленный на сайте call-tracking показывает источники заказов. Внедрена система фильтров и поиска. С помощью этого раздела можно анализировать эффективность рекламных каналов.',
        },
      ],
      PortFullImg: {
        src: `${projectImgFolder}/img_1.png`,
        alt: projectTitle,
        action: 'adaptiveResizeMax',
        width: '1140',
      },
      PortCascade_1: {
        images: [
          {
            srcClass: 'port-cascade-img-phone',
            src: `${projectImgFolder}/cad_3.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_4.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        areaClass: 'port-cascade-with-phone',
        revers: true,
        text: '<p>Такие факторы, как адаптивная верстка и отсутствие ошибок в коде положительно повлияли на позиции сайта в поисковой выдаче.</p><p>Проводились работы по созданию уникального контента и расширению структуры сайта.</p>',
      },
      SectionTitle_2: {
        title: 'Результат работы в цифрах',
      },
      TextBlock_2: {
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: '<p>Всего за период  с 01.02.17 по 31.09.17 сайт принес своим владельцам:</p>',
      },
      InfoBlockFlex_0: {
        column: '4',
        gap: '15',
      },
      PortStatItemList_1: [
        {
          title: '62086',
          under: 'посетителей',
        },
        {
          title: '1971',
          under: 'заказ',
        },
        {
          title: '3276',
          under: 'проданных товаров',
        },
        {
          title: '772',
          under: 'звонка',
        },
      ],
      AngularBlock_0: {
        areaClass: 'port-quotation',
      },
      QuotationBlock: {
        text: '<p>Сайт получился удобным в использовании и красивым. По СЕО - за 3 месяца в десятке Яндекса по запросу "Спортивное питание в Петербурге" и подобным.Так сделали рекламу, что теперь расширяемся и выходим на Российский рынок. Мы благодарим компанию ИНДИНС за качественно выполняемую работу.</p><p class="quot-signature">Спортивное питание "Perfect",<br>директор</p>',
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

      // const description = 'Разработка сайта, маркетинг, проведение рекламных кампаний для организации по продаже спортивного питания. Комплексная работа по привлечению клиентов под ключ.';
      // const keywords = 'спортивное, питание, реклама, сайт, кейс, портфолио, проект';

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
