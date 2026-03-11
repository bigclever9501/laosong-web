module.exports = {
	// 选项...
	// publicPath: '/addons/yzd_kp/template/web/',	//打包路径 微擎版
	// publicPath: '/web/', //打包路径 独立版
	publicPath: '/', //打包路径 独立版
	productionSourceMap: false, //map减少包大小，加密源码
	parallel: false, //构建正式环境关闭 thread-loader
}