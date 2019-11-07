<template>
  <div
    style="height: 100%; width: 100%; min-height: 100%; min-width: 100%;"
    class="flex justify-center items-center"
    :class="['bg-' + background]">
    <q-spinner-hourglass
      class="absolute-center"
      :size="size"
      :color="color"/>
  </div>
</template>
<script>

export default {
  name: 'TLoading',
  props: {
    color: { type: String, default: 'primary' },
    size: { type: String, default: '80px' },
    background: { type: String, default: 'transparent' }
  }
}
</script>
