<template>
  <q-page>
    <div class="full-width full-height q-pa-md column items-center">
      <div class="flex justify-between items-center q-mb-lg" style="width: 80vw; min-width: 300px; max-width:600px">
        <div style="padding: 0 20px 0 0">
          <q-img style="max-width: 150px; min-width: 150px; flex: 0" src="statics/logo150.jpeg"></q-img>
        </div>
        <div class="font-14 text-secondary" style="flex: 1; text-align: justify; line-height: 1.2">
          Od roku 2013 pravidelně pořádáme tréninky agility.
          Chcete-li si spolu s vaším psíkem zaběhat agility v Dog School Chvalnov, pak jste na této stránce správně.
          Najdete zde informace o aktuálních tréninkových projektech a můžete se zde na naše tréninky přihlásit.
          Toužíte-li po dalších, podrobnějších informacích o naší práci se psy, napište nám.
        </div>
      </div>

      <div style="width: 80vw; min-width: 300px; max-width:600px" class="q-pb-lg">
        <t-header :title="title">
          <t-button slot="button" label="info o závodech" icon="fas fa-info-circle" @click="dvojspuntLink"/>
        </t-header>
        <div class="full-width flex justify-between items-center">
          <div class="column items-start" style="flex: 0; padding-right: 50px;">
            <div class="font-16 text-primary font-600" style="line-height: 1.2;">Tlumačov</div>
            <div class="font-15 text-primary font-600" style="line-height: 1.2; white-space: nowrap;">29. prosince 2019</div>
          </div>
        <div style="flex: 1; text-align: justify; line-height: 1.2;" class="font-14 text-secondary font-400">Již třetí ročník oblíbených předsilvestrovských závodů agility pořádáme dne 29. prosince 2019
          v jízdárně Zemského hřebčince v Tlumačově.
          Program závodů se nemění, půjde opět o klasické dvojzkoušky agility,
          tentokrát však otevřené i pro nové velikostní kategorie psíků XS a ML.</div>
        </div>
      </div>

      <div style="width: 80vw; min-width: 300px; max-width:600px" class="q-py-lg">
        <t-header title="Aktuální tréninkové projekty" />
        <actual-projects-list />
      </div>

    </div>
  </q-page>
</template>

<script>
import THeader from '../components/THeader'
import TButton from '../components/TButton'
import ActualProjectsList from '../components/ActualProjectsList'
export default {
  name: 'PageIndex',
  components: { THeader, TButton, ActualProjectsList },
  data () {
    return {
      title: 'Závody - Tlumačovský dvojšpunt 2019'
    }
  },
  methods: {
    dvojspuntLink () {
      this.$router.push('/dvojspunt2019')
    }
  }
}
</script>
<style lang="stylus">

</style>
