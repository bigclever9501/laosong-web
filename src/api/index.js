import request from '../until/request'
export function index(data) {
	return request({
		url: 'index',
		data
	})
}