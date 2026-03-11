<template>
	<div class="page-content" v-if="show">
		<div class="mt-40 flex">
			<div class="left-content">
				<div class="user-info">
					<img class="logo" src="~@/assets/img/logo.png" />
					<div class="nickName">{{user.nickName}}</div>
				</div>

				<div class="card-box mt-20">
					<div class="card-title">
						账户余额
					</div>
					<div class="wallet-info">
						<div class="left">{{user.available_point}}</div>
						<div class="right">点</div>
					</div>
					<div class="btn-box">
						<div class="btn cp no-select" @click="route('userPrice')">
							计费标准
						</div>
						<div class="btn cp no-select" @click="route('recharge')">
							充值
						</div>
					</div>
				</div>
				<div class="menu-list">
					<div class="item cp" :class="active_menu == i.menu ? 'item-active' : ''" v-for="(i,k) in menu_list"
						:key="k" @click="route(i.path)">
						{{i.title}}
					</div>
				</div>
				<div class="mt-40 loginout-btn cp" @click="loginOut">
					退出登录
				</div>
			</div>
			<div class="right-content">
				<overview v-if="active_menu == 'overview'" :user="user"></overview>
				<profile v-if="active_menu == 'profile'" :user="user"></profile>
				<sora v-if="active_menu == 'sora'"></sora>
				<price v-if="active_menu == 'price'"></price>
				<rechargelog v-if="active_menu == 'rechargelog'"></rechargelog>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '@/store'
	import overview from "./overview";
	import profile from "./profile";
	import sora from "./sora";
	import price from "./price";
	import rechargelog from "./rechargelog";
	import {
		mapGetters
	} from "vuex";
	import {
		setCookie,
		getCookie,
		LoginOut,
		isEmpty,
	} from '@/until/tool'
	import {
		userInfo
	} from '@/api/login'
	export default {
		components: {
			overview,
			profile,
			sora,
			price,
			rechargelog
		},
		computed: {
			...mapGetters(['config', 'userInfo'])
		},
		data() {
			return {
				show: false,
				user: {

				},
				menu_list: [{
						title: '概况',
						path: 'userOverview',
						menu: 'overview'
					},
					{
						title: '账户设置',
						path: 'userProfile',
						menu: 'profile'
					},
					{
						title: '消费详情',
						path: 'userSora',
						menu: 'sora'
					},
					{
						title: '充值记录',
						path: 'userRechargelog',
						menu: 'rechargelog'
					},
					{
						title: '计费标准',
						path: 'userPrice',
						menu: 'price'
					}
				],
				active_menu: ''
			}
		},
		created() {
			let that = this
			this.routeInit()
			that.getUserInfo()
		},
		watch: {
			$route() {
				this.routeInit()
			},
		},
		methods: {
			routeInit() {
				let that = this
				that.active_menu = this.$route.meta.user_menu
				console.log('this.$route.meta.menu.user_menu', this.$route.meta.user_menu)
				if (!isEmpty(that.active_menu)) {
					that.getUserInfo()
				} else {
					that.route('userOverview')
				}
			},
			// 获取用户信息
			getUserInfo() {
				let that = this
				userInfo({

				}).then(r => {
					if (r.code == 2) {
						that.show = true
						that.user = r.data
					}
				})
			},
			// 退出登录
			loginOut() {
				let that = this
				store.commit('setUserInfo', {})
				LoginOut()
				that.$router.push({
					name: 'login',
				});
			},
			route(name) {
				let that = this;
				that.$router.push({
					name: name,
				});
				return
			}

		}

	}
</script>

<style lang="scss" scoped>
	.page-content {}

	.left-content {
		width: 280px;
		min-height: 700px;
		background-color: #252837;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		padding: 20px;

		.user-info {
			text-align: center;

			.logo {
				width: 78px;
				height: 78px;
				border-radius: 100px;
			}

			.nickName {
				color: #fff;
				font-weight: bold;
				font-size: 20px;
				margin-top: 16px;
			}
		}

		.card-box {
			border-radius: 20px;
			padding: 20px;
			background: linear-gradient(180deg, #313A66, #2B2F42);
			text-align: center;

			.card-title {
				font-size: 14px;
				color: #fff;
				font-weight: bold;
			}
		}

		.wallet-info {
			margin-top: 16px;
			display: flex;
			justify-content: center;
			align-items: flex-end;

			.left {
				font-size: 24px;
				font-weight: bold;
				color: #0000;
				background: linear-gradient(135deg, #3b82f6, #8b5cf6);
				-webkit-background-clip: text;
				background-clip: text;
			}

			.right {
				font-size: 14px;
				margin-left: 4px;
				color: #0000;
				background: linear-gradient(135deg, #3b82f6, #8b5cf6);
				-webkit-background-clip: text;
				background-clip: text;
			}
		}

		.btn-box {
			display: flex;
			justify-content: space-between;
			margin-top: 16px;

			.btn {
				font-size: 14px;
				border-radius: 6px;
				width: 88px;
				color: #fff;
				padding: 8px 0;
				background: linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162));
			}
		}
	}

	.menu-list {
		display: flex;
		flex-direction: column;
		padding-left: 10px;

		.item {
			margin-top: 40px;
			font-size: 14px;
		}

		.item:hover,
		.item-active {
			font-weight: bold;
			color: #00c2ff;
		}
	}

	.loginout-btn {
		font-size: 14px;
		padding: 10px;
		text-align: center;
		width: 100%;
		border-radius: 6px;
		color: #f56c6c;
		border: 1px solid #f56c6c;
	}

	.right-content {
		margin-left: 40px;
		width: calc(100% - 320px);
	}
</style>