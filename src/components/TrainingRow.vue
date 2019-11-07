<template>
  <div class="full-width column">
    <div class="flex justify-between items-center cursor-pointer t-training-row" :class="[background]" style="padding: 4px 0;" @click="onClick">
      <div class="flex">
        <div style="padding: 0px 12px 0px 8px; min-width: 35px; max-width: 35px; flex: 0;"
          class="flex justify-end items-center">
          <div class="text-dark-accent font-600 font-15">{{ index + 1 }}</div>
        </div>
        <div style="padding: 0 8px;">
          <span class="font-600 font-14 text-secondary">{{ day }}</span>
          <span class="font-500 font-13 text-secondary" style="padding-left: 8px">{{ '(' + dayName + ')' }}</span>
        </div>
      </div>
      <div class="column justify-between" style="padding: 0 12px">
        <div class="flex justify-end font-13 font-500 text-secondary">{{ time + ' hod' }}</div>
        <div class="flex justify-start">
          <div class="font-13 font-400 text-primary text-italic">přihlášeno: </div>
          <div class="font-13 font-600 text-primary text-italic" style="padding-left: 4px">{{ training.entryCount }}</div>
          <template v-if="!isPast">
            <div class="font-13 font-400 text-primary text-italic" style="padding-left: 12px">akceptováno: </div>
            <div class="font-13 font-600 text-primary text-italic" style="padding-left: 4px">{{ training.acceptedCount }}</div>
          </template>
          <template v-else>
            <div class="font-13 font-400 text-primary text-italic" style="padding-left: 12px">zúčastněných: </div>
            <div class="font-13 font-600 text-primary text-italic" style="padding-left: 4px">{{ training.presentCount }}</div>
          </template>
        </div>
      </div>
    </div>
    <transition
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp">
    <training-entries v-if="showEntries" :trainingid="trainingid" :is-past="isPast" @click="onEntriesClick"/>
    </transition>
  </div>

</template>

<script>
import { formatDate, formatTime, getTodaysDateString, getDayName } from '../helpers/helper.js'
import TrainingEntries from './TrainingEntries'
export default {
  name: 'TrainingRow',
  props: {
    trainingid: { type: String, required: true },
    index: { type: Number, required: true }
  },
  data () {
    return {
      showEntries: false
    }
  },
  computed: {
    training () {
      return this.$store.getters['trainings/getTraining'](this.trainingid)
    },
    isPast () {
      let today = getTodaysDateString()
      return this.training.day < today
    },
    background () {
      return this.index % 2 === 0 ? 't-background-odd' : 't-background-even'
    },
    day () { return formatDate(this.training.day, true) },
    time () { return 'od ' + formatTime(this.training.time) },
    dayName () { return getDayName(this.training.day) }
  },
  methods: {
    onClick () {
      this.showEntries = !this.showEntries
    },
    onEntriesClick () {
      this.showEntries = false
    }
  },
  components: { TrainingEntries }
}
</script>
<style lang="stylus">
.t-training-row
  border-bottom: 1px solid lighten($info, 70%)
  transition: all .4s ease
.t-background-odd
  background: lighten($info, 87%)
.t-background-even
  background: #ffffff
.t-training-row:hover, .t-training-row:focus
  background: lighten($lime-2, 40%)
</style>
