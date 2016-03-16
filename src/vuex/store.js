import Vue from 'vue'
import Vuex from 'vuex'
import localInfo from './modules/localInfo'
import loading from './modules/loading'
import msgTip from './modules/msgTip'
import createLogger from 'vuex/logger'
import { localStorageMiddleware } from './middlewares'

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
    modules: {
        loading,
        msgTip,
        localInfo
    },
    strict: __DEV__,
    middlewares: __DEV__ ? [createLogger(),localStorageMiddleware] : [localStorageMiddleware]
})
