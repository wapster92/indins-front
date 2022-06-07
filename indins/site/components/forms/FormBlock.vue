<template>
  <div class="form-block">
    <AngularBlock
      :data="angularBlock"
      class="form-block__angular-block"
    >
      <div class="form-block__container">
        <SectionTitle
          :data="{
            title
          }"
        />
        <div class="form-block__wrap">
          <TextField
            v-mask="'+7 (###) ###-##-###'"
            ref="phoneInput"
            :rules="[() => isValidNumber || 'Заполните корректный номер телефона']"
            v-model="phone"
            class="form-block__input"
            placeholder="+7 (_ _ _)  _ _ _ - _ _ - _ _"
            type="tel"
            name="phone"
            @input="setPhone"
            @blur:phone="onSendBlur"
          />
          <Button
            :styles="{'max-width': '390px', 'width': '100%'}"
            class="form-block__btn"
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
    </AngularBlock>
  </div>

</template>

<script>
import { mask } from 'vue-the-mask';
import SectionTitle from '~/components/common/UI/SectionTitle';
import AngularBlock from '~/components/common/AngularBlock';
import TextField from '~/components/common/UI/TextField';
import Button from '~/components/common/UI/Button';
import sendRequestCall from '~/mixins/sendRequestCall';

export default {
  name: 'FormBlock',
  components: {
    TextField,
    SectionTitle,
    AngularBlock,
    Button,
  },
  directives: {
    mask,
  },
  mixins: [sendRequestCall],
  props: {
    title: {
      type: String,
      default: 'Давайте обсудим ваш проект',
    },
  },
  data() {
    return {
      angularBlock: {
        areaClass: 'auto-to-scroll',
        sawTop: true,
      },
      phone: '',
      countFocusSend: 1,
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

      if (window.yaCounter26690535) {
        window.yaCounter26690535.reachGoal('callbackModal');
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
        console.log(this.countFocusSend);
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

<style lang="stylus">

</style>
