<template>
  <AutoSaveBlock
    ref="autoSave"
    :no-padding="false"
    border
    fixed
    style="margin-bottom: 0!important;"
    @save="save"
    @cancel="reload"
  >
    <template v-slot:default="{ throttledSave }">
      <MobileMenu
        v-if="isMobileView"
        v-model="activeMenu"
        :items="[
          'Основная информация',
        ]"
        @back="$router.push({ name: 'clubs-main' })"
      />
      <PageWrapper
        :class="{
          'pt-12': isMobileView,
          'pb-15': ($refs.autoSave || {}).showFooter,
        }"
        class="pt-sm-1 px-sm-1"
      >
        <BlockWrapper
          v-if="!isMobileView || activeMenu === 'Основная информация'"
          :show-title="!isMobileView"
          :minimise="false"
          title="Основная информация"
          class="mt-0"
        >
          <ClubForm
            ref="ClubForm"
            v-model="club"
            :is-add-page="isAddPage"
            class="pa-4"
            @submit="save"
            @input="throttledSave"
          />
        </BlockWrapper>
      </PageWrapper>
      <nuxt-child />
    </template>
  </AutoSaveBlock>
</template>

<script>
import {
  Get, Put, Filter, Post,
} from 'core-xhr';
import PageWrapper from '@/components/blocks/PageWrapper';
import BlockWrapper from '@/components/blocks/BlockWrapper';
import ClubForm from '@/components/forms/ClubForm';
import MobileMenu from '@/components/menu/MobileMenu';
import subscriberMixin from '@/mixins/subscriberMixin';

export default {
  name: 'ClubPage',
  components: {
    MobileMenu,
    ClubForm,
    BlockWrapper,
    PageWrapper,
  },
  mixins: [subscriberMixin],
  meta: {
    breadcrumb() {
      return this.club.name || 'Добавление';
    },
  },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const itemId = parseInt(route.params.id) || null;
    if (!itemId) {
      return {};
    }
    const data = await $xhr
      .send(new Get('club').entity().addFilter(new Filter('id', 'eq', itemId)))
      .then(response => response.data.data.result)
      .catch(
        reason => console.error(reason) ^ error(reason.message || reason.error),
      );
    const {
      logo,
      id,
      name,
      head,
      address,
      site,
      email,
      phone,
      isBlocked,
    } = data;

    return {
      itemId,
      club: {
        logo,
        id,
        name,
        head,
        address,
        site,
        email,
        phone,
        isBlocked,
      },
    };
  },
  data() {
    return {
      activeMenu: 'Основная информация',
      club: {
        logo: null,
        id: null,
        name: null,
        head: null,
        address: null,
        site: null,
        email: null,
        phone: null,
      },
    };
  },
  computed: {
    isMobileView() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    isAddPage() {
      return this.$route.params.id === 'add';
    },
    entityRequest() {
      return this.isAddPage
        ? new Post('club').entity()
        : new Put('club')
          .entity()
          .addFilter(new Filter('id', 'eq', this.itemId));
    },
  },
  mounted() {
    this.setSubscriber('Club', this.update);
  },
  methods: {
    async update() {
      if (!this.itemId) {
        return {};
      }
      const data = await this.$xhr
        .send(new Get('club').entity().addFilter(new Filter('id', 'eq', this.itemId)))
        .then(response => response.data.data.result)
        .catch(
          reason => console.error(reason),
        );
      const {
        logo,
        id,
        name,
        head,
        address,
        site,
        email,
        phone,
      } = data;

      this.club = {
        logo,
        id,
        name,
        head,
        address,
        site,
        email,
        phone,
      };
    },
    checkForm(form) {
      if (form) {
        return form.validate();
      }
      return true;
    },
    save() {
      if (!this.checkForm(this.$refs.ClubForm)) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      this.$store.dispatch('snack/notify', 'Подождите...');
      const request = this.entityRequest.setData({
        ...this.club,
      });
      this.$xhr
        .send(request)
        .then(resp => {
          this.$store.dispatch('snack/notify', 'Сохранено');
          if (this.isAddPage) {
            this.$router.replace({ params: { id: resp.data.data.created } }).then(() => {
              this.reload();
            });
          }
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
    },
    reload() {
      window.location.reload(true);
    },
  },
};
</script>

<style lang="stylus" scoped></style>
