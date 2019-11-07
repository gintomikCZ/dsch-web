<template>
<div class="full-width" style="padding: 8px;">
  <t-button
    style="min-width: 100%; max-width: 100%; overflow: hidden;"
    :label="project.project"
    @click="onClick"/>
</div>
</template>

<script>
import TButton from './TButton'
export default {
  name: 'ActualProjectListRow',
  props: {
    projectid: { type: String, required: true }
  },
  computed: {
    project () { return this.$store.getters['projects/getProjectForList'](this.projectid) }
  },
  methods: {
    onClick () {
      this.$router.push('/project/' + this.projectid + '/info')
    }
  },
  components: { TButton }
}
</script>
