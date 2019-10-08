/*
* @Author: mac
* @Date:   2019-08-22 11:34:28
* @Last Modified by:   mac
* @Last Modified time: 2019-08-26 09:48:55
*/
require('pages/common/logo')
require('pages/common/footer')
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
        this.bindEvent()
    },
    bindEvent:function(){
        var _this = this

        $('[name="username"]').on('blur',function(){
            var username = $(this).val()
            if (!_util.validate(username, 'require')) {
                return;
            }
            if (!_util.validate(username, 'username')) {
                return;
            }            
            api.checkUsername({
                data:{
                    username:username,
                },
                success:function(){
                    formErr.hide()
                },
                error:function(msg){
                    formErr.show(msg)
                }                
            })
        })

        $('#btn-submit').on('click',function(){
            _this.submit()
        })
        $('input').on('keyup',function(ev){
            if(ev.keyCode == 13){
                _this.submit()
            }
        })
    },
    submit:function(){
        //1.获取数据
        var formDate = {
        	username:$.trim($('[name="username"]').val()),
        	password:$.trim($('[name="password"]').val()),
            repassword: $.trim($('[name="repassword"]').val()),
            phone: $.trim($('[name="phone"]').val()),
            email: $.trim($('[name="email"]').val()),
        }
        //2.校验数据
        var validateResult = this.validate(formDate)
        //验证成功
        console.log(formDate)
        if(validateResult.status){
            formErr.hide()
            //3.发送请求
            api.register({
                data:formDate,
                success:function(data) {
                    _util.goResult('register')
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
    	//用户名不能为空
    	if(!_util.validate(formDate.username,"require")){
    		result.message = '用户名不能为空'
    		return result
    	}
    	//用户名校验
    	if(!_util.validate(formDate.username,"username")){
    		result.message = '用户名格式不正确'
    		return result
    	}
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
        //电话号码不能为空
        if (!_util.validate(formDate.phone, 'require')) {
            result.message = "电话号码不能为空"
            return result
        }
        //电话号码格式验证
        if (!_util.validate(formDate.phone, 'phone')) {
            result.message = "电话号码格式不正确"
            return result
        }
        //email不能为空
        if (!_util.validate(formDate.email, 'require')) {
            result.message = "email不能为空"
            return result
        }
        //电话号码格式验证
        if (!_util.validate(formDate.email, 'email')) {
            result.message = "email格式不正确"
            return result
        } 

    	result.status = true
    	return result
    }
}

$(function(){
	page.init()
})