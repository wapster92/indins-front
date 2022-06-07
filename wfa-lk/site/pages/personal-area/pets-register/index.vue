<template>
  <div>
    <PersonalAreaHeader title="Регистрация помета" />
    <client-only>
      <ValidationObserver
        ref="observer"
        tag="div"
      >
        <SkeletonMain title="Общие данные">
          <template #fields>
            <ValidationProvider
              v-slot="{errors}"
              name="Latter"
              rules="required"
            >
              <SimpleInput
                v-model="letter"
                label="Укажите букву помета"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Date"
              rules="required"
            >
              <DateInput
                v-model="dateOfBirth"
                label="Дата рождения помета"
                :invalid="errors"
              />
            </ValidationProvider>
          </template>
        </SkeletonMain>
        <SkeletonMain title="Данные отца">
          <template #fields>
            <SelectInput
              v-model="father"
              label="Кличка"
              :options="petsMale"
              label-option="name"
              @changeInput="getPetsMale"
            />
          </template>
        </SkeletonMain>
        <SkeletonMain
          title="Данные матери"
          class="skeleton-padding"
        >
          <template #fields>
            <SelectInput
              v-model="mather"
              label="Кличка"
              :options="petsFemale"
              label-option="name"
              @changeInput="getPetsFemale"
            />
          </template>
        </SkeletonMain>
        <KittenForm v-model="pets" />
      </ValidationObserver>
    </client-only>
    <CommentBlock v-model="comment" />
    <div class="akt-block">
      <div class="semi-container">
        <switcher-field
          v-model="akt"
          label="Акт осмотра помета"
        />
        <p class="pred">
          Акт можно заказать только в момент оформления помета!
        </p>
      </div>
    </div>
    <ContributionBlock
      title="Целевой взнос за регистрацию помета"
      :sum="allSum"
      :load-payment="loadPayment"
      :url="url"
      bonus-payment
      @click="pay"
      @bonuses="writeOffBonuses"
    />
  </div>
</template>

<script>
import {
  Post, Get, Filter, Simple,
} from 'core-xhr';
import SelectInput from '@/components/UI/fields/SelectInput';
import SwitcherField from '@/components/UI/fields/SwitcherField';
import { mapState } from 'vuex';
import PersonalAreaHeader from '~/components/blocks/PersonalAreaHeader';
import SkeletonMain from '~/components/forms/SkeletonMain';
import SimpleInput from '~/components/UI/fields/SimpleInput';
import DateInput from '~/components/UI/fields/DateInput';
import KittenForm from '~/components/forms/KittenForm';
import CommentBlock from '~/components/blocks/CommentBlock';
import ContributionBlock from '~/components/blocks/ContributionBlock';

export default {
  name: 'Index',
  components: {
    PersonalAreaHeader,
    SkeletonMain,
    SimpleInput,
    DateInput,
    KittenForm,
    CommentBlock,
    ContributionBlock,
    SelectInput,
    SwitcherField,
  },
  async asyncData({ app: { $xhr }, store }) {
    try {
      const userID = store.getters['user/getUser'].shelter.id;
      const sum = await $xhr.send(new Get('sum').setFilter([new Filter('serviceType.id', 'ineq', [5, 13])]));
      const petsMale = await $xhr.send(new Get('pet')
        .setFilter([
          new Filter('shelter.id', 'eq', userID),
          new Filter('gender.id', 'eq', 1),
          new Filter('deletedAt', 'exists', false),
          new Filter('isManufacturer', 'bool', true),
        ]));
      const petsFemale = await $xhr.send(new Get('pet')
        .setFilter([
          new Filter('shelter.id', 'eq', userID),
          new Filter('gender.id', 'eq', 2),
          new Filter('deletedAt', 'exists', false),
          new Filter('isManufacturer', 'bool', true),
        ]));
      return {
        sum: sum.data.data.result,
        petsFemale: petsFemale.data.data.result,
        petsMale: petsMale.data.data.result,
      };
    } catch (e) {
      return {};
    }
  },
  data() {
    return {
      petsFemale: [],
      petsMale: [],
      pets: [],
      letter: null,
      dateOfBirth: null,
      comment: null,
      father: null,
      mather: null,
      sum: [],
      akt: false,
      loadPayment: false,
      url: '',
    };
  },
  computed: {
    shelterTanslateName() {
      return this.$store.getters['user/getUser'].shelter.translatedName;
    },
    shelterOwner() {
      return this.$store.getters['user/getUser'].shelter.owner;
    },
    shelterPhone() {
      return this.$store.getters['user/getUser'].shelter.phone;
    },
    shelterAddress() {
      return this.$store.getters['user/getUser'].shelter.address;
    },
    shelter() {
      return this.$store.getters['user/getUser'].shelter.id;
    },
    ...mapState({
      clubId: state => state.user.shelter.clubId,
      shelterName: state => state.user.shelter.name,
      shelterId: state => state.user.shelter.id,
    }),
    allSum() {
      if (this.akt) {
        return this.sum.reduce((acc, n) => {
          if (n.serviceType.id === 5) {
            return acc + n.cost * this.pets.length;
          }
          return acc + n.cost;
        }, 0);
      }
      return this.sum.find(n => n.serviceType.id === 5).cost * this.pets.length;
    },
    clubName() {
      return this.$store.getters['user/getUser'].shelter.clubName;
    },
  },
  methods: {
    async writeOffBonuses() {
      const { observer } = this.$refs;
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.$store.dispatch('modal/close');
        this.setInvalidAndScrollPage(observer);
        return;
      }
      const body = this.setBodyData();
      this.$store.dispatch('modal/close');
      try {
        const pay = await this.$xhr.send((new Simple('/api/bonus/create_payment', body, 'POST')).authorization());
        if (!pay.data.success) {
          throw new Error(pay.data.message);
        }
      } catch (e) {
        this.$notify({
          text: e.message || 'Произошла ошибка',
          type: 'error',
        });
      }
      this.$router.push({ name: 'success' });
    },
    async pay() {
      const { observer } = this.$refs;
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.$store.dispatch('modal/close');
        this.setInvalidAndScrollPage(observer);
        return;
      }
      if (this.paymentLink) return window.open(this.paymentLink, '_blank');
      const body = this.setBodyData();
      try {
        this.loadPayment = true;
        const pay = await this.$xhr.send((new Simple('/api/tinkoff/create_payment', body, 'POST')).authorization());
        if (pay.data.success) {
          this.paymentLink = pay.data.result.url;
          this.url = pay.data.result.url;
          this.loadPayment = false;
        }
      } catch (e) {
        this.$notify({
          text: e.message || 'Произошла ошибка',
          type: 'error',
        });
      }
      this.$store.dispatch('modal/close');
    },
    async setInvalidAndScrollPage(observer) {
      for (const key of Object.keys(observer.fields)) {
        if (observer.fields[key].invalid) {
          const el = observer.refs[key].$el;
          const yOffset = -120;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          return;
        }
      }
    },
    setBodyData() {
      const parents = [];
      if (this.mather) {
        parents.push({ id: this.mather.id });
      }
      if (this.father) {
        parents.push({ id: this.father.id });
      }
      const info = {
        letter: this.letter,
        breedingNumberIndex: { id: 1, name: 'LO' },
        dateOfBirth: this.dateOfBirth,
        oldOwnerFullName: this.shelterOwner,
        oldOwnerPhone: this.shelterPhone,
        oldOwnerAddress: this.shelterAddress,
        fullNameOfBreeder: this.shelterOwner,
        phoneOfBreeder: this.shelterPhone,
        parents,
        shelter: {
          id: this.shelterId,
        },
      };
      const pets = this.pets.map(pet => {
        const name = this.shelterTanslateName ? `${this.shelterTanslateName} ${pet.name}` : pet.name;
        return {
          ...pet, ...info, name, isApproved: true,
        };
      });
      const body = {
        amount: this.allSum,
        servicesData: [
          {
            serviceTypeId: 5,
            params: {
              comment: this.comment,
              pets,
              shelter: {
                id: this.shelterId,
                name: this.shelterName,
                owner: this.shelterOwner,
              },
              club: {
                id: this.clubId,
              },
              letter: this.letter,
            },
          },
        ],
      };
      if (this.akt) body.servicesData.push({ serviceTypeId: 13, params: {} });
      return body;
    },
    getPetsFemale(val) {
      this.$xhr.send(new Get('pet').setFilter([
        new Filter('isApproved', 'bool', true),
        new Filter('name', 'like', val),
        new Filter('shelter.id', 'eq', this.shelter),
        new Filter('gender.id', 'eq', 2),
      ]))
        .then(res => {
          this.petsFemale = res.data.data.result;
        });
    },
    getPetsMale(val) {
      this.$xhr.send(new Get('pet').setFilter([
        new Filter('isApproved', 'bool', true),
        new Filter('name', 'like', val),
        new Filter('shelter.id', 'eq', this.shelter),
        new Filter('gender.id', 'eq', 1),
      ]))
        .then(res => {
          this.petsMale = res.data.data.result;
        });
    },
    send() {
      const info = {
        isApproved: 1,
        letter: this.letter,
        fullNameOfOwner: this.shelterOwner,
        breedingNumberIndex: { id: 1, name: 'LO' },
        dateOfBirth: this.dateOfBirth,
        shelter: { id: this.shelter },
      };
      const petsReq = this.pets.map(pet => {
        const data = { ...pet, ...info };
        return this.$xhr.send(new Post('pet').setData(data));
      });
      Promise.all(petsReq).then(result => {
        const petsId = result.map(el => ({ id: el.data.data.created }));
        this.$xhr.send(new Post('entry').setData({ status: { id: 1 }, pets: petsId, comment: this.comment }));
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.skeleton-padding
  padding-bottom: 60px
.akt-block
  padding-top: 40px
.pred
  font-size: 16px;
  color: $red-secondary;
  margin-top: 20px
</style>
