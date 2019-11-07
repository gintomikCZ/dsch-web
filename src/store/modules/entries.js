import db from '../../helpers/db.js'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    entries: {}
  },
  getters: {
    getEntry: state => entryid => state.entries[entryid] || null,
    getTrainingEntries: state => trainingid => {
      trainingid = '' + trainingid
      return Object.keys(state.entries).filter((key) => {
        return '' + state.entries[key].trainingid === trainingid
      })
    }
  },
  mutations: {
    addEntries (state, data) {
      data.forEach((record) => {
        let id = '' + record.id
        if (id in state.entries) Vue.delete(state.entries, id)
        Vue.set(state.entries, id, record)
      })
    }
  },
  actions: {
    fetchTrainingEntries (context, trainingid) {
      trainingid = '' + trainingid
      if (context.rootGetters['trainings/getEntriesFetched'](trainingid)) return Promise.resolve()
      return db.get('entry?trainingid=' + trainingid).then((response) => {
        if (response.data.result !== 'OK' && response.data.message !== 'No records found.') {
          throw new Error('nepodařilo se navázat spojení se serverem')
        }
        context.commit('addEntries', response.data.message === 'No records found.' ? [] : response.data.data)
        context.commit('trainings/setEntriesFetched', {
          trainingid,
          value: true
        }, {
          root: true
        })
      }).catch(function (e) {
        throw new Error('nepodařilo se navázat spojení se serverem')
      })
    }
  }
}
