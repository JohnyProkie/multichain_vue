export const state = () => ({
  streamItem: {}
})

export const getters = {

}

export const mutations = {
  set(state, stream) {
    state.streamItem = stream
  }
}

export const actions = {
  /**
   * @TODO pagination
   */
  async getstreamitem({ commit, dispatch }, {stream, txid}) {
    console.log('getstreamitem',commit, dispatch, stream, txid)
    await this.$axios.post('', {
        method: "getstreamitem",
        params: [
          stream,
          txid,
          true
        ],
        id: 1
      }
    ).then((response) => {
      console.log('getstreamitem response!', response.data)
      if (response.data.error) {
        console.error(response.data.error)
        return;
      }
      commit('set', response.data.result)
    }).catch((response) => {
      console.error('getstreamitem failed!', response)
    })
  },
}