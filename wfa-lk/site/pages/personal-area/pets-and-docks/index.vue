<template>
  <div>
    <PersonalAreaHeader title="Питомцы и документы" />
    <div class="pets-a-docs">
      <div class="pets-a-docs__container container">
        <div class="pets-a-docs__wrap">
          <div class="pets-a-docs__search">
            <SimpleInput
              v-model="searchText"
              placeholder="Поиск по кличке"
              icon="personal-area/search"
              @input="search"
            />
          </div>
          <div class="pets-a-docs__switch">
            <SwitcherField
              v-model="isManufacturer"
              label="Производители"
              @change="search"
            />
          </div>
          <div class="pets-a-docs__button">
            <ButtonMain
              text="Добавить питомца"
              path="/personal-area/pet-register"
            />
          </div>
          <div class="pets-a-docs__table">
            <TableDocks :pets="pets" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Get, Filter } from 'core-xhr';
import TableDocks from '~/components/blocks/TableDocks';
import PersonalAreaHeader from '~/components/blocks/PersonalAreaHeader';
import SimpleInput from '~/components/UI/fields/SimpleInput';
import SwitcherField from '~/components/UI/fields/SwitcherField';
import ButtonMain from '~/components/UI/blocks/ButtonMain';

export default {
  name: 'Index',
  components: {
    TableDocks,
    PersonalAreaHeader,
    SimpleInput,
    SwitcherField,
    ButtonMain,
  },
  async asyncData({ app: { $xhr }, store }) {
    const user = store.getters['user/getUser'];
    const pets = await $xhr.send(new Get('pet')
      .setFilter(
        [new Filter('isApproved', 'bool', true),
          new Filter('shelter.id', 'eq', user.shelter.id),
          new Filter('deletedAt', 'exists', false),
          new Filter('isManufacturer', 'bool', true),
        ],
      ))
      .then(res => {
        const { result } = res.data.data;
        return result;
      }).catch(e => {
        console.error(e);
      });
    return {
      pets,
    };
  },
  data() {
    return {
      pets: [],
      isManufacturer: true,
      searchText: '',
    };
  },
  computed: {
    shelterId() {
      return this.$store.getters['user/getUser'].shelter.id;
    },
  },
  methods: {
    changeFilters(val, userID) {
      if (this.isManufacturer) {
        return [
          new Filter('name,breedingNumber,fullNameOfOwner', 'multiple', val),
          new Filter('shelter.id', 'eq', userID),
          new Filter('isApproved', 'bool', true),
          new Filter('isManufacturer', 'bool', true),
          new Filter('deletedAt', 'exists', false),
        ];
      }
      return [
        new Filter('name,breedingNumber,fullNameOfOwner', 'multiple', val),
        new Filter('isApproved', 'bool', true),
        new Filter('shelter.id', 'eq', userID),
        new Filter('deletedAt', 'exists', false),
      ];
    },
    search() {
      this.$xhr.send(new Get('pet')
        .setFilter(this.changeFilters(this.searchText, this.shelterId)))
        .then(res => {
          const { result } = res.data.data;
          this.pets = result;
        });
    },
  },
};
</script>

<style scoped lang="stylus">
.pets-a-docs
  background: $white-main;
  padding: 32px 0 72px;
  height: 100%;
  &__wrap
    display: grid;
    grid-template-columns 100%
    grid-row-gap 40px
    grid-template-areas "search" \
                        "switch" \
                        "table" \
                        "button"
    @media screen and (min-width: $tablet)
      grid-template-columns 392px 1fr
      grid-template-areas "search switch" \
                          "table table" \
                          "button button"
    @media screen and (min-width: 1030px)
      grid-template-columns 392px 1fr 1fr
      grid-template-areas "search switch button" \
                          "table table table"

  &__search
    grid-area search
  &__switch
    grid-area switch
    @media screen and (min-width: $tablet)
      padding: 0 40px;
      display: flex;
      align-items: center;
  &__table
    grid-area table
  &__button
    grid-area button
    @media screen and (min-width: 1030px)
      display flex
      justify-content flex-end
</style>
