<template>
	<div class="user-right-box">
		<div class="form-title">
			<div class="left-title">
				账户设置
			</div>
		</div>
		<div class="form-content-list mt-20">


			<el-form ref="form" :rules="rules" :model="form" label-width="80px">

				<div class="flex mt-20">
					<el-form-item class="w50" label="用户昵称" prop="nickName">
						<el-input v-model="form.nickName" maxlength="20" show-word-limit></el-input>
					</el-form-item>
					<el-form-item class="w50 ml-10" label="用户ID" prop="id">
						<el-input v-model="user.id" disabled></el-input>
					</el-form-item>
				</div>
				<div class="flex mt-20">
					<el-form-item class="w50" label="手机号" prop="phone">
						<el-input v-model="user.phone" disabled></el-input>
					</el-form-item>
					<el-form-item class="w50 ml-10" label="注册时间" prop="reg_time">
						<el-input v-model="user.reg_time" disabled></el-input>
					</el-form-item>
				</div>

				<div class="mt-20" style="display: flex;justify-content: center;">
					<div class="btn3" @click="submitForm('form')">
						更新用户信息
					</div>
				</div>

			</el-form>


		</div>
	</div>
</template>

<script>
	import {
		maskString,
		copyUrl
	} from '@/until/tool'
	import {
		restApiKey,
		updateUserInfo
	} from '@/api/user'
	export default {
		props: ['user'],
		data() {
			return {
				phone_hide_status: true,
				hide: true,
				form: {
					nickName: '',
					id: null,
					phone: '',
					reg_time: ''
				},
				rules: {
					nickName: [{
						required: true,
						message: '请填写用户昵称',
						trigger: 'blur'
					}],
					id: [{
						required: true,
						message: '请填写id',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请填写手机号',
						trigger: 'blur'
					}],
					reg_time: [{
						required: true,
						message: '请填写注册时间',
						trigger: 'blur'
					}]
				}

			}
		},
		watch: {
			user(newValue, oldValue) {
				this.Init()
			}
		},
		created() {
			let that = this
			that.Init()
		},
		methods: {
			Init() {
				let that = this
				that.form.nickName = that.user.nickName
				that.form.id = that.user.id
				that.form.phone = that.user.phone
				that.form.reg_time = that.user.reg_time
				that.user.phone_hide = maskString(that.user.phone, 3, 4)
				that.user.api_key_hide = maskString(that.user.api_key, 6, 6)
			},
			copy(content) {
				copyUrl(content)
			},
			rest() {
				let that = this
				restApiKey({

				}).then(r => {
					if (r.code == 1) {
						that.$parent.getUserInfo()
					}
				})
			},

			submitForm(formName) {
				let that = this
				this.$refs[formName].validate((valid) => {
					if (valid) {
						updateUserInfo({
							nickName: that.form.nickName
						}).then(r => {
							if (r.code == 1) {
								that.$parent.getUserInfo()
							}
						})
					} else {
						return false;
					}
				});
			},
		},
	}
</script>

<style scoped lang="scss">
	::v-deep .el-input__inner {
		background: #2f334d !important;
		border: 1px solid #495281 !important;
	}

	::v-deep .el-input.is-disabled .el-input__inner {
		background: #495281 !important;
		border: 1px solid #495281 !important;
		color: #6b7397;
	}
	::v-deep .el-input__count-inner{
		background: transparent !important;
	}

	.btn3 {
		padding: 10px 30px;
	}
</style>