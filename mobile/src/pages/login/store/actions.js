/*
* @Author: mac
* @Date:   2019-09-03 19:26:54
* @Last Modified by:   mac
* @Last Modified time: 2019-09-08 09:42:15
*/
import api from 'api'
import {GET_LOGIN} from './types.js'
//组件中用由this.$store.dispatch方法来派发action,action中用commit来提交mutation
//action中可以包含异步操作
export default {
    async [GET_LOGIN]({commit},data){
        const result = await api.login(data)
        if(result.code == 0){
            commit(GET_LOGIN,result.data.username)
        }else{
            commit(GET_LOGIN,'')
        }
    },
}