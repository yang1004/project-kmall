/*
* @Author: mac
* @Date:   2019-09-03 19:26:54
* @Last Modified by:   mac
* @Last Modified time: 2019-09-05 15:17:24
*/
import {GET_ADS,GET_FLOORS} from './types.js'
//唯一更改state的方法
//mutation必须是同步函数
export default {
	[GET_ADS](states,payload){
		states.ads = payload.homeAds
	},
	[GET_FLOORS](states,payload){
		states.floors = payload.homeFloors
	}
}