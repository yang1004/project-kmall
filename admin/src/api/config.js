/*
* @Author: mac
* @Date:   2019-08-16 10:21:12
* @Last Modified by:   mac
* @Last Modified time: 2019-10-08 12:40:32
*/

export const SERVER = 'http://127.0.0.1:3000'
export const UPLOAD_PRODUCT_IMAGE = SERVER + '/products/images'
export const UPLOAD_PRODUCT_DETAIL_IMAGES = SERVER + '/products/detailImages'
export const UPLOAD_AD_IMAGE = SERVER + '/ads/image'

export const API_CONFIG = {
	login:						['/sessions/users','post'],
	logout: 					['/sessions/users','delete'],
	getCounts:  				['/counts/','get'],
	getPage: 					['/users/list','get'],
	getCategoryList: 			['/categories/list','get'],
	getAddCategories: 			['/categories','post'],
	getLevelCateory: 			['/categories/levelCategories','get'],
	updateCategoryName: 		['/categories/name','put'],
	updateCategoryMobileName: 	['/categories/mobileName','put'],
	updateCategoryOrderName: 	['/categories/order','put'],
	updateCategoryIsShow: 		['/categories/isShow','put'],
	getAddProduct: 				['/products','post'],
	getUpdateProduct: 			['/products','put'],
	getProductList: 			['/products/list','get'],
	updateProductOrder: 		['/products/order','put'],
	updateProductIsShow: 		['/products/isShow','put'],
	updateProductStatus: 		['/products/status','put'],
	updateProductIsHot: 		['/products/isHot','put'],
	getDetailProduct: 			['/products/detail','get'],
	getAdsList: 				["/ads/list","get"],
    getAdsDetail: 				["/ads/detail","get"],
    addAds: 					["/ads","post"],
    updateAds: 					["/ads","put"],
    updateAdsOrder: 			["/ads/order","put"],
    updateAdsIsShow: 			["/ads/isShow","put"],   
    getOrdersList: 				["/orders/list","get"],   
    getOrdersDetail: 			["/orders/detail","get"],
    getOrdersDeliver: 			["/orders/status","put"],
}