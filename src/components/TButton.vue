<template>
  <button type="button" class="t-button flex justify-center items-center" :class="[compClass]" @click="$emit('click')">
    <i v-if="Boolean(icon)" class="font-12 q-mr-sm" :class="[icon]"/>
    <span style="white-space:nowrap">{{ label }}</span>
  </button>
</template>
<script>
export default {
  name: 'TButton',
  props: {
    label: { type: String, default: '' },
    icon: { type: String, default: '' },
    color: { type: String, default: 'accent' }
  },
  computed: {
    compClass () { return 't-button-' + this.color }
  }
}
</script>
<style lang="stylus">
.t-button
  font-family: 'Mukta Vaani'
  font-size: 14px
  font-weight: 600
  padding: 4px 8px
  border-radius: $generic-border-radius
  transition: all .4s ease-out-in
.t-button-grey
  color: darken($primary, 30%)
  background: $grey-3
.t-button-grey:hover, .t-button-grey:focus
  color: darken($accent, 30%)

.t-button-accent
  color: darken($primary, 30%)
  background: lighten($accent, 10%)
.t-button-accent:hover, .t-button-accent:focus
  background: lighten($primary, 10%)
  color: lighten($accent, 10%)

.t-button:active
  transform: scale(.95) translateY(-2px)
</style>
