<template>
<div class="flex full-width no-wrap t-entries-row items-center" style="padding: 4px 0;">
  <div class="flex justify-end items-center" style="width: 5%; padding-right: 6px;">
    <div class="text-dark-accent font-14 font-600 flex items-center">{{ index + 1 }}</div>
  </div>
  <div class="flex justify-start items-center" style="width: 40%">

    <div class="text-primary font-13 font-500 flex items-center" style="padding-left: 6px;">{{ handler + ' - ' + dog }}</div>
  </div>
  <div class="flex items-center" style="width: 40%">
    <div class="text-secondary font-13 font-500 flex items-center">{{ breed + ' (' + entry.gender + ')' }}</div>
  </div>
  <div class="flex items-center" style="width: 10%">
     <div class="text-secondary font-13 font-500 flex items-center">{{ entry.cath }}</div>
  </div>
  <div class="flex items-center justify-end" style="width: 5%">
    <i v-if="accepted" class="fas fa-check text-positive"/>
    <i v-else-if="isPast && presented" class="fas fa-circle text-secondary font-10"/>
  </div>
</div>
</template>
<script>
export default {
  name: 'TrainingEntriesRow',
  props: {
    entryid: { type: String, required: true },
    index: { type: Number, required: true },
    isPast: { type: Boolean, required: true }
  },
  computed: {
    entry () { return this.$store.getters['entries/getEntry'](this.entryid) },
    handler () { return this.entry.first + ' ' + this.entry.last },
    dog () { return this.entry.shortname },
    breed () { return this.entry.breed.toLowerCase() },
    accepted () { return this.entry.accepted === 'true' },
    presented () { return this.entry.presented !== 'true' }
  }
}
</script>
<style lang="stylus">
  .t-entries-row
    border-bottom: 1px solid lighten($info, 70%)
  .t-entries-row:nth-child(even)
    background: lighten($info, 87%)
</style>
