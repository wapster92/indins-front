<template>
  <div class="phone-modal-form">
    <div class="phone-modal-form__description">
      <span>Закажите обратный звонок</span>
      <span>и мы перезвоним вам в ближайшее время</span>
    </div>
    <TextField
      v-mask="'+7 (###) ###-##-###'"
      ref="phoneInput"
      v-model="phone"
      :rules="[() => isValidNumber || 'Заполните корректный номер телефона']"
      required
      type="tel"
      name="phone"
      placeholder="+7 (_ _ _) - _ _ _ - _ _ - _ _"
      @input="setPhone"
      @blur:phone="onSendBlur"
    />
    <div class="phone-modal-form__send">
      <Button
        :disabled="loading"
        active
        bg-color="#3F496A"
        @click="onClick"
      >
        <span class="phone-modal-form__send__btn">
          <span>Заказать звонок</span>
          <span class="phone-modal-form__send__btn__icon"/>
        </span>
      </Button>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import sendRequestCall from '~/mixins/sendRequestCall';
import TextField from '~/components/common/UI/TextField';
import Button from '~/components/common/UI/Button';

export default {
  name: 'PhoneModalForm',

  directives: { mask },

  components: {
    TextField, Button,
  },

  mixins: [sendRequestCall],

  data: () => ({
    phone: null,
    countFocusSend: 1,
  }),

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
  mounted() {
    this.$refs.phoneInput.$el.querySelector('input[type=tel]').focus();
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
