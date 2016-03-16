<template>

    <div class="loading-process" v-show='!loaded' transition="loading-process">
        <span class="loading-process__percent">{{ persent }}%</span>
        <svg class="loading-process__circle" :width="size" :height="size">
            <circle
                :cx="size/2"
                :cy="size/2"
                :r="size/2 - 2*strokeWidth"
                :stroke-width="strokeWidth"
                :stroke="strokeColorDefault"
                fill="none">
            </circle>

            <circle
                :cx="size/2"
                :cy="size/2"
                :r="size/2 - 2*strokeWidth"
                :stroke-width="strokeWidth"
                :stroke="strokeColorProcess"
                :stroke-dasharray='dasharray'
                fill="none"
                transform="matrix(0,-1,1,0,0,80)">
            </circle>
        </svg>
    </div>

</template>

<script>
    import store from '../store/index'
    import { getQueryString, convertParams, convertRequestURL, localInfo } from '../utils/utils'
    import client from '../utils/client'
    import loading from '../components/Loading.vue'

    export default {
        props:{
            strokeWidth:{
                type: Number,
                default: 5
            },
            strokeColorDefault:{
                type: String,
                default: '#D1D3D7'
            },
            strokeColorProcess:{
                type: String,
                default: '#ff7e2e'
            },
            size:{
                type: Number,
                default: 80
            },
            loaded:{
                type: Boolean,
                required: true,
                default: false,
                twoWay: true,
            }
        },
        created(){
            this.simulateProcess()
        },
        data() {
            return {
                persent:0,
                circumference:(this.size/2 - 2*this.strokeWidth)*2*Math.PI
            }
        },
        computed:{
            dashPersent(){
                return this.persent/100 * this.circumference
            },
            dasharray(){
                return `${this.dashPersent} ${this.circumference}`
            }
        },
        methods:{
            simulateProcess(){
                if(this.persent < 25){
                    let randomTime = 200*Math.random()
                    this.setPersent(randomTime)
                    return
                }
                else if(this.persent < 65){
                    let randomTime = 600*Math.random()
                    this.setPersent(randomTime)
                    return
                }
                else if(this.persent < 85){
                    let randomTime = 2000*Math.random()
                    this.setPersent(randomTime)
                    return
                }
                else if(this.persent < 99){
                    let randomTime = 5000
                    this.setPersent(randomTime)
                    return
                }
            },
            setPersent(time){
                setTimeout(()=>{
                    if(this.loaded){
                        this.persent = 100
                        return
                    }
                    this.persent++
                    this.simulateProcess()
                },time)
            }
        },
        components:{ loading }
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


