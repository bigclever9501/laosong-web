import request from '../until/request'
export function recharge(data) {
	return request({
		url: 'recharge',
		data
	})
}
export function submitRechargeOrder(data) {
	return request({
		url: 'submitRechargeOrder',
		data
	})
}
export function getOrderStatus(data) {
	return request({
		url: 'getOrderStatus',
		data
	})
}
