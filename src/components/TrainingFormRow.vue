<template>
<div class="flex items-center">

</div>
</template>
<script>
import { formatDate, formatTime, getDayName } from '../helpers/helper.js'
export default {
  name: 'TrainingFormRow',
  props: {
    trainingid: { type: String, required: true }
  },
  computed: {
    training () { return this.$store.getters['trainings/getTraining'](this.trainingid) },
    day () { return formatDate(this.training.day, true) },
    dayName () { return getDayName(this.training.day) },
    time () { return formatTime(this.training.time) }
  }
}
</script>
