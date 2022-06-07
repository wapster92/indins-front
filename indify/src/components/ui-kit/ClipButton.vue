<template>
  <div class="clip-button">
    <v-tooltip
      bottom
      nudge-right="40"
    >
      <template #activator="{on, attrs}">
        <v-btn
          v-bind="attrs"
          depressed
          small
          width="30"
          height="30"
          min-width="30"
          max-width="30"
          v-on="on"
          @click="fileClick"
        >
          <v-icon>attach_file</v-icon>
        </v-btn>
      </template>
      <span>{{ description }}</span>
    </v-tooltip>
    <v-tooltip v-if="warning" bottom>
      <template #activator="{ attrs, on }">
        <v-icon
          v-bind="attrs"
          class="comment-question-mark"
          color="#D3D4DB"
          size="20"
          v-on="on"
        >
          help_outline
        </v-icon>
      </template>
      <span>{{ warning }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "ClipButton",
  props: {
    warning: {
      type: [String, Boolean],
      default: 'Общий размер всех файлов не должен превышать 50 мб'
    },
    description: {
      type: String,
      default: 'Добавить файлы'
    }
  },
  data() {
    return {
      files: [],
      totalWeight: null,
    }
  },
  methods: {
    fileClick(event) {
      this.$emit('replace-item', event)
    },
  }
}
</script>

<style lang="stylus">
//.clip-button
//  grid-row: 1
//  margin-top: 0
//
//.clip-button-button
//  position: relative
//  .v-btn
//    border-radius: 2px

.clip-button
  grid-column: 1
  .v-btn
    i
      font-size: 20px
      transform: rotate(45deg)
</style>