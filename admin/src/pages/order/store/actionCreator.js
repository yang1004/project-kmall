/*
* @Author: Tom
* @Date:   2019-04-11 11:51:35
* @Last Modified by:   mac
* @Last Modified time: 2019-08-29 11:44:04
*/
import axios from 'axios'
import * as types from './actionTypes.js'
import {message} from 'antd'
import { request } from 'util'
import api from 'api'

const getPageRequstAction = ()=>{
	return {
		type:types.PAGE_REQUEST
	}
}
const getSetPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}

const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
}

const getSetDetailAction = (payload)=>{
	return {
		type:types.SET_DETAIL,
		payload
	}
}
export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequstAction())
		api.getOrdersList({
			page:page
		})
		.then(result=>{
			console.log(result)
			if(result.code == 0){
				dispatch(getSetPageAction(result.data))
			}else{
				message.error(result.message)
			}
		})
		.finally(()=>{
			dispatch(getPageDoneAction())
		})
	}
}
export const getSearchAction = (keyword,page)=>{
	return (dispatch)=>{
		api.getOrdersList({
			page:page,
			keyword:keyword
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(getSetPageAction(result.data))
			}else{
				message.error(result.message)
			}			
		})
	}
}
export const getDetailAction = (orderNo)=>{
	return (dispatch)=>{
		api.getOrdersDetail({
			orderNo:orderNo
		})
		.then(result=>{
			console.log(result)
			if(result.code == 0){
				dispatch(getSetDetailAction(result.data))
			}else{
				message.error(result.message)
			}
		})
	}
}

export const getOrderDeliverAction = (orderNo)=>{
	return (dispatch)=>{
		api.getOrdersDeliver({
			orderNo:orderNo,
			status:40
		})
		.then(result=>{
			console.log(result)
			if(result.code == 0){
				dispatch(getSetDetailAction(result.data))
			}else{
				message.error(result.message)
			}
		})
	}
}