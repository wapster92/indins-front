<template>
  <v-layout fill-height>
    <DefaultDictionary
      :headers="tableHeaders"
      :multiple-search="['phone', 'theme', 'managerName']"
      query="site-requisitions"
      resizable-columns
      massive-actions
      :orders="{ 'tag.inWork': 'ASC', createdAt: 'DESC' }"
      :default-orders="{'tag.inWork': 'ASC'}"
      @item-click="itemClick($event)"
    >
      <template #filters>
        <RelationFilter
          name="tag.id"
          filter-by="id"
          label="Тэг"
          item-text="title"
          filter-type="eq"
          query="tags"
        />
        <DateFilter
          name="createdAt"
          label="Период дат"
          filter-type="range"
          range
          active
          :default-value="week"
        />
        <RelationFilter
          name="operator"
          query="operators"
          label="Оператор"
          item-text="fullName"
          multiple-search-field="surname"
        />
        <BooleanFilter
          name="isSpam"
          label="Спам"
        />
        <BooleanFilter
          name="inWork"
          label="В работе"
        />
      </template>
      <template #columns>
        <IconColumn
          :get-icon="getIcon"
          field="source"
          clickable-group="all"
        />
        <DateColumn
          field="createdAt"
          format="DD.MM.YYYY HH:mm"
          clickable-group="all"
        />
        <ChipColumn
          field="tag.title"
          color-field="tag.color"
          clickable-group="all"
        />
        <RelationColumn
          field="operator.fullName"
          clickable-group="all"
        />
        <TextColumn
          field="clientName"
          clickable-group="client"
        />
        <PhoneColumn
          field="phone"
          clickable-group="client"
        />
        <TextColumn
          field="email"
          clickable-group="all"
        />
        <TextColumn
          field="theme"
          clickable-group="all"
        />
        <TextColumn
          field="managerName"
        />
      </template>
      <template #massive-actions="{ selected }">
        <v-row v-if="selected.length > 0">
          <v-col
            cols="12"
            class="d-flex"
          >
            <SimpleButton
              color="#CF4949"
              class="mr-2 ml-2"
              outlined
              @click="opendDeletePopup('Спам', selected)"
            >
              В спам
            </SimpleButton>
            <SimpleButton
              class="mr-2 ml-2"
              @click="opendDeletePopup('На менеджера', selected)"
            >
              На менеджера
            </SimpleButton>
            <SimpleButton
              class="mr-2 ml-2"
              @click="opendDeletePopup('Консультация', selected)"
            >
              Консультация
            </SimpleButton>
            <SimpleButton
              class="mr-2 ml-2"
              @click="opendDeletePopup('Выписан счет', selected)"
            >
              Выписан счёт
            </SimpleButton>
          </v-col>
        </v-row>
      </template>
    </DefaultDictionary>
    <PopupComponent
      v-model="deletePopupView"
      class="conf-pop"
      title="Предупреждающее"
      text="Вы уверены в выполнении группового действия?"
      confirm-text="Подтвердить"
      reject-text="Отмена"
      @click:confirm="changeTag"
      @click:reject="closeDeletePopup"
      @click:close="closeDeletePopup"
    />
    <nuxt-child />
  </v-layout>
</template>

<script>
import {
  Simple, Put, Filter,
} from 'core-xhr';
import { mapGetters, mapState } from 'vuex';
import moment from 'moment';
import { ForbiddenError } from '../utils/ForbiddenError';

export default {
  name: 'ApplicationsFromTheSite',
  meta: {
    breadcrumb: 'Заявки с сайта',
  },
  validate({ store }) {
    if (store.getters['auth/hasRole'](['APPLICATIONSSITE', 'ADMINISTRATOR'])) return true;
    throw new ForbiddenError('У вас нет доступа к данной странице');
  },
  async asyncData({ app: { $xhr } }) {
    try {
      const { data } = await $xhr.send(new Simple('/api/get_tags'));
      return {
        tags: data,
      };
    } catch (e) {
      console.error(e);
    }
  },
  data() {
    return {
      tableHeaders: [
        {
          name: 'Тип', field: 'source', space: 50, minSpace: 50,
        },
        { name: 'Дата/время', field: 'createdAt' },
        { name: 'Тег', field: 'tag.title' },
        { name: 'Оператор', field: 'operator.fullName', sortField: 'operator.surname' },
        { name: 'Клиент', field: 'clientName' },
        { name: 'Телефон', field: 'phone' },
        { name: 'Email', field: 'email' },
        {
          name: 'Тема', field: 'theme', space: 400, minSpace: 400,
        },
        {
          name: 'Менеджер', field: 'managerName', space: 300, minSpace: 300,
        },
      ],
      callWarningPopup: false,
      id: null,
      tags: [],
      week: [`${moment().subtract(7, 'days').format('YYYY-MM-DD')}T00:00:00`, `${moment().format('YYYY-MM-DD')}T23:59:59`],
      deletePopupView: false,
      selectedAndTag: {
        tag: '',
        selected: [],
      },
    };
  },
  computed: {
    ...mapState({
      userId: state => state.auth.id,
    }),
    isAdminRole() {
      return this.$store.getters['auth/hasRole'](['ADMINISTRATOR']);
    },
  },
  methods: {
    getIcon(item) {
      return item.source === 'phone' ? 'phone' : 'email';
    },
    itemClick({ item, field }) {
      if (this.isAdminRole) {
        return this.$eventBus.emit('openSiteRequestionPopup', item.id);
      }
      if (item.operator && item.operator?.id !== this.userId) return this.$store.dispatch('snack/error', 'Данное обращение в обработке у другого оператора');
      if (field === 'phone' || field === 'clientName') {
        this.openCallWarningPopup(item);
      } else {
        this.$eventBus.emit('openSiteRequestionPopup', item.id);
      }
      this.addOperator(item);
    },
    async addOperator(item) {
      try {
        const req = await this.$xhr.send(new Put('site-requisitions')
          .entity()
          .addFilter(new Filter('id', 'eq', item.id))
          .setData({ operator: { id: this.userId }, inWork: true }));
        if (req.data.data.success) {
          await this.$store.dispatch('snack/info', 'Вы обрабатываете данное обращение');
        }
      } catch (e) {
        this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
      }
    },
    openCallWarningPopup(item) {
      if (item.phone) {
        this.$eventBus.emit('openCallWarningPopup', { phone: item.phone, siteRequestionId: item.id });
      }
    },
    opendDeletePopup(tag, selected) {
      this.deletePopupView = true;
      this.selectedAndTag = {
        tag,
        selected,
      };
    },
    closeDeletePopup() {
      this.deletePopupView = false;
      this.selectedAndTag = {
        tag: '',
        selected: [],
      };
    },
    async changeTag() {
      const { tag, selected } = this.selectedAndTag;
      try {
        const { id } = this.tags.find(n => n.title === tag);
        const data = {
          tag: { id },
          isSpam: false,
        };
        if (tag === 'Спам') {
          data.isSpam = true;
        }
        const promises = selected.map(n => this.$xhr.send(
          new Put('site-requisitions')
            .entity()
            .addFilter(new Filter('id', 'eq', n.id))
            .setData(data),
        ));
        const results = await Promise.all(promises);
        if (results.every(n => n.data.success)) await this.$store.dispatch('snack/info', 'Записи успешно обновлены');
      } catch (e) {
        await this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
      } finally {
        this.closeDeletePopup();
      }
    },
  },
};
</script>

<style scoped>

</style>
