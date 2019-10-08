/*
* @Author: TomChen
* @Date:   2019-08-21 17:42:33
* @Last Modified by:   mac
* @Last Modified time: 2019-08-28 15:25:07
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')
require('./index.css')

var page = {
    paymentsPrarms:{
        orderNo:_util.getParamFromUrl('orderNo')
    },    
    init:function(){
        this.$elem = $('.payment-box')
        this.loadPayments()
    },
    loadPayments:function(){
        var _this = this
        if(this.paymentsPrarms.orderNo){
            api.getPayments({
                data:{
                    orderNo:_this.paymentsPrarms.orderNo
                },
                success:function(payment){
                    var html = _util.render(tpl,payment)
                    _this.$elem.html(html)
                    _this.setPayments()
                },
                error:function(){
                    _this.$elem.html('<p class="empty-message">获取支付信息失败,请稍后再试</p>')
                }
            })
        }else{
           this.$elem.html('<p class="empty-message">没有订单,请重新跳转页面</p>')
        }
    },
    setPayments:function(){
    	var _this = this
    	this.timer = setInterval(function(){
    		api.setPaymentsStatus({
    			data:{
    				orderNo:_this.paymentsPrarms.orderNo
    			},
    			success:function(result){
    				console.log(result)
    				if(result){
    					clearInterval(this.timer)
    					window.location.href = './result.html?type=payment&orderNo='+_this.paymentsPrarms.orderNo
    				}
    			}
	    	})
    	},1000)
    }
}



$(function() {
    page.init()
})