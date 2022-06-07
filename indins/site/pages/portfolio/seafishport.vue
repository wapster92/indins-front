<template>
  <div>
    <AngularBlock
      :data="angularBlock"
    >
      <PageTitle :data="{title: tileTitle}"/>
      <TextBlock :data="{...TextBlock, text: tileTag}"/>
      <PortLogo :data="PortLogo"/>
      <TextBlock :data="TextBlock2"/>
      <SectionTitle
        :data="SectionTitle_num"
      />
      <InfoBlockGrid
        :data="InfoBlockGrid_num"
      >
        <InfoBlockItem
          v-for="(item, key) in InfoBlockList_num"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
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
    <TextBlock :data="TextBlock_1"/>
    <SectionTitle :data="SectionTitle_2"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
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
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import PortCascade from '~/components/common/PortCascade';

const projectTitle = 'Морской Рыбный Порт';
const projectImgFolder = '/img/portfolioItems/seafishport';

export default {
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
        text: '<p>Автоматизация</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo_sfp.svg`,
        srcClass: 'seafishport-logo',
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>«Морской Рыбный Порт» - компания, зарекомендовавшая себя на&nbsp;рынке стивидорных услуг. На&nbsp;протяжении многих лет компания повышает качество оказываемых услуг, постоянно совершенствуя деятельность и&nbsp;развивая инфраструктуру. Современное техническое оснащение и&nbsp;квалифицированный персонал позволяют быстро и&nbsp;качественно выполнять операции любой сложности.</p><p>Цель проекта - сокращение времени погрузки судов за&nbsp;счет автоматизации логистики и&nbsp;разработки системы контроля размещения контейнеров в&nbsp;порту.</p>',
      },
      SectionTitle_num: {
        areaClass: 'realized',
        title: 'В проекте реализовано',
      },
      InfoBlockGrid_num: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_num: [
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'seafish--reachstaker',
          text: 'Отслеживание ричстакеров',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'seafish--surveillance',
          text: 'Аппаратная система слежения',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'seafish--tasks',
          text: 'Задачи на работы',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'seafish--control',
          text: 'Учет контейнеров на карте',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'seafish--accuracy',
          text: 'Геопозиция с точностью 3 см',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'seafish--location',
          text: 'Фиксация контейнеров',
        },
      ],
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
        title: 'Задачи',
      },
      InfoBlockGrid_0: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Сократить время погрузочных работ путем оптимизации размещения контейнеров в&nbsp;порту. Обеспечение хранения истории всех перемещений контейнеров в&nbsp;порту',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Сократить время, затрачиваемое на&nbsp;“раскопки” нужного контейнера, путем оптимизации размещения контейнеров. Исключить случаи “потери” контейнеров',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Обеспечить фиксацию состояния всех поступающих и&nbsp;находящихся в&nbsp;порту контейнеров (в&nbsp;том числе с&nbsp;помощью фото и&nbsp;видео)',
        },
      ],
      SectionTitle_1: {
        title: 'Описание проекта',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>При&nbsp;попадании контейнера в&nbsp;порт через ЖД, авто или морской терминал контейнер устанавливается на&nbsp;место хранения ричстакерами. Ричстакеры оборудованы камерами и&nbsp;специальным АПК определения координат. Точность оборудования в&nbsp;полевых тестах составила отклонение в&nbsp;15 миллиметров по&nbsp;каждой оси координат. При&nbsp;захвате контейнера ИС&nbsp;с&nbsp;помощью знания координат размещения (если контейнер ранее устанавливался на&nbsp;данное место с&nbsp;помощью ИС) и&nbsp;камеры (передающей информацию на&nbsp;систему визуального распознавания) определяет номер контейнера и&nbsp;перемещение контейнера, а&nbsp;также место его&nbsp;новой установки фиксируются в&nbsp;ИС. Интерфейс диспетчера позволяет видеть на&nbsp;карте все площадки и&nbsp;зоны размещения, а&nbsp;также контейнеры и&nbsp;историю работы с&nbsp;ними.</p><p>Специальный алгоритм определяет, какие контейнеры необходимо погрузить раньше (заход судна и&nbsp;план погрузки), а&nbsp;какие позже и&nbsp;предлагает оператору ричстакера размещать контейнеры ближе или дальше от&nbsp;зоны погрузки на&nbsp;судно, а&nbsp;также запрещает размещать один контейнер под&nbsp;другим, если нижний необходимо будет забрать раньше. Созданный алгоритм оптимизирует размещение контейнеров таким образом, чтобы обеспечить наибольшую скорость последующей погрузки на&nbsp;судно.</p>',
      },
      SectionTitle_2: {
        title: 'Составные части системы автоматизации',
      },
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Фиксация с&nbsp;помощью АПК координат каждого контейнера на&nbsp;территории порта при&nbsp;попадании контейнера в&nbsp;порт через ЖД или автотерминал',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Визуальная система распознавания номеров контейнеров при&nbsp;работе с&nbsp;ними ричстакера на&nbsp;основе нейросети',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Интерфейс оператора ричстакера, включающий список задач на&nbsp;работы и&nbsp;помощь ИС в&nbsp;распознавании контейнеров',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'История операций с&nbsp;каждым контейнером: перемещения, расположение на&nbsp;карте, пользователи, внесшие изменения и&nbsp;т.д.',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Автоматизация процессов работы с&nbsp;контейнером (с&nbsp;фотофиксацией сстояния), интерфейс тальмана и&nbsp;рефтехника',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Комплексная система распознавания номеров контейнеров на&nbsp;основе истории размещения и&nbsp;визуального распознавания',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Управление выполнением задач по&nbsp;погрузке-разгрузке с&nbsp;помощью ИС диспетчером в&nbsp;случае сбоя в&nbsp;АПК распознавания',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Алгоритм оптимального расположения контейнеров, выдача указаний по&nbsp;их установке для&nbsp;обеспечения более быстрой погрузки судов',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Интеграция с&nbsp;внутренней существующей системой порта по&nbsp;протоколу OData',
        },
      ],
      PortCascade_0: {
        images: [
          {
            src: `${projectImgFolder}/cad_1.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
          {
            src: `${projectImgFolder}/cad_2.jpg`,
            alt: projectTitle,
            action: 'adaptiveResizeMin',
            width: '341',
          },
        ],
        text: '<p>Информационная система разработана индивидуально под&nbsp;задачи клиента по&nbsp;стоимости, намного меньше имеющихся готовых решений на&nbsp;рынке.</p><p>Клиент получил комплексное решение, решающее поставленные бизнес-задачи.</p>',
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

      // const description = 'Проект автоматизации Рыбного морского порта для ускорения погрузки-разгрузки морских судов. Включает систему позиционирования контейнеров, фиксацию местоположения, распознавание номеров и алгоритм оптимизации размещения.';
      // const keywords = 'порт, автоматизация';

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
