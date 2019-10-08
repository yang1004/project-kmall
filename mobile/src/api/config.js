/*
* @Author: mac
* @Date:   2019-08-16 10:21:12
* @Last Modified by:   mac
* @Last Modified time: 2019-10-08 12:42:31
*/
var API_CONFIG = {
	getPositionAds: 		['/ads/positionAds','get'],
	getProductDetail: 		['/products/detail','get'],
	getFloors: 				['/floors','get'],
	addCarts: 				['/carts','post'],
	login: 					['/sessions/users','post'],
	getCarts: 				['/carts','get'],
	deleteCarts: 			['/carts','delete'],
	updateCartsChoices: 	['/carts/choices','put'],
}

module.exports = {
	API_CONFIG
}