import Vue from 'vue'
import Vuex from 'vuex'
import projects from './modules/projects.js'
import trainings from './modules/trainings.js'
import entries from './modules/entries.js'
import main from './modules/main'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main,
    projects,
    trainings,
    entries
  },
  strict: process.env.DEV
})
