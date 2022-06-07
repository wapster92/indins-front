<template>
  <div>
    <PopupComponent
      v-model="visible"
      :close-route-to="closeRoute"
      :title="isAddId ? 'Добавить тэг': 'Редактировать тэг'"
      form-mode
      @click:confirm="saveTag($event)"
      @click:reject="close"
    >
      <v-container
        class="pa-0"
        fluid
      >
        <v-row>
          <v-col cols="12">
            <TextInput
              v-model="tag.title"
              label="Наименование"
              input-type="standart"
              required
              name="title"
            />
            <ColorPicker
              v-model="tag.color"
              label="Цвет"
              required
              name="color"
            />
          </v-col>
        </v-row>
      </v-container>
      <template #buttons="{confirm, validate}">
        <SimpleButton
          v-if="!tag.isDefault && !tag.deletedAt && !isAddId"
          outlined
          @click="deleteTag"
        >
          Удалить
        </SimpleButton>
        <SimpleButton
          outlined
          @click="close"
        >
          Отмена
        </SimpleButton>
        <SimpleButton
          @click="confirm(validate)"
        >
          Сохранить
        </SimpleButton>
      </template>
    </PopupComponent>
  </div>
</template>

<script>
import {
  Put, Filter, Get, Post, Delete,
} from 'core-xhr';

export default {
  name: 'TagsCardForm',
  data() {
    return {
      visible: true,
      tag: {
        title: null,
        color: '#FF00FF',
        isDefault: true,
        deletedAt: null,
      },
    };
  },
  async fetch() {
    if (!this.isAddId) {
      try {
        const response = await this.$xhr.send(new Get('tags').entity()
          .addFilter(new Filter('id', 'eq', this.$route.params.id)));
        const { result } = response.data.data;
        this.tag = result;
      } catch {
        this.$showError('Не удалось получить данные!');
      }
    }
  },
  computed: {
    closeRoute() {
      return { name: 'tags' };
    },
    isAddId() {
      return this.$route.params.id === 'add';
    },
  },
  methods: {
    async saveTag(valid) {
      if (valid) {
        try {
          if (this.isAddId) {
            await this.$xhr.send((new Post('tags'))
              .setData({ ...this.tag, isDefault: false }));
          } else {
            await this.$xhr.send((new Put('tags'))
              .entity()
              .addFilter(new Filter('id', 'eq', this.$route.params.id))
              .setData({ ...this.tag }));
          }
        } catch {
          this.$showError('Сохранить изменения не удалось!');
        } finally {
          this.visible = false;
        }
      }
    },
    async deleteTag() {
      if (!this.tag.isDefault && !this.tag.deletedAt) {
        try {
          await this.$xhr.send((new Delete('tags')).entity()
            .addFilter(new Filter('id', 'eq', this.$route.params.id)));
        } catch {
          this.$showError('Удалить тэг не удалось!');
        } finally {
          this.visible = false;
        }
      }
    },
    close() {
      this.visible = false;
    },
  },
};
</script>
