/*
* @Author: TomChen
* @Date:   2019-08-12 15:11:47
* @Last Modified by:   mac
* @Last Modified time: 2019-08-20 19:03:02
*/
import { message } from 'antd'

import * as types  from './actionTypes.js'

import { saveUsername } from 'util'

import api from 'api'

const getLoginRequestStartAction = ()=>({
    type:types.LOGIN_START
})

const getLoginRequestDoneAction = ()=>({
    type:types.LOGIN_DONE
})

export const getLoginAction = (values)=>{
    return (dispatch,getState)=>{
        dispatch(getLoginRequestStartAction())
        values.role = 'admin'
        api.login(values)
        .then(result=>{
            if(result.code == 0){
                //1.保存用户名
                saveUsername(result.data.username);
                //2.跳转后台首页
                window.location.href = "/"
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })
        .finally(()=>{
            dispatch(getLoginRequestDoneAction())
        })
        /*
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/sessions/users',
            withCredentials:true,
            data:values
        })
        .then(result=>{
            // console.log(result)
            const data = result.data;
            if(data.code == 0){
                //1.保存用户名
                saveUsername(data.data.username);
                //2.跳转后台首页
                window.location.href = "/"
            }else{
                message.error(data.message)
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })
        .finally(()=>{
            dispatch(getLoginRequestDoneAction())
        })
        */
    }
}



