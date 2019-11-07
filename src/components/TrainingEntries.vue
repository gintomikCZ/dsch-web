<template>
<div class="full-width flex justify-center items-start" style="padding: 8px 0;">
  <div style="width: 80%; max-width: 80%; min-width: 300px; padding: 4px 8px;" class="column shadow-5 t-training-entries" @click="onClick">
    <t-loading v-if="loading"/>
    <template v-else-if="entrycount === 0">
      <div class="full-width flex justify-center items-center text-secondary font-14 text-italic" style="padding: 8px;">žádné přihlášky</div>
    </template>
    <template v-else>
      <training-entries-row
        v-for="(entryid, index) in entryKeys"
        :key="entryid + 'entryRow'"
        :entryid="entryid"
        :is-past="isPast"
        :index="index"/>
      </template>
  </div>
</div>
</template>
<script>
import TrainingEntriesRow from './TrainingEntriesRow'
import TLoading from './TLoading'
export default {
  name: 'TrainingEntries',
  props: {
    trainingid: { type: String, required: true },
    isPast: { type: Boolean, required: true }
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    entryKeys () {
      return this.loading ? [] : this.$store.getters['entries/getTrainingEntries'](this.trainingid)
    },
    entrycount () {
      return !Array.isArray(this.entryKeys) ? null : this.entryKeys.length
    }
  },
  created () {
    const vm = this
    return vm.$store.dispatch('entries/fetchTrainingEntries', vm.trainingid).then(() => {
      vm.loading = false
    })
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  },
  components: { TrainingEntriesRow, TLoading }
}
</script>
<style lang="stylus">

.t-training-entries
  background: lighten($lime-2, 40%)

</style>
