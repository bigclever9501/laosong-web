<template>
	<div id="app" v-if="isRouterAlive"><router-view /></div>
</template>
<script>
	import {
		initLogin
	} from '@/until/tool'
	// import axios from "axios"
	// import {
	// 	mapGetters
	// } from "vuex";
	export default {
		// computed: {
		// 	...mapGetters([
		// 		'is_mch'
		// 	])
		// },
		data() {
			return {
				isRouterAlive: false,
				// color: this.$store.state.WebColor,
				// color2: this.$store.state.Web2Color,
				// mainLoading: true
			};
		},
		created() {
			const _this = this;
			let loading = document.getElementById('Loading')
			if (loading != null) {
				document.body.removeChild(loading)
			}
			_this.isRouterAlive = true
		},
		methods: {}
	}
</script>

<style lang="scss">
	.red {
		color: red !important;
	}

	@import './assets/style/common.scss';
	// .el-tooltip__popper .is-light {
	//     background: #FFF;
	//     border: 1px solid red !important;
	// }

	.el-tooltip__popper {
		position: absolute;
		background: #fff !important;
		min-width: 150px;
		border: 1px solid #F4F4F4;
		padding: 12px;
		z-index: 2000;
		color: #606266 !important;
		line-height: 1.4;
		text-align: justify;
		word-break: break-all;
		font-size: 12px !important;
		-webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}

	.el-tooltip__popper[x-placement^='top'] .popper__arrow::after {
		border-top-color: #fff !important;
	}

	.el-tooltip__popper[x-placement^='top'] .popper__arrow {
		border-top-color: #fff !important;
	}

	.el-tooltip__popper[x-placement^='right'] .popper__arrow::after {
		border-right-color: #fff !important;
	}

	.el-tooltip__popper[x-placement^='right'] .popper__arrow {
		border-right-color: #fff !important;
	}

	.el-card.is-always-shadow,
	.el-card.is-hover-shadow:focus,
	.el-card.is-hover-shadow:hover {
		box-shadow: 0 0 0 0 rgba(0, 0, 0) !important;
	}

	.el-tabs__nav-wrap::after {
		height: 1px;
	}


	.el-pagination {
		margin-top: 15px;
		text-align: center;
	}

	.el-dialog__title {
		line-height: 28px !important;
		font-size: 14px !important;
		color: #333 !important;
		font-weight: 700 !important;
	}

	.el-dialog__header {
		padding: 10px 20px !important;
		border-bottom: 1px solid var(--borderColor) !important;
	}

	.el-dialog__footer {
		border-top: 1px solid var(--borderColor) !important;
		padding: 10px;
	}

	.el-dialog__body {
		padding: 0;
	}

	.el-dialog {
		border-radius: 14px;
	}

	.tooltip {
		padding-left: 4px;
		// text-align: center;
		// color: #939799;
	}

	.el-upload {
		// position: absolute;
		// right: 10px;
		// top: 60px;
	}

	.el-upload-list {
		position: absolute;
		z-index: 99999999999;
		right: 0;
		background: #fff;
		top: 40px;
		// margin-top: 80px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		border-radius: 5px;
	}

	.el-upload-list__item {
		margin-top: 10px !important;
	}

	.el-form-item__content .el-input-group {
		vertical-align: middle;
	}

	.el-step__title.is-process {
		font-weight: normal;
	}

	.el-table::before {
		left: 0;
		bottom: 0;
		width: 100%;
		height: 0px;
	}

	.el-table thead {
		color: #000;
		font-weight: bold;
	}

	.el-radio__label {
		font-weight: normal;
	}

	.el-card {
		border: 0;
		border-radius: 14px;
	}

	.el-card__header {
		border-color: #F4F4F4
	}

	.el-table th.el-table__cell.is-leaf,
	.el-table td.el-table__cell {
		border-bottom: 1px solid #F4F4F4;
	}

	.el-steps--simple.el-steps--simple {
		border-radius: 14px !important;
	}

	.el-card .el-tabs__nav-wrap::after {
		height: 1px !important;
		background-color: #F4F4F4;
	}

	.el-tabs__nav-wrap::after {
		/* 移除下划线 */
		height: 0;
	}

	.three-menu-tab {
		background-color: #fff;
		border-radius: 14px;
	}

	.el-page-header {
		padding: 20px;
		background: #fff;
		border-radius: 14px;
		margin-bottom: 15px;
	}

	.el-input__inner {
		background-color: #1B1B34 !important;
		border: 0;
		color: #fff;
	}

	.el-input__prefix {
		color: #6B7397 !important;
	}

	.el-input__inner::placeholder {
		color: #6B7397;
	}

	.el-alert--info.is-light {
		background-color: #111a2c;
		border: 1px solid #15325b;
		color: rgba(255, 255, 255, 0.85);

		.el-alert__icon {
			color: #1668dc;
		}
	}


	.page-content {
		padding-top: 110px !important;
		padding-bottom: 110px;
		width: 1450px;
		margin: 0 auto;
	}

	.btn {
		border-radius: 6px;
		color: #fff;
		padding: 8px 20px;
		background: linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162));
		cursor: pointer;
	}

	.btn2 {
		padding: 8px 20px;
		background: rgba(124, 138, 237, 0.1);
		color: rgb(124, 138, 237);
		border: 1px solid rgba(124, 138, 237, 0.2);
		border-radius: 6px;
		cursor: pointer;
	}

	.btn3 {
		padding: 8px 20px;
		background: rgba(124, 138, 237, 0.1);
		color: #0d9fff !important;
		border: 1px solid #0d9fff;
		border-radius: 6px;
		cursor: pointer;
	}

	.user-right-box {
		width: 100%;
		background: #252837;
		border-radius: 20px;
		padding: 40px 20px;

		.form-title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left-title {
				font-size: 24px;
				font-weight: bold;
				color: #fff;
			}

		}

		.form-content-list {
			display: flex;
			flex-direction: column;

			.form-content-item {
				border-top: 1px solid rgba(124, 138, 237, 0.05);
				display: flex;
				justify-content: space-between;
				color: #fff;
				font-size: 14px;
				padding: 30px 0 30px 0;

				.right {
					display: flex;
				}
			}

			.apikey-box {
				background: rgba(124, 138, 237, 0.1);
				padding: 6px 10px;
				border-radius: 4px;
			}
		}
	}

	.el-message-box {
		background: #252837;
		border: #252837;

		.el-message-box__title {
			color: #fff;
		}

		.el-message-box__message {
			color: #fff;
		}
	}

	.el-table th.el-table__cell {
		color: #c0c8ee !important;
		background: #282c3f !important;
	}

	.el-table tr {
		color: #c0c8ee !important;
		background: #282c3f !important;
	}

	.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
		color: #c0c8ee !important;
		background: #282c3f !important;
	}


	.el-table th.el-table__cell.is-leaf,
	.el-table td.el-table__cell {
		border-bottom: 1px solid #373d5d
	}

	.el-table--border .el-table__cell {
		border-bottom: 1px solid #373d5d
	}

	.el-table--border .el-table__cell {
		border-right: 1px solid #373d5d !important
	}

	.el-table--group,
	.el-table--border {
		border: 1px solid #373d5d !important;
	}
	.el-table::before, .el-table--group::after, .el-table--border::after{
		background-color:#373d5d
	}
	
	.el-pagination button:disabled{
		background-color: #1B1B34;
	}
	.el-pager li{
		background-color: #1B1B34;
	}
	.el-pagination .btn-next{
		background-color: #1B1B34;
	}
	.el-pagination .btn-prev{
		background-color: #1B1B34;
	}
	
	.el-dialog{
		background: linear-gradient(#30365a,#1c1c2a);
	}
	.el-dialog__title{
		font-weight: bold !important;
		font-size: 16px !important;
		color:#fff !important
	}
	.el-dialog__close{
		color: #fff !important;
	}
	.el-dialog__header{
		border-bottom: 1px solid #62779d !important;
	}
	.el-dialog__body{
		color: #94a2df !important;
	}

</style>