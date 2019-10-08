/*
* @Author: TomChen
* @Date:   2019-08-12 15:11:47
* @Last Modified by:   mac
* @Last Modified time: 2019-08-21 16:57:45
*/
import { message } from 'antd'

import * as types  from './actionTypes.js'

import api from 'api'

const getPageRequestStartAction = ()=>({
    type:types.PAGE_START
})

const getPageRequestDoneAction = ()=>({
    type:types.PAGE_DONE
})

export const getSetPageAction = (payload)=>({
    type:types.SET_PAGE,
    payload
})

export const getSetLevelAction = (payload)=>({
    type:types.SET_LEVELCATEGORY,
    payload
})

export const setMainImageAction = (payload)=>({
    type:types.SET_MAIN_IMAGE,
    payload
})

export const setImagesAction = (payload)=>({
    type:types.SET_IMAGES,
    payload
})

export const setDetailAction = (payload)=>({
    type:types.SET_DETAIL,
    payload
})

const setMainImageErrorAction = ()=>({
    type:types.SET_MAIN_IMAGE_ERROR
})
const setImagesErrorAction = ()=>({
    type:types.SET_IMAGES_ERROR
})


export const getProductSaveAction = (err,values)=>{
    return (dispatch,getState)=>{
        console.log('values::',values)
        const state = getState().get('product');
        const mainImage = state.get('mainImage');
        const images = state.get('images');
        const detail = state.get('detail');
        let hasErr = false;
        if(err){
            hasErr = true; 
        }
        if(!mainImage){
            hasErr = true;
            dispatch(setMainImageErrorAction())
        }
        if(!images){
            hasErr = true;
            dispatch(setImagesErrorAction())
        }

        if(hasErr){
            return 
        }
        let response = api.getAddProduct
        if(values.id){
            response = api.getUpdateProduct
        }
        response({
            ...values,
            mainImage,
            images,
            detail
        })
        .then(result=>{
            if(result.code == 0){
                message.success(result.message,()=>{
                    window.location.href = '/product'
                })
            }else{
                message.error(result.message)
            }
            
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })
    }
}

export const getProductListAction = (page,keyword)=>{
    return (dispatch,getState)=>{
        dispatch(getPageRequestStartAction())
        let options = {
            page:page
        }
        if(keyword){
            options.keyword = keyword
        }
        api.getProductList(options)
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetPageAction(result.data))
            }else{
                message.error('获取商品数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })
        .finally(()=>{
            dispatch(getPageRequestDoneAction())
        })
    }
}

export const getLevelCategoryAction = ()=>{
    return (dispatch,getState)=>{
        api.getLevelCateory({
            level:3
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetLevelAction(result.data))
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })              
    }
}

export const getProductUpdateOrderAction = (id,newOrder)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductOrder({
            id:id,
            order:newOrder,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新分类排序成功')
                dispatch(getSetPageAction(result.data))
                // window.location.href='/product/'
            }else{
                message.error('获取首页数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })
    }
}

export const getProductUpdateIsShowAction = (id,newIsShow)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductIsShow({
            id:id,
            isShow:newIsShow,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新显示隐藏成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error('获取首页数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })
    }
}
export const getProductUpdateStatusAction = (id,newStatus)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductStatus({
            id:id,
            status:newStatus,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新上架下架成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error('获取首页数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })
    }
}
export const getProductUpdateIsHotAction = (id,newIsHot)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductIsHot({
            id:id,
            isHot:newIsHot,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新是否热卖成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error('获取首页数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })
    }
}

const setProductDetailAction = (payload)=>({
    type:types.SET_PRODUCT_DETAIL,
    payload
})
export const getDetailProductAction = (productId)=>{
    console.log(productId)
    return (dispatch,getState)=>{
        api.getDetailProduct({
            id:productId
        })
        .then(result=>{
            if(result.code == 0){
                console.log(result.data)
                dispatch(setProductDetailAction(result.data))
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })
    }
}


