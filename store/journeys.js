export const state = () => ({
  journeys: {}
})

export const getters = {

}

export const mutations = {
  set(state, journeys) {
    state.journeys = journeys
  }
}

export const actions = {
  async fetchjourneys({ commit, dispatch }, context) {
    let journey = {};
    console.log('fetch journeys',commit, dispatch, context)
    await this.$axios.post('', {
        method: "liststreamitems",
        params: [
          "journeys",
          false,
          100,
          -100
        ],
        id: 1
      }
    ).then((response) => {
      console.log('fetching all journeys response!', response.data)
      let journeys = [];
      for (const journey of response.data.result) {
        console.warn('JOURNEY!', journey)
        journeys.push(journey.data.json)
      }
      commit('set', journeys)
    }).catch((response) => {
      console.error('fetching journeys with ID failed!', response)
    })
    console.log('after fetch', journey)

    return journey;
  },
}
