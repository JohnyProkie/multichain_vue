export const state = () => ({
  stream: {}
})

export const getters = {

}

export const mutations = {
  set(state, stream) {
    state.stream = stream
  }
}

export const actions = {
  /**
   * @TODO pagination
   */
  async liststreamitems({ commit, dispatch }, streamName) {
    console.log('fetch stream',commit, dispatch, streamName)
    await this.$axios.post('', {
        method: "liststreamitems",
        params: [
          streamName,
          false,
          100
        ],
        id: 1
      }
    ).then((response) => {
      console.log('fetching all streams response!', response.data)
      console.warn('stream!', response.data)
      if (response.data.error) {
        console.error(response.data.error)
        return;
      }
      commit('set', response.data.result)
    }).catch((response) => {
      console.error('fetching streams with ID failed!', response)
    })
  },
  async liststreamkeyitems({ commit, dispatch }, {streamName, key}) {
    console.log('liststreamkeyitems', streamName, key)
    await this.$axios.post('', {
        method: "liststreamkeyitems",
        params: [
            streamName,
            key,
            false,
            100
        ],
        id: 1
      }
    ).then((response) => {
      console.log('fetching all streams response!')
      console.warn('stream!', response)
      if (response.data.error) {
        console.error(response.data.error)
        return;
      }
      commit('set', response.data.result)
    }).catch((response) => {
      console.error('fetching streams with ID failed!', response)
    })
  },
}