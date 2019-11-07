import axios from 'axios'
import Vue from 'vue'
axios.defaults.baseURL = 'https://www.glabazna.cz'
import store from '../store/index.js'

export default {
  getConfig (method, givenPath, givenBody) {
    if (givenPath.substr(0, 1) !== '/') {
      givenPath = '/' + givenPath
    }
    let config = {
      method: method,
      url: givenPath,
      validateStatus: function (status) {
        return status < 500
      },
      headers: {
        'Accept': 'application/json, text/html',
        'Content-Type': 'application/json'
      }
    }
    if (store.getters['user/getUserLogged']) {
      Vue.set(config.headers, 'Authorization', 'Bearer ' + store.getters['user/getToken'])
    }
    if (givenBody && method !== 'GET') {
      config.data = givenBody
    }
    return config
  },
  get (path) {
    return this.apiCall('get', path, null)
  },
  post (path, body) {
    return this.apiCall('post', path, body)
  },
  put (path, body) {
    return this.apiCall('put', path, body)
  },
  delete (path, body) {
    return this.apiCall('post', path, body)
  },
  action (method, path, body) {
    return this.apiCall(method, path, body)
  },
  apiCall (method, path, body) {
    return axios(this.getConfig(method, path, body))
  }
}
