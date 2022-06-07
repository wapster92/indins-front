<template>
  <div class="contact-page">
    <AngularBlock :data="angularBlock">
      <PageTitle :data="pageTitle"/>
      <TextBlock :data="textBlock"/>
      <TextBlock :data="textBlock2"/>
    </AngularBlock>
    <InfoBlockFlex :data="infoBlockFlex">
      <div
        v-for="(item, key) in contactTextBlock"
        :key="item.textClass + key"
      >
        <div
          class="contact-page__text-block"
        >
          <div
            :class="item.textClass"
            v-html="item.text"
          />
          <div
            class="is-bottom"
            v-html="item.textBottom"
          />
        </div>
      </div>
    </InfoBlockFlex>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { meta } from '~/mixins/meta';
import checkMenu from '~/mixins/checkMenu';

import PageTitle from '~/components/common/UI/PageTitle';
import TextBlock from '~/components/common/UI/TextBlock';
import InfoBlockFlex from '~/components/common/UI/InfoBlockFlex';
import AngularBlock from '~/components/common/AngularBlock';

export default {
  name: 'Contacts',

  components: {
    PageTitle,
    AngularBlock,
    TextBlock,
    InfoBlockFlex,
  },

  mixins: [
    meta,
    checkMenu,
  ],

  async asyncData({ app: { $xhr }, route }) {
    const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', route.path));

    try {
      const metaData = await $xhr.send(metaRequest)
        .then(res => res.data.data.result)
        .catch(er => console.error(`CONTACTS: ${er}`));

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
      title: 'Контакты',
    },
    textBlock: {
      text: '<p>Наш офис расположен по&nbsp;адресу:<br><span class="text-primary text-normal">195112, Санкт-Петербург, площадь&nbsp;Карла&nbsp;Фаберже&nbsp;8Б, БЦ&nbsp;«Золотая&nbsp;долина», офис&nbsp;406</span></p>',
      textClass: 'text-center',
    },
    textBlock2: {
      text: '<p class="text-35">Вы&nbsp;можете позвонить нам по&nbsp;телефону, указанному в&nbsp;верхней части сайта,<br> или&nbsp;<a href="#back_call" id="back_call_link">заказать обратный звонок.</a></p>',
      textClass: 'text-center',
    },
    infoBlockFlex: {
      gridClass: 'contact-three-flex',
      column: '3',
    },
    contactTextBlock: [
      {
        text: '<p class="">Электронная почта для предложений о&nbsp;сотрудничестве:</p>',
        textBottom: '<p class="font-contact-is"><a href="mailto:info@indins.ru">info@indins.ru</a></p>',
        textClass: 'contact-page__text-block_text-15',
      },
      {
        text: '<p>Электронная почта для&nbsp;работы с&nbsp;нашими клиентами:</p>',
        textBottom: '<p class="font-contact-is"><a href="mailto:manager@indins.ru">manager@indins.ru</a></p>',
        textClass: 'contact-page__text-block_text-15',
      },
      {
        text: '<p>Время работы офиса для&nbsp;приема гостей:</p>',
        textBottom: '<p class="font-contact-is text-primary">10:00 — 18:00 (по будням)</p>',
        textClass: 'contact-page__text-block_text-15',
      },
    ],
  }),
  mounted() {
    const link = document.querySelector('#back_call_link');
    const backCallForm = document.querySelector('#back_call');
    if (backCallForm) {
      link.addEventListener('click', e => {
        e.preventDefault();
        backCallForm.scrollIntoView({ behavior: 'smooth' });
      });
    }
  },
};
</script>
