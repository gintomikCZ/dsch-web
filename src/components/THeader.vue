<template>
  <div class="flex justify-between items-end" style="padding-bottom: 5px;">
    <div
      class="text-primary"
      :class="{
        'font-18': !soft,
        'font-600': !soft,
        'font-16': soft,
        'font-500': soft,
        't-header-underlined-soft': soft,
        't-header-underlined': !soft
      }"
      style="flex:0 0 auto" >{{ title }}</div>
    <div style="flex: 0 0 auto; min-width: 1px; min-height: 1px;">
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'THeader',
  props: {
    title: { type: String, default: '' },
    soft: { type: Boolean, default: false }
  }

}
</script>
<style lang="stylus">
.t-header-underlined
  border-bottom: 3px solid $accent
.t-header-underlined-soft
  border-bottom: 1px solid $accent

</style>
