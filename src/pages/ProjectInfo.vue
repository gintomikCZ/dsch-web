<template>
    <section class="full-width">
      <project-subheader switcher="info" @switch-to="onSwitchTo"/>
      <div class="q-pb-sm text-secondary font-13 font-400" style="text-align: justify">{{ project.description }}</div>
      <t-separator/>
      <div class="q-pt-sm q-pb-md">
        <t-info-row :subtitle="project.location + ', ' + project.outin + ', povrch: ' + project.surface" title="místo"/>
        <t-info-row :subtitle="project.gps" title="souřadnice GPS"/>
        <t-info-row :subtitle="project.trainingcount" title="počet tréninků"/>
        <t-info-row :subtitle="project.capacity + ' týmů'" title="kapacita"/>
        <t-info-row title="cena (1 trénink / 1 tým)" :subtitle="project.fee1 + ' Kč'"/>
        <t-info-row title="přihlašování" :subtitle="lastRow"/>
      </div>
      <t-separator/>
    </section>
</template>
<script>
import TSeparator from '../components/TSeparator.vue'
import TInfoRow from '../components/TInfoRow'
import ProjectSubheader from './ProjectSubheader'

import { getTodaysDateString } from '../helpers/helper.js'

export default {
  name: 'ProjectInfo',
  computed: {
    project () { return this.loading ? null : this.$store.getters['projects/getProjectDetail'](this.projectid) },
    lastRow () {
      let today = getTodaysDateString()
      return this.project.to >= today ? 'Na tréninky tohoto projektu je možné s přihlásit. Pro přihlášení prosím využijte formulář na těchto stránkách.' : 'Na tréninky tohoto projektu se již nelze přihlásit.'
    }
  },
  data () {
    return {
      projectid: this.$route.params.id
    }
  },
  methods: {
    onSwitchTo (val) {
      this.$router.push('/project/' + this.projectid + '/' + val)
    }
  },
  components: { TInfoRow, TSeparator, ProjectSubheader }
}
</script>
