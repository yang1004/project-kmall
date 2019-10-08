/*
* @Author: mac
* @Date:   2019-08-23 09:45:34
* @Last Modified by:   mac
* @Last Modified time: 2019-08-28 15:28:32
*/
require('pages/common/logo')

require('pages/common/footer')
var _util = require('util')
require('./index.css')

$(function(){
	var type = _util.getParamFromUrl('type') || 'default'
	if(type == "payment"){
		var $btn = $('.order-detail')
		var url = $btn.attr('href') + _util.getParamFromUrl('orderNo')
		$btn.attr('href',url)
	}
    $('.'+type).show()
})