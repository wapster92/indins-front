<template>
  <footer class="footer">
    <div class="footer__container container">
      <div class="footer-content">
        <div class="footer-content__contacts">
          <div class="footer-contact">
            <a
              :href="`tel:${phone}`"
              class="footer-contact__link"
            >{{ phone }}</a>
            <a
              :href="`mailto:${email}`"
              class="footer-contact__link"
            >{{ email }}</a>
          </div>
        </div>
        <div class="footer-content__socials">
          <ul class="social-list">
            <li class="social-list__item">
              <a
                :href="urlYoutube"
                class="social-list__link"
              >
                <svg-icon name="socials/youtube" />
              </a>
            </li>
            <li class="social-list__item">
              <a
                :href="urlVk"
                class="social-list__link"
              >
                <svg-icon name="socials/vk" />
              </a>
            </li>
            <li class="social-list__item">
              <a
                :href="urlInstagram"
                class="social-list__link"
              >
                <svg-icon name="socials/telegram" />
              </a>
            </li>
            <li class="social-list__item">
              <a
                :href="urlFaceBook"
                class="social-list__link"
              >
                <svg-icon name="socials/facebook" />
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-content__copy">
          <div class="copy">
            <a
              href="#"
              class="copy__link"
            >
              © 2021 Все права защищены
            </a>
            <a
              href="#"
              class="copy__link"
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterMain',
  props: {
    phone: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    urlFaceBook: {
      type: String,
      default: '',
    },
    urlInstagram: {
      type: String,
      default: '',
    },
    urlVk: {
      type: String,
      default: '',
    },
    urlYoutube: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus">
.footer
  background: $black-main;
  padding: 26px 0 36px;
  @media screen and (min-width: 713px)
    padding-top: 50px;
  @media screen and (min-width: 1220px)
    padding: 68px 0;

.footer-content
  display: grid;
  grid-template-columns 1fr
  grid-auto-rows auto
  grid-row-gap 40px
  grid-template-areas "contacts"\
                      "socials"\
                      "copy"
  @media screen and (min-width: 713px)
    grid-template-columns: 1fr 226px;
    grid-template-areas "contacts socials"\
                        "copy copy"
  @media screen and (min-width: 1220px)
    grid-template-columns 1fr 350px 226px
    grid-template-areas "copy contacts socials"
  &__contacts
    grid-area contacts
    @media screen and (min-width: 713px)
      align-items center
      display flex

  &__socials
    grid-area: socials;

  &__copy
    grid-area copy
    @media screen and (min-width: 1220px)
      align-items: center;
      display flex
.footer-contact
  display flex
  justify-content space-between
  flex-wrap: wrap;
  max-width 364px
  &__link
    font-weight: 700
    color: $white-main;
    transition color .3s
    padding-top: 14px;
    padding-right: 30px
    @media screen and (min-width: 713px)
      padding-top: 0;
    &:last-child
      padding-right: 0
    &:hover, &:focus
      color: $red-secondary;

.social-list
  margin: 0
  padding: 0
  list-style-type none
  display grid
  grid-template-columns repeat(auto-fit, 30px)
  grid-template-rows 30px
  grid-column-gap 30px
  @media screen and (min-width: 713px)
    justify-content end
  &__link
    fill $grey-stroke
    transition fill .3s
    &:hover, &:focus
      fill $red-secondary
    .icon
      width: 100%
      height: 100%

.copy
  display: flex;
  flex-wrap: wrap;
  &__link
    color: $grey-stroke;
    transition: color .3s
    padding-right: 0
    padding-bottom: 14px
    @media screen and (min-width: 458px)
      padding-right: 42px
    @media screen and (min-width: 1220px)
      padding-bottom: 0
    &:last-child
      padding-right: 0
    &:hover, &:focus
      color: $red-secondary;
</style>
