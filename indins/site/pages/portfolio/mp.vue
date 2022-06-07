<template>
  <div>
    <AngularBlock
      :data="angularBlock"
      class="mp-intro"
    >
      <PageTitle :data="{title: pageTitle.title}"/>
      <TextBlock
        :data="{...TextBlock}"
        class="mp-system"
      />
      <PortLogo
        :data="PortLogo"
        class="mp__logo"
      />
      <TextBlock
        :data="TextBlock0"
      />
      <SectionTitle
        :data="SectionTitle_0"
        class="mp__section-title"
      />
      <InfoBlockGrid
        :data="InfoBlockGrid_0"
        class="mp-grid__wrapper"
      >
        <InfoBlockItem
          v-for="(item, key) in InfoBlockList_0"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <PortTopPreview
      :data="PortTopPreview"
      class="mp-project"
    />
    <SectionTitle :data="SectionTitle_1" />
    <TextBlock
      :data="TextBlock_1"
      class="mp-pb__p--special"
    />
    <SectionTitle :data="SectionTitle_2" />
    <InfoBlockGrid
      :data="InfoBlockGrid_2"
      class="mp-grid two-cols"
    >
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_2"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle
      :data="SectionTitle_3"
      class="mp__section-integration"
    />
    <TextBlock
      :data="TextBlock_3"
      class="mp-pb__p--special"
    />
    <SectionTitle :data="SectionTitle_4" />
    <TextBlock
      :data="TextBlock_4"
    />
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
import PortLineTreeImg from '~/components/common/PortLineTreeImg';
import PortCascade from '~/components/common/PortCascade';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import PortStatItem from '~/components/common/PortStatItem';

const projectImgFolder = '/img/portfolioItems/mp';
const projectTitle = 'XRM-система для каталогизации файлов';
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
    PortLineTreeImg,
    PortCascade,
    InfoBlockFlex,
    PortStatItem,
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
        text: '<p>XRM-система, Автоматизация</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.svg`,
        alt: projectTitle,
      },
      TextBlock0: {
        areaClass: 'port-text port-under-title',
        text: '<p>Компания Металлопродукция занимается разработкой и производством автомобильных аксессуаров более 25 лет. С момента своего основания компания занимает лидирующие позиции на отечественном рынке защит двигателя автомобиля.</p>',
      },
      PortTopPreview: {
        alt: projectTitle,
        srcDesk: {
          img: `${projectImgFolder}/top_back.webp`,
          action: 'adaptiveResizeMax',
          width: 1140,
        },
        srcMobile: {
          img: `${projectImgFolder}/top_phone.webp`,
          action: 'adaptiveResizeMax',
          width: 195,
        },
      },
      SectionTitle_0: {
        areaClass: 'realized',
        title: 'В проекте реализовано',
      },
      InfoBlockGrid_0: {
        gap: '50',
        column: '3',
      },
      InfoBlockList_0: [
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mp-icon--search',
          text: 'Быстрый поиск',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mp-icon--1c',
          text: 'Интеграция с 1C',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mp-icon--convert',
          text: 'Конвертирование файлов',
        },
      ],
      SectionTitle_2: {
        title: 'Функции системы',
      },
      InfoBlockGrid_2: {
        gap: '50',
        column: '2',
      },
      InfoBlockList_2: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Интеграция с 1С, получение информации<br> об изделиях через специальные методы.</span>',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Выгрузка файлов с отдельного сервера, сопоставление с информацией из 1С по имени файлов.</span>',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Конвертирование файлов, разбивка PDF-файла<br> на несколько изображений и страниц.</span>',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: '<span class="text-primary text-normal">Интерфейс быстрого поиска с показом чертежей<br> в рамках интерфейса информационной системы.</span>',
        },
      ],
      SectionTitle_1: {
        title: 'Цель и задача проекта',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Разработка информационной системы для обеспечения доступа к сводной информации и чертежам, и обеспечение быстрого поиска по данной информации для сотрудников предприятия.</p><p> Перед информационной системой была поставлена задача — решить проблему каталогизации файлов чертежей изделий. Информация об изделиях хранится в 1С, а чертежи изделий в папке на сервере.</p>',
      },
      SectionTitle_3: {
        title: 'Интеграция с 1С',
      },
      TextBlock_3: {
        areaClass: 'port-text',
        text: '<p>Информационная система проверяет данные об изделиях в 1С на наличие изменений. Это делается с определенной периодичностью путем передачи информации из 1С. В случае наличия изменений система инициализирует процесс синхронизации данных по измененным позициям, скачивает файл из хранилища файлов и обрабатывает файлы для обеспечения доступности чертежей из информационной системы.</p>',
      },
      SectionTitle_4: {
        title: 'Система',
      },
      TextBlock_4: {
        areaClass: 'port-text',
        text: '<p>Система спроектирована таким образом, чтобы в ней было только самое необходимое и отсутствовал лишний функционал. Это позволило оптимизировать затраты на разработку информационной системы.</p>'
            + '<p> Информационная система размещена в локальной сети предприятия и закрыта от внешнего доступа на уровне сети. Это обеспечивает безопасность данных и быстродействие обмена информацией в рамках локальной сети.</p>'
            + '<p>Проектирование информационной системы заняло 2 недели. Разработка информационной системы заняла 6 недель. На данный момент информационная система размещена на сервере заказчика во внутренней сети, поддержку системы осуществляет сам заказчик.</p>',
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
      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style lang="stylus" scoped>
.mp-project
  & >>> .portfolio-container
    padding: 0;
    & img
      box-shadow: none;
</style>
