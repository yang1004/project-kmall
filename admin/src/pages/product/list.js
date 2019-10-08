/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-21 19:14:35
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Table,Button,Input,InputNumber,Switch,Divider } from 'antd'
const { Search } = Input
import Layout from 'common/layout'
import moment from 'moment'
import { 
    Link
} from "react-router-dom";

import "./index.css"
import { actionCreator } from './store'



class CategoryList extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.handlePage(1)
    }
    render() {
        const { 
            list,
            current,
            total,
            pageSize,
            handlePage,
            isFetching,
            keyword,
            handleUpdateName,
            handleUpdateMobileName,
            handleUpdateOrder,
            handleUpdateIsShow,
            handleUpdateStatus,
            handleUpdateIsHot
        } = this.props;
        const dataSource = list.toJS();
        const columns = [{
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
                render:(name)=>{
                    if(keyword){
                        const reg = new RegExp('('+keyword+')',"ig")
                        const html = name.replace(reg,'<b style="color:red">$1</b>')
                        return <span dangerouslySetInnerHTML={{__html:html}} ></span>
                    }else{
                        return name
                    }
                }
            },
            {
                title: '是否首页显示',
                dataIndex: 'isShow',
                key: 'isShow',
                render:(isShow,record)=><Switch 
                    checkedChildren="是" 
                    unCheckedChildren="否" 
                    checked={isShow == '0' ? false : true}
                    onChange={
                        (checked)=>{
                            handleUpdateIsShow(record._id,checked ? '1' : '0')
                        }
                    } 
                />
            },
            {
                title: '上架/下架',
                dataIndex: 'status',
                key: 'status',
                render:(status,record)=><Switch 
                    checkedChildren="上架" 
                    unCheckedChildren="下架" 
                    checked={status == '0' ? false : true}
                    onChange={
                        (checked)=>{
                            handleUpdateStatus(record._id,checked ? '1' : '0')
                        }
                    } 
                />
            },
            {
                title: '是否热卖',
                dataIndex: 'isHot',
                key: 'isHot',
                render:(isHot,record)=><Switch 
                    checkedChildren="是" 
                    unCheckedChildren="否" 
                    checked={isHot == '0' ? false : true}
                    onChange={
                        (checked)=>{
                            handleUpdateIsHot(record._id,checked ? '1' : '0')
                        }
                    } 
                />
            },                        
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                render:(order,record)=><InputNumber 
                    defaultValue={order}
                    onBlur={
                        (ev)=>{
                            if(ev.target.value != order){
                                handleUpdateOrder(record._id,ev.target.value)    
                            }
                        }
                    }
                />                 
            },
            {
                title:'操作',
                render:(text,record)=><span>
                    <Link to={"/product/save/"+record._id}>修改</Link>
                    <Divider type="vertical" />
                    <Link to={"/product/detail/"+record._id}>查看</Link>
                </span>
            }
        ]
        return (
            <div className="User">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>商品列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginBottom:16,height:40}} className='claerfix'>
                        <Search 
                            placeholder="请输入商品名称关键字" 
                            onSearch={
                                value => handlePage(1,value)
                            } 
                            enterButton 
                            style={{ width: 300 }}
                        />
                        <Link to="/product/save" style={{float:'right'}}>
                            <Button type="primary">
                                添加商品
                            </Button>
                        </Link>
                    </div>
                    <div className="content">
                        <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        pagination={{
                            current:current,
                            total:total,
                            pageSize:pageSize
                        }}
                        rowKey="_id"
                        onChange={
                            (page)=>{
                                handlePage(page.current,keyword)
                            }
                        }
                        loading={
                            {
                                spinning:isFetching,
                                tip:'数据正在努力的加载中'
                            }
                        }
                        />
                    </div>
                </Layout>
            </div>
        )          
    }
}

//映射属性到组件
const mapStateToProps = (state)=>({
    list:state.get('product').get('list'),
    current:state.get('product').get('current'),
    total:state.get('product').get('total'),
    pageSize:state.get('product').get('pageSize'),
    isFetching:state.get('product').get('isFetching'),
    keyword:state.get('product').get('keyword'),
})
//映射方法到组件
const mapDispatchToProps = (dispatch)=>({
    handlePage:(page,keyword)=>{
        dispatch(actionCreator.getProductListAction(page,keyword))
    },
    handleUpdateStatus:(id,newStatus)=>{
        dispatch(actionCreator.getProductUpdateStatusAction(id,newStatus))
    },
    handleUpdateIsHot:(id,newIsHot)=>{
        dispatch(actionCreator.getProductUpdateIsHotAction(id,newIsHot))
    },
    handleUpdateOrder:(id,newOrder)=>{
        dispatch(actionCreator.getProductUpdateOrderAction(id,newOrder))
    },
    handleUpdateIsShow:(id,newIsShow)=>{
        dispatch(actionCreator.getProductUpdateIsShowAction(id,newIsShow))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)