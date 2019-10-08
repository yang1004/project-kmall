/*
* @Author: mac
* @Date:   2019-09-03 19:26:54
* @Last Modified by:   mac
* @Last Modified time: 2019-09-07 14:50:32
*/
import api from 'api'
import {GET_ADS,GET_FLOORS} from './types.js'
//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [GET_ADS]({commit}){
        const result = await api.getPositionAds()
        commit(GET_ADS,{homeAds:result.data})
    },
    async [GET_FLOORS]({commit}){
        const result = await api.getFloors()
        commit(GET_FLOORS,{homeFloors:result.data})
    }
}