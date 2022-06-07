<template>
  <div>
    <PersonalAreaHeader title="Мой питомец" />
    <PetCardInformation
      v-if="isManufacturer"
      :src="photo"
      :titles="titles"
      :name="name"
      :shelter="shelterTanslateName"
    />
    <SkeletonMain title="Основные данные">
      <template #fields>
        <!--        <SimpleInput
          label="Питомник"
          :value="и"
        />-->
        <SimpleInput
          v-model="name"
          label="Кличка"
          :disabled="editable"
        />
        <SelectInput
          v-model="gender"
          label="Пол"
          label-option="name"
          :options="genders"
          :disabled="editable"
        />
        <SimpleInput
          label="Дата рождения питомца"
          :value="dateOfBirth"
          disabled
        />
        <SimpleInput
          label="Код породы"
          :value="breed"
          disabled
        />
        <SelectInput
          v-model="color"
          label="Код окраса"
          label-option="code"
          :options="colors"
          :disabled="editable"
        />
        <SwitcherField
          v-model="isManufacturer"
          label="Производитель"
          class="switcher"
          @change="changeManufacturer"
        />
      </template>
    </SkeletonMain>
    <SkeletonMain
      title="Регистрационные данные"
      class="pb"
    >
      <template #fields>
        <SimpleInput
          label="Рег. номер"
          :value="breedingNumber"
          disabled
        />
        <SimpleInput
          label="Старый рег. номер"
          :value="oldNumber"
          disabled
        />
        <SimpleInput
          v-model="chipNumber"
          label="Номер чипа"
          :disabled="editable"
        />

        <SimpleInput
          label="Отец"
          :value="(father[0] || {}).name"
          disabled
        />
        <SimpleInput
          label="Мать"
          :value="(mather[0] || {}).name"
          disabled
        />
        <SimpleInput
          label="Заводчик"
          :value="fullNameOfBreeder"
          disabled
        />
        <SimpleInput
          label="Владелец"
          :value="fullNameOfOwner"
          disabled
        />
        <SimpleInput
          label="Клуб"
          :value="clubName"
          disabled
        />
      </template>
    </SkeletonMain>
    <div class="edit-btn-wrap">
      <div class="semi-container">
        <ButtonMain
          :disable="!editable"
          text="Редактировать"
          @click="modalWarningEditPetOpen"
        />
      </div>
    </div>
    <SkeletonMain
      class="padding-bottom"
      title="Документы"
      text="Выберите документы, которые хотите скачать, отметив их галочкой.
Внесите оплату за выбранные документы. После проведения оплаты вы сможете скачать их.
Обратите внимание на то, что после подтверждения оплаты документы можно будет скачать только 1 раз"
    >
      <template #fields>
        <DownloadDocksTable
          :key="editable"
          v-model="documents"
          :is-disabled="!editable"
          :costs="costs"
          :titles="titles"
          :letter="letter"
          :get-status-files="getStatusFiles"
          class="table"
          :payment-documents="paymentDocuments"
          @chenge:transfer="transfer"
        />
      </template>
    </SkeletonMain>
    <ContributionBlock
      title="Целевой взнос за документы"
      :sum="sum"
      :load-payment="loadPayment"
      :url="url"
      bonus-payment
      @click="pay"
      @bonuses="writeOffBonuses"
    />
    <Modal
      v-if="!!modalStatus"
      @close:modal="closeModal"
    >
      <template #body>
        <ValidationObserver
          ref="observer"
          tag="div"
        >
          <SkeletonMain
            title="Данные нового владельца"
            class="modal__skeleton"
          >
            <template #fields>
              <ValidationProvider
                v-slot="{errors}"
                name="Name"
                rules="required"
              >
                <SimpleInput
                  v-model="transfer.newOwner"
                  label="ФИО"
                  :invalid="errors"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors}"
                name="Phone"
                rules="required"
              >
                <SimpleInput
                  v-model="transfer.newPhone"
                  v-mask="'+7 (###) ###-##-##'"
                  placeholder="+7 (_ _ _)  _ _ _ - _ _ - _ _"
                  label="Телефон"
                  :invalid="errors"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{errors}"
                name="Address"
                rules="required"
              >
                <SimpleInput
                  v-model="transfer.newAddress"
                  label="Адрес"
                  :invalid="errors"
                />
              </ValidationProvider>

              <SelectInput
                v-model="transfer.newShelter"
                label="Питомник"
                :options="shelters"
                label-option="name"
              />
              <ValidationProvider
                v-slot="{errors}"
                name="Email"
                rules="required"
              >
                <SimpleInput
                  v-model="transfer.newEmail"
                  label="Email"
                  :invalid="errors"
                  error-message="Документы будут отправлены на email новому владельцу"
                />
              </ValidationProvider>
              <SimpleInput
                v-model="chipNumber"
                label="Номер чипа"
                :disabled="blockedChipNumber"
              />
            </template>
          </SkeletonMain>
          <div class="modal-buttons">
            <ButtonMain
              text="Подтвердить"
              class="modal-buttons__btn"
              :disable="!email && !transfer.newShelter"
              @click="addOwner"
            />
            <ButtonMain
              text="Отменить"
              class="modal-buttons__btn"
              light
              @click="closeModal"
            />
          </div>
        </ValidationObserver>
      </template>
    </Modal>
    <Modal
      v-if="modalWarningEditPet"
    >
      <template #body>
        <ModalWarningEditBody
          @modal:close="closeModals"
          @modal:confirm="editData"
        />
      </template>
    </Modal>
  </div>
</template>
<script>
import {
  Get, Filter, Simple, Put,
} from 'core-xhr';
import { mask } from 'vue-the-mask';
import Modal from '@/components/main/Modal';
import ButtonMain from '@/components/UI/blocks/ButtonMain';
import SelectInput from '@/components/UI/fields/SelectInput';
import PetCardInformation from '@/components/blocks/PetCardInformation';
import { mapState } from 'vuex';
import DownloadDocksTable from '~/components/blocks/DownloadDocksTable';
import PersonalAreaHeader from '~/components/blocks/PersonalAreaHeader';
import SkeletonMain from '~/components/forms/SkeletonMain';
import SimpleInput from '~/components/UI/fields/SimpleInput';
import SwitcherField from '~/components/UI/fields/SwitcherField';
import ContributionBlock from '~/components/blocks/ContributionBlock';
import ModalWarningEditBody from '~/components/blocks/modal-content/ModalWarningEditBody';
import { eventBus } from '~/utils/eventBus';

export default {
  name: 'Id',
  directives: {
    mask,
  },
  components: {
    PersonalAreaHeader,
    SkeletonMain,
    SimpleInput,
    SwitcherField,
    DownloadDocksTable,
    ContributionBlock,
    Modal,
    ButtonMain,
    SelectInput,
    PetCardInformation,
    ModalWarningEditBody,
  },
  async asyncData({ app: { $xhr }, route }) {
    const { id } = route.params;
    try {
      const allResults = await Promise
        .all([
          $xhr.send(new Get('pet').entity().addFilter(new Filter('id', 'eq', id))),
          $xhr.send(new Get('sum')),
          $xhr.send(new Get('shelter').collection()),
        ]);
      const { result } = allResults[0].data.data;
      const costs = allResults[1].data.data.result;
      costs.sort((a, b) => {
        if (a.serviceType.type > b.serviceType.type) {
          return 1;
        }
        if (a.serviceType.type < b.serviceType.type) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
      const genders = await $xhr.send(new Get('gender'));
      const colors = await $xhr.send(new Get('color').limitShown(1000));
      return {
        name: result.name,
        gender: result.gender,
        dateOfBirth: result.dateOfBirth,
        id: result.id,
        color: result.color,
        breed: (result.breed || {}).code,
        isManufacturer: result.isManufacturer,
        breedingNumber: result.breedingNumber,
        fullNameOfOwner: result.fullNameOfOwner,
        fullNameOfBreeder: result.fullNameOfBreeder,
        parents: result.parents,
        photo: result.photo,
        letter: result.letter,
        oldNumber: result.oldNumber,
        chipNumber: result.chipNumber,
        costs,
        titles: result.titles,
        shelters: allResults[2].data.data.result,
        genders: genders.data.data.result,
        colors: colors.data.data.result,
      };
    } catch (e) {
      console.error(e);
    }
  },
  data() {
    return {
      name: null,
      genders: [],
      gender: null,
      dateOfBirth: null,
      colors: [],
      color: null,
      breed: null,
      isManufacturer: null,
      breedingNumber: null,
      oldNumber: null,
      chipNumber: null,
      letter: null,
      titles: [],
      shelters: [],
      fullNameOfOwner: null,
      fullNameOfBreeder: null,
      parents: [],
      photo: null,
      costs: [],
      documents: [],
      transfer: {
        newOwner: null,
        newPhone: null,
        newAddress: null,
        newShelter: null,
        newEmail: null,
      },
      id: null,
      paymentDocuments: [],

      transferServiceTypeId: null,
      loadPayment: false,
      url: '',
      editable: true,
      blockedChipNumber: true,
    };
  },
  computed: {
    modalStatus() {
      return (this.$store.getters['modal/getModalStatus']('transfer') || {}).status;
    },
    modalWarningEditPet() {
      return (this.$store.getters['modal/getModalStatus']('modalWarningEditPet') || {}).status;
    },
    sum() {
      return this.documents.reduce((acc, el) => acc + el.cost, 0);
    },
    ...mapState({
      shelterOwner: state => state.user.shelter.owner,
      shelterName: state => state.user.shelter.name,
      shelterId: state => state.user.shelter.id,
      clubName: state => state.user.shelter.clubName,
    }),
    email() {
      return this.$store.getters['user/getUser'].shelter.email;
    },
    petID() {
      return this.$route.params.id;
    },
    shelterTanslateName() {
      return this.$store.getters['user/getUser'].shelter.translatedName;
    },
    mather() {
      return this.parents.filter(n => n.gender.id === 2);
    },
    father() {
      return this.parents.filter(n => n.gender.id === 1);
    },
  },
  mounted() {
    eventBus.$on('chenge:transfer', payload => {
      this.transferServiceTypeId = payload.id;
      this.transferModal(payload.value);
    });
    eventBus.$on('chenge:photo', payload => {
      this.photo = payload;
    });
    this.getStatusFiles();
    this.$socket.subscribe('App\\Entity\\Payment', this.getStatusFiles);
    // this.$socket.subscribe('pp\\Entity\\DocumentRequest', this.getStatusFiles);
    if (!this.chipNumber) {
      this.blockedChipNumber = false;
    }
  },
  destroyed() {
    this.$socket.unsubscribe('App\\Entity\\Payment', this.getStatusFiles);
    // this.$socket.unsubscribe('pp\\Entity\\DocumentRequest', this.getStatusFiles);
  },
  methods: {
    async getStatusFiles() {
      try {
        const result = await this.$xhr.send(new Get('documentRequest').addFilter(new Filter('petId', 'eq', this.petID)));
        this.paymentDocuments = result.data.data.result;
      } catch (e) {
        this.$notify({
          text: e.message || 'Произошла ошибка',
          type: 'error',
        });
      }
    },
    async addOwner() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return false;
      this.documents.forEach(el => {
        if (el.serviceTypeId === 4 || el.serviceTypeId === 9) {
          el.newOwner = this.transfer.newOwner;
          el.newPhone = this.transfer.newPhone;
          el.newAddress = this.transfer.newAddress;
          el.email = this.transfer.newAddress;
          el.newShelter = this.transfer.newShelter?.id || this.shelterId;
        }
      });
      this.$store.dispatch('modal/close');
    },
    async changeManufacturer() {
      this.$xhr.send(new Put('pet-isManufacturer').entity()
        .addFilter(new Filter('id', 'eq', this.petID))
        .setData({ isManufacturer: this.isManufacturer }))
        .catch(e => {
          this.$notify({
            text: e.message || 'Произошла ошибка',
            type: 'error',
          });
        });
    },
    transferModal(val) {
      if (val) {
        this.$store.dispatch('modal/open', 'transfer');
      }
    },
    modalWarningEditPetOpen() {
      this.$store.dispatch('modal/open', 'modalWarningEditPet');
    },
    closeModals() {
      this.$store.dispatch('modal/close');
    },
    closeModal() {
      this.newOwner = null;
      this.newPhone = null;
      this.newAddress = null;
      this.$store.dispatch('modal/close');
      eventBus.$emit('chenge:transfer', { id: this.transferServiceTypeId, value: false });
    },
    async writeOffBonuses() {
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
      const body = this.setBodyData();
      try {
        this.loadPayment = true;
        const pay = await this.$xhr.send((new Simple('/api/tinkoff/create_payment',
          body,
          'POST')).authorization());
        if (pay.data.success) {
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
    setBodyData() {
      const servicesData = this.documents.map(el => ({
        serviceTypeId: el.serviceTypeId,
        params: {
          transfer: this.transfer,
          editedData: {
            name: this.name,
            color: this.color,
            gender: this.gender,
            chipNumber: this.chipNumber,
          },
          petId: this.petID,
        },
      }));
      return {
        amount: this.sum,
        servicesData,
      };
    },
    editData() {
      const cost = this.costs.find(el => el.serviceType.id === 19);
      this.documents = [{
        cost: cost.cost,
        serviceTypeId: cost.serviceType.id,
      }];
      this.editable = false;
      this.closeModals();
    },
  },
};
</script>

<style scoped lang="stylus">
.switcher
  padding-top: 18px
.table
  grid-column span 3
.padding-bottom
  padding-bottom: 60px;
.modal-buttons
  display grid
  grid-template-columns 1fr
  justify-content center
  margin-top: 20px
  gap 20px
  @media screen and (min-width: 550px)
    margin-top: 40px
    grid-template-columns repeat(2, minmax(200px, min-content))
.modal >>>
  @media screen and (min-width: $tablet)
    height: 415px;
  .semi-title
    text-align: center;
  .skeleton-main
    padding-top: 20px
    &__container
      padding: 0;
.edit-btn-wrap
  background: $white-main
  padding: 46px 0 0;
</style>
