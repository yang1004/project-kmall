/*
* @Author: Tom
* @Date:   2019-04-11 11:18:06
* @Last Modified by:   mac
* @Last Modified time: 2019-08-29 11:41:59
*/
import * as types from './actionTypes.js'
import { fromJS } from 'immutable'

const defaultState = fromJS({
	isPageFetching:false,
	list:[],
	current:0,
	total:0,
	pageSize:0,
	order:{}
})
export default (state=defaultState,action)=>{
	if(action.type === types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list),
			keyword:action.payload.keyword || ''
		})
	}
	if(action.type === types.PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}
	if(action.type === types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}
	if(action.type === types.SET_DETAIL){
		return state.set('order',fromJS(action.payload))
	}
	
	return state;
}