<template>
	<div class="user-right-box">
		<div class="form-title">
			<div class="left-title">
				充值记录
			</div>
		</div>

		<el-table v-if="tableData.length > 0" :data="tableData" border style="width: 100%; margin-top: 20px">
			<el-table-column align="center" prop="ordercode" label="订单号" min-width="20">
			</el-table-column>
			<el-table-column align="center" prop="pay_trade_no" label="商户单号" min-width="30">
			</el-table-column>
			<el-table-column align="center" prop="price" label="充值金额" min-width="10">
			</el-table-column>
			<el-table-column align="center" prop="points" label="获得点数" min-width="10">
			</el-table-column>
			<el-table-column align="center" label="付款方式" min-width="10">
				<template slot-scope="scope">
					<span v-if="scope.row.pay_type == 1">微信</span>
					<span v-if="scope.row.pay_type == 2">支付宝</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="pay_time" label="付款时间" min-width="20">
			</el-table-column>
		</el-table>
		<el-pagination v-if="tableData.length > 0" @current-change="handleCurrentChange" :current-page="page"
			:page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
		</el-pagination>


	</div>
</template>

<script>
	import {
		getUserRechargeList
	} from '@/api/user'
	export default {
		data() {
			return {
				tableData: [],
				page: 1,
				pagesize: 10,
				total: 0,
			}
		},
		created() {
			let that = this
			that.getList()
		},
		methods: {
			getList() {
				let that = this
				getUserRechargeList({
					page: that.page,
					pagesize: that.pagesize,
				}).then(r => {
					if (r.code == 2) {
						that.total = r.data.total;
						that.tableData = r.data.list;
					}
				});
			},
			// 改变分页页数
			handleCurrentChange(val) {
				let that = this
				that.page = val;
				that.getList();
			},
		},
	}
</script>

<style scoped lang="scss">

</style>