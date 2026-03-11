<template>
	<div class="user-right-box">
		<div class="form-title">
			<div class="left-title">
				任务列表
			</div>
		</div>

		<el-table v-if="tableData.length > 0" :data="tableData" border style="width: 100%; margin-top: 20px" tooltip-effect="dark">
			<el-table-column align="left" prop="task_id" label="任务ID" min-width="20">
			</el-table-column>
			<el-table-column align="center" show-overflow-tooltip prop="prompt" label="提示词" min-width="15">
			</el-table-column>
			
			<el-table-column align="center" prop="model" label="使用模型" min-width="10">
			</el-table-column>

			<el-table-column align="center" prop="consume_point" label="消耗" min-width="5">
			</el-table-column>
			<el-table-column align="center" prop="task_status" label="链接" min-width="7">
				<template slot-scope="scope">
					<span v-if="!scope.row.res_url">无</span>
					<span v-if="scope.row.res_url" @click="copy(scope.row.res_url)" class="cp">复制</span>
				</template>
			</el-table-column>
			
			<el-table-column align="center" prop="task_status" label="状态" min-width="7">
				<template slot-scope="scope">
					<el-tag type="info" effect="dark" size="mini" v-if="scope.row.task_status == 0">生成中</el-tag>
					<el-tag type="success" effect="dark" size="mini" v-if="scope.row.task_status == 1">成功</el-tag>
					<el-tag type="danger" effect="dark" size="mini" v-if="scope.row.task_status == 2">失败</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="create_time" label="创建时间" min-width="12">
			</el-table-column>
			
			<el-table-column align="center" prop="handle_time" label="完成时间" min-width="12">
			</el-table-column>
		</el-table>
		<el-pagination v-if="tableData.length > 0" @current-change="handleCurrentChange" :current-page="page"
			:page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
		</el-pagination>

	</div>
</template>

<script>
	import {
		getSoraList
	} from '@/api/user'
	import {
		maskString,
		copyUrl
	} from '@/until/tool'
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
				getSoraList({
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
			copy(content) {
				copyUrl(content)
			},
		},
	}
</script>

<style scoped lang="scss">

</style>