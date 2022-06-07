<template>
  <div>
    <AngularBlock
      :data="angularBlock"
    >
      <PageTitle :data="{title: pageTitle.title}"/>
      <TextBlock
        :data="{...TextBlock}"
      />
      <PortLogo :data="PortLogo"/>
      <TextBlock
        :data="TextBlock2"
      />
      <SectionTitle :data="SectionTitle_0"/>
      <InfoBlockGrid
        :data="InfoBlockGrid_0"
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
      class="mtr-project"
    />
    <SectionTitle
      :data="SectionTitle_1"
    />
    <TextBlock
      :data="TextBlock_1"
    />
    <SectionTitle :data="SectionTitle_2"/>
    <InfoBlockGrid
      :data="InfoBlockGrid_1"
    >
      <InfoBlockItem
        v-for="(item, key) in InfoBlockList_1"
        :key="key"
        :data="item"
      />
    </InfoBlockGrid>
    <SectionTitle
      :data="SectionTitle_3"
    />
    <TextBlock
      :data="TextBlock_3"
    />
    <SectionTitle :data="SectionTitle_4"/>
    <TextBlock
      :data="TextBlock_4"
    />
    <SectionTitle :data="SectionTitle_5"/>
    <TextBlock
      :data="TextBlock_5"
    />
    <SectionTitle :data="SectionTitle_6"/>
    <TextBlock
      :data="TextBlock_6"
    />
    <SectionTitle :data="SectionTitle_7"/>
    <TextBlock
      :data="TextBlock_7"
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

const projectImgFolder = '/img/portfolioItems/medtechrais';
const projectTitle = 'XRM-система для проверки водителей и транспортных средств';
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
      TextBlock2: {
        areaClass: 'port-text',
        text: '<p>Компания «Медтехрейс» занимается оказанием услуг по проведению медицинских осмотров для водителей и техническим осмотром автомобильной техники. С помощью передвижных пунктов медицинского освидетельствования с лабораторией оперативно производит осмотр и выдает необходимые документы. Компания работает с 2011 года.</p> <p>XRM-система для компании «Медтехрейс» создавалась для автоматизации взаимодействия между поставщиком услуг по медицинскому осмотру водителей и техническому осмотру автомобилей и получателями данных услуг.</p>',
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
        column: '3',
        gap: '50',
      },
      InfoBlockList_0: [
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mtr-icon--lk',
          text: 'Личный кабинет клиента',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mtr-icon--share',
          text: 'Рассылка документов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mtr-icon--calculation',
          text: 'Расчет стоимости услуг',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mtr-icon--mobile',
          text: 'Мобильное приложение',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mtr-icon--reports',
          text: 'Отчеты по оплатам',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mtr-icon--generation',
          text: 'Генерация счетов на оплату',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mtr-icon--waybill',
          text: 'Генерация путевых листов',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mtr-icon--integration',
          text: 'Интеграция с банком',
        },
        {
          areaClass: 'max-17-xs flex-start',
          iconName: 'mtr-icon--photo',
          text: 'Фотофиксация авто водителями',
        },
      ],
      SectionTitle_1: {
        title: 'Цель проекта',
      },
      TextBlock_1: {
        areaClass: 'port-text',
        text: '<p>Разработка системы, в которой между собой связаны реестры клиентов, водителей, автомобилей и документов. Было важно исключить большую часть проблемных зон, которые связаны с человеческим фактором. Ставилась задача по необходимости повышения доступности информации как для клиентов, так и для водителей. Одной из главных целей была автоматизация документооборота, выставление счетов и их оплаты.</p>',
      },
      InfoBlockGrid_1: {
        column: '4',
        gap: '50',
      },
      InfoBlockList_1: [
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Обеспечение доступа в информационную систему сотрудников организации с разделением по ролям доступа.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Упрощение работы с реестром клиентов за счет интеграции с единой базой юридических лиц в пределах РФ.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Ведение реестра договоров и контроль за исполнением с помощью нескольких инструментов и интеграцией с банком.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Контроль за действиями сотрудников внутри информационной системы за счет фиксации истории действий пользователей.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Контроль исполнения договорных обязательств перед клиентами с помощью ежемесячной рассылки сводных документов.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Функция автоматического перемещения в отдельный список клиентов, которые не произвели оплату вовремя.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Возможность хранения медиафайлов и документов, которые связаны с компанией на сервере.',
        },
        {
          areaClass: 'max-17-xs',
          iconName: 'ticks',
          text: 'Обеспечение разграниченного доступа в информационную систему для клиентов организации.',
        },
      ],
      SectionTitle_2: {
        title: 'Функции системы',
      },
      TextBlock_2: {
        areaClass: 'port-text',
        text: '<p>Система предоставляет распределенный доступ к информации в зависимости от роли пользователя, выбранного или установленного города. Вывод информации, использование данных и взаимодействие с ними регламентируется ролью и городом пользователя. Есть возможность комбинирования ролей для одного пользователя.</p><p>Для того, чтобы предоставить доступ ответственных лиц и профильных специалистов компании к информации по договорным взаимоотношениям, был разработан личный кабинет клиента. В нем присутствует возможность скачивания необходимых документов, формирования счетов, составления заявки на изменение списка водителей и автомобилей в договоре.</p>',
      },
      InfoBlockGrid_2: {
        column: '4',
        gap: '50',
      },
      SectionTitle_3: {
        title: 'Доступ для сотрудников и клиентов компании',
      },
      SectionTitle_4: {
        title: 'Реестр клиентов и договоров',
      },
      SectionTitle_5: {
        title: 'Контроль и эффективность работы',
      },
      SectionTitle_6: {
        title: 'Дополнительный функционал',
      },
      SectionTitle_7: {
        title: 'Система сегодня',
      },
      TextBlock_3: {
        areaClass: 'port-text port-under-title',
        text: '<p>Система предоставляет распределенный доступ к информации в зависимости от роли пользователя, выбранного или установленного города. Вывод информации, использование данных и взаимодействие с ними регламентируется ролью и городом пользователя. Есть возможность комбинирования ролей для одного пользователя.</p>'
            + '<p>Для того, чтобы предоставить доступ ответственных лиц и профильных специалистов компании к информации по договорным взаимоотношениям, был разработан личный кабинет клиента. В нем присутствует возможность скачивания необходимых документов, формирования счетов, составления заявки на изменение списка водителей и автомобилей в договоре.</p>',
      },
      TextBlock_4: {
        areaClass: 'port-text port-under-title',
        text: '<p>Для того, чтобы упростить добавление клиентов в реестр, XRM-система была интегрирована с базой юридических лиц, зарегистрированных в РФ. Поиск происходит по ИНН или названию. Для контроля дублирования производится проверка ИНН и установка запрета на добавление компании, если она есть в информационной системе. Клиенты компании — это ЗАО, ООО, АО, ряд госструктур, ИП и самозанятые физлица. От выбранного типа меняются данные для заполнения карточки клиента и шаблоны договоров и соглашений.</p>'
            + '<p>Заключаемые с клиентами договоры бывают нескольких типов и зависят от разных факторов — вид и территория осмотра, тип и интервал оплат и т.д. Контроль за исполнением состоит в том, что рамках оказания услуг результатом оказания услуг является сформированный документ — путевой лист. Он не может быть сформирован, если по нему не была произведена оплата или не было предоставлено гарантийное письмо. Контроль оплат производится через создание счетов в рамках договора и автоматическим расчетом суммы в зависимости от параметров договора. Произведена интеграция с Тинькофф для получения информации об оплаченных счетах.</p>',
      },
      TextBlock_5: {
        areaClass: 'port-text port-under-title',
        text: '<p>С помощью информационной системы стало возможным фиксировать каждое действие сотрудника в историю. Кроме общей истории изменений, которая доступна конкретным ролям пользователей, в некоторых разделах и конкретных карточках есть индивидуальные списки истории действий пользователей.</p>'
        + '<p>Для повышения эффективности работы была организована автоматическая рассылка сводных документов по всем оказанным услугам в течение месяца для всех клиентов. Это позволило уменьшить рутину, не оставив работу со сводными документами без внимания.</p>',
      },
      TextBlock_6: {
        areaClass: 'port-text port-under-title',
        text: '<p>Клиенты, которые не произвели оплату своевременно попадают в специальный раздел с распределенными списками по типу клиента. В них представляются данные о договоре, сумма задолженности и общая сумма задолженности. Есть возможность фильтрации данных по параметрам, например по городу. Можно сформировать отчет по поступившим оплатам используя фильтры — типа оплаты, город, офис, период и т.д.</p>'
        + '<p>Все данные, которые связаны с компанией (документы, фотографии из фотоотчетов автомобилей и водителей, и прочее) хранятся в информационной системе. Для того, чтобы не произошла перегрузка сервера и не переполнялась память производится обработка цикличных фотографий и документов.</p>'
        ,
      },
      TextBlock_7: {
        areaClass: 'port-text port-under-title',
        text: '<p>Архитектура информационной системы спроектирована и создана таким образом, что информационную систему можно дополнять новым функционалом без вреда для скорости работы и качества программного продукта. Весь программный код документируется и написан с соблюдением международных стандартов разработки.</p>'
        + '<p>Проектирование информационной системы выполнялось на протяжении одного месяца, разработка была выполнена за 3 месяца. На текущий момент, март 2022 года нами выполнено 6 дополнительных этапов разработки дополнительного функционала, и заказчик не собирается останавливаться.</p>'
        ,
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
.mtr-project
  & >>> .portfolio-container
    padding: 0;
    & img
      box-shadow: none;
</style>
