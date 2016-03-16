<template>
    <nav class="component-nav">
        <div class="component-nav__left">
            <i class="component-nav__button back" @click='back'>返回</i>
            <a class="component-nav__button close" href="wacai://close" v-if='closeButton'>关闭</a>
        </div>
        <h1 class="component-nav__title">{{ title }}</h1>
        <div class="component-nav__right" @click='reload'>
            <a class="component-nav__button refresh"></a>
        </div>
    </nav>
</template>

<script>
    export default {
        props: {
            title:String,
            closeButton:{
                type: Boolean,
                default:true
            }
        },
        methods:{
            reload(){
                window.location.reload()
            },
            back(){
                window.history.back()
            }
        }
    }
</script>

<style lang="sass">
    @import "../sass/_variables";
    @import "../sass/_extends";
    @import "../sass/_mixins";

    .theme-red{
        .component-nav{
            background-color: $red
        }
    }
    .theme-blue{

    }
    .component-nav{
        font-size:16px;
        color:#fff;
        padding:0 10px;
        display: flex;
        align-items:center;
        justify-content:space-between;
        text-align: center;
        position: relative;
    }
    .component-nav__button{
        display: block;
        color: #fff;
        padding:0 5px;
        height:44px;
        line-height:44px;
        &.back{
            padding-left:17px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABICAYAAACwc3YrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKJJREFUeNrs2rENwkAQBVGX4FIoxSXQGSVRAiVQwtoIkSAsX+BgP3ojbXbBTLi6nSYAAIBMqmreZkmWv9eba7J8RUXsyGdEHMj3jhiU/7B0DBiVf72bu8nfyJMn/5NHsvxzmwt58uTJkydPnjx5q+Bpy7gIESJEiBAhQoQIESJEiEiP6Hk/Ef3RPRjRW/4gIkN+JyJL/isi8+AJAAD8A6sAAwALIFhhS9k11wAAAABJRU5ErkJggg==) no-repeat left center;
            background-size: 16px 24px;
        }
        &.refresh{
            width:44px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAttJREFUeNrsW/9RrDAQJlZAB9KBdCBWIHbAVSAdvLOCK+Hs4LQCtALOCqADfBXwknn7h6PmFyTZRfebYZg5OHbvY/fLbpLLMgaDwWAwGAwGg8EIDuF64zzPjTwVAWw+CiHGH8WiJOc4h0O1pd9+4UBOKU/Nb02xC4d78t+sQS4EjRuSghzkoIOjTmW43YIGASmfsUoefEYxpUW6N3JluPYZN3IUe4lAjvKv11zeSZuPmGE9YUeQeq7B5gQEohDUEUox04vqY4m0UZvkiVJdcyOPd821Uvq7p5RaE0ahqETZEsFFqghqDTWSEsQzSu/0X4wfDLf8wY6eAa53mK2G0pwQUbQ0ghpD9Kgh9Z2AHu3Qogii5Dt0DqNblVAndU32FC2CoJ7QhegDse5D50/u2oYsSTHdg8cYFfJKwVZ9pM6n21gEXWs+f3L8fmp9etZ8XsXKa6cKWYWwSaMS6lBh8DlPZswwCzBASXAM7tD6FqQKbagK2ecQ6BfrGBpEQVd8oavqy9AElRsl6O/SL/oSpNOQt+yHwpeg0XPoZ4I2gstUBOlQECeo8BTvxQTpHlhg1TjkBhdD0VVTZEY11z7FbYgUW9X8IaBaml5LCXr17PKxce/5oqM2fw2x9KpQdpkY5nuHjfRgQ2zDDfUoskTPPrZx06rGhD3kg39DqLWxpU7sDQ50yASZdsQdUjpiektHJHJay2pvntKZ2rLMe0xMjm3ZuaUWzslIctjk1WEKYm9zLpYwgv2TxT7uwAHF4+TgZBshpVzslhk2oCl02Wk2rK2VgBiXjVs0yFlA0vxhKai2hT+kkbrvYBk5g5MjYqSbPJ0yhxWDb+ZmzprJLl/9GuVxJ4Q4ZxQBb/ww4+BEfPLuSz80JCJmojpp59qWTBGJ2W8mahxGnz4QMT08LyoxAomoAmYgr0HMC0cRf4EZzadU/zkTlPTKcPlMZN8jg8FgMBgMBoPBYITAPwEGAEYO9V0YI15iAAAAAElFTkSuQmCC) no-repeat center right;
            background-size: 24px 24px;
        }
    }
    .component-nav__left{
        display: flex;
    }
    .component-nav__right{
        display: flex;
    }
    .component-nav__title{
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        text-align:center;
        font-size:16px;
        font-weight: normal;
    }

</style>
