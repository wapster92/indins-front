<template>
  <div class="shelter-wrap">
    <PersonalAreaHeader title="Мой питомник" />
    <SkeletonMain title="Название питомника">
      <template #fields>
        <SimpleInput
          :value="name | toUpper"
          disabled
          label="Название на русском языке"
        />
        <SimpleInput
          label="Название на английском языке"
          :value="translatedName | toUpper"
          disabled
        />
      </template>
    </SkeletonMain>
    <SkeletonMain
      v-if="club"
      title="Клуб"
    >
      <template #fields>
        <SimpleInput
          :value="(club || {}).name | toUpper"
          disabled
          label="Название"
        />
        <SimpleInput
          :value="(club || {}).head | toUpper"
          disabled
          label="Руководитель"
        />
        <SimpleInput
          :value="(club || {}).address | toUpper"
          disabled
          label="Адрес"
        />
        <SimpleInput
          :value="(club || {}).email | toUpper"
          disabled
          label="Email"
        />
      </template>
    </SkeletonMain>
    <SkeletonMain title="Данные владельца">
      <template #fields>
        <SimpleInput
          :value="owner | toUpper"
          disabled
          label="Фамилия Имя Отчество"
          class="long-input"
        />
      </template>
    </SkeletonMain>
    <SkeletonMain title="Контакты питомника">
      <template #fields>
        <SimpleTextarea
          disabled
          :value="address | toUpper"
          label="Адрес"
          class="shelter-textarea"
        />
      </template>
    </SkeletonMain>

    <SkeletonMain
      class="skeleton-main-last"
      title="Регистрационный номер
питомника"
    >
      <template #fields>
        <SimpleInput
          :value="number"
          disabled
          label="Регистрационный номер"
        />
        <SimpleInput
          :value="oldNumber"
          disabled
          label="Старый рег. номер"
        />
      </template>
    </SkeletonMain>
    <div class="serteficat">
      <div class="serteficat__container semi-container">
        <SemiTitle
          text="Сертификат питомника"
          class="serteficat__title"
        />
        <div class="serteficat__img-wrap">
          <img
            v-if="certificateImage"
            :src="`/${certificateImage}`"
            alt="icon"
            @error="generateSertImg"
          >
          <img
            v-else
            src="@/assets/img/sert.svg"
            alt="icon"
          >
        </div>
        <ButtonMain
          :text="generate ? 'Подождите': 'Скачать сертификат'"
          @click="getFile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PersonalAreaHeader from '@/components/blocks/PersonalAreaHeader';
import SkeletonMain from '@/components/forms/SkeletonMain';
import { Get, Filter, Simple } from 'core-xhr';
import SimpleInput from '../../../components/UI/fields/SimpleInput';
import ButtonMain from '../../../components/UI/blocks/ButtonMain';
import SemiTitle from '../../../components/UI/blocks/SemiTitle';
import SimpleTextarea from '../../../components/UI/fields/SimpleTextarea';
// import { downloadFile } from '~/utils/download';

export default {
  name: 'Index',
  components: {
    PersonalAreaHeader,
    SkeletonMain,
    SimpleInput,
    ButtonMain,
    SemiTitle,
    SimpleTextarea,
  },
  filters: {
    toUpper(val) {
      if (typeof val === 'string') {
        return val.toUpperCase();
      }
    },
  },
  // scrollToTop: true,
  async asyncData({ app: { $xhr }, store }) {
    try {
      const { uid, userId } = store.getters['user/getUser'];
      const res = await $xhr.send(new Get('shelter').entity().addFilter(new Filter('uid', 'eq', uid)));
      const user = await $xhr.send(new Get('user').entity().addFilter(new Filter('id', 'eq', userId)));
      const { result } = res.data.data;
      return {
        name: result.name,
        translatedName: result.translatedName,
        owner: result.owner,
        address: result.address,
        number: result.number,
        oldNumber: result.oldNumber,
        shelterId: result.id,
        uid: result.uid,
        club: result.club,
        certificateImage: user.data.data.result.certificateImage,
      };
    } catch (e) {
      console.error(e);
    }
  },
  data() {
    return {
      name: null,
      translatedName: null,
      owner: null,
      address: null,
      number: null,
      oldNumber: null,
      shelterId: null,
      uid: null,
      generate: false,
      club: null,
      certificateImage: null,
    };
  },
  computed: {
    userId() {
      return this.$store.getters['user/getUser'].userId;
    },
  },
  methods: {
    generateSertImg() {
      this.$xhr.send(new Simple(`/api/generate_image/${this.userId}`).authorization()).then(
        certificateImageReq => {
          if (certificateImageReq.result) {
            this.$store.commit('certificateImageAdd', certificateImageReq.data.result);
            this.certificateImage = certificateImageReq.data.result;
          } else {
            this.certificateImage = false;
          }
        },
      ).catch(e => console.error(e));
    },
    getFile() {
      if (this.generate) return;
      this.generate = true;
      this.$xhr.downloadFile({
        url: 'documents/shelter',
        method: 'POST',
        data: {
          // documentTypeId: item.reestrDocumentTypeId,
          uid: this.uid,
          id: this.shelterId,
        },
        fileName: 'Сертификат.pdf',
      }).then(() => {
        this.generate = false;
      }).catch(err => {
        this.generate = false;
        this.$notify({
          text: err.message || 'Произошла ошибка',
          type: 'error',
        });
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.skeleton-main-last
  padding-bottom: 60px
.serteficat
  padding-top: 60px;
  &__title
    margin-bottom: 46px;
  &__img-wrap
    margin-bottom: 62px;
    max-width 604px
    img
      width: 100%;
      height: auto;
.shelter-textarea
  @media screen and (min-width: $tablet)
    grid-column span 2
.long-input
  grid-column span 2
.shelter-wrap
  padding-bottom: 70px
</style>
