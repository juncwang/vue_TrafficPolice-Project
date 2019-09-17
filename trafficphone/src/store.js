import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isList: false,
    isNav: false,
  },
  mutations: {
    setList(state, payload){
      state.isList = payload
    },
    setNav(state, payload){
      state.isNav = payload
    }
  },
  actions: {

  }
})
