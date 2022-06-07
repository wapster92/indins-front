<template>
  <div class="pet-avatar">
    <div
      class="pet-avatar__upload"
    >
      <input
        ref="avatar"
        type="file"
        class="pet-avatar__input"
        @change="uploadFiles"
      >
      <picture
        v-if="src"
        class="pet-avatar__pic"
      >
        <img
          :src="src"
          alt=""
        >
      </picture>
      <span
        v-else
        class="pet-avatar__text"
      >
        Загрузите фотографию
      </span>
      <ButtonEdit
        class="pet-avatar__edit"
        @click="openFileInput($refs.avatar)"
      />
    </div>
  </div>
</template>

<script>
import ButtonEdit from '@/components/UI/blocks/ButtonEdit';
import { Put, Filter } from 'core-xhr';
import { eventBus } from '@/utils/eventBus';

export default {
  name: 'PetAvatar',
  components: {
    ButtonEdit,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  methods: {
    async uploadFiles(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', 'pet-avatar');
      try {
        const result = await this.$axios.post('/image/reupload', formData, {
          headers: {
            // Authorization: `Bearer ${this.$cookies.get('auth-token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        await this.$xhr.send(new Put('pet')
          .entity()
          .addFilter(new Filter('id', 'eq', this.$route.params.id))
          .setData({ photo: result.data.path }));
        eventBus.$emit('chenge:photo', result.data.path);
      } catch (err) {
        console.error(err);
      }
    },
    openFileInput(el) {
      el.click();
    },
  },
};
</script>

<style lang="stylus" scoped>
.pet-avatar
  height: 200px;
  width: 200px;
  border-radius: 50%
  overflow hidden
  &__upload
    background: $grey-3;
    height: 100%;
    width: 100%
    display flex
    justify-content: center;
    align-items center
    flex-direction: column;
    text-align: center;
    color: $white-main;
    position relative
  &__edit
    margin-top: 20px;
    position: absolute;
    bottom: 30px;
  &__text
    padding: 20px;
    font-size: 18px;
    font-weight: 500
  &__input
    display: none;
  &__pic
    display inline-flex
    width: 100%
    height: 100%
    img
      object-fit cover
      width: 100%
      height: 100%
</style>
