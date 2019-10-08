/*
* @Author: mac
* @Date:   2019-09-06 15:47:00
* @Last Modified by:   mac
* @Last Modified time: 2019-09-06 15:49:03
*/
export default {
	getParamFromUrl:function(key){
		var query = window.location.search.substr(1)
		//type=register
        //name=tom&type=register
        //type=register&age=111
        //name=tom&type=register&age=111
		var reg = new RegExp('(^|&)'+key+'='+'([^&]*)(&|$)')
        var result = query.match(reg)
        return result ? decodeURIComponent(result[2]) : null
	},
}