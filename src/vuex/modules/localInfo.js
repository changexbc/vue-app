import {
    SET_CITY,
    SET_USERID,
    SET_CARDPRICE,
    ADD_CARD,
    EDIT_CARD,
    DELETE_CARD
} from '../mutation-types'

// initial state
// shape: [{ id, quantity }]


const state = {
    cityId : '',
    cityName : '',
    userId : 0,
    cards: JSON.parse(localStorage.getItem('vue-oil-cards') || '[]'),
    cardPriceAll:{
        zsh:[],
        zsy:[]
    }
}

// mutations
const mutations = {
    [SET_CITY]( state , city ) {
        state.cityId = city.id
        state.cityName = city.name
    },
    [SET_USERID]( state , id ) {
        state.userId = id
    },
    [SET_CARDPRICE]( state , pricearr ) {
        console.log(pricearr)
        state.cardPriceAll = pricearr
    },
    [ADD_CARD]( state , card) {
        if(card.default == true){
            _.each(state.cards,(value,key) => {
                value.default = false
            })
        }
        state.cards.unshift(card)
    },
    [EDIT_CARD]( state , index, card ) {
        if(card.default == true){
            _.each(state.cards,(value,key) => {
                value.default = false
            })
        }
        state.cards[index] = card
    },
    [DELETE_CARD]( state , card ) {
        if(card.default == true){
            state.cards[0].default = true
        }
        state.cards.$remove(card)
    }
}

export default{ state, mutations }