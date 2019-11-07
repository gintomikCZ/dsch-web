<template>
<t-loading v-if="loading"/>
  <form v-else name="entryForm" @submit="onSubmit">

    <div class="full-width">
      <t-header title="psovod" soft/>
      <div class="row q-col-gutter-md q-mt-xs">
        <div class="col-6">
          <q-input
            v-model="form.first"
            label="jméno"
            outlined
            dense
            color="primary"
            bg-color="lime-1"
            :error="$v.form.first.$error"
            :error-message="firstErrorMessage"
            @blur="$v.form.first.$touch"
            @focus="onFocus('first')"
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            dense
            color="primary"
            bg-color="lime-1"
            :error="$v.form.last.$error"
            :error-message="lastErrorMessage"
            label="příjmení"
            v-model="form.last"
            @blur="$v.form.last.$touch"
            @focus="onFocus('last')"
          />
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-input
            outlined
            dense
            color="primary"
            bg-color="lime-1"
            :error="$v.form.email.$error"
            :error-message="emailErrorMessage"
            label="email"
            v-model="form.email"
            @blur="$v.form.email.$touch"
            @focus="onFocus('email')"
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            dense
            color="primary"
            bg-color="lime-1"
            label="telefon"
            v-model="form.phone"
            @focus="onFocus('phone')"
          />
        </div>
      </div>
    </div>
    <t-separator />
    <div class="q-pt-md q-pb-lg full-width">
      <t-header
        title="pes"
        soft
      />
      <div class="row q-col-gutter-md q-mt-xs">
        <div class="col-6">
          <q-input
            outlined
            dense
            color="primary"
            bg-color="lime-1"
            :error="$v.form.shortname.$error"
            :error-message="shortnameErrorMessage"
            label="jméno"
            v-model="form.shortname"
            @blur="$v.form.shortname.$touch"
            @focus="onFocus('shortname')"
          />
        </div>
        <div class="col-6">
          <q-select
            label="plemeno"
            v-model="form.breed"
            outlined
            color="primary"
            behavior="menu"
            bg-color="lime-1"
            use-input
            dense
            input-debounce=0
            :options="filteredBreeds"
            @filter="filterFn"
            filter-placeholder=" "
            separator
            @focus="onFocus('breed')"
          />
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-select
            outlined
            color="primary"
            dense
            bg-color="lime-1"
            behavior="menu"
            label="pohlaví"
            v-model="form.gender"
            :options="genders"
            separator
            @focus="onFocus('gender')"
          />
        </div>
        <div class="col-6">
          <q-select
            outlined
            behavior="menu"
            dense
            color="primary"
            bg-color="lime-1"
            label="velikostní kategorie"
            v-model="form.cath"
            :options="caths"
            @focus="onFocus('cath')"
          />
        </div>
      </div>
    </div>
    <t-separator />
    <div class="q-py-md full-width">
      <t-header
        title="vaše zpráva"
        soft
      />
      <div class="row q-col-gutter-md q-mt-xs">
        <div class="col-12">
          <q-input
            outlined
            type="textarea"
            dense
            color="primary"
            bg-color="lime-1"
            :error="$v.form.usertext.$error"
            :error-message="usertextErrorMessage"
            v-model="form.usertext"
            @focus="onFocus('usertext')"
          />
        </div>
      </div>
    </div>
    <t-separator/>
    <div class="q-py-lg full-width">
      <t-header
        title="tréninky"
        soft
      />
      <div class="column bg-lime-1 t-radius q-mt-md" style="padding: 8px; border: 1px solid #ccc;">
        <div class="text-secondary font-500 font-15 q-pa-md">
          <span>celkem označených termínů:</span>
          <span class="q-ml-sm">{{ selectedCount }}</span>
        </div>
        <template v-for="(rec, index) in trainings">
          <div :key="'trainingformRow' + rec.id" class="flex items-center "
            :class="{'t-checkbox-disabled': rec.emailErrorMessageisPast || rec.free === 0}">
            <div class="text-dark-accent font-14 font-600 flex items-center justify-end" style="padding: 8px; min-width: 30px; flex:0;">
              {{ index + 1 }}
            </div>
            <div style="min-width: 40%;" class="flex">
              <q-checkbox
                v-model="selection"
                :val="rec.id"
                :label="rec.day + ' (' + rec.time + ')'"
                color="secondary"
                class="text-primary font-500 font-14"
                :disable="rec.isPast || rec.free === 0" />
            </div>
            <div style="min-width: 40%" class="flex">
              <div class="q-ml-sm text-secondary font-500 font-14">
                <span v-if="rec.entryCount === 0">{{ 'žádné přihlášky' }}</span>
                <span v-else-if="rec.entryCount === 1">{{ 'přihlášen 1 tým' }}</span>
                <span v-else-if="rec.entryCount < 5">{{ 'přihlášeny ' + rec.entryCount + ' týmy' }}</span>
                <span v-else>{{ 'přihlášeno ' + rec.entryCount + ' týmů' }}</span>
                <span>,</span>
              </div>
              <div class="q-ml-sm text-secondary font-500 font-14">
                <span v-if="rec.free === 0" class="text-dark-accent font-600 font-15">PLNO</span>
                <span v-else-if="rec.free === 1">1 volné místo</span>
                <span v-else-if="rec.free < 5">{{ rec.free + ' volná místa' }}</span>
                <span v-else>{{ rec.free + ' volných míst' }}</span>
              </div>
            </div>
          </div>
        </template>
        <div class="q-pt-lg flex justify-center">
          <button style="padding: 8px 16px; line-height: 18px" class="t-radius flex justify-center items-center font-18 font-600 t-button-accent">odeslat</button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import THeader from './THeader.vue'
import TLoading from './TLoading.vue'
import TSeparator from './TSeparator'
import { formatDate, formatTime, getDayName, getIsPast } from '../helpers/helper.js'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'EntryForm',
  props: {
    projectid: { type: String, required: true }
  },
  validations: {
    form: {
      first: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30)
      },
      last: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50)
      },
      shortname: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(25)
      },
      email: {
        email
      },
      usertext: {
        maxLength: maxLength(2000)
      }
    }
  },
  data () {
    return {
      showHelp: false,
      loading: true,
      submited: false,
      selection: [],
      formError: false,
      formErrorMessage: '',
      filteredBreeds: '',
      form: {
        first: '',
        last: '',
        gender: '',
        breed: '',
        shortname: '',
        phone: '',
        email: '',
        usertext: ''
      }
    }
  },
  computed: {
    trainingKeys () { return this.loading ? [] : this.$store.getters['trainings/getProjectTrainingKeys'](this.projectid) },
    caths () { return this.$store.getters.getCaths },
    breeds () { return this.loading ? [] : this.$store.getters.getBreeds },
    genders () { return this.$store.getters.getGenders },
    firstErrorMessage () {
      if (!this.$v.form.first.required) return 'Jméno psovoda je třeba vyplnit.'
      if (!this.$v.form.first.minLength) return 'Minimální délka jména jsou dva znaky.'
      if (!this.$v.form.first.maxLength) return 'Délka jména nemůže přesáhnout 30 znaků.'
      return ''
    },
    project () { return this.$store.getters['projects/getProjectDetail'](this.projectid) },
    capacity () {
      let capacity = parseInt(this.project.capacity)
      return isNaN(capacity) ? 0 : capacity
    },
    lastErrorMessage () {
      if (!this.$v.form.last.required) return 'Příjmení psovoda je třeba vyplnit.'
      if (!this.$v.form.last.minLength) return 'Minimální délka příjmení jsou 2 znaky.'
      if (!this.$v.form.last.maxLength) return 'Délka příjmení nemůže přesáhnout 50 znaků.'
      return ''
    },
    usertextErrorMessage () {
      if (!this.$v.form.usertext.$error) return ''
      return 'Maximální povolená délka textu je 2000 znaků.'
    },
    phoneError () {
      return this.submited && (this.form.email.length + this.form.phone.length < 1)
    },
    phoneErrorMessage () {
      return this.phoneError ? 'Je třeba uvést alespoň jeden z těchto dvou údajů.' : ''
    },
    emailErrorMessage () {
      if (this.$v.form.email.$error) return 'neplatná emailová adresa'
      return ''
    },
    shortnameErrorMessage () {
      if (!this.$v.form.shortname.required) return 'Jméno psa je třeba vyplnit.'
      if (!this.$v.form.shortname.minLength) return 'Minimální délka jména psa jsou 2 znaky.'
      if (!this.$v.form.shortname.maxLength) return 'Jméno psa by nemělo být delší než 25 znaků.'
      return ''
    },
    trainings () {
      const vm = this
      return !Array.isArray(this.trainingKeys) ? [] : this.trainingKeys.map((key) => {
        let rec = vm.$store.getters['trainings/getTraining'](key)
        let entryCount = parseInt(rec.entryCount)
        if (isNaN(entryCount)) entryCount = 0
        return {
          day: formatDate(rec.day, true),
          id: key,
          dayName: getDayName(rec.day),
          time: formatTime(rec.time),
          free: vm.capacity - entryCount,
          isPast: getIsPast(rec.day),
          entryCount
        }
      })
    },
    selectedCount () { return this.selection.length }
  },
  created () {
    const vm = this
    return Promise.all([
      vm.$store.dispatch('trainings/fetchProjectTrainings', vm.projectid),
      vm.$store.dispatch('projects/fetchProject', vm.projectid),
      vm.$store.dispatch('fetchBreeds')
    ]).then(() => {
      vm.loading = false
      vm.filteredBreeds = vm.breeds
    })
  },
  methods: {
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filteredBreeds = this.breeds
        } else {
          const needle = val.toLowerCase()
          this.filteredBreeds = this.breeds.filter((v) => {
            return v.label.toLowerCase().indexOf(needle) > -1
          })
        }
      })
    },
    onFocus (control) {
      if (this.submited) {
        this.$v.form.$reset()
        this.formError = false
        this.formErrorMessage = ''
        this.submited = false
        return
      }
      if (control in this.$v.form) {
        this.$v.form[control].$reset()
      }
    },
    validateForm () {
      this.$v.form.$touch()
      const self = this
      return Promise.resolve().then(() => {
        if (self.$v.form.$error) {
          self.formErrorMessage = 'Některé údaje byly vyplněny chybně, takto není možné přihlášku odeslat. Opravte, prosím, vyznačená pole a zkuste to znovu.'
          self.formError = true
          return
        }
        if (!self.form.phone && !self.form.email) {
          self.formError = true
          self.formErrorMessage = 'Nenechali jste nám žádný kontaktní údaj, ani email, ani telefon. Takto bychom na vaši přihlášku nemohli reagovat. Doplňte prosím aspoň jeden z těchto dvou kontaktních údajů a odešlete formulář znovu.'
          return
        }
        if (!self.selection.length === 0) {
          self.formError = true
          self.formErrorMessage = 'Nevybrali jste žádný tréninkový termín. Takovou přihlášku vlastně ani nemá smysl odesílat. Zkuste to prosím ještě jednou ... :-)'
          return
        }
        self.formError = false
        self.formErrorMessage = ''
      })
    },
    onSubmit (e) {
      e.preventDefault()
      this.submited = true
      const vm = this
      return vm.validateForm().then(() => {
        if (vm.formError) {
          vm.$q.dialog({
            title: 'chyba',
            message: vm.formErrorMessage,
            ok: 'OK'
          })
        } else {
          return vm.$store.dispatch('sendEntry', Object.assign(vm.form, {
            trainings: vm.selection.map(key => {
              return vm.$store.getters['trainings/getTraining'](key)
            }) })).then((response) => {
            if (response === 'OK') {
              vm.$q.dialog({
                title: 'odesláno',
                message: 'Vaše přihláška byla v pořádku odeslána. Vyčkejte prosím, co nejdříve vám na ni odpovíme. Těšíme se na vás na tréninku :-)',
                ok: 'OK'
              }).onOk(() => { vm.$router.push('/') })
            } else {
              vm.$q.dialog({
                title: 'chyba',
                message: 'Mrzí nás to, ale něco se nepovedlo a vaše data nebyla správně odeslána. Zkuste to prosím třeba za chvíli znovu ... kdyby problém přetrvával, napište nám to do mailu (tomas@glabazna.cz), nebo nám zavolejte (+420 731 516 974).',
                ok: 'OK'
              }).onOk(() => { vm.$router.push('/') })
            }
          })
        }
      })
    }
  },
  components: { THeader, TLoading, TSeparator }
}
</script>
<style lang="stylus">
.t-checkbox-disabled
  opacity: 0.5
</style>
