<template>
    <modal class="component-contact modal-bottom" :show.sync="show" mask-close="true">

        <div class='modal-header'>
            <span class="modal-cancle" @click='cancle'>取消</span>
            <h1 class="modal-title">联系方式</h1>
            <span class="modal-confirm" @click='confirm'>确定</span>
        </div>
        <ul class="component-contact__list">
            <li class="component-contact__item">
                <span class='key'>联系人</span>
                <div class='value'><input type="text" placeholder="请输入联系人姓名" v-model='userInfo.name'></div>
            </li>
            <li class="component-contact__item">
                <span class='key'>手机号码</span>
                <div class='value'><input type="tel" placeholder="请输入手机号码" v-model='userInfo.phone'></div>
            </li>
        </ul>
    </modal>
</template>

<script>
    import { rules } from '../utils/utils'
    import { setMsgTip } from '../vuex/actions'
    import modal from './Modal.vue'


    const userInfo = JSON.parse(localStorage.getItem('dz_userInfo') || '{"name":"","phone":""}')

    export default {
        props: {
            show:{
                type: Boolean,
                required: true,
                twoWay: true
            },
            onCancle:{
                type: Function,
                default() {}
            },
            onConfirm:{
                type: Function,
                default() {}
            }
        },
        data() {
            return {
                userInfo:userInfo
            }
        },
        vuex: {
            getters: {
            },
            actions:{
                setMsgTip
            }
        },
        methods:{
            cancle(){
                this.show = false
                this.onCancle()
            },
            confirm(){
                if(!this.userInfo.phone || !rules.tel(this.userInfo.phone)){
                    this.setMsgTip('请输入正确的手机号码！')
                    return
                }
                this.saveUserInfo()
                this.onConfirm()
                this.show = false
            },
            saveUserInfo(){
                localStorage.setItem('dz_userInfo',JSON.stringify(this.userInfo))
            }
        },
        components: {
            modal
        }
    }
</script>

<style lang="sass">
    @import "../sass/_variables";
    @import "../sass/_extends";
    @import "../sass/_mixins";

    .theme-red{
        .component-contact{
            .modal-header{
                background-color: $red
            }
        }
    }
    .theme-blue{

    }
    .component-contact{

    }
    .component-contact__list{

    }
    .component-contact__item{
        display: flex;
        align-items:center;
        padding: 0 12px;
        border-bottom:1px solid $sectionColor;
        font-size:15px;
        font-weight: bold;
        .key{
            width:6em;
        }
        .value{
            flex:1;
            padding:0 10px;
            input{
                padding:20px 0;
            }
        }
    }

</style>
