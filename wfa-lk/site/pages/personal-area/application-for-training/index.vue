<template>
  <div>
    <PersonalAreaHeader title="Заявка на обучение" />
    <client-only>
      <ValidationObserver
        ref="observer"
        tag="div"
      >
        <SkeletonMain
          title="Основные данные"
          class="padding"
        >
          <template #fields>
            <ValidationProvider
              v-slot="{errors}"
              name="surname"
              rules="required"
            >
              <SimpleInput
                v-model="params.surname"
                label="Фамилия"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="name"
              rules="required"
            >
              <SimpleInput
                v-model="params.name"
                label="Имя"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="patronymic"
              rules="required"
            >
              <SimpleInput
                v-model="params.patronymic"
                label="Отчество"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="breed"
              rules="required"
            >
              <SelectInput
                v-model="params.breed"
                label="Код породы, которой занимаюсь"
                label-option="code"
                :options="breeders"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="phone"
              rules="required"
            >
              <SimpleInput
                v-model="params.phone"
                v-mask="'+7 (###) ###-##-##'"
                label="Номер телефона"
                :invalid="errors"
                placeholder="+7 (_ _ _)  _ _ _ - _ _ - _ _"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Email"
              rules="required"
            >
              <SimpleInput
                v-model="params.email"
                label="Email"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="experience"
              rules="required"
            >
              <SimpleInput
                v-model="params.experience"
                label="Общий стаж разведения (в годах)"
                :invalid="errors"
              />
            </ValidationProvider>
          </template>
        </SkeletonMain>
        <SkeletonMain
          class="gray-bg padding"
          title="Дополнительные данные"
        >
          <template #fields>
            <CommentBlock
              v-model="params.courses"
              title="Пройденные фелинологические курсы"
              class="comment"
            />
            <CommentBlock
              v-model="params.comment"
              class="comment"
            />
          </template>
        </SkeletonMain>
        <SkeletonMain
          title="Перечень курсов"
          class="padding"
        >
          <template #fields>
            <TableLearn
              v-model="checkedItems"
              class="w-100"
              :learns="coasts"
            />
          </template>
        </SkeletonMain>
      </ValidationObserver>
    </client-only>
    <ContributionBlock
      title="Целевой взнос за обучение"
      :sum="amount"
      :load-payment="loadPayment"
      :url="url"
      class="white-bg"
      :annotation="annotation"
      bonus-payment
      @click="pay"
      @bonuses="writeOffBonuses"
    />
  </div>
</template>

<script>
import PersonalAreaHeader from '@/components/blocks/PersonalAreaHeader';
import SimpleInput from '@/components/UI/fields/SimpleInput';
import SelectInput from '@/components/UI/fields/SelectInput';
import CommentBlock from '@/components/blocks/CommentBlock';
import ContributionBlock from '@/components/blocks/ContributionBlock';
import TableLearn from '@/components/blocks/TableLearn';
import { Filter, Get, Simple } from 'core-xhr';
import { mask } from 'vue-the-mask';
import SkeletonMain from '~/components/forms/SkeletonMain';

const annotation = `<p>После отправки формы и оплаты целевого взноса,
вам будет отправлена ссылка для доступа к обучающим материалам.</p>
<p>Отправляя форму, вы соглашаетесь с <a href="#">Политикой обработки персональных данных</a> <br>
Информация о <a href="#">Способах оплаты</a> <br>
Информация о <a href="#">Возврате</a></p>`;

export default {
  name: 'Index',
  components: {
    PersonalAreaHeader,
    SkeletonMain,
    SimpleInput,
    SelectInput,
    CommentBlock,
    ContributionBlock,
    TableLearn,
  },
  directives: {
    mask,
  },
  async asyncData({ app: { $xhr } }) {
    const coasts = await $xhr.send(new Get('sum').addFilter(new Filter('serviceType.serviceTypeGroup.id', 'eq', 3)));
    const breeders = await $xhr.send(new Get('breed'));
    return {
      coasts: coasts.data.data.result,
      breeders: breeders.data.data.result,
    };
  },
  data() {
    return {
      coasts: [],
      annotation,
      breeders: null,
      params: {
        name: null,
        surname: null,
        breed: null,
        patronymic: null,
        experience: null,
        phone: null,
        email: null,
        courses: null,
        comment: null,
      },
      checkedItems: [],
      loadPayment: false,
      url: '',
    };
  },
  computed: {
    amount() {
      return this.checkedItems.reduce((acc, n) => (acc = n.cost + acc), 0);
    },
    shelterName() {
      return this.$store.getters['user/getUser'].shelter.name;
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
      const body = this.setBodyData();
      try {
        this.loadPayment = true;
        const pay = await this.$xhr.send((new Simple('/api/tinkoff/create_payment', body,
          /* {
          amount: this.amount,
          serviceTypeIds,
          petId: this.petID,
          params: {
            information: this.params,
            backPage: window.location.href,
          },
          shelterName: this.shelterName,
          clubName: this.clubName,
        } */ 'POST')).authorization());
        if (pay.data.success) {
          this.url = pay.data.result.url;
          this.loadPayment = false;
          this.$store.dispatch('modal/close');
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
      const servicesData = this.checkedItems.map(el => ({
        serviceTypeId: el.serviceTypeId,
        params: {
          ...this.params,
          shelterName: this.shelterName,
          clubName: this.clubName,
        },
      }));
      return {
        amount: this.amount,
        servicesData,
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
.comment
  grid-column span 3
  margin-top: 0
.w-100
  grid-column span 3
  margin-top: 0
.gray-bg
  background: $grey-1;
.padding
  padding-bottom: 65px
</style>
