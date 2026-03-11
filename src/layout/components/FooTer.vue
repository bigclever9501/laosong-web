<!-- 布局底部 -->
<template>
	<div class="page-footer">
		<div class="footer-box">
			<div class="service-box">

				<div class="service-box-left">
					<img class="logo" src="~@/assets/img/logo.png" />
					<div class="service-box-left-right">
						<div class="service-box-left-title">
							{{config.title}}
						</div>
						<div class="service-box-left-desc">
							每个人的AI应用层工具库
						</div>
					</div>
				</div>
				<div class="service-box-right">

					<!-- <div class="item">
						<div class="item-group-title">
							核心产品 (Product)
						</div>
						<div class="item-group-list">
							<div class="item-group-list-item cp">
								AI工作流市场
							</div>
							<div class="item-group-list-item cp">
								Coze插件库
							</div>
							<div class="item-group-list-item cp">
								API开放平台
							</div>
							<div class="item-group-list-item cp">
								实战特训营
							</div>
						</div>
					</div> -->

					<div class="item">
						<div class="item-group-title">
							开发者与支持
						</div>
						<div class="item-group-list">
							<div class="item-group-list-item cp">
								接入文档 / Docs
							</div>
							<div class="item-group-list-item cp">
								系统状态监控
							</div>
							<div class="item-group-list-item cp" @click="route('userPrice')">
								价格与计费
							</div>
							<div class="item-group-list-item cp">
								常见问题
							</div>
						</div>
					</div>

					<div class="item">
						<div class="item-group-title">
							社群与生态 (Community)
						</div>
						<div class="item-group-list">

							<div class="item-group-list-item cp">
								<a class="a" target="_blank"
									href="https://icnmviutctni.feishu.cn/wiki/space/7592180847193623730?ccm_open_type=lark_wiki_spaceLink&open_tab_from=wiki_home">飞书开放文档</a>

							</div>
							<div class="item-group-list-item cp">
								柏昇的自媒体
							</div>
							<div class="item-group-list-item cp">
								优秀案例展示
							</div>
							<div class="item-group-list-item cp">
								创作者计划
							</div>
						</div>
					</div>

					<div class="item">
						<div class="item-group-title">
							关于与条款 (About & Legal)
						</div>

						<div class="item-group-list">
							<div class="item-group-list-item cp">
								关于柏昇AI
							</div>
							<div class="item-group-list-item cp" @click="route('UserServiceAgreement')">
								用户服务协议
							</div>
							<div class="item-group-list-item cp" @click="route('PrivacyPolicy')">
								隐私政策
							</div>
							<div class="item-group-list-item cp" @click="route('Disclaimers')">
								免责声明
							</div>
						</div>

					</div>

				</div>

			</div>
			<div class="footer-bottom">
				<div>
					© 2026 {{config.title}}. 保留所有权利.
				</div>
				<div class="flex bottom-list">
					<div class="item cp">
						<a target="_blank" href="https://beian.miit.gov.cn/">{{config.icp}}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		power
	} from '@/until/tool'
	import store from '@/store'
	import {
		mapGetters
	} from "vuex";
	export default {
		name: 'FooTer',
		data() {
			return {};
		},
		computed: {
			...mapGetters(['config'])
		},
		mounted() {},
		created() {
			const _footer = this;

		},
		methods: {
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
<style scoped lang="scss">
	.page-footer {
		background-color: #252837;
		line-height: 2;
		min-width: 1450px;
		.footer-box {
			margin: 0 auto;
			width: 1450px;
			padding: 30px 0;
			color: #ffffffb3;
			font-size: 14px;

			.bottom-list {
				.item {
					margin-right: 10px;
				}
			}
		}
	}

	.service-box {
		display: flex;
		align-items: flex-start;
	}

	.service-box-left {
		display: flex;
		align-items: center;
		width: 360px;

		.logo {
			width: 48px;
			height: 48px;
			min-width: 48px;
			border-radius: 14px;
			box-shadow: rgba(59, 130, 246, 0.3) 2px 0px 16px;
		}

		.service-box-left-right {
			margin-left: 10px;

			.service-box-left-title {
				font-size: 18px;
				font-weight: bold;
				color: #0000;
				background: linear-gradient(135deg, #3b82f6, #8b5cf6 50%, #10b981);
				-webkit-background-clip: text;
				background-clip: text;
				line-height: 1;
			}

			.service-box-left-desc {}

		}
	}

	.service-box-right {
		width: calc(100% - 360px);
		display: flex;

		.item {
			flex: 1;
			margin-right: 20px;

			.item-group-title {
				font-size: 16px;
				color: #fff;
				border-bottom: 2px solid #414458;
				padding-bottom: 6px;
			}

			.item-group-list {
				margin-top: 10px;

				a {
					color: #ffffffb3;
				}

				.item-group-list-item {
					margin-top: 10px;
					padding: 0 6px;
				}

				.item-group-list-item:hover {
					a {
						color: #00c2ff;
					}

					color: #00c2ff;
					background-color: #23396a;
					border-radius: 6px;
				}
			}
		}

	}
</style>