import * as types from './mutation-types'

export const showLoading = ({ dispatch, state }) => {
	dispatch(types.SHOW_LOADING)
}
export const hideLoading = ({ dispatch, state }) => {
  setTimeout(() => {
    dispatch(types.HIDE_LOADING)
  },0)
}

export const setMsgTip = ({ dispatch, state },text) => {
  let timer = setTimeout(() => {
     dispatch(types.HIDE_MSGTIP)
  },2500)
  dispatch(types.SET_MSGTIP, text, timer)
}

export const setCity = ({ dispatch, state }, city ) => dispatch(types.SET_CITY, city)
export const setUserId = ({ dispatch, state }, id) => dispatch(types.SET_USERID, id)
export const setCardPrice = ({ dispatch, state }, priceArr) => dispatch(types.SET_CARDPRICE, priceArr)
export const addCard = ({ dispatch, state }, card) => dispatch(types.ADD_CARD, card)
export const editCard = ({ dispatch, state }, index, card) => dispatch(types.EDIT_CARD, index, card)
export const deleteCard = ({ dispatch, state }, card) => dispatch(types.DELETE_CARD, card)
