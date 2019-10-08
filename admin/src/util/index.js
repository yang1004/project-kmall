/*
* @Author: mac
* @Date:   2019-08-15 14:19:08
* @Last Modified by:   mac
* @Last Modified time: 2019-08-15 14:19:19
*/
export const saveUsername = (username)=>{
    window.localStorage.setItem('username',username)
}
export const getUsername = ()=>{
    return window.localStorage.getItem('username')
}
export const removeUsername = ()=>{
    window.localStorage.removeItem('username')
}