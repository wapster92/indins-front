<template>
  <div class="long-form">
    <div class="container">
      <div class="wrap">
        <h4 class="title">{{ title }}</h4>
        <div class="form-wrap">
          <TextField
            v-mask="'+7 (###) ###-##-###'"
            ref="phoneInput"
            :rules="[() => isValidNumber || 'Заполните корректный номер телефона']"
            v-model="phone"
            class="input"
            placeholder="+7 (_ _ _)  _ _ _ - _ _ - _ _"
            type="tel"
            name="phone"
            @input="setPhone"
            @blur:phone="onSendBlur"
          />
          <Button
            :styles="{'max-width': '341px', 'width': '100%'}"
            class="button"
            bgColor="#3F496A"
            active
            @click="onClick"
          >
            <span class="btn">
              <span class="btn__text">Заказать звонок</span>
              <span class="btn__icon"/>
            </span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/UI/Button';
import TextField from '@/components/common/UI/TextField';
import { mask } from 'vue-the-mask';
import sendRequestCall from '@/mixins/sendRequestCall';

export default {
  name: 'LongForm',
  components: {
    Button,
    TextField,
  },
  directives: {
    mask,
  },
  mixins: [sendRequestCall],
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      phone: '',
    };
  },
  computed: {
    isValidNumber() {
      return this.validateNumber(this.phone);
    },
  },
  watch: {
    phone(val, oldVal) {
      if (val !== oldVal) {
        this.countFocusSend = 1;
      }
    },
  },
  methods: {
    setPhone(v) {
      if (v.charAt(4) === '8' && v.length === 19) {
        this.phone = this.phone.slice(0, 3) + this.phone.slice(5);
      }
    },
    onClick() {
      if (!this.$refs.phoneInput.validate()) {
        return;
      }

      this.sendPhone({
        phone: this.phone,
      });
      this.$store.commit('modal/show');
    },
    async onSendBlur() {
      try {
        if (!this.$refs.phoneInput.validate()) {
          return;
        }
        if (this.countFocusSend <= 0) return;
        await this.sendPhoneBlur({
          phone: this.phone,
        });
        this.countFocusSend--;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  max-width 1188px;
  width: 100%
  margin auto;
  padding: 0 24px;
.input
  max-width 341px
  height: 62px;
  margin-bottom: 0
  background: $white;
  /*@media screen and (max-width: 1150px)
    max-width 320px*/
.button
  height: 62px;
  margin: 0 0 0 0;
  /*@media screen and (max-width: 1150px)
    max-width 320px !important*/
  @media screen and (max-width: 780px)
    margin-top: 30px
.long-form
  min-height 164px
  display flex
  align-items center
  justify-content space-between
  // background-image: url(/img/angular_hd_dark.webp);
  @media screen and (max-width: 1150px)
    padding: 35px 0 50px;

.title
  font-size: 25px
  font-weight: 700
  /*@media screen and (max-width: 1150px)
    font-size: 22px;*/
  @media screen and (max-width: 780px)
    text-align: center;
.wrap
  display flex
  align-items center
  justify-content space-between
  @media screen and (max-width: 1150px)
    flex-direction: column;
.form-wrap
  display flex
  align-items center
  justify-content space-between
  width: 100%;
  max-width 743px
  @media screen and (max-width: 1150px)
    margin-top: 20px
  @media screen and (max-width: 780px)
    flex-direction column
.btn
  flex 1
  display flex
  align-items center
  justify-content space-between
  padding: 0 29px 0 40px;
  &__icon
    position relative
    width 48px
    height 34px
    opacity .6
    transition opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
    background-repeat no-repeat
    background-size contain
    background-position center
    background-image url('/img/arrow_btn.svg')
    @media $display-breakpoints.xs-only
      width 44px
  &__text
    font-size: 21px
    font-weight: 400;
    color: $white;
</style>
