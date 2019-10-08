/*
* @Author: TomChen
* @Date:   2019-08-12 15:11:47
* @Last Modified by:   mac
* @Last Modified time: 2019-08-16 17:35:38
*/
import { message } from 'antd'

import * as types  from './actionTypes.js'

import api from 'api'

const getPageRequestStartAction = ()=>({
    type:types.PAGE_START
})

const getPageRequestDoneAction = ()=>({
    type:types.PAGE_DONE
})

export const getSetPageAction = (payload)=>({
    type:types.SET_PAGE,
    payload
})

export const getUserListAction = (page)=>{
    return (dispatch,getState)=>{
        dispatch(getPageRequestStartAction())
        api.getPage({
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetPageAction(result.data))
            }else{
                message.error('获取首页数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })
        .finally(()=>{
            dispatch(getPageRequestDoneAction())
        })
    }
}



