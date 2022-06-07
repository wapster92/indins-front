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
    <TextBlock :data="TextBlock_3"/>
    <InfoBlockGrid :data="InfoBlockGrid_0">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_0"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_1"/>
    <TextBlock :data="TextBlock_4"/>
    <InfoBlockGrid :data="InfoBlockGrid_1">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <PortLineTreeImg :data="PortLineTreeImg"/>
    <SectionTitle :data="SectionTitle_2"/>
    <TextBlock :data="TextBlock_5"/>
    <InfoBlockGrid :data="InfoBlockGrid_2">
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_2"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle :data="SectionTitle_3"/>
    <PortCascade :data="PortCascade_0"/>
    <SectionTitle :data="SectionTitle_4"/>
    <TextBlock :data="TextBlock_6"/>
    <InfoBlockFlex :data="InfoBlockFlex">
      <PortStatItem
        v-for="(item, key) in PortStatItemsList"
        :key="key"
        :data="item"
      />
    </InfoBlockFlex>
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

const projectImgFolder = '/img/portfolioItems/b5';
const projectTitle = 'Бизнес-центр Б5';

export default {
  name: 'B5',
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
        text: '<p>Разработка сайта, CRM-система, маркетинг</p>',
      },
      PortLogo: {
        src: `${projectImgFolder}/logo.png`,
        alt: projectTitle,
      },
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Бизнес-центр Б5 расположен в историческом центре Санкт-Петербурга. С самого начала работы с руководством бизнес-центра Б5 был взят курс на комплексное развитие, включающее маркетинг, сайт, рекламу, сквозную аналитику и систему автоматизации. Именно комплексный подход позволяет достичь максимального эффекта и результата.</p>',
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
      TextBlock_3: {
        areaClass: 'port-text',
        text: '<p>Старый сайт содержал множество ошибок, часть функционала не работала, плохо индексировался поисковыми системами. Новый сайт соответствует всем современным требованиям к дизайну и качеству. Автоматизировано и структурировано размещение и изменение информации.</p>',
      },
      InfoBlockGrid_0: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_0: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Автоматическое управление стоимостью аренды через основную ставку и дополнительные факторы цены',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Аренда конференц-зала, связанная с автоматизацией системы учета аренды и системы работы с клиентами',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Элементы сайта, автоматически изменяющиеся при редактировании внутренних параметров системы',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Управление всеми элементами сайта с минимумом кликов через индивидуально разработанную систему управления контентом (CMS)',
        },
      ],
      SectionTitle_1: {
        title: 'Аналитика',
      },
      TextBlock_4: {
        areaClass: 'port-text',
        text: '<p>Разработана встроенная система аналитики, включающая коллтрекинг и сквозной учет каждого посещения вплоть до рекламного запроса.</p>',
      },
      InfoBlockGrid_1: {
        column: '3',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'К каждому обращению фиксируется источник трафика, откуда пришел клиент, включая рекламный запрос',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Через интерфейсы внутренней системы имеется возможность прослушать все звонки, поступившие с сайта',
        },
        {
          areaClass: 'narrow-left',
          iconName: 'icon-left plus',
          text: 'Разработан вывод графиков и отчетов за период времени по источникам трафика и типам обращений',
        },
      ],
      SectionTitle_2: {
        title: 'Автоматизация',
      },
      TextBlock_5: {
        areaClass: 'port-text',
        text: '<p>Принцип автоматизации — сокращение времени выполнения действий. Внутренние системы изготовлены по принципу минимального числа кликов для решения бизнес-задачи.</p>',
      },
      InfoBlockGrid_2: {
        column: '4',
        gap: '75',
      },
      InfoBlockList_2: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Доступы</span><br>Пользователи системы, они же сотрудники организации, имеют персональный доступ в систему через систему авторизации. Доступ к необходимым разделам распределяется с помощью системы ролей',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Информация на сайте</span><br>перестраивается и изменяется исходя из внутренних процессов, например, цены изменяются в зависимости от ключевой ставки, корректировки коэффициентов, или свойств офисов.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Единый реестр</span><br>юридических лиц используется для разделов «Арендаторы»,  «Партнеры», и «Арендаторы конференц-зала». Формирование страниц юридических лиц на сайте происходит также из одного источника данных.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: '<span class="text-primary">Принцип одного клика</span><br>Для выставления счета на аренду конференц-зала достаточно нажать одну кнопку, если клиент уже ранее обращался в компанию. Время аренды из имеющегося свободного выбирает сам клиент через сайт.',
        },
      ],
      SectionTitle_3: {
        title: 'Реклама',
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
        text: '<p>Разработаны рекламные кампании, учитывающие территориальные факторы. Встроенная в систему автоматизации система аналитики четко показывает в режиме реального времени результат ведения рекламных кампаний, количество обращений, по каким объявлениям, с каких рекламных источников и по каким запросам пришли обратившиеся клиенты.</p>',
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
      SectionTitle_4: {
        title: 'Статистика',
      },
      TextBlock_6: {
        areaClass: 'port-text port-under-title',
        textClass: 'text-center',
        text: '<p>При прочих равных, при переходе из поисковых систем за аналогичные периоды времени параметры, через поведенческие факторы влияющие на позиции сайта в поисковых системах</p>',
      },
      InfoBlockFlex: {
        column: '4',
        gap: '15',
      },
      PortStatItemsList: [
        {
          title: '2,61',
          under: 'глубина просмотра',
          text: '(на старом сайте)',
        },
        {
          title: '2:51',
          under: 'время на сайте',
          text: '(на старом сайте)',
        },
        {
          title: '5,26',
          under: 'глубина просмотра',
          text: '(на новом сайте)',
        },
        {
          title: '3:35',
          under: 'время на сайте',
          text: '(на новом сайте)',
        },
      ],

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

      // const description = 'Проект включает комплексное развитие бизнес-центра, маркетинг, разработку сайта, рекламные кампании, сквозную аналитику и систему автоматизации.';
      // const keywords = 'бизнес-центр, спб';

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
