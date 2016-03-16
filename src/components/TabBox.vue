<template>

    <div class="tab-box">
        <ul class="tab-navs">
            <li class="tab-navs__item"
                v-for="item in navInfo"
                :class="{ 'active': $index === active }"
                @click.prevent="tabSwitch($index)">
                {{{item.name}}}
            </li>
        </ul>
        <div class="tab-content">
            <slot></slot>
        </div>
    </div>

</template>

<script>

    export default {
        props:{
            active: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                navInfo:[]
            }
        },
        computed:{
            show(){
                return (this.$parent.active == this.index)
            }
        },
        methods:{
            tabSwitch(index){
                this.active = index
            }
        }
    }
</script>

<style lang='sass'>
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";
    .loading-process{
        @extend %font-display1;
        color:$importColor;
        position: relative;
        text-align:center;
        transition:opacity ease .3s .3s;
        &-leave{
            opacity:0;
        }
    }
    .loading-process__percent{
        position: absolute;
        top:50%;
        left:50%;
        transform:translate3d(-50%,-50%,0);
    }
    .loading-process__circle{
        circle{
            transition: stroke-dasharray .25s;
        }
    }

</style>


