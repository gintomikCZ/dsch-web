<template>
<div class="full-width flex justify-center no-wrap">
  <div class="column justify-start no-wrap items-center q-pt-md" style="max-width: 250px; min-width: 250px;">
    <t-loading v-if="loading" />
    <template v-else>
      <actual-project-list-row
        v-for="projectid in projectKeys"
        :projectid="projectid"
        :key="'project' + projectid"/>
    </template>
  </div>
</div>

</template>

<script>
import ActualProjectListRow from './ActualProjectListRow.vue'
import TLoading from './TLoading'
export default {
  name: 'ActualProjectsList',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    projectKeys () {
      return this.loading ? [] : this.$store.getters['projects/getProjectKeys']
    }
  },
  created () {
    const vm = this
    return this.$store.dispatch('projects/fetchProjectsForList').then(() => {
      vm.loading = false
    }).catch((e) => { throw new Error('něco se pokazilo') })
  },
  components: { ActualProjectListRow, TLoading }
}
</script>
