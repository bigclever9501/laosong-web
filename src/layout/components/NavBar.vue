<!-- 布局顶部 -->
<template>
	<div class="header">
		<div class="header-content">
			<div class="left">
				<img class="logo" src="~@/assets/img/logo.png" />
				<div class="site-title">
					{{config.title}}
				</div>
				<div class="menu-list no-select">
					<div class="menu-item cp" :class="active_menu == i.menu ? 'menu-item-active' : ''"
						v-for="(i,k) in menu_list" :key="k" @click="route(i.pathName)">
						<i class="iconfont" :class="i.i"></i>
						<span>{{i.title}}</span>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="login-button cp no-select" @click="route('login')" v-if="!userInfo.id">登录</div>
			</div>
		</div>


	</div>
</template>
<script>
	import {
		LoginOut,
		initLogin,
		IS_W7,
		isEmpty
	} from '@/until/tool'
	import {
		mapGetters
	} from "vuex";
	import {
		updateStyleType
	} from '@/api/common';
	import store from '@/store'
	export default {
		computed: {
			...mapGetters(['config','userInfo'])
		},
		name: 'NavBar',
		components: {},
		data() {
			return {
				active_menu: '',
				menu_list: [{
						title: '首页',
						pathName: 'index',
						menu: 'index',
						i: 'icon-shouye'

					},
					{
						title: '订阅充值',
						pathName: 'recharge',
						menu: 'recharge',
						i: 'icon-chongzhi'
					},
					{
						title: '个人中心',
						pathName: 'user',
						menu: 'user',
						i: 'icon-gerenzhongxin'
					}
				]
			};
		},
		watch: {
			$route() {
				this.routeInit()
			},
		},
		mounted() {},
		created() {
			this.routeInit()
		},
		methods: {
			routeInit() {
				let that = this
				that.active_menu = this.$route.meta.menu
			},


			LogOut() {
				let _navbar = this
				if (_navbar.IS_W7) {
					let isfounder = getCookie('isfounder');
					let founder_groupid = getCookie('founder_groupid');
					if (isfounder == 1 && founder_groupid != 2) {
						_navbar.is_admin = true
						window.location.href = window.origin + '/index.php?c=user&a=logout&'
					} else {
						_navbar.is_admin = false
						LoginOut()
						window.location.href = window.origin + '/addons/yzd_kp/template/web/#/'
					}
				} else {
					LoginOut()
					initLogin()
				}
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
	@media (max-width: 600px) {}

	.header {
		height: 100px;
		width: 100%;
		background-color: #252837;
		display: flex;
		justify-content: center;
		position: fixed;
		z-index: 1;

		.header-content {
			width: 1450px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;
				align-items: center;

				.logo {
					width: 48px;
					height: 48px;
					border-radius: 14px;
				}

				.site-title {
					margin-left: 10px;
					font-weight: bold;
					color: #0000;
					font-size: 24px;
					background: linear-gradient(135deg, #3b82f6, #8b5cf6 50%, #10b981);
					-webkit-background-clip: text;
					background-clip: text;
				}

				.menu-list {
					margin-left: 20px;
					color: #6b7397;
					display: flex;

					.menu-item {
						margin-right: 20px;
						padding: 14px 20px;

						span {
							margin-left: 10px;
						}
					}

					.menu-item:hover,
					.menu-item-active {
						color: #00c2ff;
						background-color: #23396a;
						border-radius: 10px;
						font-weight: bold;
					}
				}
			}

			.right {
				display: flex;

				.login-button {
					box-shadow: 0 2px 0 rgba(255, 255, 255, 0.04);
					color: #fff;
					padding: 10px 30px;
					border-radius: 100px;
					background-image: linear-gradient(95deg, #0083FF, #00BFFF);
				}
			}
		}


	}
</style>