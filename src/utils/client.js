import { Promise } from 'es6-promise'
import  store  from '../vuex/store'
import  { showLoading, hideLoading, setMsgTip, setUserId, setCity }  from '../vuex/actions'
import { localInfo, getQueryString, convertRequestURL } from '../utils/utils'

const client = {
    initializeAll(callback) {
        let userId = localStorage.getItem('dz_userId') || ''
        if(userId){
            callback()
            return
        }
        callback()
    }
}

export default client