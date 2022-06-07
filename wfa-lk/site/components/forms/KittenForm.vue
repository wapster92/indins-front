<template>
  <div>
    <div
      v-for="(kitten, i) of kittens"
      :key="i"
      class="kitten-form"
    >
      <div class="kitten-form__container semi-container">
        <div class="kitten-form__header">
          <SemiTitle
            :text="`Котенок ${i + 1}`"
            class="kitten-form__title"
          />
          <button
            v-if="i > 0"
            class="kitten-form__delete"
            @click="removeKitten(i)"
          >
            Удалить
          </button>
        </div>
        <div class="kitten-form__fields pd">
          <ValidationProvider
            v-slot="{errors}"
            name="Name"
            rules="required"
          >
            <SimpleInput
              v-model="kittens[i].name"
              label="Кличка"
              info="В этом поле должна быть указана только кличка
          питомца (без приставок с названием питомника или какими-либо регалиями)"
              :invalid="errors"
              default-error-message="Внимание! Вводите кличку без названия питомника"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{errors}"
            name="Gender"
            rules="required"
          >
            <SelectInput
              v-model="kittens[i].gender"
              label="Пол"
              :options="genders"
              label-option="name"
              :invalid="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{errors}"
            name="Color"
            rules="required"
          >
            <SelectInput
              v-model="kittens[i].color"
              label="Код окраса"
              :options="colors"
              label-option="code"
              :invalid="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{errors}"
            name="Bread"
            rules="required"
          >
            <SelectInput
              v-model="kittens[i].breed"
              label="Код породы"
              :options="breeders"
              label-option="code"
              :invalid="errors"
            />
          </ValidationProvider>
        </div>
        <div class="kitten-form__header">
          <SemiTitle
            text="Владелец"
            class="kitten-form__title"
          />
        </div>
        <div class="kitten-form__fields">
          <ValidationProvider
            v-slot="{errors}"
            name="Owner full name"
            rules="required"
          >
            <SimpleInput
              v-model="kittens[i].fullNameOfOwner"
              label="ФИО"
              :invalid="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{errors}"
            name="Owner phone"
            rules="required"
          >
            <SimpleInput
              v-model="kittens[i].phoneOfOwner"
              v-mask="'+7 (###) ###-##-##'"
              label="Телефон"
              :invalid="errors"
              placeholder="+7 (_ _ _)  _ _ _ - _ _ - _ _"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{errors}"
            name="Owner address"
            rules="required"
          >
            <SimpleInput
              v-model="kittens[i].addressOfOwner"
              label="Адрес"
              :invalid="errors"
            />
          </ValidationProvider>
        </div>
      </div>
    </div>
    <div class="kitten-form-btn">
      <div class="kitten-form-btn__container semi-container">
        <ButtonMain
          text="Добавить котенка"
          icon="UI/plus"
          light
          @click="addKitten"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SemiTitle from '@/components/UI/blocks/SemiTitle';
import { Get } from 'core-xhr';
import { mask } from 'vue-the-mask';
import { mapState } from 'vuex';
import SimpleInput from '../UI/fields/SimpleInput';
import SelectInput from '../UI/fields/SelectInput';
import ButtonMain from '../UI/blocks/ButtonMain';

export default {
  name: 'KittenForm',
  components: {
    SelectInput,
    SimpleInput,
    SemiTitle,
    ButtonMain,
  },
  directives: {
    mask,
  },
  props: {

  },
  data() {
    return {
      breeders: [],
      genders: [],
      colors: [],
      kittens: [],
    };
  },
  computed: {
    ...mapState({
      owner: state => state.user.shelter.owner.toUpperCase(),
      phone: state => state.user.shelter.phone,
      address: state => state.user.shelter.address.toUpperCase(),
    }),
  },
  watch: {
    kittens: {
      deep: true,
      handler(val) {
        this.$emit('input', val);
      },
    },
  },
  mounted() {
    this.$xhr.send(new Get('color').limitShown(1000)).then(res => {
      this.colors = res.data.data.result;
    });
    this.$xhr.send(new Get('gender')).then(res => {
      this.genders = res.data.data.result;
    });
    this.$xhr.send(new Get('breed').limitShown(1000)).then(res => {
      this.breeders = res.data.data.result;
    });
  },
  methods: {
    addKitten() {
      this.kittens.push({
        name: null,
        gender: null,
        color: null,
        breed: null,
        fullNameOfOwner: this.owner,
        phoneOfOwner: this.phone,
        addressOfOwner: this.address,
      });
    },
    removeKitten(item) {
      this.kittens.splice(item, 1);
    },
  },
};
</script>

<style lang="stylus">
.kitten-form
  padding: 46px 0 0;
  input
    background: $white-main;
  &__header
    display flex
    align-items center
    justify-content space-between
    margin-bottom: 27px;
  &__title
    display inline-flex
  &__delete
    background: transparent;
    border: 1px solid $red-main;
    color: $red-main;
    font-size: 16px;
    font-weight: 400;
    border-radius: 5px;
    height: 28px;
    padding: 0 14px;
    display flex
    align-items: center;
    justify-content: center;
    cursor pointer
    transition background-color .3s
    &:hover, &:focus
      background: $white-main;
  &__fields
    display: grid;
    grid-template-columns 1fr;
    grid-row-gap 27px
    @media screen and (min-width: $tablet)
      grid-template-columns 1fr 1fr 1fr
      grid-column-gap 30px
  .el-input__inner
    background: $white-main !important

.kitten-form-btn
  margin-top: 50px;
.pd
  padding-bottom: 30px
</style>
