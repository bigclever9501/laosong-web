import request from '../until/request'
export function config(data) {
	return request({
		url: 'config',
		data
	})
}