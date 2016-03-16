<template>
    <modal id="modal-pay" :show.sync="show" mask-close="true">
        <div class='pay'>
            <div class='modal-header'>
                <span class="modal-cancle" @click='show = false'>取消</span>
                <h1 class="modal-title">选择付款方式</h1>
                <span class="modal-confirm"></span>
            </div>
            <div class="pay-main">
                <ul class="pay-type">
                    <li class="pay-type__item" :class="{ disabled : cannotUseWallet }">
                        <i class="pay-type__select-button" @click='setPayType(19)' :class='{ active:payType == 19 }'></i>
                        <div class='pay-type__content' @click='setPayType(19)'>
                            <span class="pay-type__logo">
                                <img src="../images/icon-pay-type1.png" alt="">
                            </span>
                            <div class="pay-type__info" v-if='hasWalletInfo'>
                                <p class="pay-type__name">汽车钱包<span class="pay-type__balance">¥ {{ walletInfo.usedMoney }}可用</span></p>
                                <p class="wallet-intro">可投年化{{ walletInfo.rate }}，可活期消费</p>
                            </div>
                            <div class="pay-type__info" v-if='!hasWalletInfo'>
                                <loading :size='14' :auto-size='true'></loading>
                            </div>
                        </div>
                        <span class="wallet-recharge" :class="{ under: redirectUrl == '' }" @click='goHfax'>
                            {{ walletInfo.status | walletStatus2text }}
                        </span>
                    </li>
                    <li class="pay-type__item">
                        <i class="pay-type__select-button" @click='setPayType(3)' :class='{ active:payType == 3 }'></i>
                        <div class='pay-type__content' @click='setPayType(3)'>
                            <span class="pay-type__logo">
                                <img src="../images/icon-pay-type2.png" alt="">
                            </span>
                            <div class="pay-type__info">
                                <p class="pay-type__name">银行卡支付</p>
                                <p class="pay-type__text">支持储蓄卡，信用卡，无需网银</p>
                            </div>
                        </div>
                    </li>
                    <li class="pay-type__item">
                        <i class="pay-type__select-button" @click='setPayType(1)' :class='{ active:payType == 1 }'></i>
                        <div class='pay-type__content' @click='setPayType(1)'>
                            <span class="pay-type__logo">
                                <img src="../images/icon-pay-type3.png" alt="">
                            </span>
                            <div class="pay-type__info">
                                <p class="pay-type__name">支付宝支付</p>
                            </div>
                        </div>
                    </li>
                    <li class="pay-type__item">
                        <i class="pay-type__select-button" @click='setPayType(10)' :class='{ active:payType == 10 }'></i>
                        <div class='pay-type__content' @click='setPayType(10)'>
                            <span class="pay-type__logo">
                                <img src="../images/icon-pay-type4.png" alt="">
                            </span>
                            <div class="pay-type__info">
                                <p class="pay-type__name">微信支付</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <footer class="pay-footer">
                <span class="button" :class='{disabled:!payType}' @click="payment">确认支付 ¥ {{ orderPrice }}</span>
            </footer>
        </div>
    </modal>
</template>

<script>
    import { Promise } from 'es6-promise'
    import store from '../store/index'
    import ga_storage from '../utils/GALocalStorage'
    import { getQueryString, convertParams, convertRequestURL, localInfo } from '../utils/utils'
    import client from '../utils/client'
    import modal from './Modal.vue'
    import loading from '../components/Loading.vue'

    export default {
        props:{
            orderId:Number,
            orderPrice:Number,
            show:{
                type: Boolean,
                required: true,
                twoWay: true
            },
            onSuccess:{
                type: Function,
                default() {}
            }
        },
        created(){
            ga_storage._trackPageview('order/components/pay', "订单详情支付组件");
            this.setWalletInfo()
            this.setRedirectUrl()
        },
        data() {
            return {
                payType:0,
                walletInfo:{},
                hasWalletInfo:false,
                redirectUrl:''
            }
        },
        computed:{
            frontNotifyUrl(){
                if(this.payType == 19){
                    return `http://www.chengniu.com/home/10000021/App/index.html?orderId=${this.orderId}`
                }
                return ''
            },
            cannotUseWallet(){
                if(!this.hasWalletInfo){
                    return true
                }
                if(this.walletInfo.usedMoney >= this.orderPrice){
                    return false
                }
                return true
            }
        },
        filters:{
            walletStatus2text(status){
                if(status == '5'){
                    return '去充值'
                }
                return '去充值'
            }
        },
        methods:{
            getWalletInfo(orderId){
                return new Promise( (resolve, reject) => {
                    $.ajax({
                        type:"get",
                        url: convertRequestURL("carwallet/getWalletInfo.htm"),
                        data: convertParams({
                            uid:localInfo.getUid(),
                            usedCache:true
                        }),
                        success: (resp) => {
                            if(resp.code){
                                store.actions.setMsgTip(resp.msg);
                                resolve(resp)
                                return
                            }

                            let data = resp.data
                            resolve(data)
                        },
                        error: () => {
                            store.actions.setMsgTip('获取钱包信息失败')
                            reject(new Error('获取钱包信息失败'));
                        }
                    });
                })
            },
            // 获取汽车钱包页面跳转地址
            getRedirectUrl(){
                return new Promise( (resolve, reject) => {
                    $.ajax({
                        type:"get",
                        data:convertParams({
                            uid:localInfo.getUid(),
                            page:'cninvest'
                        }),
                        url:convertRequestURL('carwallet/getRedirectUrl.htm'),
                        dataType:"json",
                        success(resp){
                            if(resp.code){
                                store.actions.setMsgTip(resp.msg)
                                resolve()
                                return
                            }
                            let redirectUrl = resp.data.redirectUrl
                            resolve(redirectUrl)
                        },
                        error(){
                            store.actions.setMsgTip('获取汽车钱包页面跳转地址失败！')
                            reject(new Error('获取汽车钱包页面跳转地址失败！'));
                        }
                    })
                })
            },
            setWalletInfo(){
                let getWalletInfoPromise = this.getWalletInfo()
                .then(result => {
                    this.walletInfo = result
                    this.hasWalletInfo = true
                })
                .catch(error => {
                    console.error(error)
                })
            },
            setRedirectUrl(){
                let promiseGetRedirectUrl = this.getRedirectUrl()
                .then(result => {
                    this.redirectUrl = result
                })
                .catch(error => {
                    console.error(error)
                })
            },
            setPayType(payType){
                this.payType = payType
            },
            updatePayStatus(orderId){
                //上传订单状态
                return new Promise( (resolve, reject) => {
                    $.ajax({
                        type:"get",
                        url: convertRequestURL("formOrder/updatePayStatus.htm"),
                        data: convertParams({
                            orderId:orderId
                        }),
                        success: (resp) => {
                            if(resp.code){
                                store.actions.setMsgTip(resp.msg);
                                resolve()
                                return
                            }
                            resolve(resp)
                        },
                        error: () => {
                            store.actions.setMsgTip('上传订单状态失败')
                            reject(new Error('上传订单状态失败'));
                        }
                    });
                })
            },
            payment(){

                let type_name
                let payInfo = {
                    orderId:this.orderId,
                    payType:this.payType,
                    frontNotifyUrl:this.frontNotifyUrl
                }

                if(this.payType == 19){
                    type_name = '汽车钱包'
                }
                else if(this.payType == 3){
                    type_name = '银行卡支付'
                }
                else if(this.payType == 1){
                    type_name = '支付宝支付'
                }
                else if(this.payType == 10){
                    type_name = '微信支付'
                }
                ga_storage._trackEvent('选择不同的支付方式进行支付', 'paymethod_h5', type_name)


                Daze.pay(payInfo,(resp) => {
                    if(resp.isSuccess){
                        // store.actions.setMsgTip('支付成功')
                        store.actions.showLoading()
                        let promiseUpdatePayStatus = this.updatePayStatus(this.orderId)
                        .then(result => {
                            this.onSuccess()
                            this.show = false
                            store.actions.hideLoading()
                        })
                        .catch(error => {
                            store.actions.hideLoading()
                            console.error(error)
                        })
                    }
                })
            },
            goHfax(){
                if(this.versionSupport()){
                    ga_storage._trackEvent('选择支付方式页面点击“去充值”按钮', 'paymethod_recharge_h5', '成功')
                    Daze.pushWindow(this.redirectUrl)
                }
                else{
                    ga_storage._trackEvent('选择支付方式页面点击“去充值”按钮', 'paymethod_recharge_h5', '当前版本暂不支持汽车钱包')
                    store.actions.setMsgTip('当前版本暂不支持,请前往app store下载最新版本')
                }
            },
            versionSupport(){
                let system = client.getSystem()
                let latestVersion = ''
                if(system == 'android'){
                    latestVersion = '5000'
                }
                else if(system == 'ios'){
                    latestVersion = '5.0.0';
                }
                return client.compareVersion(latestVersion)
            }
        },
        components:{ modal, loading }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #modal-pay{
        &.modal-enter,
        &.modal-leave {
            opacity: 0;
            .modal-container{
                transform:translate3d(0,0,0) scale(1);
            }
        }
        .modal-container{
            width:100%;
            left:0;
            top:auto;
            bottom:0;
            transform:none;
        }
        .pay-main{
            background-color: #FFF
        }
        .pay-type__item{
            display:flex;
            justify-content:space-between;
            align-items: center;
            position:relative;
            &:last-child{
                .pay-type__content{
                    border-bottom:none;
                }
            }
            &.disabled{
                &:after{
                    content:'';
                    background-color: rgba(#FFF,.6);
                    position:absolute;
                    width:100%;
                    height:100%;
                    top:0;
                    left:0;
                }
            }
        }
        .pay-type__select-button{
            display:block;
            width:18px;
            padding:0 16px;
            &:before{
                content:'';
                display:block;
                width:16px;
                height:16px;
                border:1px solid $defaultColor;
                border-radius:50%;
            }
            &.active{
                &:before{
                    border-color:$orange;
                    background:$orange url(../images/iconfont-appduigou.png) no-repeat center 4px;
                    background-size: 12px 12px;
                }
            }
        }
        .pay-type__content{
            flex:1;
            display:flex;
            align-items:center;
            padding:10px 0;
            border-bottom:1px solid $sectionColor;
        }
        .pay-type__logo{
            display:block;
            width:34px;
            height:34px;
            img{
                width:100%;
                height:100%;
            }
        }
        .pay-type__info{
            padding:0 16px;
        }
        .pay-type__name{
            color:$importColor;
        }
        .pay-type__text{
            @extend %font-footnote;
            padding-top:6px;
        }
        .pay-type__balance{
            @extend %font-footnote;
            padding-left:10px;
            color:$defaultColor;
        }
        .wallet-intro{
            @extend %font-footnote;
            color:$orange;
            padding-top:6px;
        }
        .wallet-recharge{
            position:absolute;
            z-index:2;
            right:16px;
            top:50%;
            transform:translate(0,-50%);
            padding:6px 8px;
            color:$orange;
            border:1px solid $orange;
            border-radius:2px;
            &:active{
                color:#fff;
                background-color: $orange;
            }
            &.under{
                z-index:0;
            }
        }
        .pay-footer{
            padding:16px;
            box-sizing:border-box;
            background-color: #fff;
            border-top:1px solid $sectionColor;
            width:100%;
            text-align:center;
            font-size:12px;
            color:$gray;
        }
    }
</style>


