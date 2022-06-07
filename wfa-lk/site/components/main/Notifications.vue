<template>
  <div
    v-click-outside="onClickOutside"
    class="notifications"
  >
    <button
      class="btn-notifications"
      :class="{'btn-notifications--count': !!list.length}"
      :data-count="list.length"
      @click="showListToggle"
    >
      <svg-icon
        class="btn-notifications__icon"
        name="personal-area/notifications"
      />
    </button>
    <VueSlideToggle
      :open="showList"
      tag="div"
      :duration="500"
      class="notifications-list"
    >
      <ul class="list">
        <li
          v-for="(item, i) of list"
          :key="i"
          class="list__item"
        >
          {{ item.text }}
        </li>
      </ul>
    </VueSlideToggle>
  </div>
</template>

<script>
import { VueSlideToggle } from 'vue-slide-toggle';
import vClickOutside from 'v-click-outside';
import { Simple } from 'core-xhr';
import { mapState } from 'vuex';

export default {
  name: 'Notifications',
  components: {
    VueSlideToggle,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      showList: false,
      list: [],
    };
  },
  async fetch() {
    const { data } = await this.$xhr.send(new Simple(`/api/get_new_notifications/${this.userId}`).authorization());
    this.list = data.result;
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
    }),
  },
  watch: {
    showList(val, old) {
      if (old && !val) {
        this.viewedNotifications();
      }
    },
  },
  methods: {
    showListToggle() {
      if (this.list.length) this.showList = !this.showList;
    },
    onClickOutside() {
      this.showList = false;
    },
    viewedNotifications() {
      const body = {
        notifications: this.list.map(n => n.id),
        user: this.userId,
      };
      this.$xhr.send(new Simple('/api/make_viewed_notifications', body, 'POST').authorization())
        .then(data => {
          if (data.success) this.list = [];
        })
        .catch(e => console.error(e));
    },
  },
};
</script>

<style lang="stylus" scoped>
.btn-notifications
  width: 50px
  height: 50px
  background: transparent
  border: none
  padding: 10px
  fill: $blue-main
  cursor pointer
  position: relative;
  &--count
    &:before
      content: attr(data-count)
      position: absolute;
      right: 0
      transform translateX(-10%)
      top: 0
      min-width: 20px
      height: 20px
      font-size: 14px
      background-color: $red-main
      border-radius 50%
      z-index: 2
      display: flex
      justify-content: center;
      align-items: center
      line-height 1
      color: $white-main
      padding: 0 5px
      font-weight: 500
.notifications
  position: relative
.notifications-list
  position: absolute;
  width: 310px
  top: 60px
  right: 0
  background: $white-main
  padding: 0 20px
  box-shadow: 4px 2px 14px 0px rgba(48, 50, 50, 0.29);
  z-index: 10
  overflow: hidden
.list
  padding: 10px 0
  list-style none
  max-height 400px
  overflow-y auto
  scrollbar-width: none;
  &::-webkit-scrollbar
    width: 0
    height: 0
  &__item
    padding: 10px 0
    font-size: 16px
    position: relative
    &:last-child
      &:before
        display: none
    &:before
      content: ''
      position: absolute;
      left: 0
      bottom: 0
      width: 100%
      height: 1px
      background-color: $blue-secondary
</style>
