<template>
  <div>
    <PersonalAreaHeader title="Добавление питомца" />
    <client-only>
      <ValidationObserver
        ref="observer"
        tag="div"
      >
        <SkeletonMain title="Основные данные">
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
                default-error-message="Внимание! Вводите кличку без названия питомника"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Gender"
              rules="required"
            >
              <SelectInput
                v-model="params.gender"
                label="Пол"
                label-option="name"
                :options="genders"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Date"
              rules="required"
            >
              <DateInput
                v-model="params.dateOfBirth"
                label="Дата рождения питомца"
                :invalid="errors"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{errors}"
              name="Breed"
              rules="required"
            >
              <SelectInput
                v-model="params.breed"
                label="Код породы"
                label-option="code"
                :options="breeders"
                :invalid="errors"
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
                label-option="code"
                :options="colors"
                :invalid="errors"
              />
            </ValidationProvider>

            <SwitcherField
              v-model="params.isManufacturer"
              label="Производитель"
              class="switcher"
            />
          </template>
        </SkeletonMain>
        <SkeletonMain
          title="Регистрационные поля"
          text="Заполнять только при наличии"
        >
          <template #fields>
            <SimpleInput
              v-model="params.oldNumber"
              label="Старый рег. номер"
            />
            <SimpleInput
              v-model="params.chipNumber"
              label="Номер чипа"
            />
          </template>
        </SkeletonMain>
        <SkeletonMain title="Данные заводчика">
          <template #fields>
            <SimpleInput
              v-model="params.fullNameOfBreeder"
              label="Фамилия Имя Отчество"
              class="long-input"
            />
            <SimpleInput
              v-model="params.phoneOfBreeder"
              v-mask="'+7 (###) ###-##-##'"
              label="Телефон заводчика"
              placeholder="+7 (_ _ _)  _ _ _ - _ _ - _ _"
            />
          </template>
        </SkeletonMain>
        <SkeletonMain
          title="Данные владельца"
        >
          <template #fields>
            <ValidationProvider
              v-slot="{errors}"
              name="Owner"
              rules="required"
              class="long-input"
            >
              <SimpleInput
                v-model="params.fullNameOfOwner"
                label="Фамилия Имя Отчество"
                class="long-input"
                :invalid="errors"
              />
            </ValidationProvider>
          </template>
        </SkeletonMain>
        <SkeletonMain
          title="Документы"
          class="skeleton-padding"
          text="Файлы должны быть в формате .dox, .jpeg, .pdf или .png.
            Максимально допустимый вес файла составляет 5 Mб."
        >
          <template #fields>
            <FileInput
              label="Родословная"
              @change="uploadFatherDocument"
            />
            <FileInput
              label="Сертификат"
              @change="uploadMatherDocument"
            />
          </template>
        </SkeletonMain>
      </ValidationObserver>
    </client-only>
    <ContributionBlock
      title="Целевой взнос за регистрацию питомца"
      :sum="sum"
      :url="url"
      :load-payment="loadPayment"
      bonus-payment
      @click="pay"
      @bonuses="writeOffBonuses"
    />
  </div>
</template>

<script>
import {
  Filter, Get, Simple,
} from 'core-xhr';
import { mask } from 'vue-the-mask';
import { mapState } from 'vuex';
import PersonalAreaHeader from '~/components/blocks/PersonalAreaHeader';
import SkeletonMain from '~/components/forms/SkeletonMain';
import SimpleInput from '~/components/UI/fields/SimpleInput';
import DateInput from '~/components/UI/fields/DateInput';
import SelectInput from '~/components/UI/fields/SelectInput';
import FileInput from '~/components/UI/fields/FileInput.vue';
import ContributionBlock from '~/components/blocks/ContributionBlock';
import SwitcherField from '~/components/UI/fields/SwitcherField';

export default {
  name: 'Index',
  directives: {
    mask,
  },
  components: {
    PersonalAreaHeader,
    SkeletonMain,
    SimpleInput,
    DateInput,
    ContributionBlock,
    SelectInput,
    SwitcherField,
    FileInput,
  },
  async asyncData({ app: { $xhr } }) {
    try {
      const genders = await $xhr.send(new Get('gender'));
      const breeders = await $xhr.send(new Get('breed'));
      const colors = await $xhr.send(new Get('color').limitShown(1000));
      const sum = await $xhr.send(new Get('sum').entity().addFilter(new Filter('serviceType.id', 'eq', 1)));
      return {
        genders: genders.data.data.result,
        breeders: breeders.data.data.result,
        colors: colors.data.data.result,
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
      color: null,
      sum: null,
      loadPayment: false,
      url: '',
      params: {
        name: null,
        gender: null,
        dateOfBirth: null,
        breed: null,
        color: null,
        isManufacturer: null,
        oldNumber: null,
        chipNumber: null,
        fullNameOfBreeder: null,
        phoneOfBreeder: null,
        fullNameOfOwner: null,
        files: [],
      },
    };
  },
  computed: {
    translatedName() {
      return this.$store.getters['user/getUser'].shelter.translatedName;
    },
    shelterBreederFullName() {
      return this.$store.getters['user/getUser'].shelter.owner.toUpperCase();
    },
    shelterBreederPhone() {
      return this.$store.getters['user/getUser'].shelter.phone;
    },
    shelterOwner() {
      return this.$store.getters['user/getUser'].shelter.owner.toUpperCase();
    },
    shelter() {
      return this.$store.getters['user/getUser'].shelter.id;
    },
    shelterUid() {
      return this.$store.getters['user/getUser'].uid;
    },
    clubName() {
      return this.$store.getters['user/getUser'].shelter.clubName;
    },
    ...mapState({
      clubId: state => state.user.shelter.clubId,
      shelterName: state => state.user.shelter.name,
      shelterId: state => state.user.shelter.id,
    }),
  },
  mounted() {
    this.params.fullNameOfBreeder = this.shelterBreederFullName;
    this.params.phoneOfBreeder = this.shelterBreederPhone;
  },
  methods: {
    uploadFatherDocument(val) {
      this.uploadFiles(val, 'Родословная Отца');
    },
    uploadMatherDocument(val) {
      this.uploadFiles(val, 'Родословная Матери');
    },
    async uploadFiles(val, name) {
      const maxSize = 10 * 1024 * 1024;
      const typeFiles = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!typeFiles.includes(val.type)) {
        this.$notify({
          text: 'Разрешенный формат изображений PDF, DOCX, JPEG, JPG, PNG',
          type: 'error',
        });
        return;
      }
      if (val.size > maxSize) {
        this.$notify({
          text: 'Файл превышает 10мб',
          type: 'error',
        });
        return;
      }
      const formData = new FormData();
      formData.append('file', val);
      formData.append('path', 'parents');
      try {
        this.$notify({
          text: 'Началась загрузка файла, дождитесь её окончания',
          type: 'success',
        });
        const result = await this.$axios.post(`${this.$config.rfoUrl}/image/reupload`, formData, {
          headers: {
            // Authorization: `Bearer ${this.$cookies.get('auth-token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        this.params.files.forEach((el, i) => {
          if (el.name === name) {
            this.params.files.splice(i, 1);
          }
        });
        this.params.files.push({
          url: result.data.path,
          name,
        });
        this.$notify({
          text: 'Файл загружен',
          type: 'success',
        });
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
      return {
        amount: this.sum,
        servicesData: [
          {
            serviceTypeId: 1,
            params: {
              ...this.params,
              shelter: {
                id: this.shelterId,
                name: this.shelterName,
              },
              club: {
                id: this.clubId,
                name: this.clubName,
              },
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
  padding-bottom: 60px
.long-input
  grid-column span 2
.switcher
  padding-top: 18px
</style>
