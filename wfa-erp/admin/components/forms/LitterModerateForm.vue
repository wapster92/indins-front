<template>
  <div>
    <v-row class="ma-0 fill-height">
      <v-col
        class="pa-0 fill-height overflow-y-auto overflow-x-hidden"
        cols="4">
        <BlockWrapper
          show-title
          class="mb-1"
          title="Общие данные">
          <div class="pa-4">
            <v-row class="ma-0">
              <v-col
                class="pa-0"
                cols="4">
                <DateTimeField
                  :value="(value || {}).createdAt"
                  label="Дата заявки"
                  readonly
                />
              </v-col>
              <v-col
                class="pa-0"
                cols="4">
                <SimpleText
                  :value="(info || {}).letter"
                  label="Буква помета"
                  readonly
                />
              </v-col>
              <v-col
                class="pa-0"
                cols="4">
                <DateTimeField
                  v-model="(firstPet || {}).dateOfBirth"
                  label="Дата рождения"
                  readonly
                />
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col
                class="pa-0"
                lg="6"
                cols="12">
                <SimpleText
                  :value="(info.shelter || {}).name"
                  label="Название Питомника"
                  readonly
                />
              </v-col>
              <v-col
                class="pa-0"
                lg="6"
                cols="12">
                <SimpleText
                  :value="(info.shelter || {}).owner"
                  label="ФИО владельца питомника(заводчика)"
                  readonly
                />
              </v-col>
            </v-row>
          </div>
        </BlockWrapper>
        <BlockWrapper
          v-if="mom"
          show-title
          class="mb-1"
          title="Данные матери">
          <LitterParentForm :value="mom"/>
        </BlockWrapper>
        <BlockWrapper
          v-if="dad"
          show-title
          class="mb-1"
          title="Данные отца">
          <LitterParentForm :value="dad"/>
        </BlockWrapper>
      </v-col>
      <v-col
        cols="8"
        class="pa-0 pl-1">
        <BlockWrapper
          show-title
          class="mb-1 pb-4"
          title="Данные о котятах">
          <v-row
            v-for="(pet, num) in info.pets"
            :key="num"
            class="ma-0 pt-4 px-4">
            <v-col
              cols="3"
              class="pa-0">
              <SimpleText
                :value="(pet || {}).name"
                label="Кличка"
                readonly
              />
            </v-col>
            <v-col
              cols="3"
              class="pa-0">
              <SimpleText
                :value="(pet.gender || {}).name"
                label="Пол"
                readonly
              />
            </v-col>
            <v-col
              cols="3"
              class="pa-0">
              <SimpleText
                :value="(pet.breed || {}).code"
                label="Код породы"
                readonly
              />
            </v-col>
            <v-col
              cols="3"
              class="pa-0">
              <SimpleText
                :value="(pet.color || {}).code"
                label="Код окраса"
                readonly
              />
            </v-col>
          </v-row>
        </BlockWrapper>
        <BlockWrapper
          show-title
          title="Комментарий">
          <v-row class="ma-0 pa-4">
            <v-col class="pa-0">
              <SimpleTextarea
                :value="value.incomingParams.comment"
                readonly
              />
            </v-col>
          </v-row>
        </BlockWrapper>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import BlockWrapper from '@/components/blocks/BlockWrapper';
import LitterParentForm from '~/components/forms/LitterParentForm';

export default {
  name: 'LitterModerateForm',
  components: {
    LitterParentForm,
    BlockWrapper,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      parents: [],
    };
  },
  computed: {
    info() {
      return this.value.incomingParams;
    },
    firstPet() {
      return this.info.pets[0];
    },
    dad() {
      return this.parents.find(p => p.gender.name === 'male');
    },
    mom() {
      return this.parents.find(p => p.gender.name === 'female');
    },

  },
  async created() {
    const { parents } = this.firstPet;
    const filterArray = [
      new Filter('id', 'eq', parents[0].id, true, true),
      new Filter('id', 'eq', parents[1].id, true, false),
      new Filter('deletedAt', 'exists', false),
    ];

    this.parents = await this.$xhr
      .send(new Get('parents').collection().setFilter(filterArray))
      .then(response => response.data.data.result)
      .catch(reason => console.error(reason.message || reason.error));
  },
};
</script>
