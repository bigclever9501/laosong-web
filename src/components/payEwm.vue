<template>
	<div>
		<el-dialog :title="pay_type == 1 ? '请使用微信扫描下方二维码支付' : '请使用支付宝扫描下方二维码支付'" custom-class="pay-ewm-dia"
			:visible.sync="dialogVisible" :before-close="handleClose" @open="handOpen" :append-to-body="true">
			<div class="main">
				<img style="width: 400px;" :src="orderInfo.pay_ewm">
			</div>
		</el-dialog>
	</div>

</template>

<script>
	
	import {
		getOrderStatus,
	} from '@/api/recharge'
	export default {
		name: 'YzdVideo',
		props: ['pay_type', 'orderInfo'],
		data() {
			return {
				dialogVisible: false,
				timer: null,
			}
		},
		created() {},
		methods: {
			// 打开时回调
			handOpen() {
				let that = this
				
				that.timer = setInterval(() => {
					
					getOrderStatus({
						out_trade_no: that.orderInfo.out_trade_no,
					}).then(r => {
						if(r.data.is_pay == 1){
							that.$parent.getUserInfo()
							that.$message.success('支付成功')
							that.handleClose()
						}
					})
				}, 1000)
				
				
				
			},
			// 关闭时回调
			handleClose(done) {
				let that = this
				that.dialogVisible = false
				clearInterval(that.timer)
			},

		}
	}
</script>
<style>
	.pay-ewm-dia{
		width: 600px;
		max-width:600px;
	}
</style>
<style scoped lang="scss">
	.main {
		padding: 40px;
		text-align: center;
	}
</style>