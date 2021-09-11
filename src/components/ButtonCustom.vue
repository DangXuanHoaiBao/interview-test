<template>
  <button
    class="button-custom"
    :style="{ 
      '--background-color': backgroundColor, 
      '--width': width,
      '--cursor': loading ? 'not-allowed' : 'pointer',
      '--opacity': loading ? 0.5 : 1
    }"
    :disabled="loading"
    @click.stop.prevent="() => $emit('click')"
  >
    <i v-if="loading" class="fa fa-spinner fa-spin"></i> &nbsp;
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    backgroundColor: { type: String, default: '#9B9B9B' },
    loading: { type: Boolean, default: false },
    width: { type: String, default: '100%' }
  }
}
</script>