<template>
	<div ref="mianbody">
		<div class="yzd-load" v-if="this.$store.state.loading" v-loading="this.$store.state.loading">
		</div>
		<router-view />
	</div>
</template>
<script>
import {
	mapGetters
} from "vuex";
import {
	isEmpty
} from "@/until/tool";
export default {
	name: 'AppMain',
	computed: {
		...mapGetters([
			'is_mch'
		])
	},

	data() {
		return {
		};
	},
	created() {
	},
	mounted() {
	},

};
</script>
<style>
.yzd-load {
	height: 100vh;
	width: 100%;
	position: fixed;
	top: 0px;
	z-index: 99;
	.el-loading-mask {
		background-color: rgba(255, 255, 255, 0.1)
	}
}
</style>