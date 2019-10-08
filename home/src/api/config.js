/*
* @Author: mac
* @Date:   2019-08-16 10:21:12
* @Last Modified by:   mac
* @Last Modified time: 2019-10-08 12:41:52
*/
var API_CONFIG = {
	login: 					['/sessions/users','post'],
	getUsername: 			['/sessions/username','get'],
	logout: 				['/sessions/users','delete'],
	register: 				['/users','post'],
	checkUsername: 			['/users/checkUsername','get'],
	getUserinfo: 			['/sessions/users','get'],
	updateUser: 			['/users','put'],
	getHomeCategories: 		['/categories/homeCategories','get'],
	getPositionAds: 		['/ads/positionAds','get'],
	getFloors: 				['/floors','get'],
	getProductList: 		['/products/list','get'],
	getProductDetail: 		['/products/detail','get'],
	addCarts: 				['/carts','post'],
	getCartCount: 			['/carts/count','get'],
	getCarts: 				['/carts','get'],
	updateCartsChoices: 	['/carts/choices','put'],
	deleteCarts: 			['/carts','delete'],
	updateCartsCounts: 		['/carts/counts','put'],
	getOrdersProducts: 		['/orders/products','get'],
	addShippings: 			['/shippings','post'],
	getShippingsList: 		['/shippings/list','get'],
	deleteShipping: 		['/shippings','delete'],
	getShippingDetail: 		['/shippings/detail','get'],
	updateShippings: 		['/shippings','put'],
	addOrders: 				['/orders','post'],
	getPayments: 			['/payments','get'],
	setPaymentsStatus: 		['/payments/status','get'],
	getOrdersList: 			['/orders/list','get'],
	getOrdersDetail: 		['/orders/detail','get'],
	updateOrdersStatus: 	['/orders/status','put'],
}

module.exports = {
	API_CONFIG
}