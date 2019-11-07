<template>
  <section class="full-width">
    <project-subheader
      switcher="form"
      @switch-to="onSwitchTo"
    />
    <div class="q-pb-sm full-width flex justify-end">
      <q-dialog
        v-model="showHelp"
        ref="myDialog"
        content-style="max-width: 80vw; max-height: 80vh;"
      >
        <entry-form-help />
      </q-dialog>
      <t-button
        color="grey"
        label="nápověda k přihlašování"
        icon="fas fa-question"
        @click="openMenu"
      />
    </div>
    <t-separator />
    <div class="flex justify-center">
      <div
        class="q-py-lg text-primary font-14 text-italic"
        style="width: 80%; text-align: justify;"
      >
      <entry-form :projectid="projectid"/>
      </div>
    </div>
  </section>
</template>
<script>
import TSeparator from '../components/TSeparator.vue'
import EntryForm from '../components/EntryForm'
import EntryFormHelp from '../components/EntryFormHelp'
import TButton from '../components/TButton'
import ProjectSubheader from './ProjectSubheader'
export default {
  name: 'ProjectEntryForm',
  data () {
    return {
      showHelp: false,
      projectid: this.$route.params.id
    }
  },
  methods: {
    onSwitchTo (val) {
      this.$router.push('/project/' + this.projectid + '/' + val)
    },
    openMenu () {
      this.showHelp = !this.showHelp
    }
  },
  components: { TSeparator, ProjectSubheader, TButton, EntryFormHelp, EntryForm }
}
</script>
