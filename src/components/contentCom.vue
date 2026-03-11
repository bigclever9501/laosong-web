<template>
	<div>
		<el-dialog :title="title" custom-class="content-dia"
			:visible.sync="dialogVisible" :append-to-body="true">
			<div class="main" v-html="content">
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
		props: ['title', 'content'],
		data() {
			return {
				dialogVisible: false,
			}
		},
		created() {},
		methods: {

		}
	}
</script>
<style>
	.content-dia {
		width: 600px;
		max-width: 600px;
	}
</style>
<style scoped lang="scss">
	.main {
		padding: 20px;
		line-height: 2;
		font-size: 16px;
	}
</style>