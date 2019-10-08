/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-28 17:06:01
 */
import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

import "./index.css"

import Header from 'common/header'

class AdminSider extends Component {
    render() {
        return (
            <div className="AdminSider">
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        style={{ minHeight: '750px', borderRight: 0 }}
                    >
                        <Menu.Item key="1">
                            <NavLink exact to="/">首页</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to="/user">用户列表</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to="/category">分类列表</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink to="/product">商品管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <NavLink to="/ad"><Icon type="fund" />广告管理</NavLink>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <NavLink to="/order">订单管理</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        )
    }
}

export default AdminSider