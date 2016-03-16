<template>
    <div class="msg-tip">
        <span class="msg-tip__text">{{ text }}</span>
    <div>
</template>

<script>
    export default {
        props: ['text']
    }
</script>

<style lang="sass">
    @import "../sass/_variables";
    @import "../sass/_extends";
    @import "../sass/_mixins";

    .msg-tip{
        position: absolute;
        z-index: $zIndex_msgTip;
        bottom: 8%;
        left: 0;
        width:100%;
        display:flex;
        justify-content:center;
        transition: all 200ms ease;
    }
    .msg-tip__text{
        display:block;
        max-width: 80%;
        background-color: rgba(0, 0, 0, 0.77);
        line-height:1.3;
        padding:8px 20px;
        border-radius:3px;
        color:#fff;
    }
    .msg-tip-enter,
    .msg-tip-leave {
        opacity: 0;
        transform:translate3d(0,10px,0)
    }

</style>
