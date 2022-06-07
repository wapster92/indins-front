<template>
  <div class="expansion-panel">
    <div
      :class="{'expansion-panel__header--open': isOpen, 'expansion-panel__header--close': !isOpen}"
      class="expansion-panel__header"
      @click="isOpen = !isOpen">
      <div class="expansion-panel__title">
        <span
          v-text="data.title"/>
      </div>
      <div class="expansion-panel__action">
        <div class="expansion-panel__action-text">
          <span
            v-if="!isOpen"
            v-text="action.text && action.text.show || 'Показать'"/>
          <span
            v-else
            v-text="action.text && action.text.hide || 'Скрыть'"/>
        </div>
        <div
          :class="{
            'expansion-panel__action-icon--open' : isOpen,
            'expansion-panel__action-icon--close': !isOpen
          }"
          class="expansion-panel__action-icon"
          v-html="action.icon"/>
      </div>
    </div>
    <div
      :class="{
        'expansion-panel__content--open': isOpen,
        'expansion-panel__content--close': !isOpen
      }"
      class="expansion-panel__content"
      @click="isOpen = false">
      <div
        v-html="data.text"/>
      <div class="expansion-panel__action expansion-panel__action--tb-down">
        <div class="expansion-panel__action-text">
          <span
            v-text="action.text && action.text.hide || 'Скрыть'"/>
        </div>
        <div
          class="expansion-panel__action-icon expansion-panel__action-icon--open"
          v-html="action.icon"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ExpansionPanel',
  props: {
    data: {
      type: Object,
      default: () => ({
        title: 'Заголовок',
        text: ' Текст',
      }),
    },
    action: {
      type: Object,
      default: () => ({
        text: {
          show: 'Показать',
          hide: 'Скрыть',
        },
        icon:
          '<svg width="13" height="7" viewBox="0 0 13 7" fill="black" xmlns="http://www.w3.org/2000/svg">\n'
          + '<path d="M6.26415 4.68367L10.6538 0.294254C10.7743 0.173392 10.9355 0.106903 11.1074 0.106903C11.2794 0.106903 11.4406 0.173392 11.5613 0.294254L11.9458 0.678879C12.0667 0.799551 12.1333 0.960861 12.1333 1.13276C12.1333 1.30466 12.0667 1.46578 11.9458 1.58654L6.71956 6.81284C6.59841 6.93408 6.43653 7.00047 6.26444 7C6.09159 7.00047 5.9299 6.93418 5.80865 6.81284L0.587511 1.59141C0.466553 1.47064 0.399968 1.30952 0.399968 1.13753C0.399968 0.96563 0.466553 0.804511 0.587511 0.683648L0.971944 0.29912C1.22216 0.0489038 1.62949 0.0489038 1.87961 0.29912L6.26415 4.68367Z"/>\n'
          + '</svg>\n',
      }),
    },
  },
  data: () => ({
    isOpen: false,
  }),
};
</script>
