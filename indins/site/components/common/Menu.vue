<template>
  <div :class="classList">
    <div class="menu__logo">
      <Logo
        reverse-color
        @click.native="switchMenu"
      />
    </div>
    <div class="menu__content">
      <div class="menu__content__header">
        <div class="menu__content__header__socials">
          <Social white-icons/>
        </div>
        <div class="menu__content__header__request-call">
          <Button
            active
            bg-color="#3F496A"
            borderColor="#fff"
            @click="onRequestCall"
          >
            <span class="menu__content__header__request-call__btn">
              <span>Заказать звонок</span>
              <span class="menu__content__header__request-call__btn__icon"/>
            </span>
          </Button>
        </div>
      </div>
      <div class="menu__content__column-block">
        <div class="menu__content__column-block__column">
          <div
            v-for="item in firstColumn"
            :key="item.name"
            class="menu__content__column-block__column__item"
          >
            <nuxt-link
              :tag="item.tag"
              :to="item.to"
              @click.native="switchMenu"
            >
              {{ item.value }}
            </nuxt-link>
          </div>
        </div>
        <div class="menu__content__column-block__column">
          <div
            v-for="item in secondColumn"
            :key="item.name"
            class="menu__content__column-block__column__item"
          >
            <nuxt-link
              :tag="item.tag"
              :to="item.to"
              @click.native="switchMenu"
            >
              {{ item.value }}
            </nuxt-link>
          </div>
        </div>
        <div class="menu__content__column-block__column">
          <div
            v-for="item in thirdColumn"
            :key="item.name"
            class="menu__content__column-block__column__item"
          >
            <nuxt-link
              :tag="item.tag"
              :to="item.to"
              @click.native="switchMenu"
            >
              {{ item.value }}
            </nuxt-link>
          </div>
        </div>

      </div>
      <div class="menu__content__footer">
        <div class="menu__content__footer__address">
          <span>Санкт-Петербург</span>
          <span>пл.&nbsp;Карла&nbsp;Фаберже, 8Б, офис&nbsp;406</span>
        </div>
        <div class="menu__content__footer__operating-mode">
          <span>Режим работы:</span>
          <span>ПН-ПТ с 10:00 до 19:00</span>
        </div>
        <div class="menu__content__footer__contacts">
          <Phone
            :font-size="20"
            :styles="{'font-weight': '400'}"
            white-phone
          />
          <Email
            :font-size="20"
            :styles="{'font-weight': '400', 'margin-top': '13px'}"
            is-thin
            white-email
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { navigation } from '~/constants';
import Logo from '~/components/common/Logo';
import Social from '~/components/common/Social';
import Button from '~/components/common/UI/Button';
import Phone from '~/components/common/Phone';
import Email from '~/components/common/Email';

export default {
  name: 'Menu',
  components: {
    Logo,
    Social,
    Button,
    Phone,
    Email,
  },

  computed: {
    showMenu() {
      return this.$store.getters['menu/show'];
    },

    menuNavigation() {
      return navigation;
    },

    classList() {
      return {
        menu: true,
        menu_open: this.showMenu,
      };
    },

    firstColumn() {
      return ['automation', 'customers', 'portfolio'].map(elem => navigation.find(nav => nav.name === elem));
    },

    secondColumn() {
      return ['netadv', 'support', 'razrabotka-saita'].map(elem => navigation.find(nav => nav.name === elem));
    },

    thirdColumn() {
      return ['about', 'vacancy', 'contacts'].map(elem => navigation.find(nav => nav.name === elem));
    },
  },

  methods: {
    switchMenu() {
      this.$store.commit('menu/switch');
    },

    onRequestCall() {
      this.$store.commit('modal/setOptions', {
        title: 'Мы перезвоним вам',
        body: {
          component: () => import('~/components/forms/PhoneModalForm'),
        },
        styles: {
          'max-width': '524px',
        },
      });
      this.$store.commit('modal/show');
    },
  },
};
</script>
