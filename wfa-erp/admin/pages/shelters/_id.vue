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
          'Сертификат'
        ]"
        @back="$router.push({ name: 'shelters-main' })"
      />
      <PageWrapper
        :class="{
          'pt-12': isMobileView,
          'pb-15': ($refs.autoSave || {}).showFooter,
        }"
        :sm="`
          auto / 100%
        `"
        :md="`
          auto / 50% 50%
        `"
        class="pt-sm-1 px-sm-1"
      >
        <BlockWrapper
          v-if="!isMobileView || activeMenu === 'Основная информация'"
          :show-title="!isMobileView"
          :minimise="!isMobileView"
          title="Основная информация"
          class="mt-0"
        >
          <ShelterForm
            ref="ShelterForm"
            v-model="shelter"
            class="pa-4"
            @submit="save"
            @input="throttledSave"
          />
        </BlockWrapper>
        <div class="simple-wrap">
          <BlockWrapper
            v-if="!isMobileView || activeMenu === 'Сертификат'"
            :show-title="!isMobileView"
            title="Сертификат"
            class="mt-1 ml-md-1 mt-md-0"
          >
            <DynamicListing
              :headers="headers"
              :list="files"
              style="height: calc(100% - 48px);"
            >
              <template v-slot:noResultTable>
                <span>Нет файлов</span>
              </template>
              <template v-slot:columns>
                <TextColumn field="name" />
                <SlotColumn
                  field="id"
                  #default="{item, value}"
                >
                  <v-row no-gutters>
                    <v-col cols="10">
                      <div
                        v-if="isAddPage"
                        style="opacity: 0.6"
                      >Не доступно</div>
                      <div
                        v-else-if="item.id !== null"
                        style="width: 145px; text-align: center; padding-top: 8px"
                      >Сформирован</div>
                      <div v-else>
                        <SimpleButton
                          color="lightgrey"
                          class="black--text"
                          elevation="1"
                          @click="generateDocument($route.params.id)"
                        >Сформировать</SimpleButton>
                      </div>
                    </v-col>
                    <v-col cols="2">
                      <div>
                        <SimpleButton
                          outlined
                          elevation="1"
                          @click="downloadPdf($route.params.id)"
                        >PDF</SimpleButton>
                      </div>
                    </v-col>
                  </v-row>
                </SlotColumn>
                <ActionColumn action-column>
                  <template v-slot:default="{ item }">
                    <template v-if="item.id !== null">
                      <!--                    <CustomItem
                        :href="item.url"
                        :tag="'a'"
                        target="_blank"
                        icon="print"
                      />-->
                      <SimpleButton
                        outlined
                        elevation="1"
                        class="mr-auto"
                        @click="downloadDocx(item.url)"
                      >DOCX</SimpleButton>
                      <CustomItem
                        icon="delete"
                        @click="deleteFile(item)"
                      />
                    </template>
                  </template>
                </ActionColumn>
              </template>
            </DynamicListing>
          </BlockWrapper>
          <BlockWrapper
            v-if="!isMobileView || activeMenu === 'Клуб'"
            :show-title="!isMobileView"
            title="Клуб"
            class="mt-1 ml-md-1 club"
          >
            <PetClubForm
              ref="PetClubForm"
              v-model="shelter.club"
              :read-only="isClub"
              class="pa-4"
              @submit="save"
              @input="() => isClub ? (() => {})() : throttledSave()"
            />
          </BlockWrapper>
        </div>
      </PageWrapper>
      <nuxt-child />
    </template>
  </AutoSaveBlock>
</template>

<script>
import {
  Get, Put, Filter, Post, Simple, Delete,
} from 'core-xhr';
import PageWrapper from '@/components/blocks/PageWrapper';
import BlockWrapper from '@/components/blocks/BlockWrapper';
import ShelterForm from '@/components/forms/ShelterForm';
import MobileMenu from '@/components/menu/MobileMenu';
import subscriberMixin from '@/mixins/subscriberMixin';
import PetClubForm from '@/components/forms/PetClubForm';
import CustomItem from '../../components/listing/actions/CustomItem';

export default {
  name: 'ShelterPage',
  components: {
    CustomItem,
    MobileMenu,
    ShelterForm,
    BlockWrapper,
    PageWrapper,
    PetClubForm,
  },
  mixins: [subscriberMixin],
  meta: {
    breadcrumb() {
      return this.shelter.name || 'Добавление';
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
      .send(new Get('shelter').entity().addFilter(new Filter('id', 'eq', itemId)))
      .then(response => response.data.data.result)
      .catch(
        reason => console.error(reason) ^ error(reason.message || reason.error),
      );
    const {
      name,
      translatedName,
      number,
      oldNumber,
      owner,
      phone,
      address,
      files,
      isBlocked,
      email,
      club,
    } = data;

    const filesMap = files.filter(el => !el.isPdf).reduce((acc, curr) => {
      acc[curr.name] = curr;
      return acc;
    }, {
      Сертификат: {
        name: 'Сертификат',
        id: null,
      },
    });

    const pdfFiles = files.filter(el => el.isPdf);

    return {
      itemId,
      shelter: {
        name,
        translatedName,
        number,
        oldNumber,
        owner,
        phone,
        address,
        isBlocked,
        email,
        club,
      },
      files: Object.values(filesMap),
      pdfFiles,
    };
  },
  data() {
    return {
      activeMenu: 'Основная информация',
      shelter: {
        name: null,
        number: null,
        oldNumber: null,
        owner: null,
        phone: null,
        address: null,
        email: null,
        club: null,
      },
      files: [
        {
          name: 'Сертификат',
          id: null,
        },
      ],
      headers: [
        {
          name: 'Название', field: 'name', space: '200px', noSort: true,
        },
        {
          name: 'Формирование', field: 'id', space: '200px', noSort: true,
        },
        { name: '', field: 'special:listing-actions', space: '150px' },
      ],
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
        ? new Post('shelter').entity()
        : new Put('shelter')
          .entity()
          .addFilter(new Filter('id', 'eq', this.itemId));
    },
    isClub() {
      return this.$store.getters['auth/getData'].roles.every(el => el === 'CLUB');
    },
  },
  mounted() {
    this.setSubscriber('Shelter', this.update);
    this.setSubscriber('File', this.update);
  },
  methods: {
    async update() {
      if (!this.itemId) {
        return {};
      }
      const data = await this.$xhr
        .send(new Get('shelter').entity().addFilter(new Filter('id', 'eq', this.itemId)))
        .then(response => response.data.data.result)
        .catch(
          reason => console.error(reason),
        );
      const {
        name,
        translatedName,
        number,
        oldNumber,
        owner,
        phone,
        address,
        email,
        files,
        club,
      } = data;

      const filesMap = files.filter(el => !el.isPdf).reduce((acc, curr) => {
        acc[curr.name] = curr;
        return acc;
      }, {
        Сертификат: {
          name: 'Сертификат',
          id: null,
        },
      });

      const pdfFiles = files.filter(el => el.isPdf);

      this.shelter = {
        name,
        translatedName,
        number,
        oldNumber,
        owner,
        phone,
        address,
        email,
        club,
      };
      this.files = Object.values(filesMap);
      this.pdfFiles = pdfFiles;
    },
    checkForm(form) {
      if (form) {
        return form.validate();
      }
      return true;
    },
    save() {
      if (!this.checkForm(this.$refs.ShelterForm)) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      this.$store.dispatch('snack/notify', 'Подождите...');
      const shelter = { ...this.shelter };

      // удаляем из номера лишние символы
      if (shelter.phone) {
        const regx = /\d+/g;
        shelter.phone = shelter.phone.match(regx).join('');
      }
      const request = this.entityRequest.setData({
        ...shelter,
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
    deleteFile(file) {
      this.$xhr
        .send(
          (new Delete('files'))
            .entity()
            .addFilter(new Filter('id', 'eq', file.id)),
        )
        .then(resp => {
          if (!resp.data.success) {
            this.$store.dispatch('snack/error', resp.data.message || resp.data.error);
          } else {
            this.$store.dispatch('snack/notify', 'Файл удален');
          }
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
      if (file.name === 'Сертификат') {
        const pdfFile = this.pdfFiles.find(el => el.name === 'Сертификат');
        if (pdfFile) {
          this.$xhr
            .send(
              (new Delete('files'))
                .entity()
                .addFilter(new Filter('id', 'eq', pdfFile.id)),
            )
            .catch(e => {
              this.$store.dispatch('snack/error', e.message || e.error);
            });
        }
      }
    },
    generateDocument(id, isPdf = false) {
      return this.$xhr
        .send(
          (new Simple('/api/certificate/create', { id, isPdf }, 'POST')).authorization(),
        )
        .then(resp => {
          if (!resp.data.success) {
            this.$store.dispatch('snack/error', resp.data.message || resp.data.error);
          } else {
            this.$store.dispatch('snack/notify', 'Сформирован');
          }
          return resp;
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
    },
    downloadPdf(id) {
      const file = [...this.pdfFiles]
        .reverse()
        .find(el => el.name === 'Сертификат');
      if (file) {
        window.open(file.url);
      } else {
        this.generateDocument(id, true)
          .then(resp => window.open(resp.data.result.url));
      }
    },
    downloadDocx(link) {
      if (!link) return this.$store.dispatch('snack/error', 'Произошла ошибка');
      window.open(link);
    },
  },
};
</script>

<style lang="stylus" scoped>
.club
  grid-column span 1
</style>
