<template>
  <div class="full-width column justify-start items-start q-py-xs" style="max-width: 100%">
    <div class="font-500 text-secondary font-13">{{ title }}</div>
    <div class="font-400 text-primary font-14">{{ subtitle }}</div>
    <div v-if="underlined" class="bg-accent full-width" style="min-height: 1px; margin-top: 8px;"/>
  </div>
</template>
<script>
export default {
  name: 'TInfoRow',
  props: {
    subtitle: { tyope: String, default: '' },
    title: { type: String, default: '' },
    underlined: { type: Boolean, default: false }
  }
}
</script>
