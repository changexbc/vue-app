<template>
    <div id='oil-edit'>

        <div class='router-inner oil-edit-view' v-show="!$loadingRouteData" transition="fade">
            <div class="wrapper">

                <header class="header">

                </header>

                <section class="main">
                    <div class="card-add">
                        <form class="card-info" action="">
                            <ul class="card-type card-block">
                                <template v-if="true">
                                    <li class="card-type__item" :class="{ active: card.type == 0 }" @click="changeType(0)">
                                        <div class="card-type__content">
                                            <i class="img"></i>
                                            <span>中国石化</span>
                                        </div>
                                    </li>
                                    <li class="card-type__item" :class="{ active: card.type == 1 }" @click="changeType(1)">
                                        <div class="card-type__content">
                                            <i class="img zsy"></i>
                                            <span>中国石油</span>
                                        </div>
                                    </li>
                                </template>
                                <template v-if="false">
                                    <li class="card-type__item active" style="-webkit-box-pack: start;-webkit-justify-content: flex-start;justify-content: flex-start;">
                                        <div class="card-type__content">
                                            <img :src='type | type2src' width="44" height="44" alt="">
                                            <span style="display:inline-block;color: #000;padding-left: 6px;vertical-align:middle;">{{type | type2text}}</span>
                                        </div>
                                    </li>
                                </template>
                            </ul>

                            <div class="card-number card-info__item card-block">
                                <span class="card-info__title">加油卡号</span>
                                <input class="card-info__input" type="tel"
                                    v-model='card.num'
                                    :maxlength='maxlength'
                                    :placeholder="placeholder"
                                    @focus='cardFocus'
                                    @blur='cardBlur'>
                                <div class="card-magnifier" v-show="numMagnifier" transition> {{ cardSplit }} </div>
                            </div>

                            <!-- <div class="card-number card-info__item card-block" v-show="cardNum && (type!=2 || !editMode)">
                                <span class="card-info__title">确认卡号</span>
                                <input class="card-info__input" type="tel" maxlength="{{maxLength}}" placeholder="请再次输入卡号"
                                    v-model='cardNumAgain'
                                    v-on='
                                        focus:numAgainFocus,
                                        blur:numAgainBlur
                                    '>
                                <div class="card-magnifier" v-show="numAgainMagnifier" v-transition> {{cardNumAgain | numSplit}} </div>
                            </div> -->

                            <div class="card-user card-info__item card-block">
                                <span class="card-info__title">油卡备注</span>
                                <input class="card-info__input" type="text" placeholder="请输入备注，如：张三的油卡"
                                    v-model='card.remark'>
                            </div>



                            <p class="card-tip" style="line-height:1.4">请仔细核对卡号，因卡号输错造成的损失，将由用户本人承担</p>

                            <div class="card-default">
                                <input type="checkbox" v-model="card.default" id="setDefault">
                                <label for="setDefault">设置默认</label>
                            </div>

                            <div class="card-button">
                                <div class="button close"
                                v-if="$route.params.cardnum"
                                @click='modal_deleteCard_show = true'>删除</div>

                                <div class="button save" @click='saveCard'>{{ buttonName }}</div>
                            </div>
                        </form>
                    </div>
                </section>

            </div>


            <modal-confirm
                title='删除油卡'
                text='确定删除此油卡？'
                :show.sync='modal_deleteCard_show'
                :on-confirm='removeCard'>
            </modal-confirm>


        </div>
    </div>

</template>

<script>
    import { Promise } from 'es6-promise'
    import { addCard, editCard, deleteCard, setMsgTip } from '../vuex/actions'
    import modalConfirm from '../components/ModalConfirm.vue'

    export default {
        data() {
            return {
                routerCardNum:this.$route.params.cardnum,
                numMagnifier:false,
                cardIndex:0,
                card:{
                    num:'',
                    remark:'',
                    type:0,
                    default:true
                },
                modal_deleteCard_show:false
            }
        },
        vuex: {
            getters: {
                storeLocalInfo: state => state.localInfo,
                cards: ({ localInfo }) => localInfo.cards

            },
            actions:{
                setMsgTip,
                addCard,
                editCard,
                deleteCard,
            }
        },
        computed:{
            buttonName(){
                if(this.routerCardNum){
                    return '保存'
                }
                return '添加'
            },
            placeholder(){
                if(this.card.type){
                    return '请输入16位加油卡号'
                }
                return '请输入19位加油卡号'
            },
            maxlength(){
                if(this.card.type){
                    return 16
                }
                return 19
            },
            cardTrim(){
                return this.card.num.replace(/\s/g, '')
            },
            cardSplit(){
                return this.card.num.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
            }
        },
        methods:{
            changeType(type){
                this.card.type = type
            },
            cardFocus(){
                this.numMagnifier = true
                this.card.num = this.cardTrim
            },
            cardBlur(){
                this.numMagnifier = false
                this.card.num = this.cardSplit
            },
            saveCard(){
                if(this.cardTrim.length != this.maxlength){
                    this.setMsgTip(`请输入${this.maxlength}位卡号`)
                    return false
                }
                if(this.remark == ''){
                    this.setMsgTip('备注不能为空')
                    return false
                }

                if(!this.routerCardNum){
                    let isExist = _.find(this.cards,(value,index) => value.num == this.card.num)
                    if(!isExist){
                        this.addCard(this.card)
                        this.setMsgTip('添加油卡成功！')
                    }
                    else{
                        this.setMsgTip('此油卡已存在')
                        return
                    }
                }
                else{
                    this.editCard(this.cardIndex, this.card)
                    this.setMsgTip('保存油卡成功！')
                }
                this.goIndex()

            },
            removeCard(){
                this.deleteCard(this.cards[this.cardIndex])
                this.setMsgTip('删除油卡成功！')
                this.goIndex()
            },
            goIndex(){
                let router = this.$route.router
                router.go({
                    name: 'index'
                });
            }
        },
        components: {
            modalConfirm
        },
        route: {
            data(transition) {
                if(this.routerCardNum){
                    let card = _.each( this.cards, (value,key) => {
                        console.log(value)
                        if(value.num == this.routerCardNum){
                            this.card = _.clone(value)
                            this.cardIndex = key
                            return false
                        }
                    })
                }
                transition.next()
            }
        }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .oil-edit-view{
        .card-add{

        }
        .card-block{
            background-color: #fff;
            border-bottom:1px solid $grayLight;
            padding:0 20px;
        }
        .card-info__item{
            display:flex;
            align-items:center;
        }
        .card-info__title{
            display:block;
            width:6em;
            color:$gray;
        }
        .card-info__input{
            position:relative;
            display:block;
            flex:1;
            padding:15px 0;
            z-index:2;
        }
        .card-button{
            display:flex;
            margin:32px 20px 20px 20px;
            .save{
                flex:1;
            }
            .close{
                margin-right:10px;
            }
        }
        .card-delete{
            width:90px;
            margin-right:10px;
            border-radius:3px;
            border:1px solid #989898;
            color:#4c4c4c;
            font-size:16px;
            padding:16px 0;
            text-align:center;
            &:active{
                background-color: darken($grayLight,10);
            }
        }
        .card-type{
            display:flex;
            justify-content:center;
            position:relative;
        }
        .card-type__content{
            .img{
                width:44px;
                height:44px;
                display: inline-block;
                background: url(../images/yk.png) no-repeat right bottom;
                background-size: 88px 88px;
                &.zsy{
                    background-position: left bottom
                }
            }
        }
        .card-type__item{
            display:flex;
            justify-content:center;
            width:30%;
            flex:1;
            padding:15px 0;
            position:relative;
            &.active{
                color:$orange;
                .card-type__content{
                    .img{
                        background-position: right top;
                        &.zsy{
                            background-position: left top;
                        }
                    }
                    &:after{
                        content:'';
                        position:absolute;
                        left:-3px;
                        top:-3px;
                        background:url(../images/iconfont-duigou.png) no-repeat center center;
                        -webkit-background-size: 16px 16px;
                        width:16px;
                        height:16px;
                    }
                }
            }
            &:after{
                content:'';
                height:32px;
                position:absolute;
                left:0;
                top:25px;
                width:1px;
                background-color:$gray;
            }
        }
        .card-type__item:first-child{
            &:after{
                display:none;
            }
        }
        .card-type__content{
            text-align:center;
            position:relative;
            span{
                padding-top:5px;
                display:block;
                text-align:center;
            }
        }
        .card-tip{
            color:#f44336;
            padding:12px 20px;
        }
        .card-number{
            position:relative;
            &.disabled{
                pointer-events:none;
                color:$grayLight;
                .card-info__input{
                    color:$gray;
                }
                .mask-eye{
                    display:none;
                }
            }
            .mask-eye{
                position:absolute;
                right:0;
                top:0;
                background:#fff url(../images/maskhide.png) no-repeat center center;
                -webkit-background-size:24px 24px;
                width:40px;
                height:100%;
                z-index:3;
            }
            .card-mask{
                position:absolute;
                display:none;
                top:50%;
                left:7em;
                transform:translate(0,-50%);
                z-index:1;
            }
            &.mask-show{

                .mask-eye{
                    background-image:url(../images/maskshow.png);
                }
                .card-info__input{
                    opacity:0;
                }
                .card-mask{
                    display:block;
                }
            }
        }
        .card-default{
            padding:0 20px;
            input{
                display:none;
            }
            input + label{
                display:block;
                padding:5px 0 5px 26px;
                position:relative;
                color:$importColor;
                &:before{
                    content:'';
                    position:absolute;
                    left:0;
                    top:50%;
                    transform:translate(0,-50%);
                    width:14px;
                    height:14px;
                    border:1px solid $orange;
                }
            }
            input:checked + label{
                &:after{
                    content:'';
                    position:absolute;
                    left:-5px;
                    top:50%;
                    transform:translate(0,-50%);
                    background: url(../images/iconfont-nike.png) no-repeat center center;
                    -webkit-background-size:30px 30px;
                    width:30px;
                    height:30px;
                }
            }
        }
        .card-magnifier{
            position: absolute;
            bottom: 41px;
            left: 5%;
            width: 90%;
            padding: 0 20px;
            box-sizing: border-box;
            background-color: #FFF;
            height: 60px;
            z-index: 4;
            border-radius: 5px;
            border: 2px solid #D8D8D8;
            font-size: 20px;
            line-height: 60px;
            color:$importColor;
            &:before{
                @include triangle(20px,#D8D8D8,down);
                content:'';
                position:absolute;
                bottom:-10px;
                left:50%;
                margin-left:-10px;
            }
            &:after{
                @include triangle(20px,#fff,down);
                content:'';
                position:absolute;
                bottom:-7px;
                left:50%;
                margin-left:-10px;
            }
        }
}
</style>


