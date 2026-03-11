import request from '../until/request'
export function login(data) {
	return request({
		url: 'login',
		data
	})
}
export function sendCode(data) {
	return request({
		url: 'sendCode',
		data
	})
}
export function userInfo(data) {
	return request({
		url: 'userInfo',
		data
	})
}
