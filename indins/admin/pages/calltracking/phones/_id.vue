<template>
  <FormPopup
    :title="dialogTitle"
    :close-route-to="closeRoute"
    value
    width="860"
    @click:confirm="save($event)"
  >
    <v-row no-gutters>
      <v-col cols="4">
        <SimpleText
          v-model="phone.virtualPhone"
          label="Виртуальный телефон"
          name="virtual-phone"
          required
        />
      </v-col>
      <v-col cols="4">
        <SimpleText
          v-model="phone.referrer"
          label="referrer"
          name="referrer"
          required
        />
      </v-col>

      <v-col cols="4">
        <SimpleText
          v-model="phone.URI"
          label="Страница входа"
          name="uri"
          required
        />
      </v-col>
      <v-col cols="4">
        <SimpleText
          v-model="phone.UTMSource"
          label="UTMSource"
          name="utm"
          required
        />
      </v-col>
      <v-col cols="4">
        <SimpleText
          v-model="phone.UTMContent"
          label="UTMContent"
          name="utm-content"
          required
        />
      </v-col>
      <v-col cols="4">
        <SimpleText
          v-model="phone.UTMMedium"
          label="UTMMedium"
          name="utm-medium"
          required
        />
      </v-col>
      <v-col cols="4">
        <SimpleText
          v-model="phone.UTMCampaign"
          label="UTMCampaign"
          name="utm-campaign"
          required
        />
      </v-col>
      <v-col cols="4">
        <SimpleText
          v-model="phone.UTMTerm"
          label="UTMTerm"
          name="utn-term"
          required
        />
      </v-col>
      <v-col cols="4">
        <SimpleText
          v-model="phone.UTMKeyword"
          label="UTMKeyword"
          name="utm-keyword"
          required
        />
      </v-col>
    </v-row>
    <SimpleText
      v-model="phone.UTMFastLink"
      label="UTMFastLink"
      name="utm-fast-link"
      required
    />
  </FormPopup>
</template>

<script>
import {
  Filter, Get, Post, Put,
} from 'core-xhr';

export default {
  name: 'CalltrackingPhonesId',
  async asyncData({ app: { $xhr }, route, error }) {
    const { id } = route.params;
    if (id === 'add') {
      return {};
    }
    const data = await $xhr.send(
      new Get('calltracking_phones').entity().addFilter(new Filter('id', 'eq', id)),
    ).then(response => response.data.data.result)
      .catch(reason => {
        console.error(reason);
        error(reason.message || reason.error);
      });
    if (data.length === 0) {
      error(404);
    }
    const {
      virtualPhone, referrer, URI, UTMSource, UTMContent, UTMMedium, UTMCampaign, UTMTerm, UTMKeyword, UTMFastLink,
    } = data;
    return {
      phone: {
        virtualPhone,
        referrer,
        URI,
        UTMSource,
        UTMContent,
        UTMMedium,
        UTMCampaign,
        UTMTerm,
        UTMKeyword,
        UTMFastLink,
      },
    };
  },
  data() {
    return {
      phone: {},
    };
  },
  computed: {
    isAddPage() {
      return this.$route.params.id === 'add';
    },
    dialogTitle() {
      return this.$route.params.id === 'add' ? 'Добавление' : 'Редактирование';
    },
    entityRequest() {
      return this.isAddPage
        ? new Post('calltracking_phones', this.phone).entity()
        : new Put('calltracking_phones', this.phone).entity()
          .addFilter(new Filter('id', 'eq', this.$route.params.id));
    },
    closeRoute() {
      return { name: 'calltracking-phones' };
    },
  },
  methods: {
    save(isValid) {
      if (!isValid) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      this.$store.dispatch('snack/notify', 'Подождите...');
      // noinspection JSUnresolvedVariable
      this.$xhr.send(
        this.entityRequest,
      )
        .then(() => {
          this.$store.dispatch('snack/notify', 'Сохранено');
          this.$router.push(this.closeRoute);
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
    },
  },
};
</script>
