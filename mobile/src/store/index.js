/*
* @Author: mac
* @Date:   2019-09-03 19:29:08
* @Last Modified by:   mac
* @Last Modified time: 2019-09-09 14:45:39
*/
import Vue from 'vue'
import Vuex from 'vuex'

import home from '../pages/home/store/'
import detail from '../pages/detail/store/'
import login from '../pages/login/store/'
import cart from '../pages/cart/store/'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        home:home,
        detail:detail,
        login:login,
        cart:cart,
    }
}) 