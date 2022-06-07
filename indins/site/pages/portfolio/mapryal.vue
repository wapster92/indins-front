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
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock_0"/>
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_2"/>
    <PortCascade :data="PortCascade_1"/>
    <AngularBlock :data="AngularBlock_0">
      <QuotationBlock :data="QuotationBlock"/>
    </AngularBlock>
    <PortFooter :data="PortFooter"/>
  </div>
</template>

<script>
import { Simple } from 'core-xhr';
import { meta } from '~/mixins/meta';
import checkMenu from '../../mixins/checkMenu';
import AngularBlock from '~/components/common/AngularBlock';
import PageTitle from '~/components/common/UI/PageTitle';
import TextBlock from '~/components/common/UI/TextBlock';
import PortLogo from '~/components/common/PortLogo';
import PortTopPreview from '~/components/common/PortTopPreview';
import PortFooter from '~/components/common/PortFooter';
import SectionTitle from '~/components/common/UI/SectionTitle';
import PortCascade from '~/components/common/PortCascade';
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import QuotationBlock from '~/components/common/QuotationBlock';

const projectTitle = 'Общественное объединение МАПРЯЛ';
const projectImgFolder = '/img/portfolioItems/mapryal';

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
        text: '<p>Разработка сайта, CRM-система</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Цель проекта: обновление дизайна, упрощение структуры сайта, внедрение версии для&nbsp;слабовидящих, создание инструмента сбора заявок на&nbsp;участие в&nbsp;конгрессах, реализация активной защиты сайта от&nbsp;внешних угроз.</p>',
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
        title: 'Структура сайта',
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
        text: '<p>Целевая аудитория сайта весьма обширна. Одной из&nbsp;основных задач было создание максимально удобного для этой аудитории сайта. Для этого мы&nbsp;использовали классическую древовидную структуру с&nbsp;понятным большинству пользователей принципом выстраивания информации от&nbsp;общего к&nbsp;частному.</p><p>Особым образом был выделена страница «50&nbsp;лет&nbsp;МАПРЯЛ», которая содержит новости, галерею фотоснимков и&nbsp;видеозаписей, относящихся исключительно к&nbsp;данному разделу.</p>',
      },
      SectionTitle_1: {
        title: 'Дизайн',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>В&nbsp;основу дизайн концепции легли фирменные цвета организации (белый и&nbsp;синий).Комплексно оценив ситуацию в&nbsp;соответствии с&nbsp;задачей редизайна сайта, было принято решение об&nbsp;обновлении логотипа организации. Теперь логотип выглядит более современным.</p><p>Перед отрисовкой дизайн-макетов был&nbsp;изготовлен прототип сайта, в&nbsp;котором были распределены все&nbsp;структурные составляющие исходя из&nbsp;принципа приоритетности. После этого были изготовлены макеты всех страниц с&nbsp;учетом адаптивности (для разных типов устройств и&nbsp;актуальных версий браузеров).</p>',
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
        title: 'Дополнительный функционал',
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
        text: '<p>Одна из&nbsp;основных частей функционала это онлайн оплата членских взносов. Так как компания работает по&nbsp;всему миру, предусмотрена оплата не&nbsp;только рублями, но&nbsp;и&nbsp;долларами США с&nbsp;конвертацией в&nbsp;рубли по&nbsp;актуальному курсу с&nbsp;соблюдением всех законов.</p><p>На&nbsp;сайте реализована система подписки на&nbsp;новостную рассылку. Параметры рассылки можно установить вручную через систему управления контентом.</p>',
      },
      AngularBlock_0: {
        areaClass: 'port-quotation',
      },
      QuotationBlock: {
        text: '<p>Сотрудники компании ИНДИНС в&nbsp;процессе работы над сайтом продемонстрировали высокий уровень профессионализма, способность быстро и&nbsp;качественно выполнять поставленные перед ними задачи, находить нестандартные решения в&nbsp;сложных ситуациях. Выражаем всем сотрудникам компании искреннюю признательность и&nbsp;надеемся на&nbsp;продолжение сотрудничества!</p><p class="quot-signature">Н. В. Брунова,<br>генеральный секретарь</p>',
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

      // const description = 'Разработка и поддержка информационного сайта общественного объединения МАПРЯЛ, создание версии для людей с ограничениями по зрению, поддержка сайта и наполнение контентом.';
      // const keywords = 'МАПРЯЛ, разработка, сайт';

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
