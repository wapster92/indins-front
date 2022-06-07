<template>
  <div class="password-input">
    <span
      v-if="label || info"
      class="password-input__info"
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
    <span class="password-input__wrap">
      <input
        :type="type"
        :name="name"
        :placeholder="placeholder"
        class="password-input__input"
        @input="changeValue"
        @focus="$event.target.removeAttribute('readonly')"
      >
      <FieldIcon
        icon="field-password"
        @click="changeType"
      />
    </span>
  </div>
</template>

<script>
import FieldInfo from '~/components/UI/fields/FieldInfo';
import FieldLabel from '~/components/UI/fields/FieldLabel';
import FieldIcon from '~/components/UI/fields/FieldIcon';

export default {
  name: 'PasswordInput',
  components: {
    FieldInfo,
    FieldLabel,
    FieldIcon,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      type: 'password',
    };
  },
  methods: {
    changeType() {
      this.type = this.type === 'text' ? 'password' : 'text';
    },
    changeValue(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="stylus">
.password-input
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
  &__wrap
    display: inline-flex;
    width: 100%;
    position: relative;
</style>
