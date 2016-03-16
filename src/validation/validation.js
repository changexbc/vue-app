import { rules } from '../utils/utils'
import  store  from '../vuex/store'

const indexValidation = function(params) {
    if(params.IDCard == ''){
        store.dispatch('SET_MSGTIP','请输入身份证号')
        return false
    }
    if(params.name == ''){
        store.dispatch('SET_MSGTIP','请输入车主姓名')
        return false
    }
    if(params.tel == ''){
        store.dispatch('SET_MSGTIP','请输入手机号码')
        return false
    }
    if(params.password == ''){
        store.dispatch('SET_MSGTIP','请设置登录密码')
        return false
    }
    if(!rules.IDCard(params.IDCard)){
        store.dispatch('SET_MSGTIP','请输入正确的身份证号格式')
        return false
    }
    if(!rules.tel(params.tel)){
        store.dispatch('SET_MSGTIP','请输入正确的手机号码格式')
        return false
    }
    if(!rules.password(params.password)){
        store.dispatch('SET_MSGTIP','密码格式为8-16位字符 包含大写字母 小写字母 数字')
        return false
    }
    return true
}

export {
    indexValidation
}
