<template>
  <div class="full-width full-height q-pa-md column items-center">
    <div style="width: 80vw; min-width: 300px; max-width:600px">
      <div class="q-py-md">
        <t-header title="Tlumačovský dvojšpunt 2019">
          <div class="column items-end" slot="button">
            <div class="text-secondary font-14 font-600">{{ 'dvojzkoušky agility' }}</div>
          </div>
        </t-header>
      </div>
      <div class="flex justify-start" style="min-width: 100%; max-width: 100%;">
        <div style="min-width:300px; overflow-y: auto; width: 80%;" class="q-mt-md">
          <div class="text-italic font-14 font-400 text-secondary" style="text-align: justify">
            Srdečně vás zveme na předsilvestrovské závody agility,
            které pořádáme v prostorách jezdecké haly Zemského hřebčince v Tlumačově.
          </div>
          <t-separator class="q-my-sm"/>
          <t-header title="základní informace" soft />
          <t-info-row title="datum" subtitle="neděle 29. prosince 2019"/>
          <t-info-row title="poradatel" subtitle="Dog School Chvalnov"/>
          <t-info-row title="osoba zodpovědná za závody" subtitle="Tomáš Glabazňa"/>
          <t-info-row title="kontaktní údaje" subtitle="email: tomas@glabazna.cz, tel: +420 731516974"/>
          <t-separator class="q-my-sm"/>
          <t-header title="místo" soft />
          <t-info-row subtitle="Zemský hřebčinec Tlumačov - jezdecká hala"/>
          <t-info-row title="souřadnice GPS" subtitle="49.2483 N; 17.5029 E"/>
          <t-info-row title="povrch" subtitle="písek/geotextílie"/>
          <t-separator class="q-my-sm"/>
          <t-header title="rozhodčí" soft/>
          <t-info-row subtitle="Tomáš Glabazňa (CZ)"/>
          <t-separator class="q-my-sm"/>
          <t-header title="program závodů" soft/>
          <t-info-row title="od 9:00 hod" subtitle="dvojzkoušky agility pořadí výkonnostních tříd A1, A2, A3."/>
          <t-info-row subtitle="přesný časový plán zveřejníme nejpozději 27. 12. 2019, až bude znám počet účastníků v jednotlivých velikostních kategoriích a výkonnostních třídách."/>
          <t-info-row title="velikostní kategorie" subtitle="závody budou otevřeny pro všech 5 velikostních kategorií psů podle aktuálně platného Řádu agility KAČR."/>
          <t-separator class="q-my-sm"/>
          <t-header title="startovné" soft/>
          <t-info-row title="1. pes" subtitle="320,- Kč"/>
          <t-info-row title="2. pes téhož psovoda" subtitle="270,- Kč"/>
          <t-info-row subtitle="týmy s výkonnostním průkazem KAČR, jejichž psovod není členem KAČR, platí startovné zvýšené o 100,- Kč. Startovné je s ohledem na náklady spojené s organizací nevratné."/>
          <t-info-row title="číslo účtu pro úhradu" subtitle="1558907001/5500"/>
          <t-separator class="q-my-sm"/>
          <t-header title="přihlašování" soft/>
          <t-info-row subtitle="pouze v systému kacr.info"/>
          <t-info-row subtitle="Závody se řídí platnými normativy Klubu agility ČR."/>
          <t-info-row title="uzávěrka přihlášek" subtitle="26. 12. 2019 nebo při naplnění kapacity"/>
          <t-info-row title="kapacita" subtitle="maximální počet účastníků je z kapacitních důvodů omezen na 100 týmů "/>
          <t-separator class="q-my-sm"/>
          <t-header title="vyhodnocení" soft/>
          <t-info-row subtitle="Vyhodnoceny budou oba zkouškové běhy jednotlivě, stejně tak i součty obou běhů. Pro vyhodnocení součtů budou výsledky kategorií XS a S spojeny do společné kategorie SMALL a výsledky kategorií ML a L do společné kategorie LARGE."/>

        </div>
      </div>

    </div>
  </div>
</template>
<script>
import TInfoRow from '../components/TInfoRow'
import TSeparator from '../components/TSeparator'
import THeader from '../components/THeader'
export default {
  name: 'DvojspuntPage',
  components: { THeader, TInfoRow, TSeparator }

}
</script>
