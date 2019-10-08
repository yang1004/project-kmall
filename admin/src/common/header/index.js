/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-21 10:31:07
 */
import React, { Component } from 'react'
import { Layout,Menu,Icon,Dropdown } from 'antd';
import { getUsername,removeUsername } from 'util';
import api from 'api'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import "./index.css"

class AdminHeader extends Component {
    constructor(props){
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout(){
        api.logout()
        .then(result=>{
            if(result.code == 0){
                removeUsername();
                window.location.href = '/login';
            }
        })
        /*
        axios({
            method: 'delete',
            url: 'http://127.0.0.1:3000/sessions/users'
        })
        .then(result=>{
            if(result.data.code == 0){
                removeUsername();
                window.location.href = '/login';
            }
        })
        */
    }
    render() {
        const menu = (
            <Menu onClick={this.handleLogout}>
                <Menu.Item key="1">
                    <Icon type="logout" />退出
                </Menu.Item>
            </Menu>
        )
        return (
            <div className="AdminHeader">
                <Header className="header">
                    <div className="logo">
                        KMALL
                    </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            {getUsername()}<Icon type="down" />
                        </a>
                    </Dropdown>
                </Header>
            </div>
        )
    }
}

export default AdminHeader