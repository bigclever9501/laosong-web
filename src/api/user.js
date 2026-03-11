import request from '../until/request'
export function restApiKey(data) {
	return request({
		url: 'restApiKey',
		data
	})
}
export function updateUserInfo(data) {
	return request({
		url: 'updateUserInfo',
		data
	})
}
export function getSoraList(data) {
	return request({
		url: 'getSoraList',
		data
	})
}

export function getUserRechargeList(data) {
	return request({
		url: 'getUserRechargeList',
		data
	})
}
