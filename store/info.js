export const state = () => ({
  info: {}
})

export const getters = {

}

export const mutations = {
  set(state, info) {
    state.info = info
  }
}

export const actions = {
  async fetchinfo({ commit, dispatch }, context) {
    console.log('fetch info',commit, dispatch, context)
    await this.$axios.post('', {
        method: "getinfo",
        params: [],
        id: 1
      }
    ).then((response) => {
      console.log('fetching getinfo response!', response.data)
      commit('set', response.data.result)
    }).catch((response) => {
      console.error('fetching info with ID failed!', response)
    })
  },
}