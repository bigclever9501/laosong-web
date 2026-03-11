<template>
	<div class="page-content" v-if="show">
		<img class="banner" src="~@/assets/img/banner02.png" />
	</div>
</template>

<script>
	import store from '@/store'
	import {
		mapGetters
	} from "vuex";
	import {
		index
	} from '@/api/index'
	export default {
		computed: {
			...mapGetters(['config', 'userInfo'])
		},
		data() {
			return {
				show:false,
				index:null
			}
		},
		created() {
			let that = this
			that.getData()
		},
		methods: {
			getData() {
				let that = this
				index({

				}).then(r => {
					if (r.code == 2) {
						that.show = true
						that.index = r.data
					}
				})
			},

		}

	}
</script>

<style lang="scss" scoped>
	.page-content{
		width: 100%;
		padding-top: 100px !important;
	}
	.banner{
		width: 100%;
	}
</style>