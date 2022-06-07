<template>
  <FormPopup
    :title="dialogTitle"
    :close-route-to="closeRoute"
    value
    width="768"
    @click:confirm="save($event)"
  >
    <v-row no-gutters>
      <v-col
        sm="6"
        md="6"
        cols="12"
        class="px-2"
      >
        <div class="simple__title py-1">
          Изображение
        </div>
        <FileUploader
          :upload-request="uploadRequest"
          :value="employee.imageBefore ? {name: employee.name, url: employee.imageBefore} : null"
          accept="image/jpeg,image/pjpeg,image/png,image/svg+xml,image/webp"
          @onUploaded="onUploaded($event, 'imageBefore')"
          @onDeleteItem="employee.imageBefore = ''"
        />
      </v-col>
      <v-col
        sm="6"
        md="6"
        cols="12"
        class="px-2"
      >
        <div class="simple__title py-1">
          Изображение при наведении
        </div>
        <FileUploader
          :upload-request="uploadRequest"
          :value="employee.imageAfter ? {name: employee.name, url: employee.imageAfter} : null"
          accept="image/jpeg,image/pjpeg,image/png,image/svg+xml,image/webp"
          @onUploaded="onUploaded($event, 'imageAfter')"
          @onDeleteItem="employee.imageAfter = ''"
        />
      </v-col>
      <v-row no-gutters>
        <v-col
          sm="6"
          md="6"
          cols="12"
        >
          <SimpleText
            v-model="employee.name"
            label="ФИО"
            name="full-name"
            required
          />
        </v-col>
        <v-col
          sm="6"
          md="6"
          cols="12"
        >
          <SimpleText
            v-model="employee.position"
            label="Должность"
            name="position"
            required
          />
        </v-col>
        <v-col cols="12">
          <SimpleSwitch
            v-model="employee.isActive"
            class="mb-0 pb-0"
            hide-details
            label="Активна"
          />
        </v-col>
      </v-row>
    </v-row>
  </FormPopup>
</template>

<script>
import {
  Post, Get, Put, Filter, Simple,
} from 'core-xhr';

export default {
  name: 'TeamPage',
  meta: {
    breadcrumb() {
      return this.employee.name || 'Добавление';
    },
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const id = parseInt(route.params.id) || null;
    if (!id) {
      return {};
    }
    const data = await $xhr
      .send(
        new Get('team').entity().addFilter(new Filter('id', 'eq', id)),
      )
      .then(response => response.data.data.result)
      .catch(reason => console.error(reason) ^ error(reason.message || reason.error));

    const {
      name, position, imageBefore, imageAfter, isActive,
    } = data;
    return {
      id,
      employee: {
        name, position, imageBefore, imageAfter, isActive,
      },
    };
  },
  data() {
    return {
      id: null,
      employee: {
        name: null,
        position: null,
        imageBefore: null,
        imageAfter: null,
        isActive: null,
      },
      uploadRequest: new Simple(),
    };
  },
  computed: {
    isAddPage() {
      return this.$route.params.id === 'add';
    },
    dialogTitle() {
      return this.isAddPage ? 'Добавление' : 'Редактирование';
    },
    entityRequest() {
      return this.isAddPage
        ? new Post('team').entity()
        : new Put('team')
          .entity()
          .addFilter(new Filter('id', 'eq', this.id));
    },
    closeRoute() {
      return { name: 'team' };
    },
  },
  methods: {
    onUploaded(event, field) {
      this.employee[field] = event.url;
    },
    async save(isValid) {
      if (!isValid) {
        await this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      await this.$store.dispatch('snack/notify', 'Подождите...');

      const request = this.entityRequest.setData({ ...this.employee });

      // noinspection JSUnresolvedVariable
      this.$xhr
        .send(request)
        .then(() => {
          this.$store.dispatch('snack/notify', 'Сохранено');
          this.$router.push(this.closeRoute);
        })
        .catch(e => {
          console.error(e);
          this.$store.dispatch('snack/error', 'Что-то пошло не так');
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
  .simple__title
    font-size 16px
    color #00000099
</style>
