<template>
  <div class="auth-form">
    <div class="auth-form__wrap">
      <PageTitle
        class="auth-form__title"
        text="Вход в личный кабинет"
      />
      <div
        v-show="step === 1"
        class="auth-form__steps"
      >
        <client-only>
          <ValidationProvider
            v-slot="{errors}"
            ref="login"
            name="Date"
            rules="required"
          >
            <SimpleInput
              v-model="phone"
              v-mask="'+7 (###) ###-##-##'"
              placeholder="+7 (_ _ _)  _ _ _ - _ _ - _ _"
              class="auth-form__input"
              label="Номер телефона"
              name="phone"
              :invalid="errors"
            />
          </ValidationProvider>
        </client-only>
        <ButtonMain
          class="auth-form__button"
          text="Продолжить"
          @click="sendPhoneNumber"
        />
        <div class="auth-form__links">
          <a
            class="auth-form__link"
            @click="$router.push({name: 'auth-forgot'})"
          >Забыли пароль?</a>
        </div>
      </div>
      <div
        v-show="step === 2"
        class="auth-form__steps"
      >
        <div class="auth-form__text">
          Мы отправили SMS с 6-значным кодом на указанный вами номер телефона
        </div>
        <client-only>
          <ValidationObserver
            ref="observer"
            v-slot="{errors}"
            tag="div"
          >
            <SMSCodeField
              v-model="smsCodeChars"
              class="auth-form__input"
              label="Код подтверждения"
              :invalid="errors"
            />
          </ValidationObserver>
        </client-only>
        <ButtonMain
          class="auth-form__button"
          text="Продолжить"
          @click="sendSMSNumber"
        />
        <div class="auth-form__links">
          <a
            href="#"
            class="auth-form__link"
            :class="{'auth-form__link--diactive':!repeatSendSms.status}"
            @click.prevent="sendNumber"
          >{{ repeatSendSms.text }}</a>
          <a
            href="#"
            class="auth-form__link"
            @click.prevent="step = 1"
          >Вернуться назад</a>
        </div>
      </div>
      <div
        v-show="step === 3"
        class="auth-form__steps"
      >
        <PasswordInput
          v-model="password"
          class="auth-form__input"
          label="Пароль"
          :placeholder="isOld ? 'Введите пароль' : 'Придумайте пароль'"
        />
        <ButtonMain
          class="auth-form__button"
          text="Войти"
          @click="sendPassword"
        />
        <div class="auth-form__links">
          <a
            href="#"
            class="auth-form__link"
            @click="isOld ? step = 1 : step = 2"
          >Вернуться назад</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Simple } from 'core-xhr';
import { mask } from 'vue-the-mask';
import PageTitle from '~/components/UI/blocks/PageTitle';
import SimpleInput from '~/components/UI/fields/SimpleInput';
import ButtonMain from '~/components/UI/blocks/ButtonMain';
import SMSCodeField from '~/components/UI/fields/SMSCodeField';
import PasswordInput from '~/components/UI/fields/PasswordInput';

export default {
  name: 'Index',
  directives: {
    mask,
  },
  components: {
    SimpleInput,
    ButtonMain,
    SMSCodeField,
    PasswordInput,
    PageTitle,
  },
  data() {
    return {
      step: 1,
      phone: null,
      password: null,
      smsCodeChars: null,
      isOld: null,
      smsId: null,
      repeatSendSms: {
        text: 'Отправить код повторно',
        date: 0,
        status: false,
      },
    };
  },
  computed: {
    username() {
      const regx = /\d+/g;
      return this.phone.match(regx).join('');
    },
    smsCode() {
      return this.smsCodeChars.join('');
    },
  },
  mounted() {
    /* try {
      this.$store.dispatch('user/auth');
    } catch (e) {
      // console.error(e);
    } */
  },
  methods: {
    timer() {
      this.repeatSendSms.status = false;
      this.repeatSendSms.date = Date.now();
      let infoTimeSeconds = 60;
      const duration = infoTimeSeconds * 1000;
      const interval = setInterval(() => {
        const currentDate = Date.now();
        infoTimeSeconds--;
        this.repeatSendSms.text = `Отправить код повторно через ${infoTimeSeconds} секунд`;
        if (currentDate - this.repeatSendSms.date >= duration) {
          this.repeatSendSms.status = true;
          this.repeatSendSms.text = 'Отправить код повторно';
          clearInterval(interval);
          return false;
        }
      }, 1000);
    },
    async sendPhoneNumber() {
      const isValid = await this.$refs.login.validate();
      if (!isValid.valid) return false;
      this.sendNumber();
    },
    async sendNumber() {
      this.timer();
      const data = {
        phone: this.username,
      };
      this.$xhr.send(new Simple('/api/sms/authorization', data, 'POST'))
        .then(res => {
          const result = res.data;
          if (result.isNew) {
            this.step = 2;
          } else if (result.isOld) {
            this.isOld = true;
            this.step = 3;
          } else {
            this.$notify({
              text: 'Питомник отсутствует в реестре РФО',
              type: 'error',
            });
          }
        })
        .catch(e => console.error(e));
    },
    async sendSMSNumber() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return false;
      const data = {
        phone: this.username,
        code: this.smsCode,
      };
      this.$xhr.send(new Simple('/api/sms/compare', data, 'POST'))
        .then(res => {
          const result = res.data;
          if (result.success) {
            this.smsId = result.id;
            this.step = 3;
          } else {
            this.$notify({
              text: 'Не верный код',
              type: 'error',
            });
          }
        })
        .catch(e => console.error(e));
    },
    logIn() {
      const userData = { username: this.username, password: this.password };
      this.$xhr.send(new Simple('/api/auth/login', userData, 'POST'))
        .then(res => {
          const { token } = res.data.data;
          this.$auth.setToken(token);
          this.$cookies.set('site-token', token);
          this.$router.push('/personal-area');
          this.$store.dispatch('user/auth');
        })
        .catch(() => {
          this.$notify({
            text: 'Введен не верный логин или пароль',
            type: 'error',
          });
        });
    },
    sendPassword() {
      if (this.isOld) {
        this.logIn();
      }
      if (!this.isOld) {
        const data = {
          smsId: this.smsId,
          phone: this.phone,
          password: this.password,
        };
        this.$xhr.send(new Simple('/api/sms/password', data, 'POST'))
          .then(res => {
            if (res.data.success) {
              this.logIn();
            }
          })
          .catch(e => {
            this.$notify({
              text: e.message || 'Произошла ошибка',
              type: 'error',
            });
          });
      }
    },
  },
};
</script>

<style scoped>

</style>
