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

const projectTitle = 'Web-сервис FX-List';
const projectImgFolder = '/img/portfolioItems/fxlist';

export default {
  name: 'Fxlist',
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
        text: '<p>Разработка сайта, CRM-система</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>FX-List — это проект, ориентированный на&nbsp;зарубежного пользователя (с&nbsp;контентом на&nbsp;английском языке). Цель проекта — предоставить пользователю удобный сервис по&nbsp;подбору площадок Forex для торговли на&nbsp;бирже. Требования к&nbsp;сайту: удобство фильтров для быстрого поиска площадок; обеспечение максимальной скорости загрузки контента для пользователей из&nbsp;Великобритании и&nbsp;США; соблюдение всех требований к&nbsp;качеству сайта от&nbsp;поисковой системы Google.</p>',
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
        title: 'Фильтры',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Для обеспечения максимального удобства использования каталога Forex площадок и&nbsp;быстрой выдачи результатов сделана подгрузка данных без&nbsp;перезагрузки страницы. При&nbsp;этом для&nbsp;обеспечения быстрой индексации и&nbsp;в&nbsp;целях SEO изменение параметров фильтров меняет заголовки страниц (при&nbsp;этом также изменяется адрестная строка). Таким образом, был&nbsp;получен конструктор заголовков, состоящий из&nbsp;параметров результирующего списка.</p>',
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
        text: '<p>Был выбран надежный зарубежный хостинг, главным преимуществом которого считается стабильно высокая скорость загрузки страниц. Сайт спроектирован и&nbsp;реализован так, чтобы обеспечить нахождение сайта в&nbsp;“зеленой зоне” Google PageSpeed Insights. Для обеспечения быстрой загрузки из&nbsp;любой точки мира файловая часть сайта размещена в&nbsp;CDN* от&nbsp;Google.</p><p>*CDN (Content Delivery Network) — это&nbsp;специальная технология, которая позволяет посетителю получать содержимое сайта из&nbsp;разных географических мест.</p>',
      },
      SectionTitle_1: {
        title: 'Соблюдение требований Google',
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
        text: '<p>Для обеспечения индексации всех вариантов сочетаний фильтров реализован специальный последовательный генератор sitemap. Необходимость в&nbsp;реализации подобного модуля вызвана неоспоримым фактом: если&nbsp;вывести все&nbsp;сочетания фильтров, то&nbsp;получился&nbsp;бы файл размером 4&nbsp;петабайта (4&nbsp;000&nbsp;000&nbsp;гигабайт). Специальный программный модуль добавляет в&nbsp;сайтмап только те&nbsp;страницы, которые были посещены. Таким образом, было обеспечено постепенное наполнение sitemap для&nbsp;избежания резкого переполнения и&nbsp;блокировки системы за&nbsp;спам от&nbsp;Google.</p>',
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

      // const description = 'Проект по разработке каталога брокеров Форекс, позволяющий быстрой найти нужного брокера с помощью гибкой системы фильтров. Проект включает SEO сайта.';
      // const keywords = 'сайт, форекс, портфолио, SEO';

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
