<template>
	<div class="user-right-box">
		<div class="form-title">
			<div class="left-title">
				服务定价列表
			</div>
		</div>

		<el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
			<el-table-column prop="type" label="类型" min-width="10">
			</el-table-column>
			<el-table-column prop="desc" label="说明" min-width="20">
			</el-table-column>
			<el-table-column prop="sku" label="规格" min-width="40">
			</el-table-column>
			<el-table-column prop="price" label="价格" min-width="10">
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
import {
	maskString,
	copyUrl
} from '@/until/tool'
import {
	restApiKey
} from '@/api/user'

export default {
	data() {
		return {
			tableData: [
				// --------- SORA 组 ---------
				{
					type: 'SORA视频生成', // 【改动】统一改成同一个名字，方便自动合并
					desc: 'SORA2视频生成-10S',
					sku: 'SORA2视频生成，10S 标清（720p）',
					price: '1.00'
				}, {
					type: 'SORA视频生成',
					desc: 'SORA2视频生成-15S',
					sku: 'SORA2视频生成，15S 标清（720p）',
					price: '2.50'
				}, {
					type: 'SORA视频生成',
					desc: 'SORA2-PRO视频生成-10S',
					sku: 'SORA2-PRO视频生成，10S 高清（1080p）',
					price: '5.00'
				}, {
					type: 'SORA视频生成',
					desc: 'SORA2-PRO视频生成-15S',
					sku: 'SORA2-PRO视频生成，15S 高清（1080p）',
					price: '5.00'
				}, {
					type: 'SORA视频生成',
					desc: 'SORA2-PRO视频生成-25S',
					sku: 'SORA2-PRO视频生成，25S 标清（720p）',
					price: '5.00'
				},
				// --------- 【新增】万相组 ---------
				{
					type: '万相生图',
					desc: '万相2.6-文生图',
					sku: '万相2.6 高保真文本生成图片',
					price: '1.00' // 你可以在这里随意修改扣除的点数
				},
				// --------- 【新增】nanobanana组 ---------
				{
					type: '香蕉生图',
					desc: 'nanobanana-pro文生图',
					sku: 'nanobanana-pro文生图（最多支持4K）',
					price: '0.50' // 你可以在这里随意修改扣除的点数
				},

				// ---------【新增】Grok 组 ---------
                {
					type: 'Grok视频生成',
					desc: 'Grok 视频生成-标准版',
					sku: 'grok-imagine-1.0-video（480p / 6秒，支持 fun / normal / spicy / custom 风格）',
					price: '0.50'
				},
				{
					type: 'Grok视频生成',
					desc: 'Grok 视频生成-高级版',
					sku: 'grok-imagine-1.0-video-super（480p/720p，6/10/15秒，支持 fun / normal / spicy / custom 风格）',
					price: '1.00'
				}]
		}
	},
	methods: {
		// 【重构核心】智能单元格合并方法
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			// 我们只合并第 1 列（索引为 0，也就是"类型"列）
			if (columnIndex === 0) {
				// 1. 找出这个名字（比如"SORA视频生成"）在数组里第一次出现的位置
				const firstIndex = this.tableData.findIndex(item => item.type === row.type);

				// 2. 如果当前行就是第一次出现的那一行，我们就计算总共有几行，然后往下合并
				if (rowIndex === firstIndex) {
					const rowspanCount = this.tableData.filter(item => item.type === row.type).length;
					return {
						rowspan: rowspanCount,
						colspan: 1
					};
				} else {
					// 3. 如果不是第一行，就被隐藏掉（被上面吞并了）
					return {
						rowspan: 0,
						colspan: 0
					};
				}
			}
		}
	},
}
</script>

<style scoped lang="scss"></style>