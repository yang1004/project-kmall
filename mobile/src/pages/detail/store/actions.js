/*
* @Author: mac
* @Date:   2019-09-03 19:26:54
* @Last Modified by:   mac
* @Last Modified time: 2019-09-09 16:55:51
*/
import api from 'api'
import {GET_DETAIL,ADD_CARTS} from './types.js'
//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [GET_DETAIL]({commit},id){
        const result = await api.getProductDetail({
    		id:id
        })
        var images = result.data.images.split(',')
        result.data.images = images
        commit(GET_DETAIL,{data:result.data})
    },
    async [ADD_CARTS]({commit},data){
        const result = await api.addCarts(data)
        commit(ADD_CARTS,result.message)
    },
}