/*
* @Author: mac
* @Date:   2019-08-22 11:34:28
* @Last Modified by:   mac
* @Last Modified time: 2019-08-26 09:49:23
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('pages/common/logo')
var _side = require('pages/common/side')
var api = require('api')
require('./index.css')

var _util = require('util')

var formErr = {
	hide:function(){
		$('.error-item')
        .hide()
        .find('.error-msg')
        .text('')
	},
	show:function(message){
		$('.error-item')
        .show()
        .find('.error-msg')
        .text(message)
	}
}

var page = {
	init:function(){
        this.renderSide()
        this.bindEvent()
    },
    renderSide:function(){
        _side.render('user-update-password')
    },
    bindEvent:function(){
        var _this = this

        $('#btn-submit').on('click',function(){
            _this.submit()
        })
        $('.side-content input').on('keyup',function(ev){
            if(ev.keyCode == 13){
                _this.submit()
            }
        })
    },
    submit:function(){
        //1.获取数据
        var formDate = {
        	password:$.trim($('[name="password"]').val()),
            repassword: $.trim($('[name="repassword"]').val()),
        }
        //2.校验数据
        var validateResult = this.validate(formDate)
        //验证成功
        console.log(formDate)
        if(validateResult.status){
            formErr.hide()
            //3.发送请求
            api.updateUser({
                data:formDate,
                success:function(data) {
                    _util.goResult('updatePassword')
                },
                error:function(msg){
                    formErr.show(msg) 
                }
            })
        }
        //验证失败
        else{
        	formErr.show(validateResult.message)
        }
    },
    validate:function(formDate){
    	var result = {
    		status:false,
    		message:''
    	}
    	//校验
    	//密码不能为空
    	if(!_util.validate(formDate.password,"require")){
    		result.message = '密码不能为空'
    		return result
    	}
    	//密码校验
    	if(!_util.validate(formDate.password,"password")){
    		result.message = '密码格式不正确'
    		return result
    	}
        //两次密码不一致
        if(formDate.password != formDate.repassword){
            result.message = "两次密码不一致"
            return result            
        }

    	result.status = true
    	return result
    }
}

$(function(){
	page.init()
})