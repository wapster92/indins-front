<template>
  <div>
    <slot />
  </div>
</template>

<script>
// Этот компонент нужен, чтобы PopupComponent работал в двух режимах.
export default {
  name: 'PopupWrapper',
};
</script>
