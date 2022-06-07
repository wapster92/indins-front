import { Simple } from 'core-xhr';

export default {
  data() {
    return {
      loading: false,
    };
  },

  methods: {
    sendPhoneBlur(value) {
      const { phone } = value;

      this.$xhr.send(
        new Simple('/api/send-email', {
          phone,
          sessionHash: this.$calltracking.hash,
          sessionPhone: this.$calltracking.phone,
          route: this.$route.path,
          title: document.title,
        }, 'POST'),
      )
        .then(response => {
          const data = response.data.result;

          if (!data.success) {
            throw new Error(data && (data.message || data.error));
          }
        })
        .catch(error => {
          this.loading = false;
          console.error('Произошла ошибка');
          this.responseMessage(error.message || error.error);
        });
    },
    sendPhone(value) {
      const { phone, name } = value;

      this.loading = true;

      this.$xhr.send(
        new Simple('/api/send-email', {
          name,
          phone,
          sessionHash: this.$calltracking.hash,
          sessionPhone: this.$calltracking.phone,
          route: this.$route.path,
          title: document.title,
        }, 'POST'),
      )
        .then(response => {
          const data = response.data.result;

          if (!data.success) {
            throw new Error(data && (data.message || data.error));
          }

          this.loading = false;

          const message = `${name ? `${name}, с` : 'C'}пасибо за обращение. Мы вам перезвоним в ближайшее время.`;
          this.responseMessage(message);
        })
        .catch(error => {
          this.loading = false;
          console.error('Произошла ошибка');
          this.responseMessage(error.message || error.error);
        });
    },

    validateNumber(number) {
      const pattern = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
      const test = pattern.test(number);
      return test && number.length >= 18;
    },

    getCookie(cookie) {
      const results = document.cookie.match(`(^|;) ?${cookie}=([^;]*)(;|$)`);
      if (results) {
        return (unescape(results[2]));
      }
      return 0;
    },

    responseMessage(message) {
      this.$store.commit('modal/setOptions', {
        body: {
          text: message,
        },
        styles: {
          'min-width': '360px',
          'max-width': '524px',
        },
      });
    },
  },
};
