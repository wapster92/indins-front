<template>
  <div>
    <AngularBlock
      :data="angularBlock"
      class="angular-block"
    >
      <PageTitle
        :data="pageTitle"
        class="page-title-content--padding"
      />
      <InfoBlockGrid :data="infoBlockGrid">
        <InfoBlockItem
          v-for="(item, key) in infoBlockList"
          :key="key"
          :data="item"
          class="info-block-item--content"
        />
      </InfoBlockGrid>
    </AngularBlock>
    <SectionTitle
      :data="{title: 'Что важно при наполнении сайта контентом'}"
      class="section-title__container__text"
    />
    <div class="mini-articles">
      <MiniArticle
        v-for="(item, i) of miniArticles"
        :key="i"
        :icon="item.icon"
        :title="item.title"
        :class="{ specialTitle: i === 0 }"
        class="mini-article--content"
      >{{ item.text }}
      </MiniArticle>
    </div>

    <section class="section-container-work--format">
      <SectionTitle
        :data="{title: 'Форматы работы'}"
        class="section-title__container__text format"
      />
      <InfoBlockGrid
        :data="infoBlockGridSiteType"
        class="section-format--grid"
      >
        <InfoBlockItem
          v-for="(item, index) in infoBlockListSiteType"
          :key="index"
          :data="item"
          :class="{ 'info-block-item--padding': index === 2}"
          class="info-block-item work-format"
        />
      </InfoBlockGrid>
    </section>

    <AngularBlock
      :data="angularBlockDark"
      class="angular-area-form"
    >
      <LongForm
        title="Хотите обсудить проект?"
        class="inputForm"
      />
    </AngularBlock>

    <SectionTitle :data="sectionTitleProject"/>
    <SliderBlock :tags="projectListTags"/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import MiniArticle from '@/components/common/MiniArticle';
import LongForm from '@/components/forms/LongForm';
import PageTitle from '~/components/common/UI/PageTitle';
import AngularBlock from '~/components/common/AngularBlock';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import SectionTitle from '~/components/common/UI/SectionTitle';
import SliderBlock from '~/components/common/SliderBlock';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';

export default {
  name: 'Content',
  components: {
    PageTitle,
    AngularBlock,
    InfoBlockGrid,
    InfoBlockItem,
    SectionTitle,
    SliderBlock,
    MiniArticle,
    LongForm,
  },
  mixins: [
    meta,
    checkMenu,
  ],

  async asyncData({ app: { $xhr }, route }) {
    try {
      const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', route.path));
      const metaData = await $xhr.send(metaRequest)
        .then(res => res.data.data.result);

      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },
  data() {
    return {
      pageTitle: {
        title: 'Наполнение сайта контентом',
      },
      infoBlockGrid: {
        column: '4',
        gap: '76',
      },
      angularBlock: {
        areaClass: 'main-title',
      },
      angularBlockDark: {
        areaClass: 'auto-to-scroll',
      },
      infoBlockList: [
        {
          text: 'Написание оригинальных текстов по тематике сайта',
          textClass: 'info-block-item__text--center',
          iconName: 'icon-content--text',
        },
        {
          text: 'Подбор изображений для публикаций <br> в стилистике сайта',
          textClass: 'info-block-item__text--center',
          iconName: 'icon-content--imgsearch',
        },
        {
          text: 'Подбор и размещение релевантных тегов <br> и описаний для SEO',
          textClass: 'info-block-item__text--center',
          iconName: 'icon-content--seo',
        },
        {
          text: 'Размещение информации через вашу панель управления сайтом',
          textClass: 'info-block-item__text--center',
          iconName: 'icon-content--cms',
        },
      ],
      miniArticles: [
        {
          title: 'Содержательность и уникальность текста',
          icon: 'mini-article/original_text',
          text: 'Важнейшим фактором продвижения сайта в поисковых системах является контент сайта. Он должен быть интересным, читабельным и уникальным. Нельзя просто скопировать информацию с другого сайта. Это повлияет на позиции сайта в поисковых системах, и с большой вероятностью повредит ему. Текст должен быть на 100 процентов уникальным и иметь достаточно большой объем. Учитывая последние требования поисковых систем данный текст должен быть интересен посетителям и быть читаемым. Совместить все эти факторы при написании текста не являясь профессиональным контент-менеджером, достаточно сложно.',
        },
        {
          title: 'SEO тексты',
          icon: 'mini-article/seo_text',
          text: 'Для того, чтобы контент сайта повышал позиции сайта в поисковых системах, текст должен содержать определенные запросы. Он должен быть составлен определенным образом и содержать правильные заголовки различных уровней. Кроме самого текста важным фактором являются метатеги для страницы с текстом. Это заголовки, ключевые слова        '
              + ' и краткое описание страницы для поисковой системы.',
        },
        {
          title: 'Качество наполнения',
          icon: 'mini-article/content-quality',
          text: 'Системы управления контентом (CMS) сайтов для внесения текста часто используют специальные панели, в которых можно редактировать стиль текста. Однако такие панели не предназначены для того, чтобы копировать и вставлять текст (например из MSWord). В этом случае стили тоже копируются и в итоге на сайте это смотрится плохо, каждая страница выглядит по-разному. Для решения этой проблемы нужно писать весь текст в этой панели или применять специальные способы редактирования, включая возможность работы напрямую с разметкой текста.',
        },
        {
          title: 'Регулярность и своевременность',
          icon: 'mini-article/publications',
          text: 'Зачастую публиковать тексты необходимо быстро, по мере появления новостей. Писать и публиковать тексты для SEO продвижения также необходимо, соблюдая периодичность и делать это регулярно в определенные дни недели. Поисковые системы хорошо воспринимают регулярный рост количества страниц сайта с уникальным и постоянным контентом. При самостоятельном наполнении сайта сложно заставить себя регулярно в один и тот же день недели писать, подбирать изображения, выверять метатеги и вносить информацию на сайт. Мы можем делать это за вас.',
        },
      ],
      infoBlockGridSiteType: {
        gridClass: 'site-type-grid',
        areaClass: 'site-type-area',
        column: '3',
        gap: '84',
      },
      infoBlockListSiteType: [
        {
          text: 'Вы оплачиваете размещение определенного количества статей в месяц. Мы пишем и размещаем тексты на вашем сайте согласно заранее выбранному плану <br> в определенные дни (желательно не реже одной статьи в неделю).',
          title: 'Регулярное наполнение',
          iconName: 'icon-content--calendar',
          titleClass: 'text-center',
          textClass: 'text-left',
        },
        {
          text: 'Вы заказываете наполнение сайта перед запуском. Это может быть контент любого вида — статьи, товары для интернет-магазина <br> и другие варианты. Если заказываете наполнение <br> от 100 страниц, то на заказ предоставляется скидка.',
          iconName: 'icon-content--site',
          title: 'Запуск и наполнение сайта',
          titleClass: 'text-center',
          textClass: 'text-left',
        },
        {
          text: 'Анализируем контент сайта, исправляем или заменяем существующий. Вносим правильные метаописания, исправляем ошибки и стиль текста, даем рекомендации <br> по улучшению для успешного дальнейшего продвижения.',
          iconName: 'icon-content--analysis',
          title: 'Проверка и анализ',
          titleClass: 'text-center',
          textClass: 'text-left',
        },
      ],
      sectionTitleProject: {
        title: 'Портфолио',
      },
      projectListTags: ['Сайт'],
    };
  },
};
</script>

<style lang="stylus" scoped>
.angular-block
  padding-bottom: 6rem
  @media $display-breakpoints.sm-and-down
    padding-bottom: 5rem
  @media screen and (max-width: 399px)
    padding-bottom: 4rem
  @media screen and (min-width: 2000px)
    padding-bottom: 10rem

.angular-block >>> .angular-back &
  &::before
    background-image: none

.angular-block >>> .angular-back
  span
    &::after
      content: ''
      position: absolute
      width: 100%
      top: 0
      left: 0
      background-repeat: repeat-x
      background-position: center top
      background-size: contain
      background-image: url('/img/angular_content.svg')
      display: block
      bottom: -0.02px
      @media $display-breakpoints.lg-and-up
        background-size: cover
      @media $display-breakpoints.md-only
        background-size: auto 100%
      @media $display-breakpoints.sm-only
        background-size: auto 100%
      @media $display-breakpoints.sm-and-down
        background-size: cover

.page-title-content--padding
  padding-right: 5px
  padding-top: 1px

.mini-articles >>> .mini-article .container &
  & .head
    margin-bottom: 28.5px

  & .head .title
    min-width: 260px
    line-height: 1.6

.info-block-item, .info-block-item__text
  max-width: 228px;

.section-container-work--format
  margin-top: -1.5rem

  & .section-format--grid
    margin-top: 42px

    & >>> .info-block-grid .info-block-item .info-block-item__text
      padding-top: 10px

.section-title__container__text
  padding-bottom: 10px;
  @media screen and (min-width: 2000px)
    margin-top: 0;

.section-title__container__text.format
  padding-top: 26px;
  padding-bottom: 12px;

.info-block-item.work-format
  max-width: 324px;

.angular-area-form
  padding: 0
  margin-bottom: 3.5rem

  & >>> .angular-back
    background-image: url("/img/angular_hd_cont.png")

    &::before
      background-image: none

.info-block-item.work-format >>> .info-block-item__icon, .info-block-item--content >>> .info-block-item__icon
  height: 3.3rem

.info-block-item--content >>> .info-block-item__text
  padding-top: 2px

.mini-article--content >>> .body,
.mini-article--content >>> .container .head .title
  white-space: pre-wrap
  @media $display-breakpoints.md-and-down
    white-space: normal

.specialTitle >>> .container .head .title
  margin-left: 90px
  height: 75px
  min-width: 280px !important

.info-block-item--padding >>> .info-block-item__text
  @media $display-breakpoints.md-only
    padding-top: 37px !important

.inputForm >>> .i-text-field__control__input
  padding: 0 50px

.inputForm >>> .btn
  padding-left: 33px
</style>
