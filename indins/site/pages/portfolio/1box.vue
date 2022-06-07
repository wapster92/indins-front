<template>
  <div>
    <AngularBlock :data="angularBlock">
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock2"/>
    </AngularBlock>
    <PortTopPreview :data="PortTopPreview"/>
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock_0"/>
    <TextBlock :data="TextBlock_0_0"/>
    <SectionTitle :data="SectionTitle_2"/>
    <TextBlock :data="TextBlock_0"/>
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_3"/>
    <TextBlock :data="TextBlock_1_0"/>
    <TextBlock :data="TextBlock_1_1"/>
    <PortFullImg :data="PortFullImg"/>
    <SectionTitle :data="SectionTitle_4"/>
    <TextBlock :data="TextBlock_2_0"/>
    <TextBlock :data="TextBlock_2_1"/>
    <TextBlock :data="TextBlock_2_2"/>

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
import PortFullImg from '~/components/common/PortFullImg';

const projectImgFolder = '/img/portfolioItems/1box';
const projectTitle = '1BOX';

export default {
  name: 'OneBox',
  components: {
    AngularBlock,
    PageTitle,
    TextBlock,
    PortLogo,
    PortTopPreview,
    PortFooter,
    SectionTitle,
    PortCascade,
    PortFullImg,
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
        text: '<p>Ранее для этого заказчика уже выполнялись другие проекты, например, один из реализованных проектов fx-list.com. Так как клиент остался доволен комплексным подходом к разработке проектов и качеством проделанной работы, обратился к нам еще раз для реализации проекта 1BOX.site (совершенно новый проект, который разрабатывался с нуля).</p>',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Основная причина обращения заказчика в нашу компанию — необходимость нахождения сайта \n'
            + 'на высоких позициях результатов поисковой системы Google. Особенностью ранее разрабатываемых проектов является ориентация на поисковую оптимизацию под данную поисковую систему. \n'
            + 'Заказ текущего проекта нашей компании был обусловлен успешностью прошлой работы с заказчиком. \n'
            + 'По результатам аналитики сайт занял топовые позиции в поисковой выдаче по запросам первого уровня \n'
            + 'в США. Результаты обеспечены высоким уровнем технической реализации сайтов, обеспечением высокой скорости загрузки и качеством мобильной версии сайта.</p>',
      },
      TextBlock_0_0: {
        areaClass: 'port-text',
        text: `<p>Одной из основных целей было сделать сайт удобным для пользователей, что позволит быстро находить нужную информацию. Так же необходимо было реализовать возможность выбирать темы статей
        в соответствии с назначенными тегами и разделами.</p>`,
      },
      TextBlock_1_0: {
        areaClass: 'port-text',
        text: `<p>Проект был реализован с одной стороны по принципам SPA (single page application), что позволило
ему работать быстро при обмене информацией с сервером без перезагрузки страниц, а интерактивность
и удобство интерфейса высоко ценятся посетителями. С другой – обеспечена высокая скорость загрузки
и качество индексации контента поисковыми системами.</p> `,
      },
      TextBlock_1_1: {
        areaClass: 'port-text',
        text: `<p>Чтобы обеспечить реализацию требований к проекту в части удобства с одной стороны и высоких позиций в поисковых системах с другой, около трети времени и сил работы над проектом было потрачено на обеспечение высоких требований поисковой системы Google к качеству сайтов
и скорости загрузки.</p>`,
      },
      TextBlock_2_0: {
        areaClass: 'port-text',
        text: `<p>Клиент плотно работал с командой разработки в данном проекте. Все корректировки клиента были полезны для повышения качества проекта. Требования заказчика к техническому качеству проекта
были очень высокими, а учитывая наше традиционное отношение к этому фактору —
мы были с клиентом на одной волне, дополняя друг друга на пути к идеалу.</p> `,
      },
      TextBlock_2_1: {
        areaClass: 'port-text',
        text: `<p>Заказчик остался доволен реализацией проекта во всех отношениях. Впереди долгий путь 
по наполнению ресурса полезной и интересной информацией к вершинам поисковой выдачи Google.
  </p> `,
      },
      TextBlock_2_2: {
        areaClass: 'port-text',
        text: `<p>После запуска проекта производится контроль новых вводимых Google требований к сайтам
и контроль индексации сайта поисковой системой.</p> `,
      },
      PortCascade_0: {
        images: [
          {
            src: `${projectImgFolder}/cad_0_1box.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_1_1box.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        text: `<p>На сайте мы всегда их видим и можем обратиться к ним в любой момент времени. Поисковая строка и фильтр
по тегам также всегда на виду,
что не позволяет пользователю «затеряться» в контенте. </p><p>Все настолько просто, что любому пользователю будет удобно взаимодействовать с ресурсом.</p>`,
      },
      PortFullImg: {
        src: `${projectImgFolder}/img_1.jpg`,
        alt: projectTitle,
        action: 'adaptiveResizeMax',
        width: '1140',
      },

      PortTopPreview: {
        alt: projectTitle,
        srcDesk: {
          img: `${projectImgFolder}/top_back_1box.jpg`,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: `${projectImgFolder}/top_phone_1box.jpg`,
          action: 'adaptiveResizeMax',
          width: 195,
        },
      },
      SectionTitle_1: {
        title: 'О проекте',
      },

      SectionTitle_2: {
        title: 'Дизайн',
      },
      SectionTitle_3: {
        title: 'Реализация проекта',
      },
      SectionTitle_4: {
        title: 'Работа над проектом',
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

      // const description = 'Проект по автоматизации работы застройщика, включающий системы аналитики и корректировки цен, кредитные программы, взаимодействие с агентствами недвижимости и другие системы.';
      // const keywords = 'автроматизация, застройщик, строительство, бизнес';

      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },
  /* mounted() {
    this.PortFooter.prev = `portfolio-${this.$store.getters['projects/getPrevLink'](this.$route.path)}`;
    this.PortFooter.next = `portfolio-${this.$store.getters['projects/getNextLink'](this.$route.path)}`;
  }, */
};
</script>
