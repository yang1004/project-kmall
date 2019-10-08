/*
* @Author: mac
* @Date:   2019-09-03 19:26:54
* @Last Modified by:   mac
* @Last Modified time: 2019-09-09 16:51:30
*/
import {GET_DETAIL,ADD_CARTS} from './types.js'
//唯一更改state的方法
//mutation必须是同步函数
export default {
	[GET_DETAIL](states,payload){
		states.detail = payload.data
	},
	[ADD_CARTS](states,payload){
		states.message = payload
	},
}