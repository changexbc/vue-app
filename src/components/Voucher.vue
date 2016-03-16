<template>
    <modal id="modal-voucher"
        :show.sync="show"
        mask-close="true"
        :on-cancle='modalVoucherCancle'>

        <div class='modal-header'>
            <span class="modal-cancle" @click='modalVoucherCancleInButton'>取消</span>
            <h1 class="modal-title">选择代金券</h1>
            <span class="modal-confirm" @click='setVoucherSelect'>确定</span>
        </div>
        <div class="voucher-main">
            <ul class="modal-voucher-list">
                <li class="modal-voucher-item nonuse"
                    @click='chooseVoucherSelect(item,-1)'
                    :class="{ select:voucherSelectIndex == -1 }">
                    不使用
                    <span class="select-icon"></span>
                </li>
                <li class="modal-voucher-item"
                    v-for='item in voucherList'
                    @click='chooseVoucherSelect(item,$index)'
                    :class="{
                        'select':voucherSelectIndex == $index,
                        'cannot-use':item.canUse == false
                    }">
                    <div class="modal-voucher-info">
                        <h1>¥ {{ item.amount }}</h1>
                        <p> <span>{{ item.endTime }}过期</span><span>,充值金额满{{ item.conditions }}可用</span> </p>
                    </div>
                    <span class="select-icon"></span>
                </li>
            </ul>
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

    export default {
        props:{
            voucherSelectIndex:{
                type: Number,
                required: true,
                twoWay: true
            },

            voucherSelect:{
                type: Object,
                required: true,
                twoWay: true
            },
            voucherUsable:{
                type: Number,
                required: true,
                twoWay: true
            },
            voucherList:{
                type: Array,
                required: true,
                twoWay: true
            },
            price:{
                type: Number,
                required: true
            },
            show:{
                type: Boolean,
                required: true,
                twoWay: true
            }
        },
        created(){
            this.filterVoucherList(this.price,'first')
        },
        data() {
            return {
                oldVoucherSelectIndex:-1,
            }
        },
        computed:{

        },
        filters:{

        },
        methods:{
            showvoucherList(){
                this.modal_voucher_list = true
                this.oldVoucherSelectIndex = this.voucherSelectIndex
            },
            modalVoucherCancle(){
                this.voucherSelectIndex = this.oldVoucherSelectIndex
            },
            modalVoucherCancleInButton(){
                this.show = false
                this.modalVoucherCancle()
            },
            filterVoucherList(price){
                let canuseFirst = false
                this.voucherUsable = 0

                if(!price){
                    _.each (this.voucherList, (value,key) => {
                        value.canUse = false
                    })
                    this.voucherSelectIndex = -1
                    this.setVoucherSelect()
                    return
                }

                _.each(this.voucherList, (value,key) => {
                    if(value.conditions > price){
                        value.canUse = false
                        return
                    }
                    if(!canuseFirst){
                        this.voucherSelectIndex = key
                        this.oldVoucherSelectIndex = key
                        this.setVoucherSelect()
                        canuseFirst = true
                    }
                    value.canUse = true
                    this.voucherUsable++
                })
            },
            setVoucherSelect:function(){
                if(this.voucherSelectIndex == -1){
                    this.voucherSelect = {}
                    this.show = false
                    return
                }
                this.voucherSelect = this.voucherList[this.voucherSelectIndex]
                this.show = false
            },
            chooseVoucherSelect:function(item,index){
                if(item && !item.canUse){
                    return
                }
                this.voucherSelectIndex = index
            },
        },
        components:{ modal }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #modal-voucher{
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
        .modal-voucher-list{

        }
        .modal-voucher-item{
            position:relative;
            display:flex;
            align-items:center;
            height:56px;
            border-bottom:1px solid $sectionColor;
            padding:13px 18px;
            box-sizing:border-box;
            .select-icon{
                display: none;
                position: absolute;
                top: 50%;
                right: 16px;
                -webkit-transform: translate(0, -50%);
                width: 17px;
                height: 17px;
                background: url(../images/iconfont-duigou-index.png) no-repeat center center;
                -webkit-background-size: 17px 17px;
            }
            &.nonuse{
                @extend %font-body1;
            }
            &.select{
                .select-icon{
                    display:block;
                }
            }
            &.cannot-use:after{
                content:'';
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background-color: rgba(255, 255, 255, 0.7);
            }
        }
        .modal-voucher-info{
            h1{
                @extend %font-body1;
                color:$orange;
            }
            p{
                @extend %font-footnote;
                color:#989898;
                padding-top:4px;
            }
        }
    }
</style>


