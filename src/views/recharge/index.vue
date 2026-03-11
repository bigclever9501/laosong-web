<template>
	<div class="page-content" v-if="show">
		<div class="mt-40 user-info-box">
			<div class="user-info">
				<img src="~@/assets/img/logo.png" />
				<div class="right-user">
					<div class="nickName">
						{{user.nickName}}
					</div>
					<div class="phone">
						{{user.phone}}
					</div>
				</div>
			</div>
			<div class="right">
				<div>
					账户余额：
				</div>
				<div class="price">
					{{user.available_point}}
				</div>
				<div>
					点
				</div>
			</div>
		</div>

		<div class="mt-40 recharge-page-content">
			<div class="title">
				选择充值金额
			</div>
			<div class="recharge-list mt-40">
				<div @click="selectItem(k)" :class="k == index ? 'recharge-item-active' : ''" class="recharge-item cp"
					v-for="(i,k) in list" :key="k">
					<div class="tag" v-if="i.gift_points > 0">赠{{i.gift_points}}点</div>
					<div class="recharge-item-price">
						￥{{i.price}}
					</div>
					<div class="recharge-item-points mt-20">
						{{i.points}}点
					</div>
				</div>
			</div>
			<div class="title mt-40">
				支付方式
			</div>
			<div class="mt-40 pay-list">
				<div @click="pay_type = 1" :class="pay_type == 1 ? 'pay-item-active' : ''" class="pay-item cp">
					<i class="iconfont icon-weixin"></i>
					<span class="ml-10">微信支付</span>
				</div>

				<div @click="pay_type = 2" :class="pay_type == 2 ? 'pay-item-active' : ''" class="pay-item cp">
					<i class="iconfont icon-z-alipay"></i>
					<span class="ml-10">支付宝支付</span>
				</div>
			</div>
			<div class="mt-40 flex xieyi">
				<el-checkbox v-model="checked"></el-checkbox>
				<span class="ml-5 cp" @click="checked = !checked">我已阅读并同意<span
						class="cp color" @click.stop="contentShow()">《充值及使用说明》</span>,基于产品的特殊性，一旦您完成付款，本产品不支持退订。</span>
			</div>
			<div class="mt-40 flex-b flex-c">
				<div v-if="item" class="xieyi">
					充值金额：<span class="price">￥{{item.price}}</span>，可获得<span class="price">{{item.points}}</span>点
				</div>
				<div class="btn" @click="submitOrder">确认充值</div>
			</div>


		</div>
		<payEwm ref="pay" :orderInfo="orderInfo" :pay_type="pay_type"></payEwm>
		<contentCom ref="content" title="充值及使用说明" :content="content"></contentCom>
	</div>
</template>

<script>
	import store from '@/store'
	import payEwm from '@/components/payEwm'
	import contentCom from '@/components/contentCom'
	import {
		userInfo
	} from '@/api/login'
	import {
		mapGetters
	} from "vuex";
	import {
		recharge,
		submitRechargeOrder
	} from '@/api/recharge'
	export default {
		components: {
			payEwm,
			contentCom
		},
		computed: {
			...mapGetters(['config', 'userInfo'])
		},
		data() {
			return {
				show: false,
				list: [],
				index: 0,
				pay_type: 1, //1微信支付 2支付宝
				checked: false,
				item: {},
				orderInfo: {},
				user: {

				},
				content:"1. 虚拟商品说明： “柏昇点数”属于数字化虚拟商品。基于互联网服务的特殊性，点数一旦充值到账，即视为该数字化权益已完成交付。因此，本产品不支持退款、转让或提现，请您确认需求后按需购买。<br><br>2.计费逻辑： 您购买的点数将用于抵扣 AI 模型生成过程中的算力消耗（如视频渲染、插件调用、工作流运行等）。<br><br>3.风险提示： AI 工作流（尤其是视频生成）属于复杂的计算过程。受限于底层模型的不确定性，可能存在“任务执行失败”或“生成效果未达预期”但算力已被消耗（点数已扣除）的情况。建议您在正式执行大额任务前，先了解工作流机制或进行小额测试。"
			}
		},
		created() {
			let that = this
			that.getUserInfo()
			that.getData()
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				let that = this
				userInfo({

				}).then(r => {
					if (r.code == 2) {
						that.user = r.data
					}
				})
			},
			getData() {
				let that = this
				recharge({

				}).then(r => {
					if (r.code == 2) {
						that.show = true
						that.list = r.data
						that.item = that.list[0]
					}
				})
			},
			selectItem(index) {
				let that = this
				that.item = that.list[index]
				that.index = index
			},
			// 提交订单
			submitOrder() {
				let that = this
				if (that.checked === false) {
					that.$message.error('请先勾选《充值及使用说明》')
					return
				}
				let params = {
					recharge_id: that.item.id,
					pay_type: that.pay_type
				}
				console.log('params', params)
				submitRechargeOrder(params).then(r => {
					that.orderInfo = r.data
					that.$refs['pay'].dialogVisible = true
				})
			},
			contentShow(){
				let that = this
				that.$refs['content'].dialogVisible = true
			}
		}

	}
</script>

<style lang="scss" scoped>
	.user-info-box {
		width: 100%;
		background: #252837;
		border-radius: 20px;
		padding: 40px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color:#94a2df;

		.user-info {
			display: flex;
		}

		.right-user {
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}

		.nickName {
			font-size: 20px;
			font-weight: bold;
		}

		.phone {
		}

		.right {
			display: flex;
			align-items: flex-end;
		}
		.price{
			font-weight: bold;
			font-size: 26px;
			margin-right: 4px;
		}

		img {
			width: 60px;
			height: 60px;
			border-radius: 100px;
		}
	}

	.recharge-page-content {
		width: 100%;
		background: #252837;
		border-radius: 20px;
		padding: 40px 20px;

		.recharge-list {
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));

			gap: 20px;

			.recharge-item {
				padding: 30px;
				color: #94a2df;
				background: linear-gradient(180deg, #313A66, #2B2F42);
				border-radius: 6px;
				text-align: center;
				border: 1px solid #62779d;
				position: relative;

				.recharge-item-price {
					font-size: 20px;
					font-weight: bold;
				}
			}

			.recharge-item:hover {
				border: 1px solid oklch(62.3% .214 259.815);
			}

			.recharge-item-active {
				color: #fff;
				background: linear-gradient(180deg, #0082ff, #00c0fe);
			}

			.tag {
				padding: 6px 12px;
				border-radius: 6px;
				color: #fff;
				position: absolute;
				top: -10px;
				right: -10px;
				background: linear-gradient(135deg, rgb(255, 107, 53), rgb(247, 147, 30))
			}
		}
	}

	.title {
		font-size: 24px;
		font-weight: bold;
		color: #fff;
	}

	.pay-list {
		display: flex;

		.pay-item {
			margin-right: 20px;
			background: #fff;
			border-radius: 6px;
			padding: 16px 20px;
		}

		.pay-item-active {
			background-color: #0082ff;
			color: #fff;
		}
	}

	.xieyi {
		color: #fff;
	}

	.btn {
		padding: 18px 30px;
	}
</style>