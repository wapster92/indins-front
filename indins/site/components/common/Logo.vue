<template>
  <nuxt-link
    :class="classList"
    to="/"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="932.167px"
      height="998.916px"
      viewBox="0 0 932.167 998.916"
      enable-background="new 0 0 932.167 998.916"
      xml:space="preserve"
    >
      <path
        d="M499.458,
        724.669h90.945l182.197-294.034v294.034h85.107V274.247h-90.637L584.565,
        574.119V274.247h-85.107V724.669z M932.167,
        749.043c-86.339,
        149.364-247.782,249.873-432.709,
        249.873C223.615,
        998.916,0,775.301,0,
        499.458S223.615,0,499.458,0c184.544,0,345.694,
        100.099,432.164,248.952l-37.475,21.636C815.156,
        134.669,667.988,43.273,499.458,43.273v231.245h-90.637L225.739,
        574.119V274.518h-84.947v449.906h91.363l182.356-293.788v293.788h84.947v231.245c168.92,
        0,316.387-91.815,395.245-228.255L932.167,749.043z"
      />
    </svg>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Logo',

  props: {
    reverseColor: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classList() {
      return {
        logo: true,
        'logo_reverse-color': this.reverseColor,
      };
    },
  },
};
</script>
