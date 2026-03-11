//request.js
import axios from "axios";
import qs from "qs";
import store from '../store'
import app from "../main.js";

import router from '@/router'
import {
	IS_W7,
	reqHeader
} from '@/until/tool'

import {
	Message,
	Loading,
	MessageBox
} from 'element-ui'
import {
	getCookie,
	setCookie
} from '@/until/tool'

const service = axios.create({
	// baseURL: siteurl + 'public/index.php/api/site/',
	baseURL: siteurl + 'api/site/',
	timeout: 1000000000000000, // request timeout
})
const loading = { //loading加载对象
	loadingInstance: null,
	//打开加载
	open() {
		if (this.loadingInstance === null) { // 如果实例 为空，则创建
			this.loadingInstance = Loading.service({
				text: '加载中...', //加载图标下的文字
			})
		}
	},
	//关闭加载
	close() {
		// 不为空时, 则关闭加载窗口
		if (this.loadingInstance !== null) {
			this.loadingInstance.close()
		}
		this.loadingInstance = null
	}
}


service.interceptors.request.use(
	config => {
		if (!config.data.method) {
			config.url = config.baseURL + config.url //请求路径
		} else {
			let url = ''
			for (let key in config.data) {
				url += (url.indexOf('?') == -1 ? '?' : '&') + key + '=' + config.data[key]
			}
			config.url = config.baseURL + config.url + url //请求路径
		}
		config.headers['token'] = getCookie('baisheng_token') //token
		config.headers['uid'] = getCookie('baisheng_uid') //uid
		config.headers = reqHeader()
		if (!config.data.method) {
			config.method = 'post'
		} else {
			config.method = config.data.method
		}
		if (config.data.loading == false) {
			store.commit('setLoading', false);
		} else {
			store.commit('setLoading', true);
		}
		return config
	},
	error => {

		return Promise.reject(error)
	}
)
service.interceptors.response.use(
	response => {
		if (typeof(response.data) == 'string' && response.data.indexOf("SourceGuardian") != -1) {
			MessageBox.alert('未安装PHP sg11扩展，请安装后重试', "错误提示", {
				confirmButtonText: "确定",
				callback: action => {
					store.commit('setLoading', false);
					return false
				}
			})
		}
		const res = response.data
		if (response.config.method == 'get') {
			store.commit('setLoading', false);
			return response.config.url
		}

		if (res.code == 0) {
			Message.error({
				message: res.msg
			});
		} else if (res.code == -3) {
			Message.error({
				message: res.msg
			});
			store.commit('setLoading', false);
		} else {
			if (res.code == 1) {
				Message.success({
					message: res.msg
				})
			}
			if (res.code == -1) { //验证登录
				console.log('未登录')
				router.push({
					name: 'login',
				});
				// 删除token
				setCookie('yzd_kp_token', '', -1)
			}
			// if(res.code == -2){//无需账号密码登录
			// 	console.log('无需账号密码登录')
			// }
			store.commit('setLoading', false);
		}
		return res
	},
	error => {
		console.log('error', error); // 用于调试

		let errorMessage = "请求失败";

		if (error.response) {
			// 如果是 HTML 响应（如 Laravel 500 错误页）
			if (typeof error.response.data === 'string' && error.response.data.includes('<!--')) {
				// 使用正则提取 <!-- 到 in file 之间的内容
				const match = error.response.data.match(/<!--([^#]*)in file/);
				if (match && match[1]) {
					errorMessage = match[1].trim(); // 去除前后空格
				}
			}
			// 如果是 JSON 响应
			else if (error.response.data && error.response.data.message) {
				errorMessage = error.response.data.message;
			}
		} else if (error.message) {
			errorMessage = error.message;
		}

		// 显示错误提示
		MessageBox.alert(errorMessage, "错误提示", {
			confirmButtonText: "确定",
			callback: action => {
				store.commit('setLoading', false);
			}
		});

		loading.close();
		return Promise.reject(error);
	}
)
export default service