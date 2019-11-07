<template>
  <section class="full-width">
    <project-subheader switcher="list" @switch-to="onSwitchTo"/>
     <div class="q-pt-sm q-pb-md">
       <training-row v-for="(trainingid, index) in trainingKeys" :key="trainingid + 'training-row'" :trainingid="trainingid" :index="index"/>
     </div>
  </section>
</template>
<script>
import TrainingRow from '../components/TrainingRow'
import ProjectSubheader from './ProjectSubheader'

export default {
  name: 'ProjectList',
  data () {
    return {
      loading: true,
      projectid: this.$route.params.id
    }
  },
  computed: {
    trainingKeys () { return this.loading ? [] : this.$store.getters['trainings/getProjectTrainingKeys'](this.projectid) }
  },
  created () {
    const vm = this
    return this.$store.dispatch('trainings/fetchProjectTrainings', this.projectid).then(() => {
      vm.loading = false
    })
  },
  methods: {
    onSwitchTo (val) {
      this.$router.push('/project/' + this.projectid + '/' + val)
    }
  },
  components: { ProjectSubheader, TrainingRow }
}
</script>
