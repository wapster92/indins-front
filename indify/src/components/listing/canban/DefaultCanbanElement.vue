<template>
  <div class="canban-element">
    <div class="canban-element-title">
      {{ name }}
    </div>
    <p class="canban-element-text mb-0">
      {{ description }}
    </p>
    <time
      class="canban-element-date"
      :style="`color: ${dateColor}`"
    >
      <v-icon
        :color="dateColor"
        size="14"
      >event</v-icon>
      {{ date }}
    </time>
    <div class="canban-element-price">
      <v-icon size="14">
        account_balance_wallet
      </v-icon>
      {{ price }}
    </div>
    <div class="canban-element-buttons">
      <a
        v-if="phone"
        :href="`tel: ${phone}`"
        class="canban-button"
        @click.capture.stop
      >
        <v-icon
          size="20"
          small
          color="#416FC8"
        >local_phone</v-icon>
      </a>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getObjectField } from '../../../helpers';

export default {
  name: 'DefaultCanbanElement',
  props: {
    nameField: {
      type: String,
      default: 'name',
    },
    phoneField: {
      type: String,
      default: 'phone',
    },
    descriptionField: {
      type: String,
      default: 'description',
    },
    dateField: {
      type: String,
      default: 'createdAt',
    },
    dateFormat: {
      type: String,
      default: 'DD.MM.YYYY',
    },
    priceField: {
      type: String,
      default: 'price',
    },
    item: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    phone() {
      return getObjectField(this.item, this.phoneField);
    },
    name() {
      return getObjectField(this.item, this.nameField) || '-';
    },
    description() {
      return getObjectField(this.item, this.descriptionField) || '-';
    },
    price() {
      return getObjectField(this.item, this.priceField) || '-';
    },
    date() {
      if (!this.item) return '-';
      let date = getObjectField(this.item, this.dateField);
      if (!date) return '-';
      date = moment(date, 'YYYY-MM-DD');
      const today = moment();
      const difference = today.diff(date, 'days');
      let result;
      switch (difference) {
        case 0:
          result = 'Сегодня';
          break;
        case 1:
          result = 'Вчера';
          break;
        case 2:
          result = 'Позавчера';
          break;
        case -1:
          result = 'Завтра';
          break;
        case -2:
          result = 'Послезавтра';
          break;
        default:
          result = date.format(this.dateFormat);
          break;
      }
      return result;
    },
    dateColor() {
      if (this.date === 'Сегодня') return '#52B066';
      if (this.date === 'Завтра') return '#6A8BCC';
      if (this.date === 'Вчера' || this.date === 'Позавчера') return '#CF4949';
      return '#888A91';
    },
  },
};
</script>

<style lang="stylus">
.canban-element
  position: relative
  display: flex
  flex-flow: row wrap
  justify-content: space-between
  padding: 13px 16px
  border: 1px solid #DADADA
  background: #ffffff
  font-size: 14px

.sortable-chosen .canban-element, .canban-element:hover
  background: #F3F5F8
  cursor: pointer
  .canban-element-buttons
    visibility: visible

.canban-element-title
  width: 100%
  color: #202124
  font-weight: 500

.canban-element-text
  width: 100%
  color: #888A91

.canban-element-date
  .v-icon
    margin-right: 5px

.canban-element-price
  color: #888A91
  .v-icon
    margin-right: 5px

.canban-element-buttons
  position: absolute
  top: 12px
  right: 12px
  display: flex
  flex-flow: row nowrap
  justify-content: flex-end
  align-items: center
  visibility: hidden

.canban-button
  display: inline-flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  width: 30px
  height: 30px
  margin-left: 6px
  background: #ffffff
  text-decoration: none
  &:hover
    background: #416FC8
    .v-icon
      color: #ffffff!important
</style>
