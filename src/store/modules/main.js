import Vue from 'vue'
import db from '../../helpers/db'
export default {
  state: {
    genders: [{
      value: 'fena',
      label: 'fena'
    },
    {
      value: 'pes',
      label: 'pes'
    }
    ],
    breeds: [],
    caths: [{
      value: 'small',
      label: 'small'
    },
    {
      value: 'medium',
      label: 'medium'
    },
    {
      value: 'large',
      label: 'large'
    }
    ],
    breedsFetched: false
  },
  getters: {
    getBreeds: state => state.breeds,
    getCaths: state => state.caths,
    getGenders: state => state.genders,
    getBreedsFetched: state => state.breedsFetched || false
  },
  mutations: {
    setBreeds (state, data) {
      Vue.set(state, 'breeds', data.map((record) => {
        return {
          value: '' + record.id,
          label: record.breed
        }
      }))
    },
    setBreedsFetched (state, value) {
      Vue.set(state, 'breedsFetched', value)
    }
  },
  actions: {
    fetchBreeds (context) {
      if (context.getters.getBreedsFetched) return Promise.resolve()
      return db.get('breed').then((response) => {
        if (response.data.result !== 'OK' && response.data.message !== 'No records found.') {
          throw new Error('nepodařilo se navázat spojení se serverem')
        }
        if (response.data.message === 'No records found.') {
          throw new Error('data nenalezena')
        }
        context.commit('setBreeds', response.data.data)
        context.commit('setBreedsFetched', true)
      }).catch(function (e) {
        throw new Error('nepodařilo se navázat spojení se serverem')
      })
    },
    sendEntry (context, data) {
      return new Promise(function (resolve) {
        db.post('mail', {
          to: 'admin',
          message: JSON.stringify(data)
        }).then((response) => {
          resolve(response.data.result)
        }).catch((e) => {
          throw new Error('nepodařilo se navázat spojení se serverem')
        })
      })
    }
  }
}
