<template>
  <v-flex
    :class="{ 'no-centering': allowMove }"
    class="login-form-wrapper shrink"
  >
    <v-layout column>
      <v-flex class="login-form">
        <v-btn
          v-if="currentStage === 'password' && !forgot"
          class="login-form-back"
          icon
          absolute
          @click="currentStage = 'login'"
        >
          <div class="arrow-circle-outline" />
        </v-btn>
        <img
          :alt="projectName"
          :src="projectLogo"
          height="39"
        >
        <div class="workplace-selector">
          <SearchSelect
            v-model="currentWorkplace"
            label="Рабочее место"
            placeholder="Рабочее место не выбрано"
            :query="query"
            input-type="standart"
          />
        </div>
        <v-window
          v-if="!forgot"
          v-model="currentStageIndex"
          class="elevation-0 overflow-visible"
        >
          <v-window-item>
            <div class="login-input-wrapper">
              <label for="login-input">
                Ваш логин
              </label>
              <input
                id="login-input"
                v-model="login"
                class="login-page-input"
                type="text"
                name="username"
                autofocus
                @keydown.enter="loginSubmit"
              >
            </div>
            <input
              v-model="password"
              class="d-none"
              type="password"
              name="password"
            >
            <div class="login-stage-bottom">
              <button
                class="login-stage-bottom__link"
                @click="tryRemembering()"
              >
                Забыли логин?
              </button>
              <v-btn
                class="app-btn"
                color="info"
                depressed
                style="margin-left:auto;"
                :disabled="!login"
                @click="loginSubmit"
              >
                Далее
              </v-btn>
            </div>
          </v-window-item>
          <v-window-item>
            <PasswordInput
              v-model="password"
              :error="loginError"
              :current-stage-index="currentStageIndex"
              @password-submit="passwordSubmit"
            />
            <input
              v-model="login"
              name="username"
              class="d-none"
            >
            <div class="login-stage-bottom">
              <button
                class="login-stage-bottom__link"
                @click="tryRemembering(true)"
              >
                Забыли пароль?
              </button>
              <v-btn
                :disabled="!password"
                class="app-btn"
                color="info"
                depressed
                @click="passwordSubmit"
              >
                Войти
              </v-btn>
            </div>
          </v-window-item>
        </v-window>
        <v-flex
          v-if="forgot"
          class="login-form-forgot"
        >
          <p>
            {{ rememberMessage }}
            <a :href="`mailto:${supportLink}`">
              {{ supportLink }}
            </a>
          </p>
          <v-btn
            class="app-btn text-center ml-auto"
            color="info"
            depressed
            @click="forgot = !forgot"
          >
            Назад
          </v-btn>
        </v-flex>
      </v-flex>
      <p class="login-form-support">
        Есть вопросы? Напишите нам по адресу
        <a :href="`mailto:${supportLink}`">{{ supportLink }}</a>
      </p>
    </v-layout>
  </v-flex>
</template>

<script>
import PasswordInput from 'core-auth/src/components/PasswordInput.vue';
import {
  Put, Filter, Simple, Get,
} from 'core-xhr';

export default {
  name: 'AuthLogin',
  components: {
    PasswordInput,
  },
  layout: 'auth',
  data() {
    return {
      projectName: this.$auth.options.project.name,
      projectLogo: this.$auth.options.project.logo,
      supportLink: this.$auth.options.project.supportLink,
      stages: ['login', 'password'],
      currentStage: 'login',
      login: '',
      password: '',
      forgot: false,
      forgotPasswword: false,
      loginError: null,
      resizeObserver: null,
      cacheSize: null,
      keyboardIsActive: false,
      currentWorkplace: null,
      query: (new Get('workplaces')).addFilter(new Filter('isBlocked', 'bool', false, false, true)),
    };
  },
  computed: {
    currentStageIndex: {
      get() {
        return this.stages.indexOf(this.currentStage);
      },
      set(value) {
        this.currentStage = this.stages[value];
      },
    },
    allowMove() {
      return this.keyboardIsActive && window.innerWidth <= 960;
    },
    rememberMessage() {
      const part = this.forgotPasswword
        ? 'восстановления пароля'
        : 'восстановления или получения логина';
      return `Для ${part} обратитесь в службу поддержки, отправив письмо на почту`;
    },
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (!entry.contentBoxSize) return;
        const contentBoxSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize;
        if (!this.cacheSize) {
          this.cacheSize = contentBoxSize;
          return;
        }
        if (this.cacheSize.blockSize === contentBoxSize.blockSize) return;
        this.keyboardIsActive = this.cacheSize.blockSize > contentBoxSize.blockSize;
        this.cacheSize = contentBoxSize;
      });
    });
    this.resizeObserver.observe(document.querySelector('html'));
  },
  beforeDestroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.cacheSize = null;
  },
  methods: {
    tryRemembering(password = false) {
      this.forgotPasswword = password;
      this.forgot = !this.forgot;
    },
    async loginSubmit() {
      this.currentStage = 'password';
      await this.$nextTick();
    },
    passwordSubmit() {
      this.$auth
        .login({
          login: this.login,
          password: this.password,
        })
        .then(data => {
          if (!this.currentWorkplace) return;
          const request = new Put('user-workplace', {
            workPlace: { id: this.currentWorkplace.id },
          }).addFilter(new Filter('id', 'eq', this.$store.state.auth.id))
            .setPage('auth-login');
          const { info } = data.storeState;
          console.log(info);
          this.$xhr.send(request)
            .then(() => {
              this.$xhr.send(new Simple(`/api/get_workplace/${data.storeState.id}`).authorization()).then(res => {
                this.$store.commit('auth/setInfo', { ...info, getWorkPlaceNumber: res.data.workplaceNumber });
              });
            })
            .catch(this.$showError('Не удалось занять рабочее место!'));
        })
        .catch(reason => {
          console.error(reason);
          this.loginError = (
            reason.response
            && reason.response.data
            && reason.response.data.data
            && reason.response.data.data.message
          ) || 'Сервис временно недоступен';
        });
    },
  },
};
</script>

<style lang="stylus">
.workplace-selector
  .search-select
    padding-left: 0
    padding-right: 0
    margin-bottom: 15px
  .search-select-label
    text-align: left

.login-error-icon
  font-size: 16px

.login-input-wrapper
  position: relative
  padding-top: 10px
  &:focus-within
    label, .login-pass-icon
      color: #416FC8
  &.is-errored
    label
      color: #cf4949
    .login-page-input
      border-color: #cf4949
    .login-pass-icon
      color: #cf4949
  label
    position: absolute
    top: 0
    left: 9px
    z-index: 2
    padding: 0 3px
    font-size: 12px
    background: #ffffff
    color: rgba(0,0,0,.6)
    transition: all 0.3s ease
  .login-page-input
    position: relative
    z-index: 1
    width: 100%
    padding: 16px 12px
    margin-bottom: 30px
    border: 1px solid #999999
    border-radius: 4px
    outline: none
    box-shadow: none
    filter: none
    font-size: 14px
    transition: all 0.3s ease
    &:focus
      border-color: #416FC8
    &:focus, &:hover, &
      -webkit-box-shadow: 0 0 0 1000px #fff inset
      font-size: 14px
      background-color: #ffffff!important
    &.with-icon
      padding-right: 40px

  .login-pass-icon
    position: absolute
    top: 26px
    right: 12px
    z-index: 2
    &:hover
      color: #416FC8

  .login-errors
    position: absolute
    top: 40px
    left: 12px
    z-index: 0
    display: flex
    flex-flow: row nowrap
    align-items: center
    color: #cf4949
    font-size: 12px
    opacity: 0
    transition: all 0.3s ease
    &.is-visible
      top: 67px
      opacity: 1
@media(max-width: 768px)
  .login-input-wrapper .login-page-input
    height: 50px
    margin-bottom: 27px
  .login-form-support
    margin-top: 29px
</style>
