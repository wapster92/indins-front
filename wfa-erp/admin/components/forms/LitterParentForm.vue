<template>
  <div class="pa-4">
    <v-row class="ma-0">
      <v-col
        cols="6"
        class="pa-0">
        <SimpleText
          :value="value.name"
          label="Кличка"
          readonly
        />
      </v-col>
      <v-col
        cols="6"
        class="pa-0">
        <SimpleText
          :value="value.dateOfBirth"
          label="Дата рождения"
          readonly
        />
      </v-col>
      <v-col
        cols="6"
        class="pa-0">
        <SimpleText
          :value="value.breed.code"
          label="Код породы"
          readonly
        />
      </v-col>
      <v-col
        cols="6"
        class="pa-0">
        <SimpleText
          :value="value.color.code"
          label="Код окраса"
          readonly
        />
      </v-col>
      <v-col
        v-for="(title, num) in value.titles"
        :key="num"
        cols="12"
        class="pa-0">
        <SimpleText
          :value="title.name"
          label="Титул"
          readonly
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'LitterParentForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
};
</script>
