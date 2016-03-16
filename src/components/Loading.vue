<template>
    <div
    :class="{
        'loading--fullscreen':mode == 'fullscreen',
        'loading--absolute':mode == 'absolute',
        'loading':mode == 'normal',
    }"
    :style="wrapStyleObject"
    >
        <span class="loading__box"><i class="loading__icon" :style="{ width:size + 'px' , height:size + 'px' }"></i></span>
    </div>
</template>

<script>
    export default {
        props: {
            mode: {
                type: String,
                default:'normal'
            },
            size:{
                type: Number,
                default:'24'
            },
            autoSize:{
                type: Boolean,
                default:false
            }
        },
        computed:{
            wrapStyleObject(){
                if(this.autoSize){
                    return {
                        width:this.size + 'px',
                        height:this.size + 'px'
                    }
                }
            }
        }
    }
</script>

<style lang="sass">
    @import "../sass/_variables";
    @import "../sass/_extends";
    @import "../sass/_mixins";

    .loading{
        @extend %loading;
    }
    .loading__box{
        @extend %loading__box;
    }
    .loading__icon{
        @extend %loading__icon;
    }
    .loading--fullscreen{
        @extend %loading;
        background:rgba(187, 187, 187, 0.37);
        position:absolute;
        z-index:$zIndex_loading;
        top:50%;
        left:50%;
        width:100%;
        height:100%;
        transition:ease .3s all;
        transform:translate3d(-50%,-50%,0);
        .loading__box{
            background-color: rgba(255, 255, 255, 0.33);
        }
    }
    .loading--absolute{
        @extend %loading;
        position:absolute;
        width:100%;
        top:10px;
    }

</style>
