<template>
  <div class="auth-form">
    <div class="auth-form__wrap">
      <PageTitle
        class="auth-form__title"
        text="Восстановление пароля"
      />
      <div
        class="auth-form__steps"
      >
        <div class="auth-form__text">
          Укажите email и мы отправим на него ссылку для восстановления пароля
        </div>
        <SimpleInput
          v-model="email"
          class="auth-form__input"
          label="E-mail"
        />

        <ButtonMain
          class="auth-form__button"
          text="Отправить"
          @click="sendEmail"
        />
        <div class="auth-form__links">
          <a
            class="auth-form__link"
            @click="$router.push({name: 'auth-login'})"
          >На страницу входа</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Simple } from 'core-xhr';
import ButtonMain from '../../../components/UI/blocks/ButtonMain';
import PageTitle from '../../../components/UI/blocks/PageTitle';
import SimpleInput from '../../../components/UI/fields/SimpleInput';

export default {
  name: 'Index',
  components: {
    ButtonMain,
    PageTitle,
    SimpleInput,
  },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    sendEmail() {
      this.$xhr.send(
        new Simple(`/api/send_link_for_new_password/${this.email}`),
      ).then(resp => {
        if (resp.data.success) {
          this.$notify({
            text: 'Ссылка отправлена к вам на почту',
            type: 'success',
          });
        } else {
          this.$notify({
            text: resp.data.message,
            type: 'error',
          });
        }
      }).catch(() => {
        this.$notify({
          text: 'Восстановление пароля не удалось',
          type: 'error',
        });
      }).finally(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style scoped>

</style>
