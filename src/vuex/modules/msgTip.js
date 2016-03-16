import { SET_MSGTIP, HIDE_MSGTIP } from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    text:''||'😂',
    show:false,
    timer:0
}

// mutations
const mutations = {
    [SET_MSGTIP]( state, text ,timer ) {
        clearTimeout(state.timer)
        state.text = text
        state.timer = timer
        state.show = true
    },
    [HIDE_MSGTIP]( state ) {
        state.show = false
    },
}

export default{ state, mutations }