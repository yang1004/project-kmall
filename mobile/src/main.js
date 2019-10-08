/*
* @Author: mac
* @Date:   2019-09-03 10:20:46
* @Last Modified by:   mac
* @Last Modified time: 2019-09-09 15:26:21
*/
import Vue from 'vue'
import App from './App.vue'
import store from './store'
//引入公共css

import './assets/css/common.css'
//全局加载vant组件
import './plugins/vant'
//引入路由
import router from './router'

//引入过滤器
import filters from './filters/'
Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]))

Vue.config.productionTip = false

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')