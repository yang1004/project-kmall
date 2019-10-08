/*
* @Author: mac
* @Date:   2019-08-15 16:21:35
* @Last Modified by:   mac
* @Last Modified time: 2019-08-15 16:35:24
*/
import React,{Component} from 'react'
import { Alert } from 'antd';
import { Link } from "react-router-dom";

import './index.css'

class Err extends Component{
	render(){
		return (
			<div className="Err">
				<Alert
					message="访问页面不存在"
					description="访问的页面不存在，请检查输入地址是否正确"
					type="error"
					showIcon
				/>
				<Link to="/">回到首页</Link>
			</div>
		)
	}
}

export default Err