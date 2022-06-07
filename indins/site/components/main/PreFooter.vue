<template>
  <div
    class="pre-footer"
  >
    <div
      :class="[{'bg-fill' : footerBack}, {'bg-empty' : !footerBack}]"
      class="pre-footer__address_mobile"
    >
      <span class="angular-back"/>
      <div class="pre-footer__address">
        <div class="pre-footer__address__icon">
          <span class="pre-footer__address__icon__icon-block"/>
        </div>
        <div class="pre-footer__address__text">
          г. Санкт-Петербург, пл.&nbsp;Карла&nbsp;Фаберже, 8Б, офис&nbsp;406
        </div>
      </div>
    </div>
    <div class="pre-footer__map">
      <div
        ref="map"
        class="pre-footer__map__map-block"
      >
        <yandex-map
          v-if="mapLoad"
          :coords="[59.935531, 30.435938]"
          :controls="controls"
          zoom="17"
          style="width: 100%; height: 100%;"
          map-type="map"
        >
          <ymap-marker
            :coords="[59.935531, 30.435938]"
            :hint-content="firmName"
            :balloon="{header: firmName, body: firmAddress, footer: firmFooter}"
            :icon="{
              layout: 'default#image',
              imageHref: '/img/map.svg',
              imageSize: [40, 60],
              imageOffset: [-20, -60]
            }"
            marker-id="1"
            marker-type="placemark"
            cluster-name="1"
          />
        </yandex-map>
      </div>
    </div>
    <div class="pre-footer__form_desktop">
      <div class="pre-footer__address">
        <div class="pre-footer__address__icon">
          <span class="pre-footer__address__icon__icon-block"/>
        </div>
        <div class="pre-footer__address__text">
          г. Санкт-Петербург, пл.&nbsp;Карла&nbsp;Фаберже, 8Б, офис&nbsp;406
        </div>
      </div>
      <div class="angular-area saw-right saw-right-hidden-md saw-right-hidden-sm saw-right-hidden-xs">
        <span class="angular-back"><span/></span>
        <div
          id="back_call"
          class="pre-footer__form"
        >
          <div class="pre-footer__form__title">
            <span>Хотите узнать больше?</span>
            <span>Закажите обратный звонок.</span>
          </div>
          <div class="pre-footer__form__field pre-footer__form__field_first">
            <TextField
              v-mask="'+7 (###) ###-##-###'"
              ref="phoneInput"
              v-model="phone"
              :rules="[() => isValidNumber || 'Заполните корректный номер телефона']"
              name="phone"
              required
              placeholder="+7 (_ _ _)  _ _ _ - _ _ - _ _"
              type="tel"
              @input="setPhone"
              @blur:phone="onSendBlur"
            />
          </div>
          <div class="pre-footer__form__field">
            <TextField
              v-model="name"
              placeholder="Как к Вам обращаться?"
            />
          </div>
          <Button
            :disabled="loading"
            active
            bg-color="#3F496A"
            @click="onSend"
          >
            <span class="pre-footer__form__btn">
              <span>Заказать звонок</span>
              <span class="pre-footer__form__btn__icon"/>
            </span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mask } from 'vue-the-mask';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import sendRequestCall from '~/mixins/sendRequestCall';
import Button from '~/components/common/UI/Button';
import TextField from '~/components/common/UI/TextField';

export default {
  name: 'PreFooter',

  components: {
    Button,
    TextField,
    yandexMap,
    ymapMarker,
  },

  directives: {
    mask,
  },

  mixins: [sendRequestCall],

  data: () => ({
    controls: [
      'zoomControl',
    ],
    firmName: 'OOO &quot;ИНДИНС&quot;',
    firmAddress: 'пл. Карла Фаберже, 8 Б, БЦ «Золотая долина», оф. 406',
    mapLoad: false,

    phone: null,
    name: null,
    countFocusSend: 1,
  }),

  computed: {
    footerBack() {
      return this.$store.state.footerBack;
    },

    firmFooter() {
      return this.$calltracking.phone || this.$store.getters['SEOData/phoneText7'];
      // return this.$store.getters['SEOData/phoneText'];
    },

    isValidNumber() {
      return this.validateNumber(this.phone);
    },
  },
  watch: {
    phone(val, oldVal) {
      if (val !== oldVal) {
        this.countFocusSend = 1;
      }
    },
  },

  mounted() {
    const { map } = this.$refs;
    const observer = new IntersectionObserver(entris => {
      if (entris[0].isIntersecting) {
        this.mapLoad = true;
        observer.unobserve(map);
      }
    }, {
      root: null,
      rootMargin: '0px 0px 500px 0px',
      threshold: 0,
    });
    observer.observe(map);
  },
  methods: {
    setPhone(v) {
      if (v.charAt(4) === '8' && v.length === 19) {
        this.phone = this.phone.slice(0, 3) + this.phone.slice(5);
      }
    },
    async onSendBlur() {
      try {
        if (!this.$refs.phoneInput.validate()) {
          return;
        }
        if (this.countFocusSend <= 0) return;
        await this.sendPhoneBlur({
          phone: this.phone,
        });
        this.countFocusSend--;
      } catch (e) {
        console.error(e);
      }
    },
    async onSend() {
      if (!this.$refs.phoneInput.validate()) {
        return;
      }

      if (window.yaCounter26690535) {
        window.yaCounter26690535.reachGoal('callbackPanelBottom');
      }

      try {
        await this.sendPhone({
          phone: this.phone,
          name: this.name,
        });
      } catch (e) {
        console.error(e);
        return;
      }
      this.phone = null; this.name = null;
      this.$store.commit('modal/show');
    },
  },
};
</script>
