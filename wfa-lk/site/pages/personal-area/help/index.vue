<template>
  <div class="help">
    <PersonalAreaHeader title="Помощь" />
    <div class="help__wrap">
      <div class="help__container semi-container">
        <div class="help__body" v-html="body"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Get, Filter } from 'core-xhr';
import PersonalAreaHeader from "@/components/blocks/PersonalAreaHeader";

export default {
  components: {
    PersonalAreaHeader,
  },
  async asyncData({ app: { $xhr } }) {
    try {
      const result = await $xhr.send(new Get('pages').entity().addFilter(new Filter('name', 'eq', 'help')));
      const { body } = result.data.data.result;
      return { body };
    } catch (e) {
      console.error(e);
    }
  },
  data() {
    return {
      body: null,
    };
  },
};
</script>

<style lang="stylus" scoped>
.help
  &__wrap
    background: $white-main;
    padding: 1px 0 0;
  &__container
    padding-bottom: 50px
  &__body >>>
    h2, h3, h4
      margin: 0.6em 0;
    p, ul, ol
      margin: .7em 0;
    li
      margin: .3em 0;
    blockquote
      padding-left: 20px;
      border-left 5px solid $blue-main
    table
      border-collapse: collapse;
    table, th, td
      border: 1px solid black;
    th, td
      padding: 10px 15px;
    figure
      margin: .7em 0;
      max-width 100%;
      overflow auto
</style>
