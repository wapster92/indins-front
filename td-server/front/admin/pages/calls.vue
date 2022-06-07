<template>
  <div class="fill-height">
    <DefaultDictionary
      :multiple-search="['clientPhone', 'clientName', 'managerName']"
      :headers="tableHeaders"
      query="calls"
      :orders="{createdAt: 'DESC'}"
      class="calls"
      :class="{'player-active': !!audio.url}"
      @item-click="itemClick($event)"
    >
      <template #filters>
        <DateFilter
          name="createdAt"
          label="Период дат"
          range
          active
          :default-value="today"
        />
        <TextFilter
          name="city"
          label="Город"
          filter-type="like"
        />
        <RelationFilter
          name="operator"
          query="operators"
          label="Оператор"
          item-text="fullName"
          multiple-search-field="surname"
        />
        <RelationFilter
          name="tag"
          query="tags"
          item-text="title"
          label="Тег"
        />
      </template>

      <template #actions>
        <ColumnToggler :headers="tableHeaders" />
      </template>

      <template #columns>
        <IconColumn
          field="type.name"
          :get-icon="getCallIcon"
          :icon-props="getCallIconColor"
          clickable-group="all"
        />
        <FuncColumn
          field="clientPhone"
          :func="getClientName"
          clickable-group="call"
        />
        <DateColumn
          field="createdAt"
          format="DD.MM.YYYY HH:mm"
          clickable-group="all"
        />
        <SlotColumn
          field="duration"
          clickable-group="all"
        >
          <template #default="{ item }">
            <div class="duration">
              {{ getLocalTimeDuration(item) }}
              <ClickAction
                v-if="viewIcon(item)"
                class="icon"
                icon="headset"
                @click.prevent="openAudio(item.audio[0], $event)"
              />
              <ClickAction
                v-if="viewDownloadIcon(item)"
                class="icon"
                icon="mdi-cloud-download"
                @click.prevent="downloadAudio(item)"
              />
            </div>
          </template>
        </SlotColumn>
        <RelationColumn
          field="operator.fullName"
          clickable-group="all"
        />
        <TextColumn
          field="city"
          clickable-group="all"
        />
        <ChipColumn
          field="tag.title"
          color-field="tag.color"
        />
        <TextColumn
          field="managerName"
          clickable-group="all"
        />
        <!--        <ActionColumn />-->
      </template>
      <template
        #bottom-slot
      >
        <AudioPlayer
          :file="audio.url"
          close-btn
          @close="closeAudio"
        />
      </template>
    </DefaultDictionary>

    <nuxt-child />
  </div>
</template>

<script>
import {
  Filter, Put,
} from 'core-xhr';
import { mapState } from 'vuex';
import moment from 'moment';
import { ForbiddenError } from '../utils/ForbiddenError';
import { getTimeFromMins } from '../utils/convertData';

export default {
  name: 'CallsList',
  validate({ store }) {
    if (store.getters['auth/hasRole'](['CALLS'])) return true;
    throw new ForbiddenError('У вас нет доступа к данной странице');
  },
  meta: {
    breadcrumb: 'Звонки',
  },
  data() {
    return {
      tableHeaders: [
        {
          name: 'Тип', field: 'type.name', space: 60, minSpace: 60,
        },
        {
          name: 'Клиент',
          field: 'clientPhone',
          space: 400,
          minSpace: 400,
          sortField: 'clientName',
        },
        {
          name: 'Дата/время', field: 'createdAt', space: 200, minSpace: 200,
        },
        {
          name: 'Длительность', field: 'duration', space: 120, minSpace: 120,
        },
        {
          name: 'Оператор',
          field: 'operator.fullName',
          space: 200,
          minSpace: 200,
          sortField: 'operator.surname',
        },
        {
          name: 'Город', field: 'city', space: 200, minSpace: 200,
        },
        {
          name: 'Тег', field: 'tag.title', space: 200, minSpace: 200,
        },
        {
          name: 'Менеджер', field: 'managerName', space: 200, minSpace: 200,
        },
        // {
        //   name: '', field: 'special:listing-actions', space: 70, minSpace: 70,
        // },
      ],
      today: [`${moment().format('YYYY-MM-DD')}T00:00:00`, `${moment().format('YYYY-MM-DD')}T23:59:59`],
      audio: { url: null, title: null },
    };
  },
  computed: {
    workplace() {
      return this.$store.state.auth.info.getWorkPlaceNumber;
    },
    ...mapState({
      userId: state => state.auth.id,
    }),
    isAdminRole() {
      return this.$store.getters['auth/hasRole']('ADMINISTRATOR');
    },
  },
  mounted() {

  },
  methods: {
    getLocalTimeDuration(item) {
      if (!item.duration) return '-';
      return getTimeFromMins(item.duration);
    },
    getCallIcon(item) {
      if (!item) return;
      const icon = {
        Входящие: 'mdi-phone-incoming',
        Исходящие: 'mdi-phone-outgoing',
        Пропущенные: 'mdi-phone-missed',
      };
      return icon[item.type.name];
    },
    getCallIconColor(item) {
      if (!item) return;
      const color = {
        Входящие: '#52B066',
        Исходящие: '#60c8e2',
        Пропущенные: '#CF4949',
      };
      return { color: color[item.type.name] };
    },
    getClientName(item) {
      return item.clientName || this.$root.$options.filters.phone(item.clientPhone);
    },
    async itemClick({ item, field }) {
      try {
        // Если нет оператора то присвоим кликнувшего
        if (item.operator === null && field !== 'duration') {
          const request = await this.$xhr.send(
            new Put('calls')
              .entity()
              .addFilter(new Filter('id', 'eq', item.id))
              .setData({ operator: { id: this.userId } }),
          );
          if (request.data.success) {
            this.$store.dispatch('snack/info', 'Вы обрабатываете данное обращение');
            if (field === 'clientPhone') {
              return this.openCallWarningPopup(item);
            }
            return this.$eventBus.emit('openCallPopup', item.id);
          }
        }
        if (field === 'clientPhone') {
          this.openCallWarningPopup(item);
        } /* else {
          // Если оператор не тот что указан, то карточка не откроется

        } */
        if (field !== 'duration' && field !== 'clientPhone') {
          this.$eventBus.emit('openCallPopup', item.id);
        }
      } catch (e) {
        await this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
      }
    },
    openCallWarningPopup(item) {
      if (item.clientPhone) {
        this.$eventBus.emit('openCallWarningPopup', { phone: item.clientPhone });
      }
    },
    openAudio({ url }, { target }) {
      this.audio.url = url;
      // eslint-disable-next-line no-param-reassign
      this.removeClassIcon();
      target.classList.add('target-voice-icon');
    },
    closeAudio() {
      this.audio.url = null;
      this.removeClassIcon();
    },
    removeClassIcon() {
      document.querySelectorAll('.target-voice-icon').forEach(el => el.classList.remove('target-voice-icon'));
    },
    viewIcon(item) {
      if (!item.duration) return false;
      if (!item.audio[0]?.url) return false;
      if (this.isAdminRole || item.operator?.id === this.userId) return true;
    },
    downloadAudio({ audio, createdAt }) {
      const [{ url }] = audio;
      const link = document.createElement('a');
      link.href = url;
      link.download = `${createdAt}.mp3`;
      link.click();
    },
    viewDownloadIcon(item) {
      return this.viewIcon(item) && this.isAdminRole;
    },
  },
};
</script>

<style lang="stylus" scoped>
.duration
  display: flex;
  align-items: center;
  height: 100%;
  .icon
    margin-left: 10px
.calls
  >>> .listing-bottom
    min-height: auto;
    height: 55px
    padding: 0
    transition: height .5s
    will-change height;
    .listing-navigation
      width: 100%
      min-height 50px
    .listing-bottom-slot
      width: 100%
      display: flex;
      align-items: center;
      border-top: 1px solid #D3D4DB;
      height 60px
    .audio-player
      width: 100%
      padding-left: 20px
      padding-right: 20px
  &.player-active
    >>> .listing-bottom
      height: 125px
>>> .target-voice-icon
  color: #CF4949;
</style>
