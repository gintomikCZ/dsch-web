import db from '../../helpers/db.js'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    trainings: {}
  },
  getters: {
    getTraining: state => id => state.trainings[id] || null,
    getProjectTrainingKeys: state => projectid => {
      projectid = '' + projectid
      return Object.keys(state.trainings).filter((key) => {
        return '' + state.trainings[key].projectid === projectid
      }).sort((a, b) => {
        return state.trainings[a].day.localeCompare(state.trainings[b].day)
      })
    },
    getEntriesFetched: state => trainingid => {
      trainingid = '' + trainingid
      if (!(trainingid in state.trainings) || !('entriesFetched' in state.trainings[trainingid])) return false
      return state.trainings[trainingid].entriesFetched
    }
  },
  mutations: {
    addTrainings (state, data) {
      data.forEach((record) => {
        let id = '' + record.id
        if (id in state.trainings) Vue.delete(state.trainings, id)
        Vue.set(state.trainings, id, record)
      })
    },
    setEntriesFetched (state, payload) {
      let id = '' + payload.trainingid
      if (id in state.trainings) {
        Vue.set(state.trainings[id], 'entriesFetched', payload.value)
      }
    }
  },
  actions: {
    fetchProjectTrainings (context, projectid) {
      projectid = '' + projectid
      if (context.rootGetters['projects/getTrainingsFetched'](projectid)) return Promise.resolve()
      return db.get('training?projectid=' + projectid + '&count=presentcount&count=entrycount&count=acceptedcount').then((response) => {
        if (response.data.result !== 'OK' && response.data.message !== 'No records found.') {
          throw new Error('nepodařilo se navázat spojení se serverem')
        }
        context.commit('addTrainings', response.data.message === 'No records found.' ? [] : response.data.data)
        context.commit('projects/setTrainingsFetched', { projectid, value: true }, { root: true })
      }).catch(function (e) {
        throw new Error('nepodařilo se navázat spojení se serverem')
      })
    }
  }
}
