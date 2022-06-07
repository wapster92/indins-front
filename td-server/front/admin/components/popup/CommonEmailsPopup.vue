<template>
  <div>
    <PopupComponent
      v-model="show"
      width="800"
      title="Заявка с сайта"
      form-mode
    >
      <template #default>
        <v-row no-gutters>
          <v-col
            cols="12"
            class="pb-4 pl-3 pr-3 d-flex"
          >
            <SimpleButton
              color="#52B066"
              @click="goToDB"
            >
              Переход в БД
            </SimpleButton>
            <SimpleButton
              v-if="siteRequestion.emlUrl"
              color="#E98C49"
              class="d-flex align-center ml-3"
              @click="getEml(siteRequestion.emlUrl)"
            >
              <v-icon size="26">
                mdi-download
              </v-icon>
            </SimpleButton>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="siteRequestion.clientName"
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
              v-model="siteRequestion.contact"
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
              v-model="siteRequestion.managerName"
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
              @click="openCallWarningPopup({phone: siteRequestion.phone})"
            >
              <TextInput
                v-model="siteRequestion.phone"
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
              class="pointer d-flex"
              @click="malito(siteRequestion.sender)"
            >
              <TextInput
                v-model="siteRequestion.sender"
                label="E-mail"
                input-type="standart"
                readonly
              />
              <IconButton
                  class="d-flex align-center mt-3 mr-2"
                  icon="mdi-undo-variant"
              />
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="siteRequestion.city"
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
              v-model="siteRequestion.tag"
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
              v-model="siteRequestion.inn"
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
              v-model="siteRequestion.discount"
              label="Скидка. %"
              input-type="standart"
              readonly
            />
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col
                cols="12"
              >
                <TextInput
                  v-model="siteRequestion.themeMail"
                  label="Тема письма"
                  input-type="standart"
                  readonly
                />
              </v-col>
              <v-col cols="10">
                <TextareaInput
                  v-model="siteRequestion.textMail"
                  class="mail"
                  :class="{ 'mail--open': mail.open}"
                  label="Текст письма"
                  input-type="standart"
                  :auto-grow="false"
                  :rows="mail.rows"
                  readonly
                />
              </v-col>
              <v-col
                cols="2"
                class="d-flex justify-center pt-6"
              >
                <IconButton
                  class="d-flex align-center"
                  :icon="mail.buttonIcon"
                  @click="toggleMailInput"
                />
              </v-col>
              <v-col cols="10">
                <TextareaInput
                  v-model="siteRequestion.comment"
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
        <v-row>
          <v-col
            cols="12"
            class="d-flex pa-0 pl-5 pr-5"
          >
            <SimpleButton
              color="#CF4949"
              class="mr-auto ml-0"
              outlined
              @click="changeCallTag('Спам')"
            >
              В спам
            </SimpleButton>
            <SimpleButton @click="changeCallTag('На менеджера')">
              На менеджера
            </SimpleButton>
            <SimpleButton @click="changeCallTag('Консультация')">
              Консультация
            </SimpleButton>
            <SimpleButton @click="changeCallTag('Выписан счет')">
              Выписан счёт
            </SimpleButton>
          </v-col>
        </v-row>
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
              v-model="siteRequestion.managerEmail"
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
  name: 'CommonEmailsPopup',
  props: {
    tags: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      mail: {
        rows: 1,
        buttonIcon: 'mdi-chevron-down',
        open: false,
      },
      siteRequestion: {
        id: null,
        tag: null,
        externalUrl: null,
        clientName: null,
        contact: null,
        phone: null,
        email: null,
        sender: null,
        city: null,
        inn: null,
        discount: null,
        themeMail: null,
        textMail: null,
        managerName: null,
        managerEmail: null,
        externalClientId: null,
        emlUrl: null,
      },
      show: false,
      emailPopup: false,
    };
  },
  computed: {
    ...mapState({
      userId: state => state.auth.id,
    }),
    isSiteRequestionRole() {
      return this.$store.getters['auth/hasRole'](['APPLICATIONSSITE', 'ADMINISTRATOR']);
    },
  },
  mounted() {
    if (this.isSiteRequestionRole) {
      this.$eventBus.on('openSiteRequestionPopup', this.openPopup);
    }
  },
  methods: {
    toggleMailInput() {
      if (this.mail.open) {
        this.mail.rows = 1;
        this.mail.buttonIcon = 'mdi-chevron-down';
        this.mail.open = false;
      } else {
        this.mail.rows = 6;
        this.mail.buttonIcon = 'mdi-chevron-up';
        this.mail.open = true;
      }
    },
    async openPopup(id) {
      try {
        const { data } = await this.$xhr.send(new Simple(`/api/get_requisition/${id}`));
        this.siteRequestion = {
          id: data.id,
          clientName: data.clientName,
          contact: data.contact,
          comment: data.comment,
          managerName: data.managerName,
          phone: data.phone,
          sender: data.sender,
          email: data.email,
          city: data.city,
          tag: data.tag ? data.tag.title : null,
          inn: data.inn,
          discount: data.discount,
          managerEmail: data.managerEmail,
          externalUrl: data.externalUrl,
          themeMail: data.themeMail,
          textMail: data.textMail,
          externalClientId: data.externalClientId,
          emlUrl: data.emlUrl,
        };
        this.show = true;
      } catch (err) {
        console.error(err);
      }
    },
    async changeCallTag(val) {
      const { id } = this.tags.find(n => n.title === val);
      const body = {
        tag_id: id,
        is_spam: false,
      };
      if (val === 'Спам') {
        body.is_spam = true;
      }
      try {
        const { data } = await this.$xhr.send(new Simple(`/api/put_requisition/${this.siteRequestion.id}`, body, 'PUT'));
        if (data.success) {
          await this.$store.dispatch('snack/info', 'Тэг успешно изменен');
          this.show = false;
        }
      } catch (e) {
        await this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
      }
    },
    goToDB() {
      const url = this.siteRequestion.externalClientId
        ? `https://csg.dbse.ru:27478/piter/clients/${this.siteRequestion.externalClientId}/edit`
        : 'https://csg.dbse.ru:27478/piter/clients/search';
      window.open(url);
    },
    getEml(path) {
      const link = document.createElement('A');
      link.href = path;
      link.setAttribute('download', `${this.siteRequestion.id}.eml`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    malito(email) {
      if (!email) return;
      window.location.href = `mailto:${email}`;
    },
    openCallWarningPopup(phone) {
      if (phone) {
        this.$eventBus.emit('openCallWarningPopup', { phone });
      }
    },
    async commentSave() {
      if (!this.siteRequestion.managerEmail) {
        this.emailPopup = true;
        return;
      }
      this.closeEmailPopup();
      try {
        const mailData = {
          recipients: {
            [this.siteRequestion.managerEmail]: null,
          },
          theme: 'Комментраий от оператора',
          text: generateMessageToEmail(
            this.siteRequestion.clientName,
            this.siteRequestion.contact,
            this.siteRequestion.phone,
            this.siteRequestion.email,
            this.siteRequestion.comment,
          ),
        };
        const promises = [
          this.$xhr.send(new Simple('/api/send_email', mailData, 'POST')),
          this.$xhr.send(new Simple(`/api/put_requisition/${this.siteRequestion.id}`, { comment: this.siteRequestion.comment }, 'PUT')),
        ];
        const [mailto, comment] = await Promise.all(promises);
        if (comment.data.success && mailto.data.success) {
          this.$store.dispatch('snack/info', 'Комментраий отправлен менеджеру');
        }
      } catch (e) {
        this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
      }
    },
    closeEmailPopup() {
      this.emailPopup = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
>>>.mail
  textarea
    resize none
    overflow-y: hidden
    padding-top: 0;
    margin-top: 6px
  &--open
    textarea
      overflow-y: auto
</style>
