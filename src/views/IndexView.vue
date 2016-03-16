<template>
    <div id='oil-index'>

        <div class='router-inner oil-index-view' v-show="!$loadingRouteData" transition="fade">
            <header class="header">
                <div class="header-btn" v-if='cards.length'>
                    <div class="header-btn__list" @click="toggleManage">
                        <div class="header-btn__item">
                            <img src="../images/oil_manage.png" height="24" width="24"><span>管理油卡</span>
                        </div>
                        <div class="header-btn__item num">
                            <i>{{ cards.length }}张</i>
                        </div>
                    </div>
                </div>
            </header>
            <div class="wrapper" :class="{ 'no-header':!cards.length }">

                <section class="main">

                    <div class="oil-card no-card" v-if="!cards.length">
                        <p class="no-card__title">你还没有添加油卡哦</p>
                        <span class="no-card__button" @click="goEdit()">＋添加油卡</span>
                    </div>

                    <div class="oil-card" v-if="cards.length" @click="showCardList">
                        <img class="oil-card__logo"
                            :src="cardSelect.type | type2src">
                        <div class="oil-card__num">
                            <p>{{cardSelect.num | numSplit }}</p>
                            <p>{{cardSelect.remark}}</p>
                        </div>
                        <span class="oil-card__change"></span>
                    </div>

                    <div class="card-price">
                        <h1>选择充值金额</h1>
                        <div class='card-price-box'>
                            <loading class='card-price-loading' :size='20' v-if='!cardPriceArrLength' transition='fade'></loading>
                            <ul class="card-price__list" v-if='cardPriceArrLength' transition='fade'>
                                <li v-for="item in cardPriceArr"
                                    :class="{ active: cardPrice == item }">
                                    <span class="card-price__item" @click="changePrice(item)">{{item}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="pay">
                        <a class="button" :class="{ disabled : payDisabled }" @click='contact_show = true'>立即充值</a>
                    </div>

                    <div class="explain" id="showServiceDetail" v-if="false">
                        <dl>
                            <dt class="clearfix">加油卡充值说明
                            <div class="show-service-detail"><img src="../images/caption_b-12.png"/><span v-on="click:pushWindow('service-detail-zsh.html')">中国石化服务说明</span></div>
                            </dt>
                            <dd>
                                <div>1.充值成功后，请先到加油站圈存即可使用</div>
                                <div>2.圈存操作：加油前，请将油卡交给工作人员圈存即可</div>
                                <div>3.官方直充，全国通用，充值成功后，立即到账</div>
                            </dd>
                        </dl>
                    </div>

                    <div class="explain" id="showServiceDetail" >
                        <dl>
                            <dt class="clearfix">加油卡充值说明
                            <div class="show-service-detail">
                                <!-- <img src="../images/caption_b-12.png"/> -->
                                <!-- <span @click="pushWindow('service-detail-zsy.html')">中国石油服务说明</span> -->
                            </div>
                            </dt>
                            <dd>
                                <div>1.充值成功后，请先到加油站圈存即可使用</div>
                                <div>2.圈存操作：加油前，请将油卡交给工作人员圈存即可</div>
                                <div>3.官方直充，全国通用，充值成功后，立即到账</div>
                            </dd>
                        </dl>
                    </div>

                    <div class="tel">
                        <p>服务电话(9:00-21:00)</p>
                        <p><a href="tel:4008066330">4008 066 330</a></p>
                    </div>
                </section>
            </div>

            <footer class="footer">
                <div class='link-list'>
                    <a class='link-item'>
                        <span><img src="../images/ico-weizhang.png"></span>
                        <p>查违章</p>
                    </a>
                    <a class='link-item'>
                        <span><img src="../images/ico-fakuan.png"></span>
                        <p>罚款代缴</p>
                    </a>
                    <a class='link-item'>
                        <span><img src="../images/ico-youka.png"></span>
                        <p>油卡充值</p>
                    </a>
                    <a class='link-item'>
                        <span><img src="../images/ico-me.png"></span>
                        <p>我的</p>
                    </a>
                </div>
            </footer>

            <!-- 更换油卡 -->
            <modal class="modal-change-card modal-bottom" :show.sync="modal_card_list" :on-cancle="cancleCardSelect" mask-close="true">

                <div class='modal-header'>
                    <span class="modal-cancle" @click='cancleCardSelect'>取消</span>
                    <h1 class="modal-title">选择油卡</h1>
                    <span class="modal-confirm" @click='confirmCardSelect'>确定</span>
                </div>
                <div class="change-card-main">
                    <ul v-if='cards.length'>
                        <li class="oil-card" v-for="item in cards"
                            @click='changeCard($index)'
                            :class="{ select:cardIndex == $index }">
                            <img class="oil-card__logo" :src="item.type | type2src">
                            <div class="oil-card__num">
                                <p>{{ item.num | numSplit }}</p>
                                <p>{{ item.remark }}</p>
                            </div>
                            <span class="select-icon"></span>
                        </li>
                    </ul>
                </div>
            </modal>

            <!-- 管理油卡 -->
            <modal class="modal-card-manage" :show.sync="modal_card_manage" mask-close="true">
                <div class="manage-card-list">
                    <ul v-if='cards.length'>
                        <li class="oil-card" v-for="item in cards"
                            @click='goEdit(item.num)'>
                            <img class="oil-card__logo" :src="item.type | type2src">
                            <div class="oil-card__num">
                                <p>{{ item.num | numSplit }}</p>
                                <p>{{ item.remark }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="manage-add-button">
                    <span class="button" @click='goEdit()'>添加油卡</span>
                </div>
            </modal>

            <!-- 联系方式 -->
            <contact
                :show.sync='contact_show'
                :on-confirm='pay'>
            </contact>

        </div>
    </div>

</template>

<script>
    import { Promise } from 'es6-promise'
    import { setCardPrice } from '../vuex/actions'
    import { localInfo, getQueryString, rules } from '../utils/utils'
    import { indexApi } from '../api/api'
    import modal from '../components/Modal.vue'
    import loading from '../components/Loading.vue'
    import contact from '../components/Contact.vue'

    export default {
        data() {
            return {
                oilPrice:[],
                cardIndex:0,
                cardIndexOld:-1,
                cardPriceSelect:'',
                modal_card_list:false,
                modal_card_manage:false,
                contact_show:false
            }
        },
        vuex: {
            getters: {
                localInfo: state => state.localInfo,
                cards: ({ localInfo }) => localInfo.cards,
                cardPriceAll: ({ localInfo }) => localInfo.cardPriceAll,
                userId: ({ localInfo }) => localInfo.userId
            },
            actions:{
                setCardPrice
            }
        },
        computed:{
            cardSelect(){
                return this.cards[this.cardIndex] || {
                    num:'',
                    type:0,
                    default:false,
                    remark:''
                }
            },
            cardTrim(){
                return this.cardSelect.num.replace(/\s/g, '')
            },
            cardPriceArr() {
                if(this.cardSelect.type == 0) return this.cardPriceAll.zsh
                else return this.cardPriceAll.zsy
            },
            cardPriceArrLength(){
                return this.cardPriceArr.length
            },
            cardPrice(){
                if(!_.find(this.cardPriceArr,value => value == this.cardPriceSelect)){
                    this.cardPriceSelect = this.cardPriceArr[0] || '?'
                }
                return this.cardPriceSelect
            },
            payDisabled(){
                return !this.cardPriceArrLength || !this.cards.length
            }
        },
        filters:{
            numSplit(value) {
                if(!value){
                    return
                }
                return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
            },
            type2src(value) {
                if(!value){
                    return require('../images/cardicon_zgsh.png')
                }
                return require('../images/cardicon-zgsy.png')

            }
        },
        methods:{
            setPrice(){
                let promise_getChargeAmount0 = indexApi.getChargeAmount({ userid:this.userId, cardType:0 })
                let promise_getChargeAmount1 = indexApi.getChargeAmount({ userid:this.userId, cardType:1 })
                Promise.all([promise_getChargeAmount0, promise_getChargeAmount1])
                .then(results => {
                    setTimeout(()=>{
                        this.setCardPrice({
                            zsh:results[0],
                            zsy:results[1]
                        })
                    },2000)
                })
                .catch(errors => { console.error(errors) })
            },
            setDefault(){
                _.each(this.cards,(value,key)=> {
                    if(value.default == true){
                        this.cardIndex = key
                        return false
                    }
                })
            },
            showCardList(){
                this.modal_card_list = true
                this.cardIndexOld = this.cardIndex
            },
            changePrice(price){
                this.cardPriceSelect = price
            },
            changeCard(index){
                this.cardIndex = index
            },
            cancleCardSelect(){
                this.modal_card_list = false
                this.cardIndex = this.cardIndexOld
            },
            confirmCardSelect(){
                this.modal_card_list = false
            },
            toggleManage(){
                this.modal_card_manage = !this.modal_card_manage
            },
            goEdit(num){
                let router = this.$route.router
                if(num){
                    router.go({
                        name: 'edit',
                        params:{ cardnum:num }
                    });
                    return
                }
                router.go({
                    name: 'add'
                });
            },
            goPage(){
                let params = {
                    IDCard:this.IDCard,
                    name:this.name,
                    tel:this.tel,
                    password:this.password
                }
                if(!indexValidation(params)){
                    return
                }
                let router = this.$route.router
                router.go({
                    name: 'detail'
                });
            },
            api_chargeCost(result){
                let promise_chargeCost = indexApi.chargeCost({
                    userid:this.userId,
                    cardNo:this.cardTrim,
                    cardType:this.cardSelect.type,
                    chargeAmount:this.cardPrice
                })
                return promise_chargeCost
            },
            api_submitOrder(result){
                let promise_submitOrder = indexApi.submitOrder({
                    userid:this.userId,
                    cardNo:this.cardTrim,
                    cardType:this.cardSelect.type,
                    chargeAmount:this.cardPrice,
                    contactName:'zhangjia',
                    contactPhone:'13625817215'
                })
                return promise_submitOrder
            },
            pay(){
                this.setMsgTip('只是demo😄')
            }
        },
        components: {
            modal,
            loading,
            contact
        },
        created(){
            console.log(this.cardPriceAll)
            this.setDefault()

            if(this.cardPriceAll.zsh.length && this.cardPriceAll.zsy.length){ return }
            this.setPrice()
        },
        route: {
            data(transition) {
                transition.next()
            }
        }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .oil-index-view{
        .header{
            position: relative;
            z-index:10;
            background-color: #FFF;
            .header-btn__list{
                display:flex;
                justify-content:space-between;
                position: relative;
                border-bottom:1px solid $sectionColor;
            }
            .header-btn__item{
                padding:19px 16px;
                color:$importColor;
                font-size:15px;
                font-weight:bold;
                display:flex;
                align-items:center;
                img{
                    padding-right:16px;
                }
                i{
                    color:$defaultColor;
                    display:block;
                    font-weight: normal;
                }
            }
        }
        .wrapper{
            padding-top:62px;
            &.no-header{
                padding-top:0;
            }
        }
        .oil-price{
            display:flex;
            align-items:center;
            justify-content:space-between;
            background-color: #fff;
            padding: 8px 10px 0 10px;
        }
        .oil-price__text{
            padding: 2px 0 5px 0;
            color:$importColor;
            p{
                @extend %font-headline;
            }
            span{
                @extend %font-footnote;
                color:$defaultColor;
            }
            i{
                padding: 5px 20px 0 0;
                font-size: 12px;
                display: inline-block;
                overflow: hidden;
                position: relative;
                max-width: 7em;
            }
        }
        .oil-price__list{
            display: flex;
        }
        .oil-price__item{
            margin-left: 7px;
            width: 80px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .oil-price__info{
            border-width: 2px 2px 0;
            border-color: #8d8d8d;
            border-style: solid;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
            top: 0;
            left: 0;
            border-radius: 10px 10px 0 0;
            box-shadow: 0px -8px 10px -6px rgba(169,168,168,0.4) inset;
            h5{
                position: absolute;
                color: white;
                width: 45px;
                background-color: #8d8d8d;
                border-radius: 80px;
                height: 40px;
                line-height: 16px;
                bottom: -25px;
                left: -20px;
                text-align: right;
                padding-right: 18px;
            }
            p{
                font-size: 24px;
                padding: 10px 16px 18px 16px;
                color: $importColor;
            }
        }
        .main{
            padding-bottom:100px;
        }
        .oil-card{
            margin: 16px 0 0 0;
            padding: 16px 0;
            background-color: #fff;
            font-size: 14px;
            border-bottom: 1px solid $sectionColor;
            display:flex;
            align-items:center;
            &.no-card{
                display: block;
                margin: 0 0 0 0;
                background-color: transparent;
            }
            .no-card__title{
                padding-top: 15px;
                text-align: center;
            }
            .no-card__button{
                display: block;
                width: 180px;
                margin: 8px auto 16px auto;
                color: $orange;
                border: 1px solid $orange;
                border-radius: 30px;
                text-align: center;
                padding: 14px 0;
                font-size: 16px;
            }
        }
        .oil-card__logo{
            display: block;
            width: 40px;
            height: 40px;
            padding: 0 16px;
        }
        .oil-card__num{
            flex:1;
            p{
                font-size: 15px;
                color:$importColor;
                &:last-child{
                    padding-top: 8px;
                    color:$defaultColor;
                    font-size:14px;
                }
            }
        }
        .oil-card__change{
            font-size: 13px;
            padding: 0 16px;
            color:$importColor;

        }
        .card-price{
            padding: 15px;
            background-color: #fff;
            h1{
                font-size: 15px;
                font-weight: bold;
                padding: 10px 0 20px 0;
                color:$importColor;
            }
        }
        .card-price-box{
            position: relative;
            height:40px;
        }
        .card-price-loading{
            height:100%;
        }
        .card-price__list{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            display:flex;
            li{
                width: 10%;
                flex: 1;
                margin-left: 8px;
                box-sizing: border-box;
                position: relative;
                border: 2px solid #ccc;
                border-radius: 2px;
                color:$importColor;
                &.active{
                    border-color: $orange;
                    background: $orange;
                    color: #fff;
                }
                &:first-child{
                    margin-left: 0;
                }
            }
        }
        .card-price__item{
            display: block;
            padding: 10px;
            font-size: 15px;
            text-align: center;
        }
        .pay{
            padding:15px;
            text-align:center;
        }
        .explain{
            dl{
                padding: 0px 24px 20px 24px;
                dt{
                    font-size: 14px;
                    line-height: 20px;
                    padding-bottom: 10px;
                    color: $importColor;
                }
                dd{
                    line-height: 20px;
                    padding-left: 6px;
                    position: relative;
                }
            }
            .show-service-detail{
                font-size: 12px;
                float: right;
                color: #5667fc;
                display: flex;
                align-items: center;
                img{
                    display: block;
                    width: 12px;
                    margin-right: 5px;
                }
                span{
                    display: block
                }
            }
        }
        .tel {
            margin: 0 24px;
            padding: 16px 0;
            text-align: center;
            font-size: 12px;
            border-top: #e8e8e8 1px solid;
            line-height: 20px;
        }

        .tel p:nth-child(2) {
            font-size: 16px;
            a{
                color: $importColor;
            }
        }

        .form-tips{
            @extend %font-footnote;
            padding-top: 8px;
            text-align:center;
        }
        .footer{
            position:absolute;
            bottom:0;
            width:100%;
            left:0;
            transition:all ease .3s;
            padding:16px 18px;
            box-sizing:border-box;
            .link-list{
                display:flex;
            }
            .link-item{
                display: block;
                width:20%;
                flex:1;
                text-align:center;
            }
            span{
                display: block;
                padding-bottom:3px;
                img{
                    width:48px;
                }
            }
        }
        .order__pay{
            padding:16px;
            background-color: #f8f8f8;
            border-top:1px solid #ccc;
            display:flex;
            justify-content:space-between;
            align-items:center;
        }
        .order__pay-price{
            .price-real{
                display:block;
                font-size:20px;
                color:$orange;
            }
            .price-discount{
                display:block;
                padding-top:4px;
                font-size:12px;
                color:$gray;
            }
        }
        .modal-bottom .modal-container {
            position: absolute;
            bottom: 0;
            top: auto;
            width: 100%;
            left: 0;
            -webkit-transform: none;
            transform: none;
        }

        .modal-bottom.modal-enter .modal-container,
        .modal-bottom.modal-leave .modal-container {
            -webkit-transform: translate3d(0, 5%, 0);
            transform: translate3d(0, 5%, 0);
        }
        .change-card-main {
            max-height: 250px;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
        }

        .change-card-main .oil-card {
            position: relative;
            margin: 0;
            border-bottom: 1px solid #eeeeee;
        }

        .change-card-main .oil-card:last-child {
            border-bottom: none;
        }

        .change-card-main .oil-card.select .select-icon {
            display: block;
        }

        .change-card-main .select-icon {
            display: none;
            position: absolute;
            top: 50%;
            right: 16px;
            transform: translate(0, -50%);
            width: 17px;
            height: 17px;
            background: url(../images/iconfont-duigou-index.png) no-repeat center center;
            -webkit-background-size: 17px 17px;
        }

        .change-card-main .oil-card-item {
            padding-top: 8px;
            padding-bottom: 4px;
        }
        .modal-card-manage{
            z-index:9;
            &.modal-enter .modal-container{
                transform:translate3d(-50%,-20px,0);
            }
            &.modal-leave .modal-container{
                transform:translate3d(-50%,-21px,0);
            }
            .modal-container{
                width:100%;
                padding-top:62px;
                max-height:100%;
                top:0;
                box-sizing: border-box;
                transform:translate3d(-50%,0,0);
            }
            .manage-card-list{
            }
            .oil-card{
                margin:0;
                position: relative;
                &:after{
                    width:21px;
                    height: 21px;
                    content:'';
                    position: absolute;
                    right:15px;
                    top:50%;
                    margin-top:-11px;
                    background: url(../images/iconfont-bianji.png) no-repeat center right;
                    background-size: 21px 21px;
                    -webkit-background-size: 21px 21px;
                }
            }
            .manage-add-button{
                display: flex;
                justify-content:center;
                padding:10px;
                .button{
                    width:120px;
                }
            }
        }
    }
</style>


