<template>
  <div>
    <PersonalAreaHeader title="Заявка на выставку" />
    <client-only>
      <ValidationObserver
        ref="observer"
        tag="div"
      >
        <SkeletonMain title="Организационные данные">
          <template #fields>
            <ValidationProvider
              v-slot="{errors}"
              name="Date"
              rules="required"
            >
              <DateInput
                v-model="params.dateOfThe"
                label="Дата проведения"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Location"
              rules="required"
            >
              <SimpleInput
                v-model="params.location"
                label="Место проведения"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Club"
              rules="required"
            >
              <SelectInput
                v-model="params.clubOrganizer"
                label="Клуб-организатор"
                :invalid="errors"
                :options="clubs"
                label-option="name"
              />
            </ValidationProvider>
          </template>
        </SkeletonMain>
        <SkeletonMain title="Общие данные">
          <template #fields>
            <ValidationProvider
              v-slot="{errors}"
              name="Name"
              rules="required"
            >
              <SimpleInput
                v-model="params.name"
                label="Кличка"
                :invalid="errors"
                info="В этом поле должна быть указана только кличка
          питомца (без приставок с названием питомника или какими-либо регалиями)"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Date of breed"
              rules="required"
            >
              <DateInput
                v-model="params.dateOfBirth"
                label="Дата рождения"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Sex"
              rules="required"
            >
              <SelectInput
                v-model="params.gender"
                label="Пол"
                :invalid="errors"
                :options="genders"
                label-option="name"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Code"
              rules="required"
            >
              <SelectInput
                v-model="params.breed"
                label="Код породы"
                :invalid="errors"
                :options="breeders"
                label-option="code"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Color"
              rules="required"
            >
              <SelectInput
                v-model="params.color"
                label="Код окраса"
                :invalid="errors"
                :options="colors"
                label-option="code"
              />
            </ValidationProvider>
          </template>
        </SkeletonMain>
        <SkeletonMain title="Выставочные титулы">
          <template #fields>
            <SelectInput
              v-model="params.titleOne"
              :options="titles"
              label-option="name"
              label="Титул 1"
            />
            <SelectInput
              v-model="params.titleTwo"
              :options="titles"
              label-option="name"
              label="Титул 2"
            />
            <SelectInput
              v-model="params.titleTree"
              :options="titles"
              label-option="name"
              label="Титул 3"
            />
            <SelectInput
              v-model="params.titleFour"
              :options="titles"
              label-option="name"
              label="Титул 4"
            />
          </template>
        </SkeletonMain>
        <SkeletonMain
          title="Данные родителей"
          class="skeleton-padding"
        >
          <template #fields>
            <SimpleInput
              v-model="params.fatherName"
              label="Кличка отца"
              info="В этом поле должна быть указана только кличка
          питомца (без приставок с названием питомника или какими-либо регалиями)"
            />
            <SimpleInput
              v-model="params.matherName"
              label="Кличка матери"
              info="В этом поле должна быть указана только кличка
          питомца (без приставок с названием питомника или какими-либо регалиями)"
            />
          </template>
        </SkeletonMain>
        <SkeletonMain
          title="Данные заводчика"
          class="gray-bg"
        >
          <template #fields>
            <SimpleInput
              v-model="params.breederSurname"
              label="Фамилия"
            />
            <SimpleInput
              v-model="params.breederName"
              label="Имя"
            />
            <SimpleInput
              v-model="params.breederPatronymic"
              label="Отчество"
            />
          </template>
        </SkeletonMain>
        <SkeletonMain
          title="Данные владельца"
          class="gray-bg"
        >
          <template #fields>
            <SimpleInput
              v-model="params.ownerSurname"
              label="Фамилия"
            />
            <SimpleInput
              v-model="params.ownerName"
              label="Имя"
            />
            <SimpleInput
              v-model="params.ownerPatronymic"
              label="Отчество"
            />
            <SimpleInput
              v-model="params.ownerPhone"
              v-mask="'+7 (###) ###-##-##'"
              label="Номер телефона"
              placeholder="+7 (_ _ _)  _ _ _ - _ _ - _ _"
            />
            <SimpleInput
              v-model="params.ownerEmail"
              label="Email"
            />
          </template>
        </SkeletonMain>
        <CommentBlock
          v-model="params.comment"
          class="comment"
        />
      </ValidationObserver>
    </client-only>
    <ContributionBlock
      title="Целевой выставочный взнос"
      :sum="sum"
      class="white-bg"
      :annotation="annotation"
      :url="url"
      :load-payment="loadPayment"
      bonus-payment
      @click="pay"
      @bonuses="writeOffBonuses"
    />
  </div>
</template>

<script>
import PersonalAreaHeader from '@/components/blocks/PersonalAreaHeader';
import SimpleInput from '@/components/UI/fields/SimpleInput';
import DateInput from '@/components/UI/fields/DateInput';
import SelectInput from '@/components/UI/fields/SelectInput';
import CommentBlock from '@/components/blocks/CommentBlock';
import ContributionBlock from '@/components/blocks/ContributionBlock';
import { Filter, Get, Simple } from 'core-xhr';
import { mask } from 'vue-the-mask';
import SkeletonMain from '~/components/forms/SkeletonMain';

const classesName = [
  { name: 'Класс 0 – Не участвую' },
  { name: 'Класс 1 CACM – Чемпион Мира' },
  { name: 'Класс 2 CAPM – Премиор Мира' },
  { name: 'Класс 3 СHR – Чемпион России' },
  { name: 'Класс 4 PRR – Премиор России' },
  { name: 'Класс 5 CAGCE – Большой Континентальный Чемпион' },
  { name: 'Класс 6 CAGРE – Большой Континентальный Премиор' },
  { name: 'Класс 7 CACE – Континентальный Чемпион' },
  { name: 'Класс 8 CAРE –  Континентальный Премиор' },
  { name: 'Класс 9 CAGCIB – Большой Международный Чемпион' },
  { name: 'Класс 10 CAGРIB – Большой Международный Премиор' },
  { name: 'Класс 11 CACIB – Международный Чемпион' },
  { name: 'Класс 12 CAPIB – Большой Международный Премиор' },
  { name: 'Класс 13 CAC - Открытый класс Чемпионов (начиная с 10 месяцев)' },
  { name: 'Класс 14 CAP - Открытый класс Премиоров (начиная с 10 месяцев)' },
  { name: 'Класс 15 CACJ - Юниор 6-10 месяцев' },
  { name: 'Класс 15а CAPJ - Кастрированный юниор 6-10 месяцев' },
  { name: 'Класс 16 CACP - Котенок  3-6 месяцев' },
  { name: 'Класс 16а CAPP – Кастрированный Котенок  3-6 месяцев' },
  { name: 'Класс 17 NOV-Новички' },
  { name: 'Класс 19 HHP- Домашний питомец' },
  { name: 'Класс 20 Litter - Класс пометов (3-6 месяцев)' },
  { name: 'Класс 21 Vet- Класс ветеранов (старше 8 лет)' },
  { name: 'Класс 26 Рекламный класс' },
];

const annotation = `<p>После отправки заполненной формы вам необходимо оплатить целевой взнос.</p>
<p>Обращаем ваше внимание, в случае неявки экспонента на выставку и в случае не прохождения ветеринарного контроля
хотя бы одним животным данного владельца целевой взнос не возвращается.</p>
<p>В случае отмены выставки Организатором, целевой выставочный взнос возвращается в полном объеме,
в случае переноса выставки – переносится на другие даты.</p>
<p>Отправляя форму, вы соглашаетесь с <a href="#">Политикой обработки персональных данных</a> <br>
Информация о <a href="#">Способах оплаты</a> <br>
Информация о <a href="#">Возврате</a></p>`;

export default {
  name: 'Index',
  components: {
    PersonalAreaHeader,
    SkeletonMain,
    SimpleInput,
    DateInput,
    SelectInput,
    CommentBlock,
    ContributionBlock,
  },
  directives: {
    mask,
  },
  async asyncData({ app: { $xhr } }) {
    try {
      const genders = await $xhr.send(new Get('gender'));
      /* const breeders = await $xhr.send(new Get('breed'));
      const colors = await $xhr.send(new Get('color')); */
      const clubs = await $xhr.send(new Get('clubs'));
      // const titles = await $xhr.send(new Get('titles'));
      const sum = await $xhr.send(new Get('sum').entity().addFilter(new Filter('id', 'eq', 12)));
      return {
        genders: genders.data.data.result,
        /* breeders: breeders.data.data.result,
        colors: colors.data.data.result, */
        clubs: clubs.data.data.result,
        // titles: titles.data.data.result,
        sum: sum.data.data.result.cost,
      };
    } catch (e) {
      console.error(e);
    }
  },
  data() {
    return {
      genders: [],
      breeders: [],
      colors: [],
      clubs: [],
      titles: classesName,
      annotation,
      params: {
        location: null,
        dateOfThe: null,
        clubOrganizer: null,
        name: null,
        dateOfBirth: null,
        gender: null,
        breed: null,
        color: null,
        titleOne: null,
        titleTwo: null,
        titleTree: null,
        titleFour: null,
        matherName: null,
        fatherName: null,
        breederSurname: null,
        breederName: null,
        breederPatronymic: null,
        ownerSurname: null,
        ownerName: null,
        ownerPatronymic: null,
        ownerPhone: null,
        ownerEmail: null,
        comment: null,
      },
      sum: null,
      loadPayment: false,
      url: '',
    };
  },
  computed: {
    shelterName() {
      return this.$store.getters['user/getUser'].shelter.name;
    },
    clubName() {
      return this.$store.getters['user/getUser'].shelter.clubName;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const breeders = await this.$xhr.send(new Get('breed').limitShown(1000));
        const colors = await this.$xhr.send(new Get('color').limitShown(1000));

        this.breeders = breeders.data.data.result;
        this.colors = colors.data.data.result;
      } catch (e) {
        this.$notify({
          text: e.message || 'Произошла ошибка',
          type: 'error',
        });
      }
    },
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
      const body = this.setBodyData();
      try {
        this.loadPayment = true;
        const pay = await this.$xhr.send((new Simple('/api/tinkoff/create_payment', body, /* {
          amount: this.sum,
          serviceTypeIds: [12],
          params: {
            information: this.params,
          },
          shelterName: this.shelterName,
          clubName: this.clubName,
        } */
          'POST')).authorization());
        if (pay.data.success) {
          // openTargetBlank(pay.data.result.url);
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
      return {
        amount: this.sum,
        servicesData: [
          {
            serviceTypeId: 12,
            params: {
              ...this.params,
              shelterName: this.shelterName,
              clubName: this.clubName,
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
.skeleton-padding
  padding-bottom: 65px;
.gray-bg
  background: $grey-1;
  >>> input
    background: $white-main;
.white-bg
  background: $white-main;
.comment
  margin-bottom: 65px
>>>
.el-select-dropdown__item
  white-space: normal;

</style>
