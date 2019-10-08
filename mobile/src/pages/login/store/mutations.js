/*
* @Author: mac
* @Date:   2019-09-03 19:26:54
* @Last Modified by:   mac
* @Last Modified time: 2019-09-08 09:42:19
*/
import {GET_LOGIN} from './types.js'
//唯一更改state的方法
//mutation必须是同步函数
export default {
	[GET_LOGIN](states,payload){
		states.username = payload
	},
}