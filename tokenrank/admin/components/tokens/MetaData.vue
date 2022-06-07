<template>
  <v-container
    fluid
  >
    <v-row no-gutters>
      <v-col
        cols="12"
      >
        <TextInput
          v-model="metaTitle"
          label="Meta Title"
          input-type="standart"
        />
      </v-col>
      <v-col
        cols="12"
      >
        <TextInput
          v-model="metaKeywords"
          label="Meta Keywords"
          input-type="standart"
        />
      </v-col>
      <v-col cols="12">
        <TextareaInput
          v-model="metaDescription"
          label="Meta Description"
          input-type="standart"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MetaData',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...[
      'metaTitle',
      'metaKeywords',
      'metaDescription',
    ].reduce((acc, name) => {
      acc[name] = {
        get() {
          return this.value[name];
        },
        set(val) {
          this.$emit('input', {
            ...this.value,
            [name]: val,
          });
        },
      };
      return acc;
    }, {}),
  },
};
</script>

<style scoped>

</style>
