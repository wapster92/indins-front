<template>
  <div class="personal-items-wrap">
    <div class="container">
      <div
        ref="head"
        class="head"
      >
        <PageTitle text="Мой питомник" />
        <UserNameHeader />
      </div>
      <div
        v-if="showInMobile"
        class="mobile-head"
      >
        <AvatarBlock
          :src="logo"
          :loading="loading.logo"
          @change="uploadFiles"
        />
      </div>
      <div class="personal-area-pictures">
        <AvatarBlock
          v-if="!showInMobile"
          :src="logo"
          class="personal-area-pictures__avatar"
          @change="uploadFiles($event, 'logo')"
        />
        <BackImg
          class="personal-area-pictures__back-img"
          :src="backgroundImage"
          :loading="loading.backgroundImage"
          @change="uploadFiles($event, 'backgroundImage')"
        />
      </div>
      <PageTitle text="Мои сервисы" />
      <div class="personal-items">
        <PersonalAreaLink
          v-for="link of links"
          :key="link.icon"
          :path="link.path"
          :name="link.name"
          :icon="link.icon"
          :disable="link.disable"
        />
      </div>
    </div>
    <ManufacturersBlock
      v-if="pets.length > 0"
      :pets="pets"
    />
  </div>
</template>

<script>
import PersonalAreaLink from '@/components/blocks/PersonalAreaLink';
import PageTitle from '@/components/UI/blocks/PageTitle';
import ManufacturersBlock from '@/components/blocks/ManufacturersBlock';
import AvatarBlock from '@/components/blocks/AvatarBlock';
import BackImg from '@/components/blocks/BackImg';
import UserNameHeader from '@/components/blocks/UserNameHeader';
import { Filter, Get, Put } from 'core-xhr';

export default {
  name: 'Index',
  components: {
    PersonalAreaLink,
    PageTitle,
    AvatarBlock,
    BackImg,
    ManufacturersBlock,
    UserNameHeader,
  },
  // scrollToTop: true,
  async asyncData({ app: { $xhr }, store }) {
    try {
      const { uid } = store.getters['user/getUser'];
      const res = await $xhr.send(new Get('shelter').entity().addFilter(new Filter('uid', 'eq', uid)));
      const { result } = res.data.data;
      const pets = await $xhr.send(new Get('pet').setFilter([new Filter('shelter.id', 'eq', result.id), new Filter('isManufacturer', 'bool', true)]));
      return {
        shelterID: result.id,
        uid,
        pets: pets.data.data.result,
      };
    } catch (e) {
      console.error(e);
    }
  },
  data() {
    return {
      show: true,
      links: [
        {
          name: 'Сертификат питомника', path: '/personal-area/shelter', icon: 'personal-area/shelter', disable: false,
        },
        {
          name: 'Регистрация помета', path: '/personal-area/pets-register', icon: 'personal-area/register', disable: !this.$store.getters['user/getUser'].isSubscriber,
        },
        {
          name: 'Питомцы и документы', path: '/personal-area/pets-and-docks', icon: 'personal-area/pets', disable: !this.$store.getters['user/getUser'].isSubscriber,
        },
        {
          name: 'Обучение', path: '/personal-area/application-for-training', icon: 'personal-area/education', disable: !this.$store.getters['user/getUser'].isSubscriber,
        },
        {
          name: 'Выставки', path: '/personal-area/exhibition-application', icon: 'personal-area/exhibition', disable: !this.$store.getters['user/getUser'].isSubscriber,
        },
      ],
      shelterID: null,
      uid: null,
      generated: false,
      slides: 2,
      showInMobile: false,
      pets: [],
      loading: {
        backgroundImage: false,
        logo: false,
      },
    };
  },
  computed: {
    isSubscriber() {
      return this.$store.getters['user/getUser'].isSubscriber;
    },
    userId() {
      return this.$store.getters['user/getUser'].userId;
    },
    avatar() {
      return this.$store.getters['user/getUser'].avatar;
    },
    logo() {
      return this.$store.getters['user/getUser'].logo;
    },
    backgroundImage() {
      return this.$store.getters['user/getUser'].backgroundImage;
    },

  },
  mounted() {
    const { head } = this.$refs;
    const resizeObserver = new ResizeObserver(entries => {
      this.showInMobile = entries[0].borderBoxSize[0].inlineSize < 450;
    });
    resizeObserver.observe(head);
  },
  methods: {
    openFileInput(el) {
      el.click();
    },
    async uploadFiles(val, path) {
      const maxSize = 5 * 1024 * 1024;
      const typeFiles = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!typeFiles.includes(val.type)) {
        this.$notify({
          text: 'Разрешенный формат изображений JPEG, JPG, PNG',
          type: 'error',
        });
        return;
      }
      if (val.size > maxSize) {
        this.$notify({
          text: 'Файл превышает 5мб',
          type: 'error',
        });
        return;
      }

      const formData = new FormData();
      formData.append('file', val);
      formData.append('path', path);
      try {
        this.$set(this.loading, path, true);
        const result = await this.$axios.post('/image/reupload', formData, {
          headers: {
            // Authorization: `Bearer ${this.$cookies.get('auth-token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        const data = {};
        data[path] = result.data.path;
        this.$xhr.send(new Put('change-image').entity().addFilter(new Filter('id', 'eq', this.userId)).setData({ ...data }))
          .then(() => {
            if (path === 'logo') {
              this.$store.commit('user/logoAdd', result.data.path);
            }
            if (path === 'backgroundImage') {
              this.$store.commit('user/backgroundImageAdd', result.data.path);
            }
          });
      } catch (e) {
        this.$notify({
          text: e.message || 'Произошла ошибка при загрузки',
          type: 'error',
        });
      } finally {
        this.$set(this.loading, path, false);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.img-wrapper img {
  margin: auto;
  width: 100%;
  height: 400px;
  object-fit cover
  background-image: linear-gradient(gray 100%, transparent 0);
}
.personal-items
  display: grid;
  grid-template-columns repeat(1, minmax(153px, 1fr))
  grid-column-gap 10px
  grid-row-gap 31px
  padding-bottom: 32px
  margin-top: 40px
  @media screen and (min-width: 400px)
    grid-template-columns repeat(2, minmax(153px, 1fr))

  @media screen and (min-width: $tablet)
    grid-template-columns repeat(4, minmax(153px, 1fr))
    gap 20px
  @media screen and (min-width: 800px)
    grid-template-columns repeat(auto-fit, minmax(153px, 1fr))
.head
  display: flex;
  justify-content space-between
  align-items center
.personal-area-pictures
  position: relative;
  &__avatar
    position: absolute;
    top: 10%;
    left: 4%;
    @media screen and (min-width: 1050px)
      top: 60px;
      left: 50px;
  &__back-img
    width: 100%;
    overflow hidden
.mobile-head
  display flex
  justify-content space-between
  align-items center
  margin-bottom: 30px
  margin-top: 19px
</style>
