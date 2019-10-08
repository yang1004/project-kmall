/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   mac
 * @Last Modified time: 2019-08-21 15:38:58
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreator } from './store'
import Layout from 'common/layout'
import { Form,Breadcrumb,Select, Input, Button,InputNumber } from 'antd'
const { Option } = Select
import "./index.css"
import UploadImages from 'common/upload-images'
import RichEditor from 'common/rich-editor'
import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGES } from 'api/config.js'

class CategoryAdd extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
          productId:this.props.match.params.productId
        }
    }
    handleSubmit(ev){
        ev.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(this.state.productId){
                values.id = this.state.productId
            }
            this.props.handleSave(err,values)
        })
    }
    componentDidMount(){
        this.props.handleLevelCategory()
        if(this.state.productId){
            this.props.handleDetailProduct(this.state.productId)
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { 
            categories,
            mainImageValidateStatus,
            category,
            name,
            description,
            price,
            stock,
            detail,
            mainImage,
            images,
            mainImageHelp,
            imagesValidateStatus,
            imagesHelp,
            handleMainImage,
            handleImages,
            handleDetail
        } = this.props
        let mainImageFileList = [];
        let imagesFileList = [];
        if(mainImage){
            mainImageFileList.push({
                uid: '0',
                status: 'done',
                url: mainImage,
                response:{
                    url:mainImage
                }
            })
        }
        if(images){
            imagesFileList = images.split(',').map((item,index)=>({
                uid: index,
                status: 'done',
                url: item,
                response:{
                    url:item
                }
            }))
            
        }
        return (
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {this.state.productId ? "修改商品" : "添加商品"}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                    <Form.Item label="商品分类">
                      {getFieldDecorator('category', {
                        rules: [{ required: true, message: '请选择商品分类' }],
                        initialValue:category
                      })(
                        <Select
                          placeholder="请选择商品分类"
                        >
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
                    <Form.Item label="商品名称">
                      {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入商品名称' }],
                        initialValue:name
                      })(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="商品描述">
                      {getFieldDecorator('description', {
                        rules: [{ required: true, message: '请输入商品描述' }],
                        initialValue:description
                      })(<Input autoComplete="off" />)}
                    </Form.Item> 
                    <Form.Item label="商品价格">
                      {getFieldDecorator('price', {
                        rules: [{ required: true, message: '请输入商品价格' }],
                        initialValue:price
                      })(<InputNumber min={0} autoComplete="off" />)}
                    </Form.Item> 
                    <Form.Item label="商品库存">
                      {getFieldDecorator('stock', {
                        rules: [{ required: true, message: '请输入商品库存' }],
                        initialValue:stock
                      })(<InputNumber min={0} autoComplete="off" />)}
                    </Form.Item> 
                    <Form.Item 
                        label="封面图片" 
                        required={true}
                        validateStatus={mainImageValidateStatus}
                        help={mainImageHelp}
                    >
                      <UploadImages 
                        max={1}
                        action={UPLOAD_PRODUCT_IMAGE}
                        getFileList={
                            (fileList)=>{
                                handleMainImage(fileList)
                            }
                        }
                        fileList={mainImageFileList}
                      />
                    </Form.Item> 
                    <Form.Item 
                        label="商品图片" 
                        required={true}
                        validateStatus={imagesValidateStatus}
                        help={imagesHelp}
                    >
                      <UploadImages 
                        max={3}
                        action={UPLOAD_PRODUCT_IMAGE}
                        getFileList={
                            (fileList)=>{
                                handleImages(fileList)
                            }
                        }
                        fileList={imagesFileList}
                      />
                    </Form.Item>
                    <Form.Item label="商品详情">
                      <RichEditor 
                        url={UPLOAD_PRODUCT_DETAIL_IMAGES}
                        getValues={
                            (values)=>{
                                handleDetail(values)
                            }
                        }
                        values={detail}
                      />
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
    categories:state.get('product').get('categories'),
    mainImageValidateStatus:state.get('product').get('mainImageValidateStatus'),
    mainImageHelp:state.get('product').get('mainImageHelp'),
    imagesValidateStatus:state.get('product').get('imagesValidateStatus'),
    imagesHelp:state.get('product').get('imagesHelp'),
    category:state.get('product').get('category'),
    name:state.get('product').get('name'),
    description:state.get('product').get('description'),
    price:state.get('product').get('price'),
    stock:state.get('product').get('stock'),
    detail:state.get('product').get('detail'),
    mainImage:state.get('product').get('mainImage'),
    images:state.get('product').get('images'),
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
    handleSave: (err,values) => {
        dispatch(actionCreator.getProductSaveAction(err,values))
    },
    handleLevelCategory: () => {
        dispatch(actionCreator.getLevelCategoryAction())
    },
    handleMainImage:(values)=>{
        dispatch(actionCreator.setMainImageAction(values))
    },
    handleImages:(values)=>{
        dispatch(actionCreator.setImagesAction(values))
    },
    handleDetail:(values)=>{
        dispatch(actionCreator.setDetailAction(values))
    },
    handleDetailProduct:(productId)=>{
        dispatch(actionCreator.getDetailProductAction(productId))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalAddForm)