<template>
  <div class="user">
    <div class="user__avatar">
      <div
        class="avatar"
        @click="openFileInput($refs.avatar)"
      >
        <input
          ref="avatar"
          type="file"
          class="avatar__input"
          @change="uploadFiles"
        >
        <div class="avatar__over">
          <svg-icon name="UI/photo.svg" />
        </div>
        <div class="avatar__pictures">
          <svg-icon
            v-if="!avatar"
            class="user__icon-u"
            name="UI/user"
          />
          <picture
            v-else
            class="avatar__pic"
          >
            <img
              :src="avatar"
              alt="avatar"
              class="avatar__img"
            >
          </picture>
        </div>
      </div>
    </div>
    <div>
      <div class="username">
        {{ username }}
      </div>
      <div class="bonus">
        Бонусный баланс: {{ bonusPoints || 0 }} ₽
      </div>
    </div>
    <div class="notifications">
      <Notifications />
    </div>
  </div>
</template>

<script>
import { Filter, Put } from 'core-xhr';
import Notifications from '@/components/main/Notifications';

export default {
  name: 'UserNameHeader',
  components: {
    Notifications,
  },
  computed: {
    username() {
      return this.$store.getters['user/getUser'].owner;
    },
    bonusPoints() {
      return this.$store.getters['user/getUser'].bonusPoints;
    },
    avatar() {
      return this.$store.getters['user/getUser'].avatar;
    },
    userId() {
      return this.$store.getters['user/getUser'].userId;
    },
  },
  methods: {
    async uploadFiles(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', 'user-avatar');
      try {
        const result = await this.$axios.post('/image/reupload', formData, {
          headers: {
            // Authorization: `Bearer ${this.$cookies.get('auth-token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        this.$xhr.send(new Put('change-image').entity().addFilter(new Filter('id', 'eq', this.userId)).setData({ avatar: result.data.path }))
          .then(() => {
            this.$store.commit('user/avatarAdd', result.data.path);
          })
          .catch(err => {
            console.error(err);
          });
      } catch (er) {
        console.log(er);
      }
    },
    openFileInput(el) {
      el.click();
    },
  },
};
</script>

<style lang="stylus" scoped>
.user
  display: inline-flex;
  font-size: 18px
  padding-left: 0
  position: relative;
  height: 50px
  align-items center
  @media screen and (min-width: $tablet)
    padding-left: 66px
  &__avatar
    position: absolute;
    top: 0
    left: 0
    bottom: 0
    width: 50px;
    height: 50px;
    margin: auto 0;
    border-radius: 50%;
    overflow hidden;
    fill $blue-main
    cursor pointer
    justify-content center
    align-items center
    display: none;
    @media screen and (min-width: $tablet)
      display flex
  &__icon-u
    width: 30px
    height: 30px
.avatar
  width: 100%
  height: 100%;
  position: relative;
  &:hover
    .avatar__over
      opacity 1
  &__over
    position: absolute;
    width: 100%;
    height: 100%;
    display flex
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .6);
    opacity 0
    transition opacity .3s
    .icon
      width: 16px
      height: 16px
  &__input
    display: none;
  &__img
    width: 100%
    height: 100%
    object-fit cover
  &__pictures
    width: 100%
    height: 100%
    display flex
    justify-content: center;
    align-items: center;
  &__pic
    width: 100%;
    height: 100%;
.username
  display: none;
  @media screen and (min-width: $tablet)
    display flex
.bonus
  display: none;
  font-size: 14 px;
  color: $blue-main
  line-height: 18px;
  @media screen and (min-width: $tablet)
    display flex
.notifications
  margin-left: 0
  @media screen and (min-width: $tablet)
    margin-left: 20px

</style>
