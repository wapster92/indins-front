<template>
  <FormPopup
    :title="`Обращение #${$route.params.id}`"
    :close-route-to="closeRoute"
    value
    hide-popup
    width="600"
    hide-buttons
  >
    <div class="appears-table">
      <v-row
        no-gutters
        class="px-2"
      >
        <v-col cols="7">
          Тип
        </v-col>
        <v-col cols="5">
          {{ name }}
        </v-col>
        <v-col cols="7">
          Телефон
        </v-col>
        <v-col cols="5">
          {{ phone }}
        </v-col>
        <v-col cols="7">
          URI
        </v-col>
        <v-col cols="5">
          {{ session.URI }}
        </v-col>
        <v-col cols="7">
          UTMCampaign
        </v-col>
        <v-col cols="5">
          {{ session.UTMCampaign }}
        </v-col>
        <v-col cols="7">
          UTMContent
        </v-col>
        <v-col cols="5">
          {{ session.UTMContent }}
        </v-col>
        <v-col cols="7">
          UTMFastLink
        </v-col>
        <v-col cols="5">
          {{ session.UTMFastLink }}
        </v-col>
        <v-col cols="7">
          UTMKeyword
        </v-col>
        <v-col cols="5">
          {{ session.UTMKeyword }}
        </v-col>
        <v-col cols="7">
          UTMMedium
        </v-col>
        <v-col cols="5">
          {{ session.UTMMedium }}
        </v-col>
        <v-col cols="7">
          UTMSource
        </v-col>
        <v-col cols="5">
          {{ session.UTMSource }}
        </v-col>
        <v-col cols="7">
          UTMTerm
        </v-col>
        <v-col cols="5">
          {{ session.UTMTerm }}
        </v-col>
        <v-col
          v-if="call && call.duration !== ''"
          cols="12"
        >
          <v-row no-gutters>
            <v-col cols="7">
              Продолжительность
            </v-col>
            <v-col cols="5">
              {{ Math.floor(call.duration / 1000000) }} сек
            </v-col>

            <v-col cols="7">
              Телефон звонящего
            </v-col>
            <v-col cols="5">
              {{ call.visitorPhone }}
            </v-col>

            <v-col cols="7">
              Телефон принимающего
            </v-col>
            <v-col cols="5">
              {{ call.virtualPhone }}
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-if="call && call.audio && call.audio !== null && call.audio !== ''"
          cols="12"
        >
          <v-row no-gutters>
            <v-col cols="12">
              <AudioRecords
                :file="call.audio"
                label="Запись"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="7">
          Title
        </v-col>
        <v-col cols="5">
          {{ callTrackingBackCall ? callTrackingBackCall.title : '' }}
        </v-col>
      </v-row>
    </div>
  </FormPopup>
</template>

<script>
import { Get, Filter } from 'core-xhr';

export default {
  meta: {
    breadcrumb: ({ route }) => `Обращение #${route.params.id}`,
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const data = await $xhr.send(
      new Get('calltracking_appears')
        .entity()
        .addFilter(
          new Filter('id', 'eq', route.params.id),
        ),
    )
      .then(res => res.data.data.result)
      .catch(e => error({ statusCode: 404, statusMessage: e }));

    const {
      name, phone, session, call, callTrackingBackCall,
    } = data;

    return {
      name,
      phone,
      session,
      call,
      callTrackingBackCall,
    };
  },
  data() {
    return {
      name: '',
      phone: '',
      session: {
        URI: '',
        UTMCampaign: '',
        UTMContent: '',
        UTMFastLink: '',
        UTMKeyword: '',
        UTMMedium: '',
        UTMSource: '',
        UTMTerm: '',
      },
      call: {
        duration: '',
        visitorPhone: '',
        virtualPhone: '',
        audio: '',
      },
    };
  },
  computed: {
    closeRoute() {
      return { name: 'calltracking-appears' };
    },
  },
};
</script>

<style lang="stylus" scoped>
.appears-table
  .col
    padding: 4px 0
</style>
