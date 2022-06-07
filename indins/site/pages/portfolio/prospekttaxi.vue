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

const projectImgFolder = '/img/portfolioItems/prospekttaxi';
const projectTitle = 'Проспект-Такси';

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
        text: '<p>Разработка сайта, маркетинг</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Московская компания Проспект-Такси сдает в&nbsp;аренду автомобили бизнес-класса для&nbsp;таксистов. Для&nbsp;привлечения водителей к&nbsp;аренде автомобилей был&nbsp;создан одностраничный сайт. Его&nbsp;задачи: продемонстрировать посетителям преимущества работы с&nbsp;организацией; продемонстрировать характеристики арендуемых автомобилей; мотивировать на&nbsp;аренду автомобилей бизнес-класса.</p>',
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
        text: '<p>В&nbsp;дизайне сайта используются корпоративные цвета компании Проспект, предоставленные клиентом. Сочетание оранжевого и&nbsp;черного цветов позволяют наиболее выгодно подчеркнуть тему эксклюзивности и&nbsp;серьезности арендуемых автомобилей бизнес-класса.</p>',
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
        text: '<p>В&nbsp;каждом блоке присутствуют элементы обратной связи (заказ обратного звонка) для&nbsp;обеспечения возможности связаться с&nbsp;компанией на&nbsp;любом этапе просмотра страницы.</p><p>Сайт изготавливался с&nbsp;учетом необходимости обеспечения максимальной конверсии. Клиент остался доволен полученным продуктом и&nbsp;нашей совместной работой.</p>',
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

      // const description = 'Создание промо-сайта в виде лендинг-страницы для компании по предоставлению автомашин для аренды в такси. В дизайне сайта соблюден стиль родительской группы компаний Проспект.';
      // const keywords = 'сайт, лендинг, такси, водители, кейс, проект, портфолио';

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
