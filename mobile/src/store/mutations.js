/*
* @Author: mac
* @Date:   2019-09-03 19:26:54
* @Last Modified by:   mac
* @Last Modified time: 2019-09-04 10:13:58
*/
import {ADD_TODO,DEL_TODO,SELECT_ALL_TODO,DEL_ALL_DONE} from './types.js'
//唯一更改state的方法
//mutation必须是同步函数
export default {
	[ADD_TODO](states,todo){
		states.todos.unshift(todo)
	},
	[DEL_TODO](states,index){
		states.todos.splice(index,1)
	},
	[SELECT_ALL_TODO](states,value){
		states.todos.forEach((item)=>{
            item.done = value
        })
	},
	[DEL_ALL_DONE](states){
		states.todos = states.todos.filter(item=>!item.done)
	}
}