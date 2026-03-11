<template>
	<div class="user-right-box">
		<div class="form-title">
			<div class="left-title">
				个人信息
			</div>
			<div class="btn" @click="route('userProfile')">
				编辑资料
			</div>
		</div>
		<div class="form-content-list mt-20">
			<div class="form-content-item">
				<div class="left">
					ID
				</div>
				<div class="right">
					{{user.id}}
				</div>
			</div>
			<div class="form-content-item">
				<div class="left">
					昵称
				</div>
				<div class="right">
					{{user.nickName}}
				</div>
			</div>
			<div class="form-content-item">
				<div class="left">
					手机号
				</div>
				<div class="right">
					<div class="apikey-box">
						<span v-if="phone_hide_status">{{user.phone_hide}}</span>
						<span v-if="!phone_hide_status">{{user.phone}}</span>
						<i v-if="phone_hide_status" @click="phone_hide_status = false"
							class="iconfont icon-yincangbukejian cp ml-10"></i>
						<i v-if="!phone_hide_status" @click="phone_hide_status = true"
							class="iconfont icon-xianshikejian cp ml-10"></i>
					</div>
				</div>
			</div>
			<div class="form-content-item">
				<div class="left">
					注册时间
				</div>
				<div class="right">
					{{user.reg_time}}
				</div>
			</div>
			<div class="form-content-item">
				<div class="left">
					API KEY
				</div>
				<div class="right">
					<div class="apikey-box">
						<span v-if="hide">{{user.api_key_hide}}</span>
						<span v-if="!hide">{{user.api_key}}</span>
						<i v-if="hide" @click="hide = false" class="iconfont icon-yincangbukejian cp ml-10"></i>
						<i v-if="!hide" @click="hide = true" class="iconfont icon-xianshikejian cp ml-10"></i>
					</div>
					<div class="btn ml-10" @click="copy(user.api_key)">复制</div>
					<div class="btn2 ml-10" @click="rest()">重置</div>

				</div>
			</div>
		</div>
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
		props: ['user'],
		data() {
			return {
				phone_hide_status: true,
				hide: true,

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
				that.user.phone_hide = maskString(that.user.phone, 3, 4)
				that.user.api_key_hide = maskString(that.user.api_key, 6, 6)
			},
			copy(content) {
				copyUrl(content)
			},
			rest() {
				let that = this

				this.$confirm('API Key是您访问系统的唯一凭证，具有唯一性，请妥善保管。重置后原有的API Key将立即失效，所有使用旧API Key的应用将无法正常工作。', '确认重置API Key', {
					confirmButtonText: '确认重置',
					type: 'warning',
					showCancelButton:false
				}).then(() => {
					restApiKey({

					}).then(r => {
						if (r.code == 1) {
							that.$parent.getUserInfo()
						}
					})
				}).catch(() => {});
			},
			route(name) {
				let that = this;
				that.$router.push({
					name: name,
				});
				return
			}
		},
	}
</script>

<style scoped lang="scss">

</style>