<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :multiple-search="['pet.shelter.name', 'pet.name']"
      filter-type="multiple"
      @item-click="openPet($event)"
    >
      <template v-slot:filters>
        <RelationFilter
          :default-value="{status: 'В ожидании', id: 1}"
          entity="moderation-status"
          no-deleted-filter
          active
          label="Модерация"
          item-text="status"
          name="moderationStatus.id"
        />
        <DateFilter
          range
          label="Дата заявки"
          name="createdAt"
        />
      </template>
      <template v-slot:actions="{headers}">
        <ColumnToggler :headers="headers"/>
      </template>
      <template v-slot:columns>
        <TextColumn field="id"/>
        <RelationColumn field="pet.name"/>
        <RelationColumn field="incomingParams.transfer.newShelter.name"/>
        <DateColumn field="createdAt"/>
        <SlotColumn
          v-slot="{ item }"
          field="moderationStatus"
        >
          <SimpleSwitch
            :disabled="(item.moderationStatus.id === 2) || changePetProcess"
            :value="item.moderationStatus.id === 2"
            @click.stop="changeExistingPet(item)"
          />
        </SlotColumn>
      </template>
    </DynamicListing>
  </div>
</template>

<script>
import { Filter, Get, Put } from 'core-xhr';

export default {
  validate({ store }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Заявки на родословную',
  },
  name: 'PedigreeApplications',
  data() {
    return {
      request: new Get('applications')
        .collection()
        .addFilter(new Filter({
          field: 'deletedAt',
          filter: 'exists',
          value: false,
          mandatory: true,
        }))
        .pagination(true)
        .count(true)
        .limitStart(0)
        .limitShown(50),
      headers: [
        { name: 'Номер', field: 'id', space: '200px' },
        { name: 'Кличка', field: 'pet.name', space: '200px' },
        { name: 'Питомник', field: 'incomingParams.transfer.newShelter.name', space: '200px' },
        { name: 'Дата заявки', field: 'createdAt', space: '200px' },
        { name: 'Выдана', field: 'moderationStatus', space: '200px' },
      ],
      changePetProcess: false,
    };
  },
  methods: {
    openPet({ pet }) {
      if (!this.changePetProcess) {
        this.$router.push({ name: 'pets-id', params: { id: pet.id } });
      }
    },
    async changeExistingPet(item) {
      if (this.checkWasModerated(item.moderationStatus)) return;

      this.changePetProcess = true;

      const existingData = await this.$xhr
        .send(new Get('pet').entity().addFilter(new Filter('id', 'eq', item.pet.id)))
        .then(res => res.data?.data?.result)
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
      const newData = item.incomingParams.transfer;

      const entityRequest = new Put('pet').entity().addFilter(new Filter('id', 'eq', item.pet.id));
      const data = {
        fullNameOfOwner: newData.newOwner,
        phoneOfOwner: newData.newPhone,
        addressOfOwner: newData.newAddress,
        shelter: newData.newShelter,
        oldOwnerFullName: existingData.fullNameOfOwner,
        oldOwnerPhone: existingData.phoneOfOwner,
        oldOwnerAddress: existingData.addressOfOwner,
        oldShelter: existingData.shelter,
        isApproved: true,
      };
      this.savePet(entityRequest, data)
        .then(() => {
          this.$store.dispatch('snack/notify', 'Данные питомца изменены.');
          return this.changeApplication(2, item.id, item.moderationStatus);
        })
        .then(() => {
          this.$store.dispatch('snack/notify', 'Статус заявки - принята.');
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        })
        .finally(() => {
          this.changePetProcess = false;
        });
    },
    checkWasModerated(moderationStatus) {
      if (moderationStatus.id !== 1) {
        this.$store.dispatch('snack/error', 'Данная заявка уже была обработана!');
        return true;
      }
      return false;
    },
    async changeApplication(newStatusId, applicationId, moderationStatus) {
      if (moderationStatus.id !== newStatusId) {
        const data = {
          moderationStatus: { id: newStatusId },
        };
        const request = new Put('application').entity().addFilter(new Filter('id', 'eq', applicationId))
          .setData(data);
        const res = await this.$xhr.send(request);
        return res;
      }
    },
    async savePet(entityRequest, data) {
      this.$store.dispatch('snack/notify', 'Подождите...');
      const request = entityRequest.setData(data);
      const res = await this.$xhr.send(request);
      return res.data?.data?.updated || null;
    },
  },
};
</script>
