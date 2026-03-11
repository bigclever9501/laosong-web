<template>
	<div class="page-content">
		<div class="mt-40 flex">
			<div class="login-left">
				<div class="top-box">
					<img class="logo" src="~@/assets/img/logo.png" />
					<div class="mt-40 site-title">
						{{config.title}}
					</div>
					<div class="mt-40 site-desc">
						每个人的AI应用层工具库
					</div>
				</div>
				<div class="function-list">
					<div class="function-item" v-for="(i,k) in function_list" :key="k">
						<div class="icon">
							<i :class="i.icon"></i>
						</div>

						<div class="right-content">
							<div class="function-title">
								{{i.title}}
							</div>
							<div class="function-desc">
								{{i.desc}}
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="login-right">
				<div class="login-title">
					欢迎使用{{config.title}}
				</div>
				<div class="login-desc">
					开启AI学习和使用的旅途
				</div>

				<div class="login-phone-tab cp">
					<i class="el-icon-mobile"></i>
					<span>手机号</span>
				</div>

				<el-form ref="Form" :model="Form" label-width="0px">
					<el-form-item class="mt-40">
						<el-input prefix-icon="el-icon-mobile" v-model="Form.phone" placeholder="请输入手机号">
						</el-input>
					</el-form-item>
					<el-form-item class="mt-20">
						<div class="flex">
							<el-input style="width: calc(100% - 102px);" prefix-icon="el-icon-star-off"
								v-model="Form.yzm_code" placeholder="请输入短信验证码">
							</el-input>
							<div class="send-code ml-20 cp" @click="send()" v-if="miao == 0">
								发送验证码
							</div>
							<div class="send-code ml-20 cp" v-if="miao != 0">
								{{miao}}秒重发
							</div>
						</div>

					</el-form-item>
					<div class="login-btn cp no-select" @click="Login">
						登 录
					</div>
				</el-form>

				<el-alert class="mt-40" title="首次使用手机号登录将自动为您创建账户" type="info" show-icon :closable="false">
				</el-alert>


			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import {
		login,
		sendCode
	} from '@/api/login'
	import {
		setCookie,
		getCookie,
		isEmpty
	} from '@/until/tool'
	export default {
		computed: {
			...mapGetters(['config','userInfo'])
		},
		data() {
			return {
				Form: {
					phone: '',
					yzm_code: ''
				},
				miao: 0,
				timer: null,
				function_list: [{
						title: '独家硬核插件',
						icon: 'iconfont icon-a-zujianchajian',
						desc: '基于 Go+Redis 架构自研的高性能 API 插件。一键接入视频生成、语音克隆与数据分析，为您的智能体注入原生级动力。'
					},
					{
						title: '爆款流量工作流',
						icon: 'iconfont icon-gongzuoliu',
						desc: '精选 100+ 经过实战验证的各行业工作流。涵盖爆款文案、口播脚本、分镜设计。拒绝无效堆砌，跑通变现闭环。'
					},
					{
						title: '全自动矩阵智能体',
						icon: 'iconfont icon-zhinengti',
						desc: '针对抖音/小红书/B站优化的垂直领域智能体。从选题策划到评论区互动，打造您的 7x24 小时 AI 数字员工团队。'
					},
					{
						title: 'Coze 实战特训营',
						icon: 'iconfont icon-daohang_coze_mianxing',
						desc: '从 0 到 1 拆解智能体搭建逻辑。不讲空洞理论，只讲如何用技术解决实际业务问题。带你掌握 AI 时代的“超级个体”技能。'
					},
					{
						title: '结构化提示词库',
						icon: 'iconfont icon-tishici',
						desc: '独家整理的 SOP 级结构化提示词（Prompt）。包含角色设定、任务拆解与输出约束，让大模型的回答不再“抽风”，稳定如一。'
					},
					{
						title: '飞书私域进化圈',
						icon: 'iconfont icon-feishu',
						desc: '加入高价值 AI 创作者社群。每日分享前沿搞钱思路，提供 1 对 1 技术陪跑与项目复盘，连接人脉，拒绝信息差。'
					}
				]
			}
		},
		destroyed() {
			let that = this
			clearInterval(that.timer)
		},
		created() {
			let that = this
			if(!isEmpty(that.userInfo)){
				that.$router.push({
					name: 'user',
				});
				return
			}
		},
		methods: {
			Login() {
				let that = this
				if(!that.Form.phone){
					that.$message.error('手机号不能为空')
					return false
				}
				if(/^1\d{10}$/.test(that.Form.phone) == false){
					that.$message.error('手机号格式错误')
					return false
				}
				if(!that.Form.yzm_code){
					that.$message.error('验证码不能为空')
					return false
				}
				if(that.Form.yzm_code.length != 6){
					that.$message.error('验证码位数错误')
					return false
				}
				login({
					phone: that.Form.phone,
					yzm_code: that.Form.yzm_code,
				}).then(r => {
					if(r.code == 1){
						setCookie('baisheng_uid', r.data.id,180)
						setCookie('baisheng_token', r.data.token,180)
						that.$router.push({
							name: 'user',
						});
						return
					}
					
				})
			},
			// 发送验证码
			send() {
				let that = this
				if(!that.Form.phone){
					that.$message.error('手机号不能为空')
					return false
				}
				if(/^1\d{10}$/.test(that.Form.phone) == false){
					that.$message.error('手机号格式错误')
					return false
				}
				sendCode({
					phone: that.Form.phone,
				}).then(r => {
					that.miao = 60
					that.timer = setInterval(() => {
						// console.log('倒计时')
						if (that.miao > 0) {
							that.miao--
						} else {
							// 清除定时器
							clearInterval(that.timer)
						}
					}, 1000)
				})
				// 
			}
		}

	}
</script>

<style scoped lang="scss">
	.page-content {
		.login-left {
			width: 60%;
			background-color: #1F274E;
			border-radius: 20px;
			padding: 40px 100px;

			.top-box {
				text-align: center;

				.site-title {
					font-size: 34px;
					font-weight: bold;
					color: #0000;
					background: linear-gradient(90deg, #4a6cf7, #a855f7, #f472b6, #4a6cf7, #a855f7, #f472b6);
					-webkit-background-clip: text;
					background-clip: text;
				}

				.site-desc {
					font-size: 18px;
				}

				.logo {
					width: 80px;
					height: 80px;
					border-radius: 14px;
					box-shadow: rgba(59, 130, 246, 0.4) 0px 8px 32px;
				}
			}

			.function-list {
				display: flex;
				flex-direction: column;

				.function-item {
					background-color: #28305B;
					margin-top: 30px;
					padding: 20px;
					border-radius: 20px;
					display: flex;
					align-items: center;

					.icon {
						width: 50px;
						min-width: 50px;
						height: 50px;
						border-radius: 10px;
						background: linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246));
						color: #fff;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;

						i {
							font-size: 24px;
						}
					}

					.right-content {
						margin-left: 10px;

						.function-title {
							font-size: 16px;
							font-weight: bold;
							color: #fff;
						}

						.function-desc {
							margin-top: 6px;
							font-size: 14px;
							line-height: 1.5;
						}
					}
				}
			}

		}

		.login-right {
			margin-left: 60px;
			width: 40%;
			background-color: #1F274E;
			border-radius: 20px;
			padding: 40px 60px;
			text-align: center;
			height: fit-content;

			.login-title {
				color: #0000;
				background: linear-gradient(90deg, #4a6cf7, #a855f7, #f472b6, #4a6cf7, #a855f7, #f472b6);
				-webkit-background-clip: text;
				background-clip: text;
				font-size: 34px;
				font-weight: bold;
			}

			.login-desc {
				margin-top: 28px;
			}

			.login-phone-tab {
				border-radius: 6px;
				display: flex;
				flex-direction: column;
				padding: 8px;
				width: 100%;
				margin-top: 28px;
				color: #fff;
				background: linear-gradient(#0082ff, #00c0ff);

				span {
					margin-top: 10px;
					font-size: 14px;
				}
			}

			.send-code {
				background: linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162));
				color: #fff;
				border-radius: 6px;
				padding: 0 6px;
			}

			.login-btn {
				margin-top: 40px;
				background: linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162));
				color: #fff;
				padding: 12px;
				border-radius: 6px;
			}
		}
	}
</style>