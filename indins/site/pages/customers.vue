<template>
  <div class="customers-page">
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <TextBlock :data="TextBlock_0"/>
      <TextBlock :data="TextBlock_0_1"/>
    </AngularBlock>
    <SectionTitle :data="sectionTitleInclude"/>
    <InfoBlockGrid :data="itemsListIncludeType">
      <InfoBlockItem
        v-for="(item, key) in itemsListInclude"
        :key="key"
        :data="item"
        class="small-icon"
      />
    </InfoBlockGrid>
    <InfoBlockGrid
      :data="infoBlockGrid"
      class="offset-top"
    >
      <InfoBlockItem
        v-for="(item, key) in infoBlockList"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <QuotationBlock :data="quotationBlockStage"/>
    <HorizonList :data="itemListStage"/>
    <QuotationBlock :data="quotationBlockResult"/>
    <SectionTitle :data="sectionTitleProject"/>
    <SliderBlock
      :tags="projectTagList"
    />
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import AngularBlock from '~/components/common/AngularBlock';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import InfoBlockItem from '~/components/common/UI/InfoBlockItem';
import SectionTitle from '~/components/common/UI/SectionTitle';
import QuotationBlock from '~/components/common/QuotationBlock';
import HorizonList from '~/components/common/UI/HorizonList';
import SliderBlock from '~/components/common/SliderBlock';
import TextBlock from '~/components/common/UI/TextBlock';

export default {
  name: 'Customers',

  components: {
    PageTitle,
    AngularBlock,
    InfoBlockGrid,
    InfoBlockItem,
    SectionTitle,
    QuotationBlock,
    HorizonList,
    SliderBlock,
    TextBlock,
  },

  mixins: [
    meta,
    checkMenu,
  ],

  async asyncData({ app: { $xhr }, route }) {
    const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', route.path));
    try {
      const metaData = await $xhr.send(metaRequest)
        .then(res => res.data.data.result);

      return {
        ...metaData,
      };
    } catch (e) {
      console.error(e);
    }
  },

  data: () => ({
    page: {
      menuBack: false,
      footerBack: true,
    },

    angularBlock: {
      areaClass: 'main-title',
      sawBottom: true,
    },

    pageTitle: {
      title: 'Клиенты и продажи',
    },

    infoBlockGrid: {
      column: '3',
      gap: '75',
    },

    infoBlockList: [
      {
        title: 'Комплекс технологий',
        text: 'поможет вашему бизнесу привлечь новых клиентов и повысить продажи. Для этого можно отдельно использовать <a href="/netadv">Интернет-рекламу</a>, <a href="/development">сайт</a> или <a href="/automation">CRM-систему</a>.',
        iconName: 'complex',
      },
      {
        title: 'Наиболее эффективный подход',
        text: '— объединить <a href="/netadv">рекламу</a>, <a href="/development">сайт</a>, <a href="/automation">CRM-систему в единую систему</a>, учитывающую все каналы привлечения клиентов и собирающую их в ваш отдел продаж.',
        iconName: 'approach',
      },
      {
        title: 'Индивидуальная информационная система',
        text: 'для работы с клиентом позволит очень точно <a href="/automation">автоматизировать процессы</a> и не потерять ни одного клиента.',
        iconName: 'individual',
      },
    ],

    sectionTitleInclude: {
      // areaClass: 'max-width-18',
      title: 'Для привлечения клиентов используются:',
    },
    itemsListIncludeType: {
      gridClass: 'site-type-grid',
      areaClass: 'site-type-area',
      column: '4',
      gap: '20',
    },
    itemsListInclude: [
      {
        text: 'Сайт',
        titleClass: 'text-center',
        iconName: 'icon_site',
        textClass: 'info-block-item__text--center',
      },
      {
        text: 'CRM система',
        titleClass: 'text-center',
        iconName: 'icon_crm_sistema',
        textClass: 'info-block-item__text--center',
      },
      {
        text: 'Интернет-реклама',
        titleClass: 'text-center',
        iconName: 'icon_internet_reklama',
        textClass: 'info-block-item__text--center',
      },
      {
        text: 'Сквозная аналитика',
        titleClass: 'text-center',
        iconName: 'icon_skvoznaya_analitika',
        textClass: 'info-block-item__text--center',
      },
    ],

    quotationBlockStage: {
      text: '<p>Каждый этап поиска, привлечения и&nbsp;работы с&nbsp;клиентом должен быть логичным продолжением предыдущего.</p>',
    },

    itemListStage: {
      title: 'Вы получаете:',
      items: [
        {
          title: 'Анализ продукта',
          titleRight: 'Анализ продукта',
          text: ''
            + '<p>Перед пониманием, как лучше всего предложить потенциальным клиентам ваш продукт мы его анализируем. Выявляем наиболее привлекательные стороны.</p> '
            + '<p>Лучше всего на этот вопрос можете ответить вы, спросив своих уже состоявшихся клиентов: "Почему вы купили именно у нас?". Мы ищем и изучаем ваших конкурентов. Часто бывает, что можно сделать сам продукт привлекательнее для покупателя, но вы можете этого не замечать и нужен взгляд со стороны.</p>',
          icon: '/img/InfoIcons/icon_complex.svg',
        },
        {
          title: 'Поиск покупателя',
          titleRight: 'Поиск покупателя',
          text: '<p>Где и как покупатель ищет то, что вы предлагаете? Выявление, по каким запросам и в каких источниках покупатели ищут вашу услугу или товар.</p>'
            + '<p>Это позволяет не тратить средства при проведении рекламных кампаний на неэффективные рекламные каналы и запросы, а нацелить весь рекламный бюджет на максимальную отдачу в виде обращений клиентов по минимальной стоимости. Это позволит вам получать больше клиентов за ту же стоимость</p>',
          icon: '/img/InfoIcons/icon_generate.svg',
        },
        {
          title: 'Привлечение клиента на&nbsp;сайт',
          titleRight: 'Привлечение клиента на&nbsp;сайт',
          text: '<p>Настройка рекламных кампаний должна выполнятся профессионально. Необходимо учесть все факторы и технические возможности, которые предоставляют рекламные площадки. У каждой площадки свои особенности.</p>'
            + '<p>Если над покупкой вашего продукта или услуги клиент думает относительно долго, то больше клиентов вы получите через ретаргетинг и контекстную рекламу. Это когда клиент уже искал ваш продукт ранее и реклама его "догоняет". Если то, что вы предлагаете, требуется клиентам срочно, то эффективнее будет использовать поисковую рекламу.</p>',
          icon: '/img/InfoIcons/icon_process.svg',
        },
        {
          title: 'Поведение на сайте',
          titleRight: 'Поведение на сайте',
          text: '<p>Поведение людей на сайтах, предлагающих разные продукты - разное. Для одних продуктов и услуг нужно больше форм обратной связи и графики, для других больше информации в определенном порядке.</p>'
            + '<p>Сила индивидуальных качественных сайтов в логике подачи информации, которая продумывается задолго до создания программного кода. Эта логика должна соответствовать самому продукту, типу покупателей, поисковым запросам которые будут в рекламе. Всё должно быть согласовано и вести к конечной цели, обращению клиента к вам в компанию.</p>',
          icon: '/img/InfoIcons/icon_processy.svg',
        },
        {
          title: 'Не терять обращения',
          titleRight: 'Не терять обращения',
          text: '<p>Из любой точки сайта посетитель должен иметь возможность обратиться к вам в компанию. Система должна работать так чтобы при обращении вы могли среагировать в ту же минуту.</p>'
            + '<p>Вы не должны терять клиентов на этой стадии. Для некоторых видов продуктов и услуг всплывающие окна только снижают конверсию. Для каждого устройства должно быть своё поведение, своя подача информации и свои методы связи. Для посетителя с телефона простой способ позвонить одним кликом, с компьютера - заказать звонок.</p>',
          icon: '/img/InfoIcons/icon_individual.svg',
        },
        {
          title: 'CRM-система',
          titleRight: 'CRM-система',
          text: '<p>Все обращения, вне зависимости от источника поступления, должны фиксироваться и попадать в CRM-систему. Это позволит вам не терять клиентов и реагировать на обращения оперативно.</p>'
            + '<p>У вас может быть собственная внешняя CRM-система, к которой можно подключаться и вносить сделки в нее, а может быть созданная нами в рамках программного комплекса. Единая система позволит более эффективно автоматизировать процесс, иметь собственный коллтрекинг, подсчет ROMI и получать больше данных для аналитики.</p>',
          icon: '/img/InfoIcons/icon_complex.svg',
        },
        {
          title: 'Сквозная аналитика',
          titleRight: 'Сквозная аналитика',
          text: '<p>После настройки и запуска рекламных кампаний их необходимо улучшать. Снижать стоимость привлечения клиента. Для этого необходимо понимать, что, как и в какую сторону необходимо менять.</p>'
            + '<p>Сквозная аналитика помогает понять, сколько стоило вам привлечение клиента по каждому из каналов рекламы и по каждому объявлению. Превратилось ли данное обращение в заказ. Это позволяет корректировать рекламные кампании, распределять бюджет на рекламу эффективнее, привлекая больше клиентов за тот же бюджет.</p>',
          icon: '/img/InfoIcons/icon_clouds.svg',
        },
        {
          title: 'Подсчет ROMI',
          titleRight: 'Подсчет ROMI',
          text: '<p>Расходы на рекламу не могут быть большими или маленькими. Сайт не может быть дорогим или дешевым. Есть один показатель для бизнеса - окупаются вложения или нет</p>'
            + '<p> Автоматизация подсчета ROMI заключается во внесении всех расходов на маркетинг, сайт, ведение рекламных кампаний и рекламный бюджет в систему, в полученные от привлеченных клиентов средства вносятся в CRM при ведении сделок. В рамках единой системы подсчет ROMI превращается в несложную техническую задачу. </p>',
          icon: '/img/InfoIcons/icon_generate.svg',
        },
      ],
    },

    quotationBlockResult: {
      text: '<p>Важно понимать, что есть много инструментов, таких как сайт, реклама, системы аналитики. Они все используются для конечной цели - привлечение клиентов. Они должны работать вместе и быть согласованными, только тогда это работает эффективно.</p>',
    },

    sectionTitleProject: {
      title: 'Портфолио',
    },

    projectTagList: ['Сайт', 'Маркетинг'],
    TextBlock_0: {
      areaClass: 'text-center',
      text: '<p>Вашему бизнесу нужны клиенты. Сайт, айдентика, коллтрекинг, CRM-система, система ведения заказов, реклама и маркетинг - это всё только инструменты. Эти инструменты работают наиболее эффективно, если они согласованы и находятся в одном информационном поле. </p>',
    },
    TextBlock_0_1: {
      areaClass: 'text-center',
      text: '<p>Наша компания делает весь комплекс мероприятий по привлечению клиентов в ваш бизнес, создавая и оперируя множеством инструментов. От вас необходим только запрос: "Нам нужны клиенты".</p>',
    },
  }),
};
</script>

<style lang="stylus">
.offset-top
  margin-top: 65px;
</style>
