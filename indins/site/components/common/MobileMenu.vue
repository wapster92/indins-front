<template>
  <div
    :class="mobileMenuClassList"
  >
    <div
      id="mobile-menu__scroll-target"
      ref="mobileMenuWrapper"
      class="mobile-menu__wrapper"
    >
      <div
        v-scroll:#mobile-menu__scroll-target="onScrollMenu"
        class="mobile-menu__wrapper__layout"
      >
        <div class="mobile-menu__wrapper__layout__phone-btn">
          <Phone
            :font-size="20"
            hide-on-mobile
            white-phone
          />
        </div>
        <div class="mobile-menu__wrapper__layout__close-btn">
          <MenuButton/>
        </div>
        <div class="mobile-menu__wrapper__layout__logo">
          <div
            class="mobile-menu__wrapper__layout__logo__wrapper"
          >
            <Logo
              reverse-color
              @click.native="switchMenu"
            />
          </div>
        </div>
        <div class="mobile-menu__wrapper__layout__menu">
          <div class="mobile-menu__wrapper__layout__menu__item">
            <nuxt-link
              to="/automation"
              @click.native="switchMenu"
            >Автоматизация</nuxt-link>
          </div>
          <div class="mobile-menu__wrapper__layout__menu__item">
            <nuxt-link
              to="/customers"
              @click.native="switchMenu"
            >Клиенты и&nbsp;продажи</nuxt-link>
          </div>
          <div class="mobile-menu__wrapper__layout__menu__item">
            <nuxt-link
              to="/portfolio"
              @click.native="switchMenu"
            >Портфолио</nuxt-link>
          </div>
          <div class="mobile-menu__wrapper__layout__menu__item">
            <nuxt-link
              to="/netadv"
              @click.native="switchMenu"
            >Интернет-реклама</nuxt-link>
          </div>
          <div class="mobile-menu__wrapper__layout__menu__item">
            <nuxt-link
              to="/support"
              @click.native="switchMenu"
            >Поддержка</nuxt-link>
          </div>
          <div class="mobile-menu__wrapper__layout__menu__item">
            <nuxt-link
              to="/development"
              @click.native="switchMenu"
            >Разработка сайтов</nuxt-link>
          </div>
          <div class="mobile-menu__wrapper__layout__menu__item">
            <nuxt-link
              to="/about"
              @click.native="switchMenu"
            >О компании</nuxt-link>
          </div>
          <div class="mobile-menu__wrapper__layout__menu__item">
            <nuxt-link
              to="/vacancy"
              @click.native="switchMenu"
            >Вакансии</nuxt-link>
          </div>
          <div class="mobile-menu__wrapper__layout__menu__item">
            <nuxt-link
              to="/contacts"
              @click.native="switchMenu"
            >Контакты</nuxt-link>
          </div>
          <div class="mobile-menu__wrapper__layout__menu__item">
            <nuxt-link
              to="/blog"
              @click.native="switchMenu"
            >Блог</nuxt-link>
          </div>
        </div>
        <div class="mobile-menu__wrapper__layout__contact">
          <div>
            <Phone
              :styles="phoneAndEmailStyles"
              is-thin
              white-phone
            />
          </div>
          <div>
            <Email
              :styles="phoneAndEmailStyles"
              is-thin
              white-email
            />
          </div>
        </div>
        <div class="mobile-menu__wrapper__layout__address">
          <div>
            <span>Санкт-Петербург<br>пл.&nbsp;Карла&nbsp;Фаберже, 8Б, офис&nbsp;406.</span>
          </div>
          <div>
            <span>Режим работы:<br>ПН-ПТ с 10:00 до 19:00</span>
          </div>
        </div>
        <div class="mobile-menu__wrapper__layout__social">
          <div>
            <Social white-icons/>
          </div>
        </div>
        <div class="mobile-menu__wrapper__layout__request-call">
          <div class="mobile-menu__wrapper__layout__request-call__wrapper">
            <Button
              @click="onRequestCall"
            >
              <span class="mobile-menu__wrapper__layout__request-call__btn">
                <span>Заказать звонок</span>
                <span class="mobile-menu__wrapper__layout__request-call__btn__icon"/>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/common/Logo';
import Social from '~/components/common/Social';
import Button from '~/components/common/UI/Button';
import Phone from '~/components/common/Phone';
import Email from '~/components/common/Email';
import MenuButton from '~/components/common/MenuButton';

export default {
  name: 'MobileMenu',

  components: {
    Logo,
    Social,
    Button,
    Phone,
    Email,
    MenuButton,
  },

  data: () => ({
    offsetTop: 0,
    isScrolling: false,

    offsetTopMenu: 0,
    isScrollingMenu: false,

    phoneAndEmailStyles: {
      'font-weight': 400,
    },
  }),

  computed: {
    showMenu() {
      return this.$store.getters['menu/show'];
    },

    mobileMenuClassList() {
      return {
        'mobile-menu': true,
        'mobile-menu_scrolled': this.isScrollingMenu,
        'mobile-menu_open': this.showMenu,
      };
    },
  },

  watch: {
    showMenu(value) {
      if (!value) {
        const block = this.$refs.mobileMenuWrapper;

        setTimeout(() => {
          block.scrollTop = 0;
        }, 620);
      }
    },
  },

  methods: {
    switchMenu() {
      this.$store.commit('menu/switch');
    },

    onScrollMenu(e) {
      this.offsetTopMenu = e.target.scrollTop;

      this.isScrollingMenu = this.offsetTopMenu > 50;
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
