/*
* @Author: mac
* @Date:   2019-08-21 19:31:13
* @Last Modified by:   mac
* @Last Modified time: 2019-08-26 09:30:50
*/
import Swiper from 'swiper'
require('pages/common/nav')
require('pages/common/footer')
require('pages/common/search')
require('swiper/dist/css/swiper.min.css')
require('./index.css')
var api = require('api')
var _util = require('util')
var categoriesTpl = require('./categories.tpl')
var swiperTpl = require('./swiper.tpl')
var floorsTpl = require('./floors.tpl')

var page = {
	init:function(){
		this.loadHomeCategories()
		this.loadSwiper()
		this.loadFloors()
	},
	loadHomeCategories:function(){
		api.getHomeCategories({
			success:function(categories){
				// console.log(categories)
				var html = _util.render(categoriesTpl,{
					categories:categories
				})
				$('.categories').html(html)
			}
		})
	},
	loadSwiper(){
        api.getPositionAds({
        	data:{
        		position:1
        	},
        	success:function(data){
        		var html = _util.render(swiperTpl,{
        			slides:data
        		})
        		$('.swiper-container .swiper-wrapper').html(html)
        		var mySwiper = new Swiper ('.swiper-container', {
		            loop: true, // 循环模式选项
		            autoplay:true,
		            // 如果需要分页器
		            pagination: {
		              el: '.swiper-pagination',
		              clickable:true
		            },
		            // 如果需要前进后退按钮
		            navigation: {
		              nextEl: '.swiper-button-next',
		              prevEl: '.swiper-button-prev',
		            },
		        })
        	}
        })
    },
    loadFloors(){
    	api.getFloors({
    		success:function(floors){
    			console.log(floors)
    			var html = _util.render(floorsTpl,{
    				floors:floors
    			})
    			$('.floor-wrap').html(html)
    		}
    	})
    }
}


$(function() {
    page.init()
})