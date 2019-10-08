/*
* @Author: mac
* @Date:   2019-08-16 10:18:05
* @Last Modified by:   mac
* @Last Modified time: 2019-09-07 14:53:22
*/
//目标 导出一个对象 对象的属性是方法名，对象的值是方法

import axios from 'axios'

import { API_CONFIG } from './config.js'

const getObj = (apiConfig)=>{
    const apiObj = {}

    for(let key in apiConfig){
        apiObj[key] = (data)=>{
            let url = apiConfig[key][0] || '';
            let method = apiConfig[key][1] || 'get';

            return request(url,method,data)
        }
    }

    return apiObj
}

const request = (url,method,data)=>{
    return new Promise((resolve,reject)=>{
        const options = {
            method: method,
            url: url,
            withCredentials:true
        }
        switch(options.method.toUpperCase()){
            case 'GET':
            case 'DELETE':
                options.params = data;
                break;
            default:
                options.data = data
        }
        axios(options)
        .then(result=>{
            const data = result.data
            if(data.code == 10){
                window.location.href = "/login"
                reject('用户未登录')
            }
            resolve(data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

export default getObj(API_CONFIG)