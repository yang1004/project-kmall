<template>
	<div class="Cart">
		<h3 class="myCart">我的购物车</h3>
		<ul class="cart-list">
			<li v-for="(cart,index) in carts.cartList">
				<div class="choice">
					<input type="checkbox" v-if="cart.checked" checked @click="handleCheckbox(cart.checked,cart.product._id)">
					<input type="checkbox" v-else @click="handleCheckbox(cart.checked,cart.product._id)">
				</div>
				<div class="product-img">
					<img :src="cart.product.mainImage" alt="">
				</div>
				<div class="product-content">
					<p class="name">{{cart.product.name}}</p>
					<span class="price">{{cart.product.price | formatPrice}}</span>
					<span class="num">X{{cart.count}}</span>
					 <div class="product-count">
				        <span class="count-btn minus" @click="cart.count--" v-if="cart.count > 1">-</span>
				        <span class="count-btn minus" @click="minMsg()" v-else>-</span>
				        <input type="text" v-model="cart.count" @change="handleChange()" data-stock="10" class="count-input" />
				        <span class="count-btn plus" @click="cart.count++" v-if="cart.count < cart.product.stock">+</span>
				        <span class="count-btn plus" @click="maxMsg()" v-else>+</span>
				    </div>
				</div>
			</li>
		</ul>
		<input type="checkbox" class="allChecked" checked v-if="carts.allChecked">
		<input type="checkbox" class="allChecked" v-else>
		<van-submit-bar
			:price="carts.totalCartPrice*100"
			button-text="提交订单"
			@submit=""
		/>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { SubmitBar,Toast } from 'vant';
	Vue
	.use(SubmitBar)
	.use(Toast);
	import { mapGetters } from 'vuex'
	import {GET_CARTS,DEL_CART,PUT_CHECKED} from './store/types.js'
	export default {
		name:'Cart',
		mounted(){
			if(!localStorage.getItem("username")){
				this.$router.push({ path:'/login'})
				return 
			}
			this.$store.dispatch(GET_CARTS)
			console.log(this.$store.state.cart)
		},
		computed: {
	        ...mapGetters([
	            'carts',
	        ])
	    },
	    methods:{
	    	minMsg(){
	    		Toast('商品最低选择一件');
	    	},
	    	maxMsg(){
	    		Toast('已到达商品库存上限');
	    	},
	    	handleCheckbox(checked,id){
	    		var data = {
	    			productId:id,
	    			checked:checked
	    		}
	    		if(checked){//变为未选中
	    			data.checked = false
	    			this.$store.dispatch(PUT_CHECKED,data)
	    		}else{
	    			data.checked = true
	    			this.$store.dispatch(PUT_CHECKED,data)
	    		}
	    	},
	    	handleChange(){
	    		console.log(111)
	    	}
	    }
		
	}
</script>

<style scoped>
	.myCart{
		position: fixed;
		top: 0;
		width: 100%;
		text-align: center;
		font-size: 24px;
		line-height: 40px;
		height: 40px;
		background-color: #ff6700;
	}
	.cart-list{
		margin-bottom: 100px;
	}
	.cart-list li:first-child{
		margin-top: 40px;
	}
	.cart-list li{
		width: 100%;
		height: 120px;
	}
	.cart-list li .choice{
		float: left;
		width: 20px;
		height: 100%;
		text-align: center;
		vertical-align: top;
		padding-top: 24px;
		box-sizing: border-box;
	}
	.cart-list li .product-img{
		float: left;
		width: 100px;
		height: 100px;
		margin-top: 10px;
	}
	.cart-list li .product-img img{
		width: 100%;
		height: 100%;
	}
	.cart-list li .product-content{
		float: left;
		height: 100%;
		width: 250px;
		padding: 10px;
		box-sizing: border-box;
	}
	.cart-list li .product-content .name{
		font-size: 16px;
	}
	.cart-list li .product-content .price{
		font-size: 16px;
		float: left;
	}
	.cart-list li .product-content .num{
		font-size: 16px;
		float: right;
	}
	.cart-list li .product-content .product-count{
		margin-top: 50px;
		font-size: 16px;
	}
	.cart-list li .product-content .product-count .count-btn{
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		display: inline-block;
		border: 1px solid #ff6700;
	}
	.cart-list li .product-content .product-count .count-input{
		display: inline-block;
		width: 30px;
	}
	.allChecked{
		position: fixed;
		left: 10px;
		bottom: 70px;
		z-index: 999;
	}
	.van-submit-bar{
		margin-bottom: 50px;
	}
</style>