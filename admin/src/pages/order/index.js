/*
* @Author: Tom
* @Date:   2019-04-17 16:11:21
* @Last Modified by:   mac
* @Last Modified time: 2019-08-29 08:24:29
*/
import React, { Component } from 'react'
import { Switch,Route } from 'react-router-dom';
import OrderList from './list.js'
import OrderDetail from './detail.js'

class Order extends Component {
	render(){
		return(
			<Switch>
				<Route path="/order/detail/:orderNo?" component={OrderDetail} />
				<Route path="/order/" component={OrderList} />
			</Switch>
		)
	}
}

export default Order