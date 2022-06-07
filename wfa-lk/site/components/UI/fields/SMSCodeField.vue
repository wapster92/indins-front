<template>
  <div class="smscode-input">
    <span
      v-if="label || info"
      class="smscode-input__info"
    >
      <FieldLabel
        v-if="label"
        :label="label"
      />
      <FieldInfo
        v-if="info"
        :info="info"
      />
    </span>
    <span
      ref="sms"
      class="smscode-input__wrap"
    >
      <ValidationProvider
        v-for="(item, i) in inputs"
        :key="item"
        rules="required"
        class="inputSms"
      >
        <input
          v-model="sms[i]"
          type="text"
          name="code"
          placeholder="_"
          maxlength="1"
          class="smscode-input__input"
          @change="changeValue"
        >
      </ValidationProvider>
      <span
        v-show="valid"
        class="smscode-input__error"
      >Введите код из СМС</span>
    </span>
  </div>
</template>

<script>
import FieldInfo from '~/components/UI/fields/FieldInfo';
import FieldLabel from '~/components/UI/fields/FieldLabel';

export default {
  name: 'SMSCodeField',
  components: {
    FieldInfo,
    FieldLabel,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
    invalid: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      inputs: 6,
      sms: [],
    };
  },
  computed: {
    valid() {
      return !Object.keys(this.invalid).every(el => this.invalid[el].length === 0);
    },
  },
  mounted() {
    const inputs = this.$refs.sms.querySelectorAll('.inputSms');
    inputs.forEach((el, i) => {
      el.querySelector('input').addEventListener('focus', e => {
        e.target.value = '';
      });
      el.querySelector('input').addEventListener('input', e => {
        const val = e.target.value;
        if (val.length > 0 && i < this.inputs - 1) {
          inputs[i + 1].querySelector('input').focus();
        } else {
          inputs[this.inputs - 1].querySelector('input').blur();
        }
      });
    });
  },
  methods: {
    changeValue() {
      this.$emit('input', this.sms);
    },
  },
};
</script>

<style lang="stylus">
.smscode-input
  display: flex;
  position: relative;
  flex-direction column;
  &__info
    display: flex;
    justify-content space-between;
    margin-bottom: 4px;
  &__input
    width: 100%;
    background: $grey-1;
    border: 1px solid $grey-stroke;
    border-radius: 5px;
    height: 50px
    padding: 0 16px;
    color: $text-secondary;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  &__wrap
    display grid
    grid-template-columns repeat(6, 1fr)
    grid-column-gap 10px
    position relative
  &__error
    position: absolute;
    bottom: -20px
    font-size: 13px
    color: $red-main;
    width: 100%;
    left: 0;
</style>
