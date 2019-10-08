/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-28 17:04:43
 */
import React, { Component } from 'react'
import './App.css'
import { getUsername } from 'util'
import { 
	BrowserRouter as Router, 
	// HashRouter as Router, 
	Route, 
	Link,
	Switch,
	Redirect
} from "react-router-dom";

import Home from 'pages/home'
import Login from 'pages/login'
import Err from 'common/err'
import User from 'pages/user'
import Category from 'pages/category'
import Product from 'pages/product'
import Ad from 'pages/ad'
import Order from 'pages/order'

class App extends Component {
    render() {
    	const ProtectRoute = ({component:Component},...rest)=>(<Route 
    		{...rest}
    		render={(props)=>{
    			return getUsername() ? <Component {...props} /> : <Redirect to="/login" />
    		}}
    	/>)
    	const LoginRoute = ({component:Component},...rest)=>(<Route 
    		{...rest}
    		render={(props)=>{
    			return getUsername() ? <Redirect to="/" /> : <Component {...props} />
    		}}
    	/>)
        return (
        	<Router forceRefresh={true}>
	            <div className="App">
		            <Switch>
	            	<ProtectRoute exact path="/" component={Home} />
                    <ProtectRoute path="/user" component={User} />
                    <ProtectRoute path="/category" component={Category} />
                    <ProtectRoute path="/product" component={Product} />
	            	<LoginRoute path="/login" component={Login} />
                    <ProtectRoute  path="/ad" component={Ad}  />
                    <ProtectRoute  path="/order" component={Order}  />
	            	<Route component={Err}/>
	            	</Switch>
	            </div>
            </Router>
        )          
    }
}



export default App