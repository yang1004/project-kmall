/*
* @Author: TomChen
* @Date:   2019-08-12 15:11:47
* @Last Modified by:   mac
* @Last Modified time: 2019-08-21 14:45:21
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

export const getCategoryAddAction = (values)=>{
    return (dispatch,getState)=>{
        api.getAddCategories(values)
        .then(result=>{
            if(result.code == 0){
                message.success('分类添加成功')
                dispatch(getSetLevelAction(result.data))
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

export const getLevelCategoryAction = ()=>{
    return (dispatch,getState)=>{
        api.getLevelCateory()
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetLevelAction(result.data))
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

export const getCategoryListAction = (page)=>{
    return (dispatch,getState)=>{
        dispatch(getPageRequestStartAction())
        api.getCategoryList({
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetPageAction(result.data))
            }else{
                message.error('获取分类数据失败,请稍后再试')
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

export const getCategoryUpdateNameAction = (id,newName)=>{
    return (dispatch,getState)=>{
        const page = getState().get('category').get('current')
        api.updateCategoryName({
            id:id,
            name:newName,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新分类名称成功')
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

export const getCategoryUpdateMobileNameAction = (id,newMobileName)=>{
    return (dispatch,getState)=>{
        const page = getState().get('category').get('current')
        api.updateCategoryMobileName({
            id:id,
            mobileName:newMobileName,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新手机分类名称成功')
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

export const getCategoryUpdateOrderAction = (id,newOrder)=>{
    return (dispatch,getState)=>{
        const page = getState().get('category').get('current')
        api.updateCategoryOrderName({
            id:id,
            order:newOrder,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新分类排序成功')
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

export const getCategoryUpdateIsShowAction = (id,newIsShow)=>{
    return (dispatch,getState)=>{
        const page = getState().get('category').get('current')
        api.updateCategoryIsShow({
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



