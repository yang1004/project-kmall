<template>
    <div class="Detail">
        <h2 class="detailName">{{detailProducts.name}}</h2>
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(image,index) in detailProducts.images" class="detailImage">
                <img :src="image" alt="">
            </van-swipe-item>
        </van-swipe>
        <p>商品描述:{{detailProducts.description}}</p>
        <p>商品详情:</p>
        <div class="productDetail" v-html="detailProducts.detail">
            {{detailProducts.detail}}
        </div>
        <span>价格:</span><span>{{detailProducts.price | formatPrice}}</span>
        <van-stepper v-model="value" :min="detailProducts.stock ? 1 : 0" :max='detailProducts.stock' />
        <span class="detailStock">(库存:{{detailProducts.stock}})</span>
        <van-goods-action>
            <van-goods-action-button type="danger" text="加入购物车" @click="handleAddCart()" />
        </van-goods-action>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { GET_DETAIL,ADD_CARTS } from './store/types.js'
import Vue from 'vue';
import {
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Swipe,
    SwipeItem,
    Stepper,
    Toast,
} from 'vant';
Vue
    .use(GoodsAction)
    .use(GoodsActionIcon)
    .use(GoodsActionButton)
    .use(Swipe)
    .use(SwipeItem)
	.use(Stepper)
	.use(Toast);
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
    name: 'Detail',
    data() {
        return {
            value: 1
        }
    },
    mounted() {
        var id = this.$route.params.id
        this.$store.dispatch(GET_DETAIL,id)
        console.log(this.$store.state)
    },
    computed: {
        ...mapGetters([
            'detailProducts',
        ])
    },
    methods:{
    	handleAddCart(){
            if(!localStorage.getItem("username")){
                this.$router.push({ path:'/login'})
                return 
            }
    		var data = {
    			productId:this.$route.params.id,
    			count:this.value
    		}
    		this.$store.dispatch(ADD_CARTS,data)
            .then(()=>{
                if(this.$store.state.detail.message){
                    Toast.success('添加商品成功');
                }
            })
    	}
    }
}
</script>
<style scoped>
.van-goods-action {
    margin-bottom: 50px;
}

.detailName {
    text-align: center;
}

.detailImage {
    width: 100%;
    height: 300px;
}

.detailImage img {
    width: 100%;
    height: 300px;
}

p {
    font-size: 17px;
}

.productDetail {
    font-size: 16px;
}
.detailStock{
	font-size: 16px;
}
</style>