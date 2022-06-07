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

const projectTitle = 'Компания Конвера-D';
const projectImgFolder = '/img/portfolioItems/konvera';

export default {
  name: 'Konvera',
  components: {
    AngularBlock,
    PageTitle,
    TextBlock,
    PortLogo,
    PortTopPreview,
    PortFooter,
    SectionTitle,
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
        text: '<p>Компания Конвера-D выполняет работы в&nbsp;области обеспечения безопасности дорожного движения на&nbsp;объектах федерального, территориального, регионального и&nbsp;городского значения. Цель проекта: сократить время на&nbsp;формирование отчетности о&nbsp;проделанных работах за&nbsp;различный промежуток времени.</p>',
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
        title: 'О проекте',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Для&nbsp;выявления инструментов, позволяющих снизить сроки на&nbsp;формирование отчетов, была создана экспертная группа. После обсуждения и&nbsp;получения от&nbsp;клиента информации об&nbsp;ожидаемом формате вывода данных была разработана технологическая карта проекта информационной системы. Так&nbsp;как&nbsp;системой будут пользоваться специалисты разного профиля, предусмотрено разграничение по&nbsp;доступному функционалу в&nbsp;зависимости от&nbsp;роли пользователя. В&nbsp;информационную систему вносятся данные по&nbsp;объектам, видам работ, сведениям о&nbsp;контрактах и&nbsp;сотрудниках, имеющих доступы к&nbsp;системе. Данные о&nbsp;всех выполненных работах сопоставляются с&nbsp;данными по&nbsp;контрактам, система производит обработку всех данных и&nbsp;генерирует отчеты. Отчеты делятся на&nbsp;2 основных типа: локальный (отчет от&nbsp;бригадира о&nbsp;проделанной работе за&nbsp;1 рабочий день) и&nbsp;общий, который формируется из&nbsp;всех локальных отчетов за&nbsp;нужный период времени. Эти отчеты можно выгрузить в&nbsp;формате excel.</p><p>Ежедневный сбор отчетов и&nbsp;ручное формирование отчетов теперь в&nbsp;прошлом и&nbsp;сейчас система собирает нужные данные, обрабатывает их и&nbsp;на&nbsp;выходе предоставляет нужный отчет. АИС для компании Конвера-D была разработана с&nbsp;целью экономии времени на&nbsp;создании отчетов и&nbsp;доступности данных. Структура системы организована с&nbsp;возможностью дальнейшего расширения, а&nbsp;это&nbsp;значит, что&nbsp;многие бизнес-процессы, рутинные задачи организации будут проходить через нее. Это&nbsp;неминуемо приведет к&nbsp;высвобождению дополнительного времени, которое можно будет использовать куда эффективнее, чем это делалось ранее.</p>',
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

      // const description = 'Проект по созданию системы автоматизации учета дорожных работ и построения отчетности о проделанных работах по различным критериям выборки.';
      // const keywords = 'дорожные, аис, автоматизация, система';

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
