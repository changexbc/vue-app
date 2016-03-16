<template>

    <div class="tab-content__item" v-show="show">
        <slot></slot>
    </div>

</template>

<script>

    export default {
        props:{
            name:{
                type: String,
                required: true
            }
        },
        created(){
            this.$parent.navInfo.push({
                name: this.name
            })
        },
        ready() {
            _.each(this.$parent.$children,(item,index)=>{
                if(this.$parent.$children[index].$el == this.$el){
                    this.index = index;
                    return false
                }
            })
        },
        data() {
            return {
                index:0,
                show:false
            }
        },
        computed:{
            show(){
                return (this.$parent.active == this.index)
            }
        },
        methods:{

        }
    }
</script>

<style lang='sass'>
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";
    .tab-navs{
        display: flex;
        border:1px solid $orange;
        border-radius:3px;
    }

    .tab-navs__item{
        width:20%;
        flex:1;
        text-align: center;
        color:$orange;
        padding:8px 0;
        border-right:1px solid $orange;
        transition:all ease .2s;
        &:last-child{
            border-right:none;
        }
        &.active{
            background-color: $orange;
            color:#fff;
        }
    }

</style>


