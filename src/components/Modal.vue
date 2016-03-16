<template>
    <div class="modal" v-show="show" transition="modal">
        <div class="modal-mask" @click="closeModal"></div>
            <div class="modal-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            mode: {
                type: String,
                default:'normal'
            },
            show: {
                type: Boolean,
                required: true,
                twoWay: true
            },
            maskClose:String,
            onCancle:{
                type: Function,
                default() {}
            }
        },
        methods:{
            closeModal(){

                if(this.maskClose){
                    this.show = false
                }
                this.onCancle()
            }
        }
    }
</script>

<style lang="sass">
    @import "../sass/_variables";
    @import "../sass/_extends";
    @import "../sass/_mixins";
    .theme-red{
        .modal-header{
            background-color: $red;
        }
    }
    .theme-blue{

    }
    .modal{
        position: absolute;
        z-index: $zIndex_modal;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow:auto;
        -webkit-overflow-scrolling: touch;
        transition: opacity 250ms ease;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-mask {
        width: 100%;
        height: 100.1%;
        background-color: rgba(0, 0, 0, 0.01);
    }

    .modal-container {
        position:absolute;
        width: 90%;
        max-height:90%;
        box-sizing:border-box;
        overflow:auto;
        -webkit-overflow-scrolling:touch;
        z-index:2;
        top:50%;
        left:50%;
        transform:translate3d(-50%,-50%,0);
        transition: transform .3s ease;
        background-color: #fff;
    }

    .modal-header{
        display:flex;
        justify-content:center;
        align-items:center;
        background-color: $orange;
        color:#fff;
    }
    .modal-warning{
        .modal-header{
            @extend %font-title;
            color:$importColor;
            background-color: transparent;
            padding:10px 0 16px 0;

        }
    }
    .modal-cancle{
        @extend %font-button;
        width:64px;
        padding:15px 0;
        display:block;
        text-align:center;
        &:active{
            color:darken(#fff,10%)
        }
    }
    .modal-title{
        @extend %font-headline;
        color:rgba(#fff,.5);
        text-align:center;
        flex:1;
    }
    .modal-confirm{
        @extend %font-button;
        padding:15px 0;
        width:64px;
        display:block;
        text-align:center;
        &:active{
            color:darken(#fff,10%)
        }
    }

    .modal-body {
        padding: 0 16px 40px 16px;
        h2{
            padding:16px 0;
            text-align:center;
            font-size:15px;
        }
        p{
            color:$gray;
            line-height:1.5;
        }
    }

    .modal-enter,
    .modal-leave {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container {
        transform:translate3d(-50%,-50%,0);
    }

</style>
