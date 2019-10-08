/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-21 16:00:50
 */
import React, { Component } from 'react'
import { 
    Route,
    Switch
} from "react-router-dom";

import ProductList from './list.js'
import ProductSave from './save.js'
import ProductDetail from './detail.js'

import "./index.css"

class Product extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Switch>
                <Route path="/product/save/:productId?" component={ProductSave} />
                <Route path="/product/detail/:productId?" component={ProductDetail} />
                <Route path="/product" component={ProductList} />
            </Switch>
        )          
    }
}


export default Product