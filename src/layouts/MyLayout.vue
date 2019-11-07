<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title tabindex="0" class="font-600" :class="{'t-title-hoverable': !isHome}" style="padding-left: 16px" @click="onClick">
          Dog School Chvalnov
        </q-toolbar-title>

        <div style="padding-right: 16px;">tréninky agility</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <div
        class="bg-accent full-width text-primary font-600 font-12 flex items-center justify-end font-300"
        style="min-height: 20px; max-height: 20px; line-height: 1.2; padding-right: 16px;">
        tomik 2018-2019
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  methods: {
    onClick () {
      this.$router.push('/')
    }
  },
  computed: {
    isHome () { return this.$route.path === '/' }
  }
}
</script>
<style lang="stylus">
.t-title-hoverable
  cursor: pointer
  transition: all .4s ease
.t-title-hoverable:focus, .t-title-hoverable:hover
  color: lighten($accent, 30%)
.t-title-hoverable:active
  transform: scale(0.95) translateY(-2px)
</style>
