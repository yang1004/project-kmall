/*
 * @Author: TomChen
 * @Date:   2019-08-21 17:42:33
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-28 14:24:27
 */
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var api = require('api')
var _util = require('util')
var _modal = require('./modal.js')

var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
require('./index.css')

var page = {

    init: function() {
        this.selectShippingId = ''
        this.$shippingBox = $('.shipping-box')
        this.$productBox = $('.product-box')
        this.loadShippingList()
        this.loadProductList()
        this.bindEvent()
    },
    loadShippingList: function() {
        var _this = this
        api.getShippingsList({
            success:function(shippings){
                console.log(shippings)
                /*
                var html = _util.render(shippingTpl,{
                    shippings:shippings
                })
                _this.$shippingBox.html(html)
                */
                _this.renderShippings(shippings)
            },
            error:function(){
                _util.showErrorMsg('加载地址失败,请稍后再试')
            }
        })
    },
    renderShippings:function(shippings){
        var _this = this
        shippings.forEach(function(shipping){
            if(shipping._id == _this.selectShippingId){
                shipping.active = true
            }
        })
        var html = _util.render(shippingTpl,{
            shippings:shippings
        })
        this.$shippingBox.html(html)
    },
    loadProductList: function() {
        var _this = this
        api.getOrdersProducts({
            success: function(result) {
                // console.log("result::",result)
                if (result.cartList.length > 0) {
                    var html = _util.render(productTpl, result)
                    _this.$productBox.html(html)
                } else {
                    _this.$productBox.html('<p class="empty-message">请去添加商品后再来结算哦！</p>')
                }
            },
            error: function() {
                _this.$productBox.html('<p class="empty-message">好像出错了，请稍后再试</p>')
            }
        })
    },
    bindEvent: function() {
        var _this = this
        //监听新增地址成功渲染页面
        this.$shippingBox.on('get-shippings',function(ev,shippings){
            _this.renderShippings(shippings)
        })
        //1.弹出添加地址面板 
        this.$shippingBox.on('click', '.shipping-add', function(){
            _modal.show()
        })
        //2.点击删除删除地址
        this.$shippingBox.on('click','.shipping-delete',function(ev){
            ev.stopPropagation()
            var id = $(this).parents('.shipping-item').data('shipping-id')
            api.deleteShipping({
                data:{
                    id:id
                },
                success:function(shippings){
                    if(_util.showConfirm('确定要删除此地址吗?')){
                        _this.renderShippings(shippings)
                    }
                },
                error:function(msg){
                    _util.showErrorMsg(msg)
                }
            })
        })
        //3.编辑操作
        this.$shippingBox.on('click','.shipping-edit',function(ev){
            ev.stopPropagation()
            var id = $(this).parents('.shipping-item').data('shipping-id')
            api.getShippingDetail({
                data:{
                    id:id
                },
                success:function(shippings){
                    _modal.show(shippings)
                },
                error:function(msg){
                    _util.showErrorMsg(msg)
                }
            })
        })
        //4.选中地址
        this.$shippingBox.on('click','.shipping-item',function(){
            $(this).addClass('active')
            .siblings('.shipping-item').removeClass('active')

            //保存选中地址的id
            _this.selectShippingId = $(this).data('shipping-id')
        })
        //5.去支付
        this.$productBox.on('click','.btn-submit',function(){
            if(_this.selectShippingId){
                api.addOrders({
                    data:{
                        shippingId:_this.selectShippingId,
                    },
                    success:function(order){
                        window.location.href = "./payment.html?orderNo="+order.orderNo
                    },
                    error:function(msg){
                        _util.showErrorMsg(msg)
                    }
                })
            }
            else{
                _util.showErrorMsg('请选择地址后再提交!')
            }
        })
    }
}


$(function() {
    page.init()
})