<template>
<div class="flex justify-between items-center q-pb-md">
  <div class="text-secondary font-15 font-600">{{ title }}</div>
  <div class="flex justify-end items-center">
    <t-button class="q-mr-xs" :label="button1" @click="$emit('switch-to', button1Value)" />
    <t-button :label="button2" @click="$emit('switch-to', button2Value)" />
  </div>
</div>
</template>
<script>
import TButton from '../components/TButton'

export default {
  name: 'ProjectSubheader',
  props: {
    switcher: { type: String, required: true }
  },
  computed: {
    title () {
      if (this.switcher === 'list') return 'seznam tréninků'
      return this.switcher === 'form' ? 'přihlašování' : 'všeobecné informace'
    },
    button1 () {
      return (this.switcher === 'list' || this.switcher === 'form') ? 'všeobecné informace' : 'seznam tréninků'
    },
    button2 () {
      return (this.switcher === 'info' || this.switcher === 'list') ? 'přihlašování' : 'seznam tréninků'
    },
    button1Value () {
      return (this.switcher === 'list' || this.switcher === 'form') ? 'info' : 'list'
    },
    button2Value () {
      return (this.switcher === 'info' || this.switcher === 'list') ? 'form' : 'list'
    }
  },
  components: { TButton }
}
</script>
