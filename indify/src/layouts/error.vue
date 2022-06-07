<template>
  <div class="error-page" :style="{height: '100vh'}">
    <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
    <h1 v-else-if="error.statusCode === 403">Доступ запрещён</h1>
    <h1 v-else>Ой, ошибочка :(</h1>
    <v-btn to="/" class="my-5" color="info">
      Перейти на главную страницу
    </v-btn>
    <div class="my-5 error-page__panels">
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Для разработчиков
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <h4>{{ error.statusCode }} {{ error.message }}</h4>
            <p class="error-page__panel-item">{{ error.errorText }}</p>
            <p class="error-page__panel-item">{{ error }}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'errorLayout',
  props: {
    error: {
      default: () => ({}),
    },
  },
  data() {
    return {
      show: true,

    }
  }
}
</script>