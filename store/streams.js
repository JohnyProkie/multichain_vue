export const state = () => ({
  streams: {}
})

export const getters = {

}

export const mutations = {
  set(state, streams) {
    state.streams = streams
  }
}

export const actions = {
  async liststreams({ commit, dispatch }, context) {
    let stream = {};
    console.log('fetch streams',commit, dispatch, context)
    await this.$axios.post('', {
        method: "liststreams",
        params: [
          "*",
          false,
          100,
          -100
        ],
        id: 1
      }
    ).then((response) => {
      console.log('fetching all streams response!', response.data)
      let streams = [];
      for (const stream of response.data.result) {
        console.warn('stream!', stream)
        streams.push(stream)
      }
      commit('set', streams)
    }).catch((response) => {
      console.error('fetching streams with ID failed!', response)
    })
    console.log('after fetch', stream)

    return stream;
  },
}