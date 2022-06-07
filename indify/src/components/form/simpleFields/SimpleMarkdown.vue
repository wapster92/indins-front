<template>
  <TabsBlock
    v-model="currentValue"
    :color="defaultColor"
    :tabs="tabs"
    :block-props="{ 'for-forms': true }"
    block-mode
    background-color="#F3F5F8"
    class="simple-markdown"
  >
    <template #tabs>
      <v-tab
        v-for="(item, index) in tabs"
        :key="index"
        :href="`#${item.key}`"
      >
        {{ item.title }}
      </v-tab>
    </template>
    <v-tabs-items v-model="currentValue">
      <v-tab-item
        v-if="!readonly"
        value="tab-0"
      >
        <SimpleTextarea
          v-model="localValue"
          v-bind="$attrs"
          :rules="rules"
          :error-messages="errorList"
          class="simple-markdown__source"
        />
      </v-tab-item>
      <v-tab-item value="tab-1">
        <div
          class="simple-markdown__marked pa-2"
          v-html="markedValue"
        />
      </v-tab-item>
    </v-tabs-items>
  </TabsBlock>
</template>

<script>
import marked from 'marked';
import defaultColor from '../mixins/defaultColor';
import fieldModel from '../mixins/fieldModel';
import validation from '../mixins/validation';

export default {
  name: 'SimpleMarkdown',
  mixins: [defaultColor, fieldModel, validation],
  props: {
    label: {
      type: String,
      default: 'Markdown',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: null,
    };
  },
  computed: {
    markedValue() {
      return marked(this.localValue);
    },
    tabs() {
      const tabList = [{ title: 'Preview', key: 'tab-1' }];
      if (!this.readonly) {
        tabList.unshift({ title: this.label, key: 'tab-0' });
      }
      return tabList;
    },
  },
};
</script>

<style lang="stylus">
.simple-markdown
  .v-tabs-bar
    padding: 0 !important
  &__source
    padding: 16px
    .v-input__slot
      &:before, &:after
        display: none
  &__marked
    padding: 16px

.simple-markdown.app-tabs .theme--light.v-tabs-items
  background-color: #ffffff
</style>
