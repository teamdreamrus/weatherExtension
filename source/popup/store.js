import { createStore } from 'vuex'
import { sendContentMessage } from '~/utils/tools'

export default createStore({
  state() {
    return {
      current: {},
      forecast: {},
      location: {},
      isLoading: true
    }
  },
  getters: {},
  mutations: {
    set(state, data) {
      Object.assign(state, data)
    },
    update(state, data) {
      // eslint-disable-next-line no-param-reassign
      state = { ...state, ...data }
    }
  },
  actions: {
    async initPopup({ commit }) {
      const { data } = await sendContentMessage({
        action: 'initPopup'
      })
      return commit('set', { ...data, isLoading: false })
    }
  }
})
