<template>
  <div class="download-table-docs-scroll">
    <div>
      <div class="download-table-docs">
        <div class="download-table-docs__row download-table-docs__row--head">
          <div class="download-table-docs__column download-table-docs__column--icon" />
          <div class="download-table-docs__column download-table-docs__column--name">
            Название
          </div>
          <div class="download-table-docs__column download-table-docs__column--type">
            Тип
          </div>
          <div class="download-table-docs__column download-table-docs__column--number">
            Стоимость
          </div>
          <div class="download-table-docs__column download-table-docs__column--cost" />
        </div>
        <div
          v-for="(item, k) in items"
          :key="item.serviceType.type + k"
          class="download-table-docs__row"
        >
          <div class="download-table-docs__column download-table-docs__column--icon">
            <div
              class="checker"
              :class="{'checker--active': item.checked,
                       'checker--disabled': isDisabled
              }"
              @click="check(item, k)"
            >
              <SvgIcon name="personal-area/checker" />
            </div>
          </div>
          <div class="download-table-docs__column download-table-docs__column--name">
            {{ item.serviceType.type }}
          </div>
          <div class="download-table-docs__column download-table-docs__column--type">
            {{ item.viewType }}
          </div>
          <div class="download-table-docs__column download-table-docs__column--number">
            {{ item.cost }}
          </div>
          <div class="download-table-docs__column download-table-docs__column--cost">
            <div
              v-if="item.documentTypeId"
              class="download-icon"
              :class="{'download-icon--active': isPayment(item),
                       'download-icon--loading': item.waitDownload
              }"
              @click="download(item)"
            >
              <Spinner v-if="item.waitDownload" />
              <svg-icon
                v-else
                name="personal-area/download"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-if="modalEmailSend"
      class="modal"
    >
      <template #body>
        <div class="modal-body">
          Документы отправлены на ваш email: {{ email }}
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Spinner from '@/components/UI/blocks/Spinner';
import { Simple } from 'core-xhr';
import Modal from '../main/Modal';
import { eventBus } from '~/utils/eventBus';

const findAndDeleteItem = (arr, findValues) => arr.filter(n => !findValues.some(k => n === k));

export default {
  name: 'DownloadDocksTable',
  components: {
    Spinner, Modal,
  },
  props: {
    value: {
      type: Array,
      default: () => ([]),
    },
    costs: {
      type: Array,
      default: () => ([]),
    },
    paymentDocuments: {
      type: Array,
      default: () => ([]),
    },
    titles: {
      type: Array,
      default: () => ([]),
    },
    getStatusFiles: {
      type: Function,
      default: () => {},
    },
    letter: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkAllItems: false,
      items: this.setItems(),
      email: null,
    };
  },
  computed: {
    uid() {
      return this.$store.getters['user/getUser'].uid;
    },
    modalEmailSend() {
      return (this.$store.getters['modal/getModalStatus']('modalEmailSend') || {}).status;
    },
  },
  mounted() {
    eventBus.$on('chenge:transfer', payload => {
      this.$set(this.items[payload.id], 'checked', payload.value);
      this.generateData();
    });
  },
  methods: {
    setItems() {
      const items = this.costs.reduce((acc, el, idx) => {
        let ids = [2, 5, 6, 8, 9, 10, 13];
        if (!this.letter) {
          // если нет буквы помета, то и акта осмотра не будет
          ids = findAndDeleteItem(ids, [13]);
        }
        /* if (this.titles.length <= 0) {
          // если нет титулов, то не будем создавать поле с нужными документами
          ids = findAndDeleteItem(ids, [7, 11]);
        } */
        // Хардкод: documentTypeId - это сущность из реестра
        let obj = null;
        switch (el.serviceType.id) {
          case 2:
            obj = { documentTypeId: [1], fileType: 'pdf', viewType: 'Электронный' };
            break;
          /* case 6:
            obj = { documentTypeId: [2], fileType: 'pdf', viewType: 'Электронный' };
            break; */
          case 7:
            obj = { documentTypeId: [3], fileType: 'zip', viewType: 'Электронный' };
            break;
          case 4:
            obj = { documentTypeId: [4, 2], fileType: 'pdf', viewType: 'Электронный' };
            break;
          case 8:
            obj = { documentTypeId: null, fileType: 'Распечатанный', viewType: 'Бумажный' };
            break;
          case 9:
            obj = { documentTypeId: null, fileType: 'Распечатанный', viewType: 'Бумажный' };
            break;
          case 10:
            obj = { documentTypeId: null, fileType: 'Распечатанный', viewType: 'Бумажный' };
            break;
          case 11:
            obj = { documentTypeId: null, fileType: 'Распечатанный', viewType: 'Бумажный' };
            break;
          case 13:
            obj = { documentTypeId: [5], fileType: 'pdf', viewType: 'Электронный' };
            break;
          case 14:
            obj = { documentTypeId: null, fileType: 'Распечатанный', viewType: 'Бумажный' };
            break;
          default:
            obj = { fileType: 'pdf', viewType: 'Электронный' };
        }
        if (ids.some(i => i === el.id)) {
          acc[idx] = { ...el, ...obj, ...{ waitDownload: false, checked: false } };
        }
        return acc;
      }, {});
      return items;
    },
    async download(item) {
      if (item === undefined) return false;
      const services = this.getPaymentId(item);
      if (!services.length) return false;
      if (item.waitDownload) return false;
      this.$set(item, 'waitDownload', true);
      try {
        const data = services.map(el => ({
          petId: el.petId,
          documentTypeId: el.reestrDocumentTypeId,
          serviceId: el.service.id,
        }));
        console.log(data);
        const request = new Simple('/api/documents/send_email', data, 'POST').authorization();
        const response = await this.$xhr.send(request);
        if (response.data.success) {
          this.email = response.data.result;
          this.openModal();
        }
      } catch (e) {
        this.$notify({
          text: e.message || 'Произошла ошибка',
          type: 'error',
        });
      } finally {
        this.$set(item, 'waitDownload', false);
        this.getStatusFiles();
      }
      /* this.$xhr.downloadFile({
        url: 'documents/pet',
        method: 'POST',
        data: {
          petId: this.$route.params.id,
          documentTypeId: item.documentTypeId,
          // paymentId: this.getPaymentId(item),
          // uid: this.uid,
          serviceId: this.getPaymentId(item).service.id,
        },
        fileName: `${item.serviceType.type}.${item.fileType}`,
      }).then(() => {
        this.$set(item, 'waitDownload', false);
        this.getStatusFiles();
      }).catch(e => {
        this.$notify({
          text: e.message || 'Произошла ошибка',
          type: 'error',
        });
        this.$set(item, 'waitDownload', false);
        this.getStatusFiles();
      }); */
    },
    getPaymentId(obj) {
      return this.paymentDocuments
        .filter(el => obj.documentTypeId.some(doc => doc === el.reestrDocumentTypeId));
    },
    isPayment(obj) {
      return this.paymentDocuments.some(el => obj.documentTypeId.includes(el.reestrDocumentTypeId));
    },
    changeTransferField(item, k) {
      eventBus.$emit('chenge:transfer', {
        id: k,
        value: !item.checked,
      });
    },
    generateData() {
      const items = Object.values(this.items);
      const cleanValueArr = this.value
        .filter(val => !items.some(item => item.serviceType.id === val.serviceTypeId));
      const arr = items
        .filter(el => el.checked)
        .map(el => ({
          documentTypeId: el.documentTypeId,
          serviceTypeId: el.serviceType.id,
          cost: el.cost,
        }));
      this.$emit('input', [...cleanValueArr, ...arr]);
    },
    check(item, k) {
      if (this.isDisabled) return;
      if (item.serviceType.id === 4 || item.serviceType.id === 9) {
        this.changeTransferField(item, k);
      } else {
        const isTrue = item.checked;
        if (!isTrue) {
          this.$set(item, 'checked', true);
        } else {
          this.$set(item, 'checked', false);
        }
      }
      this.generateData();
    },
    openModal() {
      this.$store.dispatch('modal/open', 'modalEmailSend');
    },
  },
};
</script>

<style scoped lang="stylus">
.download-table-docs-scroll
  width: 100%
  overflow auto
  display flex
  &::-webkit-scrollbar
    display:none;

.download-table-docs
  display grid
  grid-template-columns 1fr
  grid-auto-rows minmax(49px, auto)
  grid-row-gap 1px
  background: $grey-stroke;
  padding: 1px;
  border-radius: 5px;
  //overflow hidden
  min-width 100px
  width: 100%
  &__row
    display: grid;
    grid-template-columns 50px 1fr \
                          180px 150px \
                           50px
    background: $white-main;
    &:first-child
      border-top-right-radius 5px
      border-top-left-radius 5px
    &:last-child
      border-bottom-left-radius 5px
      border-bottom-right-radius 5px
    &--head
      background: $grey-1;
      font-weight: 500;
      font-size: 16px
      .table-docs__column--icon
        fill #B2BED3
  &__column
    display: flex;
    align-items center
    padding: 5px 15px;
    &--icon
      justify-content center
    &--cost
      padding: 0;
      justify-content center
.checker
  width: 18px;
  height: 18px;
  fill transparent
  border: 2px solid $blue-secondary;
  border-radius: 2px;
  position: relative;
  transition fill .3s
  cursor pointer
  &--disabled
    border-color: $grey-stroke
    cursor: default
  &--active
    fill $blue-main
  .icon
    width: 18px
    height: 18px
    position: absolute;
    top: -2px
    left: -2px
.download-icon
  width: 18px;
  height: 18px;
  fill $grey-stroke
  border-radius: 2px;
  position: relative;
  transition fill .3s
  &--loading
    width: 35px
    height: 35px
  &--active
    fill $blue-main
    cursor pointer
  .icon
    width: 18px
    height: 18px
.modal
  .modal-body
    display: flex;
    height: 100%;
    justify-content center
    align-items center
</style>
