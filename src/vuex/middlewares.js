const localStorageMiddleware = {
  onMutation (mutation, { localInfo }) {
  	let type = mutation.type
  	if(type == 'ADD_CARD' || type == 'EDIT_CARD' || type == 'DELETE_CARD'){
	  	if(_.isArray(localInfo.cards)){
	    	localStorage.setItem('vue-oil-cards', JSON.stringify(localInfo.cards))
	  	}
  	}
  }
}

export { localStorageMiddleware }
