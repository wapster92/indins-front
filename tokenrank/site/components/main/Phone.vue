<template>
  <div>
    <SimpleModal
      :data="modalData"
      :shown="shown"
      @close="shown = false"/>
    <div
      :class="userClass">
      <span
        class="phone phone--tb-up"
        @click="shown = true"
        v-text="phone"/>
      <a
        :href="'tel:' + phone"
        class="phone phone--tb-down"
        v-text="phone"/>
    </div>
  </div>
</template>

<script>
import SimpleModal from '../base/SimpleModal';

export default {
  name: 'Phone',
  components: {SimpleModal},
  props: {
    phone: {
      type: String,
      required: true,
    },
    userClass: {
      type: [Object, String],
      default: '',
    },
    modalData: {
      type: Object,
      default: () => ({
        title: 'Заголовок',
        text: 'Текст',
        button: {},
      }),
    },
  },
  data: () => ({
    shown: false,
  }),
};
</script>
