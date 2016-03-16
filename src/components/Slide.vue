<template>

    <div class="swiper-container advert-swiper" :id='swiperId'>
        <div  class="swiper-wrapper">
            <div class="swiper-slide" v-for='item in advertInfo'>
                <span class="advert-img" @click='goPage(item)'><img :src="item.imgUrl"></span>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>

</template>

<script>
    import '../libs/swiper/swiper'
    import store from '../store/index'
    import { getQueryString, convertParams, convertRequestURL, localInfo } from '../utils/utils'
    import client from '../utils/client'
    import loading from '../components/Loading.vue'

    export default {
        props:{
            swiperId:{
                type: String,
                default: 'adSwiper'
            },
            speed:{
                type: Number,
                default: 300
            },
            loop:{
                type: Boolean,
                default: true
            },
            autoplay:{
                type: Number,
                default: 5000
            },
            name:{
                type: String,
                required: true,
            }
        },
        created(){
            this.waitUserId()
        },
        data() {
            return {
                cityId:store.state.localInfo.cityId,
                userId:localInfo.getUserId(),
                clientType:client.getSystem(),
                clientVersion:client.getVersion().replace(/\./g, ''),
                advertInfo:[]
            }
        },
        computed:{

        },
        methods:{
            getAdvert(){
                return new Promise( (resolve, reject) => {
                    $.ajax({
                        type:"get",
                        url: convertRequestURL("advert/getData.htm"),
                        data: convertParams({
                            clientType: this.clientType,
                            clientVersion: this.clientVersion,
                            cityId: this.cityId,
                            userId: this.userId
                        }),
                        success: (resp) => {
                            if(resp.code){
                                store.actions.setMsgTip(resp.msg);
                                resolve(resp)
                                return
                            }

                            let data = resp.data
                            resolve(data)
                        },
                        error: () => {
                            store.actions.setMsgTip('获取广告信息失败')
                            reject(new Error('获取广告信息失败'));
                        }
                    });
                })
            },
            waitUserId(){
                if(this.userId){
                    this.setAdvert()
                    return
                }
                setTimeout(() =>{
                    Daze.system.getUserId({}, (resp) => {
                        this.userId = resp.userId
                        this.setAdvert()
                    })
                },100)
            },
            setAdvert(){
                let promise_getAdvertising = this.getAdvert()
                .then(result => {
                    let banner_list = result[this.name]
                    if(banner_list && banner_list.length){
                        this.advertInfo = banner_list
                        if(banner_list.length > 1){
                            this.$nextTick( () => {
                                this.autoplay = banner_list[0].scrollTime || 5000
                                this.setSwiper()
                            })
                        }
                    }
                })
                .catch(error => {
                    console.error(error)
                })
            },
            setSwiper(){
                const mySwiper = new Swiper(`#${this.swiperId}`,{
                    pagination: '.swiper-pagination',
                    autoplayDisableOnInteraction:false,
                    slidesPerView: 1,
                    loop: this.loop,
                    speed:this.speed,
                    autoplay:this.autoplay
                });
            },
            goPage(item){
                if(item.motionType == 'url'){
                    item.motionValue && Daze.pushWindow(item.motionValue)
                }
                else if(item.motionType == 'webapp'){
                    let pushObj = JSON.parse(item.motionValue)
                    Daze.pushWindow({
                        appId:pushObj.appId,
                        url:pushObj.startPage
                    })
                }
            }
        },
        components:{ loading }
    }
</script>

<style lang='sass'>
    .advert-img{
        display: block;
        width:100%;
        padding-top:25%;
        position:relative;
    }
    .advert-swiper img{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
    }
</style>


