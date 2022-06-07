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

const projectTitle = 'Компания Консалт-Реклама';
const projectImgFolder = '/img/portfolioItems/konsal';

export default {
  name: 'Konsal',
  components: {
    AngularBlock,
    PageTitle,
    TextBlock,
    PortLogo,
    PortTopPreview,
    PortFooter,
    SectionTitle,
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
        text: '<p>Разработка сайта</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Консал-Реклама — разработчик и&nbsp;производитель оригинального торгового оборудования для&nbsp;проведения эффективных продаж. Цель проекта: создание онлайн каталога продукции и&nbsp;решений, создаваемых в&nbsp;компании, а&nbsp;также разработка системы управления сайтом, соответствующим требованиям заказчика.</p>',
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
        text: '<p>Основной особенностью главной страницы является наличие 3&nbsp;слайдеров с&nbsp;ручным и&nbsp;автоматическим пролистыванием и&nbsp;сменой картинки при обновлении страницы. Остальные картинки в&nbsp;слайдере (Наша&nbsp;продукция) и&nbsp;третий слайдер (Наши&nbsp;решения) имеют одно основное отличие — скорость листинга. По&nbsp;просьбе клиента был&nbsp;выставлен тайминг на&nbsp;2 и&nbsp;3 секунды соответственно.</p><p>Большое внимание в&nbsp;проекте уделяется 2&nbsp;похожим каталогам: Наша продукция и&nbsp;Наши решения. Наши решения это&nbsp;те&nbsp;проекты, которые были реализованы в&nbsp;различных нишевых и&nbsp;территориальных (складская продукция, прикассовая зона) направлениях, Наша продукция это&nbsp;все решения, которые могут быть предложены компанией. Эти 2&nbsp;каталога объединены взаимозависимыми тегами.</p>',
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
        text: '<p>В&nbsp;системе управления контентом сайта реализованы инструменты по&nbsp;составлению сложноформатного подменю каталога с&nbsp;выбором пропорций изображения. Данный инструмент предоставляет возможность присвоения цветовых меток для&nbsp;категорий изделий в&nbsp;ручном режиме. Встроены элементы для&nbsp;работы с&nbsp;SEO данными (МЕТА&nbsp;теги, МЕТА&nbsp;описание, МЕТА&nbsp;ключевые&nbsp;слова), позволяющие быстро продвигать ресурс в&nbsp;поисковой выдаче.</p>',
      },
      SectionTitle_1: {
        title: 'Наполнение контентом',
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
        text: '<p>По&nbsp;согласованию с&nbsp;руководством компании мы&nbsp;получили контент, необходимый для&nbsp;размещения: фотографии изделий, названия, артикул, материалы, размеры и&nbsp;другую информацию. В&nbsp;роли уникального ID&nbsp;выступил артикул товара. Кроме того был разработан модуль для&nbsp;автозагрузки данных, что&nbsp;позволило значительно сократить время на&nbsp;наполнение.</p><p>В&nbsp;итоге клиент остался доволен результатом и&nbsp;готов к&nbsp;дальнейшему развитию проекта, а&nbsp;именно к&nbsp;созданию модуля для англоязычной версии.</p>',
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

      // const description = 'Разработка сайта для компании производителя рекламных изделий. Дизайн проект компания разработала самостоятельно, мы выполнили работы по верстке и сборке сайта.';
      // const keywords = 'сайт, верстка, программирование';

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
