<template>
    <modal id='modal-confirm' class="modal-warning" :show.sync="show" mask-close="true">
        <div class="modal-header"> {{ title }} </div>
        <div class="modal-text"> {{ text }} </div>
        <slot></slot>
        <footer class="confirm-button">
            <span class="button close" @click="cancle">取消</span>
            <span class="button" @click="confirm">确定</span>
        </footer>
    </modal>
</template>

<script>
    import modal from './Modal.vue'

    export default {
        props:{
            title:{
                type: String,
                default:'提示'
            },
            text:{
                type: String,
                default:''
            },
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

            }
        },
        methods:{
            cancle(){
                this.show = false
                this.onCancle()
            },
            confirm(){
                this.show = false
                this.onConfirm()
            }
        },
        components:{ modal }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #modal-confirm{
        .modal-container{
            padding:16px;
        }
        .modal-text{
            text-align:center;
            line-height:1.3;
        }
        .confirm-button{
            display:flex;
            padding-top:24px;
            .button{
                width:40%;
                flex:1;
                margin-left:15px;
                &:first-child{
                    margin-left:0;
                }
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


