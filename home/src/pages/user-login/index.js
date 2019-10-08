/*
* @Author: mac
* @Date:   2019-08-22 11:34:28
* @Last Modified by:   mac
* @Last Modified time: 2019-08-24 14:57:09
*/
require('pages/common/logo')
require('pages/common/footer')

require('./index.css')
var api = require('api')
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
        	password:$.trim($('[name="password"]').val())
        }
        //2.校验数据
        var validateResult = this.validate(formDate)
        //验证成功
        if(validateResult.status){
            formErr.hide()
            //3.发送请求
            /*
            $.ajax({
            	url:'/sessions/users',
            	type:'post',
            	data:formDate,
            	dataType:'json',
            	success:function(result){
            		if(result.code == 0){
            			window.location.href = '/'
            		}else{
            			formErr.show(result.message)
            		}
            	},
            	error:function(err){
            		formErr.show('网络错误,请稍后再试')
            	}
            })
            */
            api.login({
            	data:formDate,
            	success:function(data){
            		window.location.href = _util.getParamFromUrl('redirect') || '/'
            	},
            	error:function(err){
            		formErr.show(err)
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

    	result.status = true
    	return result
    }
}

$(function(){
	page.init()
})