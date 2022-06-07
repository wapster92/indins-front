<template>
  <div>
    <v-row class="ma-0">
      <v-col
        class="pa-0"
        cols="4">
        <DateTimeField
          :value="applicationDate"
          label="Дата заявки"
          time
          readonly
        />
      </v-col>
      <v-col
        class="pa-0"
        cols="4">
        <SimpleText
          v-model="name"
          label="Кличка"
          name="name"
          required
        />
      </v-col>
      <v-col
        class="pa-0"
        cols="4">
        <SearchSelect
          v-model="gender"
          :request="genderRequest"
          label="Пол"
          name="gender"
          hide-search
          required
        />
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <v-col
        class="pa-0"
        cols="4">
        <DateTimeField
          v-model="dateOfBirth"
          label="Дата рождения"
          name="dateOfBirth"
          required
        />
      </v-col>
      <v-col
        class="pa-0"
        cols="4">
        <SearchSelect
          v-model="breed"
          :request="breedRequest"
          label="Код породы"
          name="breed"
          item-text="code"
          required
        />
      </v-col>
      <v-col
        class="pa-0"
        cols="4">
        <SearchSelect
          v-model="color"
          :request="colorRequest"
          label="Код окраса"
          name="color"
          item-text="code"
          required
        />
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <v-col
        class="pa-0 d-flex align-center"
        cols="6"
        sm="3">
        <SimpleSwitch
          v-model="isManufacturer"
          label="Производитель"
        />
      </v-col>
      <v-col
        class="pa-0"
        cols="6"
        sm="9">
        <SimpleText
          v-model="oldNumber"
          label="Старый рег. Номер"
        />
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <v-col
        class="pa-0"
        cols="6">
        <SimpleText
          v-model="chipNumber"
          label="Номер чипа"
        />
      </v-col>
      <v-col
        class="pa-0"
        cols="6">
        <SimpleText
          v-model="(shelter || {}).name"
          label="Название Питомника"
          readonly
        />
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <v-col
        class="pa-0"
        cols="6">
        <SimpleText
          v-model="fullNameOfBreeder"
          label="ФИО заводчика"
          readonly
        />
      </v-col>
      <v-col
        class="pa-0"
        cols="6">
        <SimpleText
          v-model="fullNameOfOwner"
          label="ФИО владельца"
          readonly
        />
      </v-col>
    </v-row>
    <v-row class="ma-0 pt-2">
      <v-col
        class="pa-0"
        cols="12">
        <FilesPanel
          v-if="files.length"
          v-model="files"/>
        <div v-else class="no_file">
          <span>Файлы не переданы...</span>
        </div>
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <v-col
        class="pa-0"
        cols="6">
        <SearchSelect
          v-model="dad"
          :request="requestParents"
          :item-filter="maleFilter"
          label="Кличка Папы"
          name="dad"
        />
      </v-col>
      <v-col
        class="pa-0"
        cols="6">
        <SearchSelect
          v-model="mom"
          :request="requestParents"
          :item-filter="femaleFilter"
          label="Кличка Мамы"
          name="mom"
        />
      </v-col>
    </v-row>
    <v-row class="ma-0 check-pets-listing">
      <span>Проверка зарегистрированного питомца</span>
      <v-col
        class="pa-0"
        cols="12">
        <DynamicListing
          ref="petsCheck"
          :headers="petsCheckHeaders"
          :request="requestPets"
          multiple-search="name"
          hide-empty-table
          @item-click="openPet($event)"
        >
          <template #columns>
            <TextColumn field="name"/>
            <DateColumn field="dateOfBirth"/>
            <ActionColumn action-column>
              <template v-slot:default="{item}">
                <ClickAction
                  icon="autorenew"
                  @click="openPetChangeWarning(item)"
                />
              </template>
            </ActionColumn>
          </template>
        </DynamicListing>
      </v-col>
    </v-row>
    <TitledPopup
      v-model="petChangeWarning"
      title="Продолжить?"
      confirm-text="Выбрать"
      @click:confirm="changeExistingPet"
    >
      <span>После нажатия на кнопку Выбрать, данные по выбранному питомцу в реестре будут заменены на новые</span>
    </TitledPopup>
    <nuxt-child/>
  </div>
</template>

<script>
import { Get, Filter } from 'core-xhr';
import FilesPanel from '~/components/panels/FilesPanel';
import { setComputedProperty } from '@/utils';

export default {
  name: 'PetModerateForm',
  components: {
    FilesPanel,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    applicationDate: {
      type: String,
      default: null,
    },
    validate: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      requestParents: new Get('pets'),
      genderRequest: new Get('genders'),
      breedRequest: new Get('breeds'),
      colorRequest: new Get('colors'),
      requestPets: null,
      petsCheckHeaders: [
        { name: 'Кличка', field: 'name', space: '200px' },
        { name: 'Дата рождения', field: 'dateOfBirth', space: '200px' },
        { name: '', field: 'special:listing-actions', space: '80px' },
      ],
      petChangeWarning: false,
      changingPetId: null,
      maleFilter: { 'gender.name': 'male' },
      femaleFilter: { 'gender.name': 'female' },
    };
  },
  computed: {
    ...[
      'breed',
      'chipNumber',
      'clubName',
      'color',
      'dateOfBirth',
      'files',
      'fullNameOfBreeder',
      'fullNameOfOwner',
      'gender',
      'isManufacturer',
      'name',
      'oldNumber',
      'phoneOfBreeder',
      'shelter',
      'parents',
    ].reduce((acc, name) => {
      acc[name] = setComputedProperty(name);
      return acc;
    }, {}),
    dad: {
      get() {
        if (Array.isArray(this.parents)) {
          return this.parents.find(p => p?.gender?.name === 'male') || null;
        }
        return null;
      },
      set(val) {
        this.parents = [val, this.mom];
      },
    },
    mom: {
      get() {
        if (Array.isArray(this.parents)) {
          return this.parents.find(p => p?.gender?.name === 'female') || null;
        }
        return null;
      },
      set(val) {
        this.parents = [this.dad, val];
      },
    },
  },
  mounted() {
    this.$watch(
      () => this.$refs.petsCheck.multipleSearchQuery,
      val => {
        if (val) {
          this.requestPets = new Get('pets')
            .collection()
            .addFilter(new Filter({
              field: 'deletedAt',
              filter: 'exists',
              value: false,
              mandatory: true,
            }));
        } else {
          this.requestPets = new Get('pets')
            .collection()
            .addFilter(new Filter({
              field: 'id',
              filter: 'exists',
              value: false,
              mandatory: true,
            }));
        }
      },
    );
  },
  methods: {
    openPetChangeWarning({ id }) {
      if (!this.validate()) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      this.changingPetId = id;
      this.petChangeWarning = true;
    },
    changeExistingPet() {
      this.$emit('change-existing-pet', this.changingPetId);
    },
    openPet({ id }) {
      window.open(`/pets/${id}`, '_blank');
    },
  },
};
</script>

<style lang="stylus">
.no_file
  padding: 0 8px 10px 8px

.check-pets-listing
  padding: 26px 8px
  .listing-top
    margin-bottom: 0
    .search-input
      padding: 10px 0 0 0
</style>
