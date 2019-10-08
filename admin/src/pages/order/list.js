/*
 * @Author: Tom
 * @Date:   2019-04-09 17:02:09
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-29 11:43:47
 */
import React, { Component } from 'react'
import { Table, Divider, Tag, Breadcrumb, InputNumber, Button, Modal, Input, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import moment from 'moment'

import Layout from 'common/layout'
import { actionCreator } from './store'

import './index.css'
class AdList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.handlePage(1)
    }
    render() {
        const {
            handlePage,
            list,
            current,
            total,
            pageSize,
            keyword,
            isPageFetching,
        } = this.props;
        const columns = [{
                title: '订单号',
                dataIndex: 'orderNo',
                key: 'orderNo',
                width: 300,
                render:orderNo=>{
                    if (keyword) {
                        const reg = new RegExp('(' + keyword + ')', 'ig')
                        const html = orderNo.replace(reg, '<b style="color:red">$1</b>')
                        return <span dangerouslySetInnerHTML={{__html:html}}></span>
                    } else {
                        return orderNo;
                    }
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
            {
                title: '订单状态',
                dataIndex: 'statusDesc',
                key: 'statusDesc',
            },
            {
                title: '订单金额',
                dataIndex: 'payment',
                key: 'payment',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
			  	<Link to={"/order/detail/"+record.orderNo} >处理订单</Link>
			  	</span>
                )
            },
        ];
        const dataSource = list.map((order)=>{
            return {
                key:order.get('orderNo'),
                orderNo:order.get('orderNo'),
                statusDesc:order.get('statusDesc'),
                payment:order.get('payment'),
                createdAt:moment(order.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
            }
        }).toJS()
        console.log(dataSource)
        return (
            <div className="AdList">  
	            <Layout>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                  <Breadcrumb.Item>订单列表</Breadcrumb.Item>
                </Breadcrumb>
				<div className="content">						
            	<Table 
	            	dataSource={dataSource} 
	            	columns={columns}
                    onChange={(page)=>{
                        if(keyword){
                            handleSearch(keyword,page.current)
                        }else{
                            handlePage(page.current)    
                        }
                    }}
                    pagination={{
                        current:current,
                        total:total,
                        pageSize:pageSize
                    }} 
	            	rowKey="_id"
            	/>
            	</div>            	
	            </Layout>  
	        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isPageFetching:state.get('order').get('isPageFetching'),
        list:state.get('order').get('list'),
        current:state.get('order').get('current'),
        total:state.get('order').get('total'),
        pageSize:state.get('order').get('pageSize'),            
        keyword:state.get('order').get('keyword'),  
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handlePage: (page) => {
            dispatch(actionCreator.getPageAction(page))
        },
        handleSearch:(keyword,page)=>{
            dispatch(actionCreator.getSearchAction(keyword,page))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdList)