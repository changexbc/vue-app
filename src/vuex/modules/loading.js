import { SHOW_LOADING, HIDE_LOADING } from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    loadingShow: false,
}

// mutations
const mutations = {
    [SHOW_LOADING]( state ) {
        state.loadingShow = true
    },

    [HIDE_LOADING]( state ) {
        state.loadingShow = false
    }
}

export default{ state, mutations }
