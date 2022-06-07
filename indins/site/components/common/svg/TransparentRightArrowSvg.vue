<!-- eslint-disable -->
<template>
  <span :class="classList">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="624.107px"
      height="444.801px"
      viewBox="94.286 193.371 624.107 444.801"
      enable-background="new 94.286 193.371 624.107 444.801"
      xml:space="preserve"
    >
      <g>
        <path
          d="M99.287,638.173c-1.591,0-3.127-0.762-4.083-2.113c-1.276-1.805-1.216-4.232,0.148-5.972l160.056-204.112
                      L95.215,201.274c-1.274-1.788-1.234-4.198,0.101-5.941c1.335-1.744,3.652-2.413,5.709-1.649L715.13,421.429
                      c1.987,0.735,3.294,2.644,3.263,4.763c-0.031,2.118-1.394,3.986-3.401,4.664L100.884,637.911
                      C100.359,638.088,99.82,638.173,99.287,638.173z M112.802,208.717l152.922,214.502c1.284,1.806,1.228,4.24-0.14,5.983
                      L113.549,623.088L698.41,425.893L112.802,208.717z"
        />
      </g>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'TransparentRightArrowSvg',

  props: {
    classList: {
      type: Object | Array | String,
      default: '',
    },
  },
};
</script>
