<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__company">
        <div class="footer__company__logo">
          <Logo/>
        </div>
        <div class="footer__company__name">
          <span>&copy;</span>
          <span :style="{'margin-left': '0.5em'}">ИНДИНС</span>
        </div>
      </div>
      <div class="footer__socials">
        <Social/>
      </div>
      <div class="footer__contacts">
        <Phone
          :styles="phoneStyles"
          :hide-on-mobile="false"
          is-thin
        />
        <Email
          :styles="emailStyles"
          is-thin
        />
      </div>
    </div>
  </footer>
</template>

<script>
import Social from '~/components/common/Social';
import Logo from '~/components/common/Logo';
import Phone from '~/components/common/Phone';
import Email from '~/components/common/Email';

export default {
  name: 'Footer',

  components: {
    Social,
    Logo,
    Phone,
    Email,
  },

  data: () => ({
    phoneStyles: {
      'font-weight': 400,
    },
    emailStyles: {
      'font-weight': 400,
      'margin-top': '0.75em',
    },
  }),
};
</script>
