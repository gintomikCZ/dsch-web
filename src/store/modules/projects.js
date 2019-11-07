import db from '../../helpers/db.js'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    projectsForList: {},
    projectsForListFetched: false,
    projectsDetail: {}
  },
  getters: {
    getProjectDetail: state => id => state.projectsDetail[id] || null,
    getProjectForList: state => id => state.projectsForList[id] || null,
    getProjectKeys: state => Object.keys(state.projectsForList) || [],
    getTrainingsFetched: state => projectid => {
      projectid = '' + projectid
      if (!(projectid in state.projectsDetail) || !('trainingsFetched' in state.projectsDetail[projectid])) return false
      return state.projectsDetail[projectid].trainingsFetched
    }
  },
  mutations: {
    setTrainingsFetched (state, payload) {
      let id = '' + payload.projectid
      if (id in state.projectsDetail) {
        Vue.set(state.projectsDetail[id], 'trainingsFetched', payload.value)
      }
    },
    setProjectDetail (state, record) {
      let id = '' + record.id
      if (id in state.projectsDetail) Vue.delete(state.projectsDetail, id)
      Vue.set(state.projectsDetail, id, record)
    },
    setProjectsForList (state, data) {
      Vue.set(state, 'projectsForList', {})
      data.forEach(record => {
        let id = '' + record.id
        Vue.set(state.projectsForList, id, record)
      })
    },
    setProjectsForListFetched (state, value) {
      Vue.set(state, 'projectsForListFetched', value)
    }
  },
  actions: {
    fetchProjectsForList (context) {
      if (context.state.projectsForListFetched) return Promise.resolve()
      return db.get('project/view:forlist?actual=true&count=training').then(response => {
        if (response.data.result !== 'OK' && response.data.message !== 'No records found.') {
          throw new Error('nepodařilo se navázat spojení se serverem')
        }
        context.commit('setProjectsForList', response.data.message === 'No records found.' ? [] : response.data.data)
        context.commit('setProjectsForListFetched', true)
      }).catch(function (e) {
        throw new Error('nepodařilo se navázat spojení se serverem')
      })
    },
    fetchProject (context, id) {
      id = '' + id
      if (id in context.state.projectsDetail) return Promise.resolve()
      return db.get('project/' + id + '?count=training').then((response) => {
        if (response.data.result !== 'OK' && response.data.message !== 'No records found.') {
          throw new Error('nepodařilo se navázat spojení se serverem')
        }
        if (response.data.message === 'No records found.') {
          throw new Error('data nenalezena')
        }
        context.commit('setProjectDetail', response.data.data)
      }).catch(function (e) {
        throw new Error('nepodařilo se navázat spojení se serverem')
      })
    }
  }
}
