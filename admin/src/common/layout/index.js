/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-16 09:41:44
 */
import React, { Component } from 'react'
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Content } = Layout;

import "./index.css"

import Header from 'common/header'
import Sider from 'common/sider'

class AdminLayout extends Component {
    render() {
        return (
            <div className="AdminLayout">
                <Layout>
                	<Header />
                <Layout>
                <Sider />
                  <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                      style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                      }}
                    >
                      {this.props.children}
                    </Content>
                  </Layout>
                </Layout>
                </Layout>
            </div>
        )          
    }
}

export default AdminLayout