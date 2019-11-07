<template>
  <t-loading v-if="loading" />
  <div v-else class="full-width full-height q-pa-md column items-center">
    <div style="width: 80vw; min-width: 300px; max-width:600px">
      <div class="q-pb-lg">
        <t-header :title="project.project">
          <div class="column items-end" slot="button">
            <div class="text-secondary font-14 font-600">{{ fromDisplay + ' - ' + toDisplay }}</div>
            <div class="text-secondary font-12 font-400">{{ type }}</div>
          </div>
        </t-header>
      </div>
      <transition name="tfading" mode="out-in">
        <!-- <component :is="componentName" :projectid="projectid" @switch-to="onSwitchTo" /> -->
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import TLoading from '../components/TLoading.vue'
import THeader from '../components/THeader.vue'
// import ProjectInfo from './ProjectInfo'
// import ProjectEntryForm from './ProjectEntryForm'
// import ProjectList from './ProjectList'
import { formatDate } from '../helpers/helper.js'
export default {
  name: 'ProjectPage',
  computed: {
    project () { return this.loading ? null : this.$store.getters['projects/getProjectDetail'](this.projectid) },
    toDisplay () { return !this.project ? '' : formatDate(this.project.to, true) },
    fromDisplay () { return !this.project ? '' : formatDate(this.project.from, true) },
    type () {
      if (this.project.type === 'bezne') return 'podvečerní tréninky ve všedních dnech'
      return this.project.type === 'intenzivky' ? 'intenzivky ve volných dnech' : 'vícedenní tréninková soustředění'
    }
  },
  data () {
    return {
      loading: true,
      projectid: null,
      switcher: 'info'
    }
  },
  created () {
    const vm = this
    vm.projectid = vm.$route.params.id
    return vm.$store.dispatch('projects/fetchProject', vm.projectid).then(() => {
      vm.loading = false
    })
  },
  components: { TLoading, THeader }
}
</script>
