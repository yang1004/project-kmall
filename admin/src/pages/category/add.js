/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-18 14:09:20
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Form,Breadcrumb,Select, Input, Button } from 'antd'
const { Option } = Select
import "./index.css"

class CategoryAdd extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(ev){
        ev.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.handleAdd(values)
            }
        })
    }
    componentDidMount(){
        this.props.handleLevelCategory()
    }
    render() {
        // console.log(this.props.categories)
        const { getFieldDecorator } = this.props.form
        const {categories} = this.props
        return (
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                    <Breadcrumb.Item>添加分类</Breadcrumb.Item>
                </Breadcrumb>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                    <Form.Item label="父级分类">
                      {getFieldDecorator('pid', {
                        rules: [{ required: true, message: '请选择父级分类' }],
                      })(
                        <Select
                          placeholder="请选择父级分类"
                        >
                            <Option value="0">根目录</Option>
                            {
                                categories.map((category)=>{
                                    return (
                                        <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option>
                                    )
                                })
                            }
                        </Select>,
                      )}
                    </Form.Item>                    
                    <Form.Item label="分类名称">
                      {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入分类名称' }],
                      })(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="手机分类名称">
                      {getFieldDecorator('mobileName', {
                        rules: [{ required: true, message: '请输入手机分类名称' }],
                      })(<Input autoComplete="off" />)}
                    </Form.Item>                        
                    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                      <Button type="primary" onClick={this.handleSubmit}>
                        提交
                      </Button>
                    </Form.Item>
                </Form>
            </Layout>
        )          
    }
}

const WrappedNormalAddForm = Form.create({ name: 'category' })(CategoryAdd);

//映射属性到组件
const mapStateToProps = (state) => ({
    categories:state.get('category').get('categories')
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
    handleAdd: (values) => {
        dispatch(actionCreator.getCategoryAddAction(values))
    },
    handleLevelCategory: () => {
        dispatch(actionCreator.getLevelCategoryAction())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalAddForm)