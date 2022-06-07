<template>
  <div>
    <PopupComponent
      v-model="show"
      width="800"
      :title="callData.typeCall"
      form-mode
      dont-close-on-reject
      @click:close="clouseCardPopup"
    >
      <template #default>
        <v-row no-gutters>
          <v-col
            cols="12"
            class="pb-4 pl-3 pr-3"
          >
            <SimpleButton
              color="#52B066"
              @click="goToDB"
            >
              Переход в БД
            </SimpleButton>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="callData.clientName"
              label="Клиент"
              input-type="standart"
              readonly
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="callData.contact"
              label="Контактное лицо"
              input-type="standart"
              readonly
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="callData.managerName"
              label="Менеджер"
              input-type="standart"
              readonly
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <div
              class="pointer"
              @click="openCallWarningPopup({phone: callData.phone})"
            >
              <TextInput
                v-model="callData.phone"
                label="Телефон"
                mode="phone"
                input-type="standart"
                readonly
              />
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <div
              class="pointer"
              @click="malito(callData.email)"
            >
              <TextInput
                v-model="callData.email"
                label="E-mail"
                input-type="standart"
                readonly
              />
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="callData.city"
              label="Город"
              input-type="standart"
              readonly
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <SearchSelect
              v-model="callData.tag"
              label="Тэг"
              input-type="standart"
              readonly
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="callData.inn"
              label="ИНН"
              input-type="standart"
              readonly
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="callData.discount"
              label="Скидка. %"
              input-type="standart"
              readonly
            />
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="10">
                <TextareaInput
                  v-model="callData.comment"
                  label="Комментарий"
                  input-type="standart"
                />
              </v-col>
              <v-col
                cols="2"
                class="d-flex justify-center pt-6"
              >
                <IconButton
                  class="d-flex align-center"
                  icon="mdi-email-send-outline"
                  @click="commentSave"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
      <template #buttons>
        <v-col
          cols="12"
          class="d-flex pa-0 pl-2 pr-2"
        >
          <SimpleButton
            color="#CF4949"
            class="mr-auto ml-0"
            outlined
            :disabled="!currentOperator"
            @click="changeCallTag('Спам')"
          >
            В спам
          </SimpleButton>
          <SimpleButton
            :disabled="!currentOperator"
            @click="changeCallTag('На менеджера')"
          >
            На менеджера
          </SimpleButton>
          <SimpleButton
            :disabled="!currentOperator"
            @click="changeCallTag('Консультация')"
          >
            Консультация
          </SimpleButton>
          <SimpleButton
            :disabled="!currentOperator"
            @click="changeCallTag('Выписан счет')"
          >
            Выписан счёт
          </SimpleButton>
        </v-col>
      </template>
    </PopupComponent>
    <PopupComponent
      v-model="emailPopup"
      title="Введите e-mail адрес получателя"
      confirm-text="Подтвердить"
      form-mode
      reject-text="Отмена"
      @click:confirm="commentSave"
      @click:reject="closeEmailPopup"
    >
      <template #default>
        <v-row>
          <v-col
            cols="12"
          >
            <TextInput
              v-model="callData.managerEmail"
              label="Email"
              input-type="standart"
            />
          </v-col>
        </v-row>
      </template>
    </PopupComponent>
  </div>
</template>

<script>
import { Simple } from 'core-xhr';
import { mapState } from 'vuex';
import { generateMessageToEmail } from '../../utils/generateMessageToEmail';

export default {
  name: 'CommonCallsPopup',
  props: {
    tags: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      show: false,
      callData: {
        id: null,
        clientName: null,
        typeCall: null,
        contact: null,
        comment: null,
        managerName: null,
        phone: null,
        email: null,
        city: null,
        tag: null,
        inn: null,
        discount: null,
        managerEmail: null,
        externalUrl: null,
        externalClientId: null,
      },
      commentSaved: false,
      emailPopup: false,
      currentOperator: false,
    };
  },
  computed: {
    ...mapState({
      userId: state => state.auth.id,
    }),
    isCallRole() {
      return this.$store.getters['auth/hasRole']('CALLS');
    },
    onlineOrdersRole() {
      return this.$store.getters['auth/hasRole']('ONLINEORDERS');
    },
  },
  mounted() {
    if (this.isCallRole || this.onlineOrdersRole) {
      this.$socket.subscribe('App\\Entity\\Call', this.bridgeCall);
      this.$eventBus.on('openCallPopup', this.openPopup);
    }
  },
  methods: {
    bridgeCall(e) {
      if (!(e.id && e.action === 'POST')) return;
      this.openPopup(e.id, 'bridge');
    },
    async openPopup(id, source = '') {
      try {
        const { data } = await this.$xhr.send(new Simple(`/api/get_call/${id}`));
        if (data.operator.id !== this.userId && source === 'bridge') return false;
        const typeCall = name => {
          if (name === 'Входящие') return 'Входящий звонок';
          if (name === 'Исходящие') return 'Исходящий звонок';
          return 'Пропущенный звонок';
        };
        this.callData = {
          externalClientId: data.externalClientId,
          id: data.id,
          clientName: data.clientName,
          typeCall: typeCall(data.type.name),
          contact: data.contact,
          comment: data.comment,
          managerName: data.managerName,
          phone: data.phone,
          email: data.email,
          city: data.city,
          tag: data.tag ? data.tag.title : null,
          inn: data.inn,
          discount: data.discount,
          managerEmail: data.managerEmail,
          externalUrl: data.externalUrl,
        };
        this.show = true;
        this.commentSaved = !!this.callData.comment;
        this.currentOperator = data.operator.id === this.userId;
      } catch (err) {
        console.error(err);
      }
    },
    async changeCallTag(val) {
      const { id } = this.tags.find(n => n.title === val);
      try {
        const { data } = await this.$xhr.send(new Simple(`/api/put_call/${this.callData.id}`, { tag_id: id }, 'PUT'));
        if (data.success) {
          await this.$store.dispatch('snack/info', 'Тэг успешно изменен');
          this.clouseCardPopup();
        }
      } catch (e) {
        await this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
      }
    },
    async makeCall() {
      if (this.currentClientPhone) {
        try {
          const body = {
            workplaceNumber: this.workplace,
            phone: this.currentClientPhone,
          };
          const { data } = await this.$xhr.send(new Simple('/api/create_call', body, 'POST'));
          if (data.success) {
            await this.$store.dispatch('snack/info', data.message || 'Совершается звонок');
            this.closeCallWarningPopup();
          }
        } catch (e) {
          await this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
        }
      } else {
        await this.$store.dispatch('snack/error', 'Номер клиента неизвестен');
      }
    },
    closeCallWarningPopup() {
      this.callWarningPopup = false;
      this.currentClientPhone = null;
    },
    goToDB() {
      const city = this.callData.city === 'Москва' ? 'df' : 'piter';
      const url = this.callData.externalClientId
        ? `https://csg.dbse.ru:27478/${city}/clients/${this.callData.externalClientId}/edit`
        : `https://csg.dbse.ru:27478/${city}/clients/search`;
      window.open(url);
    },
    malito(email) {
      if (!email) return;
      window.location.href = `mailto:${email}`;
    },
    openCallWarningPopup(phone) {
      if (phone) {
        this.$eventBus.emit('openCallWarningPopup', { ...phone });
      }
    },
    clouseCardPopup() {
      /* if (this.callData.clientName &&
      !this.commentSaved) return this.$store.
      dispatch('snack/info', 'Отправте комментарий менеджеру'); */
      this.show = false;
      this.commentSaved = false;
    },
    async commentSave() {
      if (!this.callData.managerEmail) {
        this.emailPopup = true;
        return;
      }
      this.closeEmailPopup();
      try {
        const mailData = {
          recipients: {
            [this.callData.managerEmail]: null,
          },
          theme: 'Комментраий от оператора',
          text: generateMessageToEmail(
            this.callData.clientName,
            this.callData.contact,
            this.callData.phone,
            this.callData.email,
            this.callData.comment,
          ),
        };
        const promises = [
          this.$xhr.send(new Simple('/api/send_email', mailData, 'POST')),
          this.$xhr.send(new Simple(`/api/put_call/${this.callData.id}`, { comment: this.callData.comment }, 'PUT')),
        ];
        const [mailto, comment] = await Promise.all(promises);
        if (comment.data.success && mailto.data.success) {
          this.$store.dispatch('snack/info', 'Комментраий отправлен менеджеру');
        }
        if (!mailto.data.success) {
          this.$store.dispatch('snack/error', 'Email не отправлен');
        }
      } catch (e) {
        this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
      } finally {
        this.commentSaved = true;
      }
    },
    closeEmailPopup() {
      this.emailPopup = false;
    },

  },
};
</script>

<style lang="stylus" scoped>
.buttons
  display: flex;
  width: 100%
  justify-content: space-between
  &__wrap
    width: 100%
.pointer
  &:hover
    cursor: pointer;
</style>
