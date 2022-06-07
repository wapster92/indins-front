<template>
  <div class="user-panel">
    <v-menu
      bottom
      offset-y
      content-class="user-profile-menu"
    >
      <template #activator="{ on }">
        <div
          class="user-panel-photo"
          v-on="on"
        >
          <div class="user-panel-image-wrapper">
            <IAvatar
              :item="$auth.storeGetters.getData"
              image="getPhotoUrl"
            >

            </IAvatar>
          <v-icon
            class="user-panel-expand-button"
            size="18"
          >
            expand_more
          </v-icon>
        </div>
        </div>
      </template>
      <v-list class="py-0">
        <v-list-item
          class="user-panel-variant px-5"
          dense
        >
          <span>{{ userName }}</span>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in userMenuOptions"
          :key="'menu-options-' + index"
          class="user-panel-variant px-5"
          dense
          @click="itemController(item)"
        >
          <IIcon :icon="item.icon" :src="item.src"></IIcon>
          <span>{{ item.label }}</span>
        </v-list-item>
<!--        <v-list-item-->
<!--          v-if="showUserSettings"-->
<!--          class="user-panel-variant px-5"-->
<!--          dense-->
<!--          @click="openSettingsPopup"-->
<!--        >-->
<!--          Настройки-->
<!--        </v-list-item>-->
        <v-list-item
          v-for="(item, index) in userMenuBottom"
          :key="'bottom-options-' + index"
          class="user-panel-variant bottom px-5"
          dense
          @click="itemController(item)"
        >
          <IIcon :icon="item.icon" :src="item.src"></IIcon>
          <span>{{ item.label }}</span>
        </v-list-item>
      </v-list>
    </v-menu>
<!--    <UserSettingsPopup-->
<!--      v-model="settingsPopup"-->
<!--      @click:confirm="confirm"-->
<!--      @click:reject="reject"-->
<!--    >-->
<!--      <template #default="{ getUser, saveUser }">-->
<!--        <slot-->
<!--          name="user-settings"-->
<!--          :get-user="getUser"-->
<!--          :save-user="saveUser"-->
<!--        />-->
<!--      </template>-->
<!--      <template #popup-buttons="slotProps">-->
<!--        <slot-->
<!--          v-bind="slotProps"-->
<!--          name="popup-buttons"-->
<!--        />-->
<!--      </template>-->
<!--    </UserSettingsPopup>-->
  </div>
</template>

<script>
// import UserSettingsPopup from './UserSettingsPopup';
import IAvatar from "../../components/ui-kit/IAvatar";
import IIcon from "../../components/ui-kit/IIcon";

export default {
  name: 'UserPanel',
  components: {
    // UserSettingsPopup,
    IAvatar,
    IIcon,
  },
  props: {
    menuItems: {
      type: [Object, null],
      default: null,
    },
    // showUserSettings: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      userNameFirstLetters: '',
      settingsPopup: false,
      userMenuOptions: [],
      userMenuBottom: [
        {
          label: 'Выйти',
          icon: 'exit_to_app',
          func: () => this.$router.push({path: '/auth/logout'})
        }
      ],
    };
  },
  watch: {
    menuItems: {
      handler(val) {
        if (!val) return;
        let bottomArr = [],
          optionArr = [];
        for (const key of Object.keys(this.menuItems)) {
          (this.menuItems[key].bottom)
            ? bottomArr.push({ ...this.menuItems[key] })
            : optionArr.push({ ...this.menuItems[key] })
        }
        this.userMenuOptions = optionArr;
        if (bottomArr.length) this.userMenuBottom = bottomArr;
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    // userNameLetters() {
    //   const user = this.$auth.storeGetters.getData;
    //   if (
    //     this.$getType(user.surname) === 'String'
    //     && this.$getType(user.name) === 'String'
    //   ) {
    //     this.userNameFirstLetters = user.name.charAt(0) + user.surname.charAt(0);
    //   } else if (
    //     this.$getType(user.name) === 'String'
    //   ) {
    //     this.userNameFirstLetters = user.name.charAt(0) + user.name.charAt(1);
    //   } else if (
    //     this.$getType(user.fullName) === 'String'
    //   ) {
    //     this.userNameFirstLetters = user.fullName.charAt(0) + user.fullName.charAt(1);
    //   }
    //   return this.userNameFirstLetters;
    // },
    userPhoto() {
      return this.$auth.storeState.info.getPhotoUrl;
    },
    userPhotoName() {
      if (this.$getType(this.userPhoto) !== 'String') return '';
      return this.userPhoto.replace('/upload/file-uploader/', '');
    },
    cropUserPhoto() {
      return this.userPhotoName ? `/image/resize_32x32/file-uploader_${this.userPhotoName}` : null;
    },
    userName() {
      let name;
      if (this.$auth.storeState.info.fullName) {
        name = this.$auth.storeState.info.fullName;
      } else if (this.$auth.storeGetters.getData.getFullName) {
        name = this.$auth.storeGetters.getData.getFullName;
      }
      return name;
    },
    // userMenuOptions() {
    //   const list = [];
    //   for (const key of Object.keys(this.menuItems)) {
    //     list.push({ ...this.menuItems[key] });
    //   }
    //   return list;
    // },
  },
  methods: {
    itemController(item) {
      if (item.link) this.$router.push({ path: item.link });
      if (item.func && item.func.constructor === Function) {
        item.func()
      }
    },
    // openSettingsPopup() {
    //   this.settingsPopup = true;
    // },
    // confirm() {
    //   this.$emit('click:confirm');
    // },
    // reject() {
    //   this.$emit('click:reject');
    // },
  },
};
</script>

<style lang="stylus">
.user-panel
  margin: 0 10px 0 auto

.user-panel-alt-img
  position absolute

.user-panel-photo
  display: flex
  flex-flow: row nowrap
  align-items: center
  cursor: pointer

  .user-panel-image-wrapper
    display: flex
    flex-flow: row nowrap
    align-items: center
    justify-content: center
    width: 32px
    height: 32px


.user-panel-variant
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: flex-start
  font-size: 14px
  &:first-of-type
    border-bottom: 1px solid #DADADA
    font-weight: 500
  &.bottom
    border-top: 1px solid #DADADA
  &:hover:not(:first-of-type)
    span, .v-icon
      color: #416FC8
  .i-icon
    margin-right: 10px

  span
    color: #202124
    white-space: nowrap

@media(max-width: 959px)
  .user-panel
    margin-right: 5px
  .user-panel-expand-button.v-icon.v-icon
    display: none
  .user-panel-photo
    .user-panel-image-wrapper
      width: 26px
      height: 26px
</style>
