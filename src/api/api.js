import { Promise } from 'es6-promise'


const indexApi = {

    //获取油卡充值金额列表
    getChargeAmount(params){
        return Promise.resolve([100,200,300,400])
    }
}


export { indexApi }