/*
* @Author: mac
* @Date:   2019-09-04 18:22:26
* @Last Modified by:   mac
* @Last Modified time: 2019-09-07 18:15:10
*/
//1.引入模块
import Vue from "vue"
import VueRouter from "vue-router"

//2.引入页面组件
import Home from 'pages/home'
import Detail from 'pages/detail'
import Cart from 'pages/cart'
import Me from 'pages/me'
import Login from 'pages/login'

//3.声明使用
Vue.use(VueRouter)


//4.导出路由对象
export default new VueRouter({
	routes:[
		{path:"/home",component:Home},
		{path:"/detail/:id",component:Detail},
		{path:"/cart",component:Cart},
		{path:"/me",component:Me},
		{path:"/login",component:Login},
		{path:"/",redirect:"/home"},
	]
})