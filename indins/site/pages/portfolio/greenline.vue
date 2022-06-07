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
    <TextBlock :data="TextBlock_0"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_2"/>
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_3"/>
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
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import PortCascade from '~/components/common/PortCascade';

const projectTitle = 'Управляющая компания Гринлайн';
const projectImgFolder = '/img/portfolioItems/greenline';

export default {
  name: 'Greenline',
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
        text: '<p>ERP-система</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Для управляющей компании Гринлайн, входящей в состав группы компаний Факт, разработана информационная система, автоматизирующая деятельность по управлению коттеджными поселками.</p>',
      },
      PortTopPreview: {
        alt: projectTitle,
        srcDesk: {
          img: `${projectImgFolder}/top_back_gl.png`,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: `${projectImgFolder}/top_phone_gl.png`,
          action: 'adaptiveResizeMax',
          width: 195,
        },
      },
      SectionTitle_0: {
        title: 'Возможности системы',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'управление арендаторами, владельцами, администраторами, коттеджными поселками и участками',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'управление счетчиками, пломбированием, тарифами, показаниями счетчиков, начислениями и расчетом стоимости услуг',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'управление автотранспортом и его автоматическим доступом на территорию поселков',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'возможность формирования и автоматической отправки квитанций клиентам',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'возможность автоматического закрытия квитанции и отправления уведомлений',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'возможность обращения клиентов в администрацию управляющей компании',
        },
      ],
      SectionTitle_1: {
        title: 'Личный кабинет клиента',
      },
      TextBlock_0: {
        areaClass: 'port-text',
        text: '<p>Для клиентов управляющей компании, жильцов и владельцев коттеджных поселков создан личный кабинет. Пользователь авторизуется в личном кабинете с помощью СМС кода. Присутствует функция восстановления пароля. В рамках личного кабинета имеются следующие возможности:</p>',
      },
      InfoBlockGrid_1: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_1: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'получать уведомления от администрации, вести переписку, прикладывать документы',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'написать обращение в управляющую компанию, заказать услугу, вести переписку и прикладывать файлы',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'сдавать показания счетчиков и скачивать квитанции для последующей оплаты',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'добавлять автотранспорт для пропуска на территорию поселка',
        },
      ],
      SectionTitle_2: {
        title: 'Пропуск автотранспорта',
      },
      PortCascade_0: {
        images: [
          {
            src: `${projectImgFolder}/cad_1_gl.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_2_gl.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        text: '<p>Владелец участка может заказать пропуск машины  (временный или постоянный) через СМС. Пропуск грузового строительного транспорта автоматически оформляется как услуга.</p><p>На въездах в коттеджные поселки установлены камеры и шлагбаумы. Доступ в поселок осуществляется автоматически при подъезде машины к шлагбауму. Номер автомобиля считывается и проверяется в базе данных на предмет принадлежности к клиенту, участку, поселку, а также наличия задолжностей перед УК. Если задолженность не превышает 2-х месяцев, машина пропускается. В противном случае необходимо воспользоваться гостевой стоянкой.</p>',
      },
      SectionTitle_3: {
        title: 'Начисления, оплата и сохранность средств в системе',
      },
      PortCascade_1: {
        images: [
          {
            src: `${projectImgFolder}/cad_3_gl.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_4_gl.png`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        revers: true,
        text: '<p>Распределение оплаты по позициям квитанций в случае неполной оплаты происходит по принципу процентной части. Сначала оплачиваются более старые долги и квитанции.</p><p>Клиенты и администраторы системы работают с денежными величинами с точностью до копеек. Сохранность средств и расчетов во время всех операций контролируют 4 подсистемы.</p><p>Расчет пени производится по внутреннему алгоритму компании, обеспечивает начисление в соответствии с законом. Для этой информационной системы нет понятия закрытых периодов. Закрытые периоды не позволяют рассчитывать пени как того требует закон.</p>',
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

      // const description = 'Автоматизация управляющей компании GreenLine, включающая учет клиентов, домов, приборов потребления, счетов и квитанций, счетчиков, проезда автотранспорта на территорию коттеджных поселков.';
      // const keywords = 'автоматизация, ЖУК, ЖЭК, ЖКХ';

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
