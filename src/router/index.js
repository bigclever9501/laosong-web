import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '../layout/index'
import View from '../views/index'
import {
	config
} from '@/api/common'
import {
	userInfo
} from '@/api/login'


import {
	setCookie,
	getCookie,
	isEmpty
} from '@/until/tool'

// 去除router报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: '',
	component: Layout,
	redirect: '/index',
	children: [{
			path: 'index',
			name: 'index',
			component: () => import('../views/index/index'),
			meta: {
				menu: 'index',
				title: '首页'
			}
		}, {
			path: 'recharge',
			name: 'recharge',
			component: () => import('../views/recharge/index'),
			meta: {
				menu: 'recharge',
				title: '订阅充值'
			}
		}, {
			path: 'user',
			name: 'user',
			component: () => import('../views/user/index'),
			meta: {
				menu: 'user',
				title: '个人中心'
			}
		}, {
			path: 'login',
			name: 'login',
			component: () => import('../views/login/login'),
			meta: {
				menu: 'login',
				title: '登录'
			}
		}, {
			path: 'user/overview',
			name: 'userOverview',
			component: () => import('../views/user/index'),
			meta: {
				menu: 'user',
				user_menu:'overview',
				title: '个人中心 - 概况'
			}
		}, {
			path: 'user/profile',
			name: 'userProfile',
			component: () => import('../views/user/index'),
			meta: {
				menu: 'user',
				user_menu:'profile',
				title: '个人中心 - 账户设置'
			}
		}, {
			path: 'user/sora',
			name: 'userSora',
			component: () => import('../views/user/index'),
			meta: {
				menu: 'user',
				user_menu:'sora',
				title: '个人中心 - SORA视频'
			}
		}, {
			path: 'user/price',
			name: 'userPrice',
			component: () => import('../views/user/index'),
			meta: {
				menu: 'user',
				user_menu:'price',
				title: '个人中心 - 计费标准'
			}
		}, {
			path: 'user/rechargelog',
			name: 'userRechargelog',
			component: () => import('../views/user/index'),
			meta: {
				menu: 'user',
				user_menu:'rechargelog',
				title: '个人中心 - 充值记录'
			}
		}, {
			path: 'UserServiceAgreement',
			name: 'UserServiceAgreement',
			component: () => import('../views/content/UserServiceAgreement'),
			meta: {
				menu: '',
				title: '用户服务协议'
			}
		}, {
			path: 'PrivacyPolicy',
			name: 'PrivacyPolicy',
			component: () => import('../views/content/PrivacyPolicy'),
			meta: {
				menu: '',
				title: '隐私政策'
			}
		}, {
			path: 'Disclaimers',
			name: 'Disclaimers',
			component: () => import('../views/content/Disclaimers'),
			meta: {
				menu: '',
				title: '免责声明'
			}
		}

	]
}]



const router = new VueRouter({
	// mode: 'history', //去掉url中的#
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		} // History模式使用x/y
		// return {
		// 	left: 0,
		// 	top: 0
		// }
	},
	routes,
})

router.afterEach((to, from) => {
	// 滚动到顶部
	window.scrollTo(0, 0);
});
// router.afterEach(){
// 	// window.scrollTo(0, 0); // 滚动到顶部
// }
router.beforeEach((to, from, next) => {
	window.scrollTo({
		top: 0,
		behavior: 'auto' // 禁用平滑滚动
	})

	// 判断全局config存在
	if (isEmpty(store.state.config)) {
		config({}).then(r => {
			store.commit('setConfig', r.data)
		})
	}
	// 获取用户信息
	if (isEmpty(store.state.userInfo) && getCookie('baisheng_uid') && getCookie('baisheng_token')) {
		userInfo({
			
		}).then(r => {
			if(r.code == 2){
				store.commit('setUserInfo', r.data)
			}
		})
	}
	next();
});


export default router