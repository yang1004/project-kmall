/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-30 09:00:31
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Breadcrumb,Table,Button,Input,InputNumber,Switch} from 'antd'
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
            handleUpdateName,
            handleUpdateMobileName,
            handleUpdateOrderName,
            handleUpdateIsShow
        } = this.props;
        const dataSource = list.toJS();
        const columns = [{
            title: '分类名称',
            dataIndex: 'name',
            width:'40%',
            key: 'name',
            render:(name,record)=><Input 
                style={{width:'60%'}}
                defaultValue={name}
                onBlur={(ev)=>{
                    const newName = ev.target.value
                    if(name != newName){
                        handleUpdateName(record._id,newName)
                    }
                    
                }}
            />
        },
        {
            title: '手机分类名称',
            dataIndex: 'mobileName',
            width:'20%',
            key: 'mobileName',
            render:(name,record)=><Input 
                style={{width:'60%'}}
                defaultValue={name}
                onBlur={(ev)=>{
                    const newName = ev.target.value
                    if(name != newName){
                        handleUpdateMobileName(record._id,newName)
                    }
                    
                }}
            />
        },
        {
            title: '是否显示',
            dataIndex: 'isShow',
            key: 'isShow',
            render:(isShow,record)=><Switch 
                checkedChildren="开" 
                unCheckedChildren="关" 
                checked={isShow==0 ? false : true} 
                onChange={(checked)=>{
                    handleUpdateIsShow(record._id,checked ? '1' : '0')
                }}
            />
        },
        {
            title: '排序',
            dataIndex: 'order',
            width:'15%',
            key: 'order',
            render:(name,record)=><InputNumber 
                style={{width:'60%'}}
                defaultValue={name}
                onBlur={(ev)=>{
                    const newName = ev.target.value
                    if(name != newName){
                        handleUpdateOrderName(record._id,newName)
                    }
                    
                }}
            />
        }];
        return (
            <div className="User">
                <Layout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                        <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginBottom:16,height:40}} className='claerfix'>
                        <Link to="/category/add" style={{float:'right'}}>
                            <Button type="primary">
                                添加分类
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
                        onChange={
                            (page)=>{
                                handlePage(page.current)
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
    list:state.get('category').get('list'),
    current:state.get('category').get('current'),
    total:state.get('category').get('total'),
    pageSize:state.get('category').get('pageSize'),
    isFetching:state.get('category').get('isFetching'),
})
//映射方法到组件
const mapDispatchToProps = (dispatch)=>({
    handlePage:(page)=>{
        dispatch(actionCreator.getCategoryListAction(page))
    },
    handleUpdateName:(id,newName)=>{
        dispatch(actionCreator.getCategoryUpdateNameAction(id,newName))
    },
    handleUpdateMobileName:(id,newMobileName)=>{
        dispatch(actionCreator.getCategoryUpdateMobileNameAction(id,newMobileName))
    },
    handleUpdateOrderName:(id,newOrder)=>{
        dispatch(actionCreator.getCategoryUpdateOrderAction(id,newOrder))
    },
    handleUpdateIsShow:(id,newIsShow)=>{
        dispatch(actionCreator.getCategoryUpdateIsShowAction(id,newIsShow))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)