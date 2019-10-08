/*
* @Author: mac
* @Date:   2019-09-03 19:26:54
* @Last Modified by:   wenzeyang
* @Last Modified time: 2019-09-11 09:47:41
*/
import api from 'api'
import {GET_CARTS,PUT_CHECKED} from './types.js'
//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [GET_CARTS]({commit}){
        const result = await api.getCarts()
        if(result.code == 0){
        	commit(GET_CARTS,result.data)
        }
    },
    async [PUT_CHECKED]({commit},data){
        const result = await api.updateCartsChoices(data)
        console.log(result)
    },
}