import Vue from 'vue'
import Vuex from 'vuex'
import canvasData from './modules/canvasData'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    canvasData,
  }
})
