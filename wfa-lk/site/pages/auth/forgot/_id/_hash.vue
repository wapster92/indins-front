<template>
  <div class="auth-form">
    <div class="auth-form__wrap">
      <div
        class="auth-form__steps"
      >
        <PasswordInput
          v-model="pass"
          class="auth-form__input"
          label="Пароль"
          placeholder="Придумайте пароль"
        />
        <PasswordInput
          v-model="checkedPass"
          class="auth-form__input"
          label="Пароль"
          placeholder="Повторите пароль"
        />
        <div class="auth-form__text">
          После нажатия на кнопку “Сменить” вы будете направлены на страницу авторизации
        </div>
        <ButtonMain
          class="auth-form__button"
          text="Сменить"
          @click="sendPassword"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PasswordInput from '@/components/UI/fields/PasswordInput';
import ButtonMain from '@/components/UI/blocks/ButtonMain';
import { Simple } from 'core-xhr';

export default {
  name: 'Hash',
  components: {
    PasswordInput,
    ButtonMain,
  },
  async validate({ app: { $xhr }, route }) {
    let result = false;
    try {
      result = await $xhr.send(new Simple(`/api/check_user/${route.params.id}/${route.params.hash}`))
        .then(resp => resp.data);
    } catch (e) {
      console.log(e);
      return false;
    }
    return result.success;
  },
  data() {
    return {
      pass: null,
      checkedPass: null,
    };
  },
  methods: {
    sendPassword() {
      if (this.pass && this.pass === this.checkedPass) {
        this.$xhr.send(
          new Simple(`/api/change_pass/${this.$route.params.id}/${this.$route.params.hash}`, {
            pass: this.pass,
          }, 'POST'),
        ).then(resp => {
          if (resp.data.success) {
            console.log('username', resp.data);
            console.log('password', this.pass);
            const userData = { username: resp.data.result.name, password: this.pass };
            this.$xhr.send(new Simple('/api/auth/login', userData, 'POST'))
              .then(res => {
                const { token } = res.data.data;
                console.log(token);
                this.$auth.setToken(token);
                this.$cookies.set('auth-token', token);
                this.$store.dispatch('user/auth');
                this.$router.push('/personal-area');
              })
              .catch(e => console.error(e));
            this.$notify({
              text: 'Пароль изменен',
              type: 'success',
            });
          } else {
            this.$notify({
              text: resp.data.message,
              type: 'error',
            });
            this.$router.push('/');
          }
        }).catch(() => {
          this.$notify({
            text: 'Изменение пароля не удалось',
            type: 'error',
          });
        });
      } else {
        this.$notify({
          text: 'Пароли не совпадают',
          type: 'error',
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
