export const state = () => ({
  assets: []
})

export const getters = {

}

export const mutations = {
  set(state, assets) {
    state.assets = assets
  }
}

export const actions = {
  async listassets({ commit, dispatch }, assetName) {
    console.log('fetch asset',commit, dispatch, assetName)
    await this.$axios.post('', {
        method: "listassets",
        params: [
          assetName,
          false,
          100
        ],
        id: 1
      }
    ).then((response) => {
      console.log('fetching all assets response!', response.data)
      console.warn('assets!', response.data)
      if (response.data.error) {
        console.error(response.data.error)
        return;
      }
      commit('set', response.data.result)
    }).catch((response) => {
      console.error('fetching assets with ID failed!', response)
    })
  },
}