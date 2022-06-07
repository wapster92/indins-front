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
    <PortCascade :data="PortCascade_1"/>
    <TextBlock :data="TextBlock_1"/>
    <PortLineTreeImg :data="PortLineTreeImg"/>
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
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';
import QuotationBlock from '~/components/common/QuotationBlock';

const projectTitle = 'Компания Xpresent';
const projectImgFolder = '/img/portfolioItems/xpresent';

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
    PortLineTreeImg,
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
      // text: '<p>Разработка сайта, CRM-система, поддержка</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        srcClass: 'port-xpresent',
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Летом 2017 года к нам обратились с вопросом создания проекта интернет-магазина с уникальными внешними и внутренними инструментами. Эти инструменты должны выполнять ряд задач, например, позволять конструировать свой уникальный подарок из предложенных услуг для себя, близких и знакомых и позволять оптимизировать расходы на SEO-продвижение сайта.</p>',
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
        title: 'Сайт',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Разработанный функционал сайта позволяет не только выбрать готовый набор, но и собрать собственный. При этом, заказывая электронный сертификат, есть возможность выбрать его внешний вид и написать поздравление. Интернет-магазин позволяет посетителю приобрести товар и активировать его.</p>',
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
        text: '<p>Для того, чтобы сайтом было приятно и удобно пользоваться, при наведении курсора на набор впечатлений происходит открытие дополнительной информации (впечатления, входящие в набор). Подгрузка информации происходит без обновления страницы.</p>',
      },
      SectionTitle_1: {
        title: 'Автоматизация',
      },
      PortCascade_1: {
        images: [
          {
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
        revers: true,
        text: '<p>Интернет-магазин обрабатывает заказы и передает данные в CRM систему для учета клиентов. Внедрен уникальный SEO модуль, генерирующий страницы с товарами, исходя из поисковых запросов посетителей, что позволило сайту разрастись до более чем 6500 страниц и выйти в ТОП 10 поисковой выдачи по основным запросам тематики. Купоны для оформленных заказов генерируются автоматически. Есть возможность создания промо-купонов со скидкой в виде фиксированной суммы или в процентах. Имеется настройка по количеству использований и дате действия купона.</p>',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>В рамках автоматизации разработан функционал для работы с партнерами, а именно: ведение данных о партнерах, привязка партнера к определенному впечатлению, корректировка наценки на товар и личный кабинет партнера, в котором он может работать с сертификатами. Также в личном кабинете партнера есть информация о полученной прибыли и ранее погашенных сертификатах.</p>',
      },
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
      SectionTitle_2: {
        title: 'Статистика',
      },
      TextBlock_2: {
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: '<p>Проект окупился клиенту уже через 4 месяца и с 5-го приносит чистую прибыль. Сотрудничество с Xpresent продолжается и в рамках него происходит постоянная модернизация проекта и внедряются новые модули, которые продумываются совместными усилиями.</p>',
      },
      InfoBlockFlex_0: {
        column: '4',
        gap: '15',
      },
      PortStatItemList_1: [
        {
          title: '3:47',
          under: 'время на сайте',
          text: '(ПС Яндекс)',
        },
        {
          title: '4,12',
          under: 'глубина просмотра',
          text: '(ПС Яндекс)',
        },
        {
          title: '3:37',
          under: 'время на сайте',
          text: '(ПС Google)',
        },
        {
          title: '5,66',
          under: 'глубина просмотра',
          text: '(ПС Google)',
        },
      ],
      AngularBlock_0: {
        areaClass: 'port-quotation',
      },
      QuotationBlock: {
        text: '<p>Очень довольны результатом! Это настоящая команда профессионалов, которая сделала нам сайт, полностью удовлетворяющий нашим потребностям. Были учтены все наши требования и пожелания. Интернет магазин имеет яркий неповторимый дизайн, работает очень быстро и имеет функционал, которого нет у конкурентов (конструктор наборов впечатлений). Так же по нашим требованиям был разработан уникальный SEO модуль, с помощью которого добавлено уже более 6000 страниц, которые будут собирать органический трафик. В общем очень довольны результатами работы. Будем продолжать сотрудничать и дальше, а также советовать компанию знакомым. Спасибо Индинс!</p><p class="quot-signature">Александр Федотов<br>ООО «Xpresent», директор</p>',
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

      // const description = 'Разработка сайта и автоматизация в части связи бизнес-процессов сайта с CRM-системой клиента. Сайт отличают уникальные функции и возможности, такие как специальный SEO модуль и создание собственного набора впечатлений, возможные только при индивидуальной разработке.';
      // const keywords = 'сайт, разработка, впечатления, подарки';

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
