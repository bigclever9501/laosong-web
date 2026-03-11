// import {
// 	firstLogin,
// 	Initdata
// } from '@/api/login'
// import {
// 	powerManager
// } from '@/api/power'
// import {
// 	menu
// } from '@/api/set'
import store from '@/store'
import {
	Message
} from 'element-ui'

// 请求头封装
export function reqHeader() {
	let headers = {
		'Content-Type': 'application/json;',
		token: getCookie('baisheng_token'), //token
		uid: getCookie('baisheng_uid'), //uid
	}
	return headers;
}
export function reqGetData() {
	let data = {
		token: getCookie('baisheng_token'), //token
		uid: getCookie('baisheng_uid'), //uid
	}
	return data;
}
// 登录初始化
export function initLogin() {
	firstLogin({}).then(r => {
		// console.log('rrrr', r)
		document.title = r.data.title || '管理后台'
		var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
		link.href = r.data.favicon
		if (r.code == -2) {
			powerManager({
					op: 'get'
				})
				.then(r => {
					if (r.code == 2) {
						store.commit('setPower', r.data);
					}
				});
		}
	});

}

// 判断是否为微擎
export function IS_W7() {
	return W7;
}

export function power() {

	return new Promise((resolve, reject) => {
		if (store.state.power.length != 0) {
			resolve()
		} else {
			powerManager({
				op: 'get'
			}).then(r => {
				store.commit('setPower', r.data);
				resolve()
			});
		}
	})

	// return new Promise((resolve, reject) => {
	// 	powerManager({
	// 			op: 'get'
	// 		})
	// 		.then(r => {
	// 			if (r.code == 2) {
	// 				store.commit('setPower', r.data);
	// 				resolve()
	// 			}
	// 		});
	// })
}

// 菜单权限
export function menuPermission() {
	return new Promise((resolve, reject) => {
		if (store.state.menu.length == 0) {
			menu({}).then(r => {
				store.commit('setMenu', r.data)
				resolve()
			});
		} else {
			resolve()
		}
	})
}

// 三级菜单及跳转
export function threeMenu(pid, type = '') {
	var menu = store.state.menu.all
	var three = []
	if (type == '') {
		for (var i = 0; i < menu.length; i++) {
			if (menu[i]['pid'] == pid) {
				three.push(menu[i])
			}
		}
	} else {
		for (var ii = 0; ii < menu.length; ii++) {
			if (menu[ii]['pid'] == pid && menu[ii]['type'] == type) {
				three.push(menu[ii])
			}
		}
	}
	return three
}

// 初始化数据
export function InitData() {
	return new Promise((resolve, reject) => {
		Initdata({})
			.then(r => {
				if (r.code == 2) {
					resolve()
				}
			});
	})
}

// 退出登录
export function LoginOut() {
	setCookie('baisheng_uid', '')
	setCookie('baisheng_token', '')
}
// 手机号校验
export function isPhoneNumber(phoneNum) {
	let reg = /^\d{11}$/;
	/*
	  * 移动号码包括的号段：134/135/136/137,138,139；
	*                     147/148(物联卡号)；
	*                     150/151/152/157/158/159；
	*                     165（虚拟运营商）；
	*                     1703/1705/1706（虚拟运营商）、178；
	*                     182/183/184/187/188
	*                     198

	* 联通号段包括：130/131
	*               145
	*               155/156
	*               166/167(虚拟运营商)
	*               1704/1707/1708/1709、171
	*               186/186
	*
	* 电信号段包括： 133
	*                153
	*                162(虚拟运营商)
	*                1700/1701/1702(虚拟运营商)
	*                180/181/189
	*                191/199
	* */
	// let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
	// let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,6,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
	return reg.test(phoneNum);
}


// 秒数转为日期格式
export function getFormatDuringTime(during) {
	var s = Math.floor(during / 1) % 60;
	s = s < 10 ? '0' + s : s;
	during = Math.floor(during / 60);
	var i = during % 60;
	i = i < 10 ? '0' + i : i;
	during = Math.floor(during / 60);
	var h = during % 24;
	h = h < 10 ? '0' + h : h;
	during = Math.floor(during / 24);
	var d = during;
	d = d < 10 ? '0' + d : d;
	// return d + '天' + h + '时' + i + '分' + s + '秒';
	return h + ':' + i + ':' + s;
}


export function fun_date(num) {
	var date1 = new Date();
	//今天时间
	var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
	// console.log(time1);
	var date2 = new Date(date1);
	date2.setDate(date1.getDate() + num);
	//num是正数表示之后的时间，num负数表示之前的时间，0表示今天
	var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
	// console.log(time2);
	return time2;
}

export function dateFormat(fmt, date) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

export function nowDateTime() {
	let times = new Date();
	let Y = times.getFullYear()
	let M = times.getMonth() + 1 < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1
	let D = times.getDate() < 10 ? '0' + (times.getDate()) : times.getDate()
	let h = times.getHours() < 10 ? '0' + (times.getHours()) : times.getHours()
	let m = times.getMinutes() < 10 ? '0' + (times.getMinutes()) : times.getMinutes()
	let s = times.getSeconds() < 10 ? '0' + (times.getSeconds()) : times.getSeconds()
	return times = Y + "-" + M + "-" + D + ' ' + h + ":" + m + ":" + s;
}

// 时间戳转时间
export function timestampToDate(timestamp) {
	const date = new Date(parseFloat(timestamp) * 1000)
	const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
	const day = date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate()
	const hour = date.getHours() < 10 ? "0" + (date.getHours()) : date.getHours()
	const munite = date.getMinutes() < 10 ? "0" + (date.getMinutes()) : date.getMinutes()
	const second = date.getSeconds() < 10 ? "0" + (date.getSeconds()) : date.getSeconds()
	return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + munite + ":" + second
}
// 时间转为时间戳
export function dateToTimestamp(time) {
	var date = new Date(time); // 获取当前时间
	var timestamp = date.getTime() / 1000; // 转换成时间戳
	return timestamp;
}

//计算两个时间之间的时间差 多少天时分秒
export function intervalTime(startTime, endTime) {
	if (startTime > endTime) {
		return startTime - endTime;
	} else {
		return endTime - startTime;
	}

}
// 几秒后的时间戳
export function getTimestampAfterSeconds(seconds) {
	const now = new Date();
	now.setSeconds(now.getSeconds() + seconds);
	return now.getTime();
}
// export function intervalTime(startTime, endTime) {
// 	// var timestamp=new Date().getTime(); //计算当前时间戳
// 	var timestamp = (Date.parse(new Date())) / 1000; //计算当前时间戳 (毫秒级)
// 	var date1 = ""; //开始时间
// 	if (timestamp < startTime) {
// 		date1 = startTime;
// 	} else {
// 		date1 = timestamp; //开始时间
// 	}
// 	var date2 = endTime; //结束时间
// 	// var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
// 	var date3 = (date2 - date1) * 1000; //时间差的毫秒数
// 	//计算出相差天数
// 	var days = Math.floor(date3 / (24 * 3600 * 1000));
// 	if (days < 0) {
// 		days = days * (-1)
// 	}

// 	//计算出小时数
// 	var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
// 	var hours = Math.floor(leave1 / (3600 * 1000));
// 	//计算相差分钟数
// 	var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
// 	var minutes = Math.floor(leave2 / (60 * 1000));

// 	//计算相差秒数
// 	var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
// 	var seconds = Math.round(leave3 / 1000);
// 	// console.log(days + "天 " + hours + "小时 ")
// 	// return   days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
// 	seconds = days * 24 * 36000 + hours * 3600 + minutes * 60 + seconds
// 	return seconds;
// }
// 秒转成分
export function s_to_hs(s) {
	//计算分钟
	//算法：将秒数除以60，然后下舍入，既得到分钟数
	let h;
	h = Math.floor(s / 60);
	//计算秒
	//算法：取得秒%60的余数，既得到秒数
	s = s % 60;
	//将变量转换为字符串
	h += '';
	s += '';
	//如果只有一位数，前面增加一个0
	h = (h.length == 1) ? '0' + h : h;
	s = (s.length == 1) ? '0' + s : s;
	return h + ':' + s;
}


// 存缓存
export function setCookie(cname, cvalue, exdays) {
	let d = new Date()
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
	let expires = 'expires=' + d.toUTCString()
	document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/'
}

// 取缓存
export function getCookie(cname) {
	let name = cname + '='
	let ca = document.cookie.split(';')
	// console.log("获取cookie,现在循环")
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		// console.log(c)
		while (c.charAt(0) === ' ') c = c.substring(1)
		if (c.indexOf(name) !== -1) {
			return c.substring(name.length, c.length)
		}
	}
	return ''
}
export function timeToTimestamp(time) {
	var date = new Date(time)
	return date.getTime()

}

// 复制
export function copyUrl(content) {
	if (!document.queryCommandSupported('copy')) return false // 不支持
	let textarea = document.createElement("textarea")
	textarea.value = content
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 选择对象
	textarea.setSelectionRange(0, content.length) //核心
	let result = document.execCommand("copy") // 执行浏览器复制命令
	textarea.remove()
	Message.success('复制成功')
	return result
}
// js判断字符串长度，中文占两个字符
export function strlen(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			len++;
		} else {
			len += 2;
		}
	}
	return len;
}

//产生随机数函数
export function RndNum(n) {
	var rnd = "";
	for (var i = 0; i < n; i++)
		rnd += Math.floor(Math.random() * 10);
	return rnd;
}


export function isEmpty(val) {
	if (val == null || val == undefined) return true;

	if (val == "undefined") return true;

	if (typeof val === "boolean") return false;

	if (typeof val === "number") return !val;

	if (val instanceof Error) return val.message === "";

	switch (Object.prototype.toString.call(val)) {
		// String or Array
		case "[object String]":
		case "[object Array]":
			return !val.length;

			// Map or Set or File
		case "[object File]":
		case "[object Map]":
		case "[object Set]": {
			return !val.size;
		}
		// Plain Object
		case "[object Object]": {
			return !Object.keys(val).length;
		}
	}
	return false;
}

// 四舍五入转两位小数
export function decimal2(val) {
	var num1 = parseFloat(val);
	if (!isNaN(num1)) {
		num1 = Math.round(num1 * 100) / 100;
		var str = num1.toString();
		var rs = str.indexOf('.');
		if (rs < 0) {
			rs = str.length;
			str += '.';
		}
		while (str.length <= rs + 2) {
			str += '0';
		}
		// console.log('str',str)
		return str;
	}
}


export function objEquals(object1, object2) {
	// For the first loop, we only check for types
	for (let propName in object1) {
		// Check for inherited methods and properties - like .equals itself
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
		// Return false if the return value is different

		if (Object.prototype.hasOwnProperty.call(object1, propName) !== Object.prototype.hasOwnProperty.call(object2,
				propName)) {
			return false
			// Check instance type
		} else if (typeof object1[propName] !== typeof object2[propName]) {
			// Different types => not equal
			return false
		}
	}
	// Now a deeper check using other objects property names
	for (let propName in object2) {
		// We must check instances anyway, there may be a property that only exists in object2
		// I wonder, if remembering the checked values from the first loop would be faster or not
		if (Object.prototype.hasOwnProperty.call(object1, propName) !== Object.prototype.hasOwnProperty.call(object2,
				propName)) {
			return false
		} else if (typeof object1[propName] !== typeof object2[propName]) {
			return false
		}
		// If the property is inherited, do not check any more (it must be equa if both objects inherit it)
		if (!Object.prototype.hasOwnProperty.call(object1, propName)) {
			continue
		}
		// Now the detail check and recursion
		// This returns the script back to the array comparing
		/** REQUIRES Array.equals**/
		if (object1[propName] instanceof Array && object2[propName] instanceof Array) {
			// recurse into the nested arrays
			if (objEquals(!object1[propName], object2[propName])) {
				return false
			}
		} else if (object1[propName] instanceof Object && object2[propName] instanceof Object) {
			// recurse into another objects
			// console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
			if (objEquals(!object1[propName], object2[propName])) {
				return false
			}
			// Normal value comparison for strings and numbers
		} else if (object1[propName] !== object2[propName]) {
			return false
		}
	}
	// If everything passed, let's say YES
	return true
}
// 分割数组
export function chunkArray(arr, chunkSize) {
	let result = [];
	for (let i = 0; i < arr.length; i += chunkSize) {
		result.push(arr.slice(i, i + chunkSize));
	}
	return result;
}

// 随机获取一个数组中的n项
export function getRandomList(arrList, n) {
	let arr = JSON.parse(JSON.stringify(arrList)); //深拷贝传来的数组
	let showArr = []; //最后随机生成的数组
	for (let i = 0; i < n; i++) {
		if (arr.length > 0) {
			let randomNum = parseInt(Math.random() * arr.length) //随机取索引值
			showArr.push(arr[randomNum])
			arr.splice(randomNum, 1) //删除已添加的元素，避免重复
		} else {
			break; //避免所取元素个数大于数组长度
		}
	}
	return showArr
}
//图片转base64
export function loadImageAsBase64(url, callback) {
	const img = new Image();
	img.crossOrigin = 'Anonymous'; // 设置 CORS 策略为 Anonymous，如果服务器支持的话
	img.onload = () => {
		const canvas = document.createElement('CANVAS');
		const ctx = canvas.getContext('2d');
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);
		const dataURL = canvas.toDataURL('image/png');
		callback(dataURL);
	};
	img.src = url;
}

// 禁止上传文件类型
// export function uploadError(file_name){

// 	let file_name_arr = file_name.split("."); // 使用空格分割字符串
// 	console.log('file_name_arr.lenght - 1', file_name_arr.length)
// 	let file_type = (file_name_arr[(file_name_arr.length - 1)]).toLowerCase();
// 	console.log('file_type', file_type);

// 	let file_type_arr =  ['php','js','html','htm','shtml','shtm','asp','jsp'];
// 	if(file_type_arr.includes(file_type)){
// 		Message.error('禁止上传' + file_type + '文件！' )
// 		return true;
// 	}else{
// 		return false;
// 	}
// }

export function uploadError(file_name) {
	let file_name_arr = file_name.split(".");
	let file_type = (file_name_arr[(file_name_arr.length - 1)]).toLowerCase();
	// 修改为包含检测的危险扩展名列表
	// const dangerExtensions = ['php', 'js', 'html', 'htm', 'shtml', 'shtm', 'asp', 'jsp', 'php5', 'phtml', 'xml', 'svg', 'svgz'];
	// // 检查文件扩展名是否包含任何危险关键词
	// const isDanger = dangerExtensions.some(ext => file_type.includes(ext));
	// if (isDanger) {
	// 	Message.error('禁止上传' + file_type + '文件！')
	// 	return true;
	// }
	const yesExtension = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'mp4', 'mov', 'mpg', 'mp3', 'aac', 'wav', 'pcm', 'doc',
		'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'epub'
	];
	if (!yesExtension.includes(file_type)) {
		Message.error('禁止上传' + file_type + '文件！')
		return true;
	}
	return false;
}

export function getUnixToDate(format, str) {
	var oDate = new Date(parseInt(str));
	var oYear = oDate.getFullYear();
	var oMonth = oDate.getMonth() + 1;
	var oDay = oDate.getDate();

	if (format == 'yyyy-mm-dd') {
		return oYear + '-' + getZf(oMonth) + '-' + getZf(oDay);
	} else if (format == 'yyyy/mm/dd') {
		return oYear + '/' + getZf(oMonth) + '/' + getZf(oDay);
	} else {
		return "Invalid format";
	}
}

function getZf(n) {
	n = n.toString();
	if (n.length == 1) {
		return '0' + n;
	} else {
		return n;
	}
}

//获取当前时间
export function getNowDateTime(timeStr) {
	let now = new Date();
	let year = now.getFullYear(); //得到年份
	let month = (now.getMonth() + 1).toString().padStart(2, "0"); //得到月份
	let day = now.getDate().toString().padStart(2, "0"); //得到日期

	if (timeStr == undefined) {
		return `${year}-${month}-${day}`;
	}
	let hours = now.getHours().toString().padStart(2, "0") // 得到小时;
	let minutes = now.getMinutes().toString().padStart(2, "0") // 得到分钟;
	let seconds = now.getSeconds().toString().padStart(2, "0") // 得到秒;
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

//获取指定前几天的日期
export function getBeforeDate(n) {
	var num = n;
	var d = new Date();
	var year = d.getFullYear();
	var mon = d.getMonth() + 1;
	var day = d.getDate();
	if (day <= num) {
		if (mon > 1) {
			mon = mon - 1;
		} else {
			year = year - 1;
			mon = 12;
		}
	}
	d.setDate(d.getDate() - num);
	year = d.getFullYear();
	mon = d.getMonth() + 1;
	day = d.getDate();
	let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
	return s;
}

export function convertSecondsToTime(seconds) {
	const hours = Math.floor(seconds / 3600); // 获取小时数
	const minutes = Math.floor((seconds % 3600) / 60); // 获取剩余分钟数
	const remainingSeconds = seconds % 60; // 获取剩余秒数

	// 使用模板字符串格式化输出
	return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// export function readVideoMeta(file) {
// 	return new Promise((resolve, reject) => {
// 		const url = URL.createObjectURL(file);
// 		const video = document.createElement('video');

// 		video.preload = 'metadata';
// 		video.muted = true;
// 		video.playsInline = true;
// 		video.src = url;

// 		const timer = setTimeout(() => {
// 			cleanup();
// 			reject('metadata timeout');
// 		}, 5000);

// 		function cleanup() {
// 			clearTimeout(timer);
// 			URL.revokeObjectURL(url);
// 			video.remove();
// 		}

// 		video.onloadedmetadata = () => {
// 			cleanup();
// 			resolve({
// 				duration: video.duration,
// 				width: video.videoWidth,
// 				height: video.videoHeight
// 			});
// 		};

// 		video.onerror = () => {
// 			cleanup();
// 			reject('video error');
// 		};
// 	});
// }
export function readVideoMeta(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file); // 创建临时 URL
		const video = document.createElement('video'); // 创建视频元素

		video.preload = 'metadata'; // 只加载元数据
		video.muted = true; // 静音
		video.playsInline = true; // 在移动设备上也能自动播放
		video.src = url; // 设置视频源

		let isCleanupDone = false; // 用于标记 cleanup 是否已执行，避免多次执行
		const timer = setTimeout(() => {
			if (!isCleanupDone) {
				cleanup(); // 超时处理
				reject('metadata timeout');
			}
		}, 5000); // 设置超时时间

		function cleanup() {
			if (isCleanupDone) return; // 如果已经清理过，直接返回
			isCleanupDone = true;
			clearTimeout(timer); // 清除定时器
			URL.revokeObjectURL(url); // 撤销 URL
			video.remove(); // 移除视频元素
		}

		video.onloadedmetadata = () => {
			cleanup(); // 加载完成后清理
			resolve({
				duration: video.duration, // 视频时长
				width: video.videoWidth, // 视频宽度
				height: video.videoHeight // 视频高度
			});
		};

		video.onerror = (error) => {
			cleanup(); // 错误时清理
			reject('video error: ' + error.message); // 返回错误信息
		};
	});
}

// 获取分页条数缓存 type material
export function getPageSize(type) {
	let storage_name = 'pagesize_' + type
	let pagesize = localStorage.getItem(storage_name) || (type == 'material' ? 20 : 10)
	return parseInt(pagesize);
}

// 存分页条数缓存 type material
export function savePageSize(type,num) {
	let storage_name = 'pagesize_' + type
	let pagesize = localStorage.setItem(storage_name, num)
	return num;
}
/*
 * 优化版本：智能处理边界情况
 * @param {string} str - 要处理的字符串
 * @param {number} frontCount - 前面保留的字符数
 * @param {number} backCount - 后面保留的字符数
 * @param {string} maskChar - 替换字符，默认为 *
 * @returns {string} 格式化后的字符串
 */
export function maskString(str, frontCount = 3, backCount = 4, maskChar = '*') {
  if (typeof str !== 'string' || str.length === 0) {
    return str || '';
  }
  
  // 确保参数是整数
  frontCount = Math.max(0, Math.floor(frontCount));
  backCount = Math.max(0, Math.floor(backCount));
  
  const totalLength = str.length;
  
  // 如果不需要或不能隐藏中间部分
  if (totalLength <= frontCount + backCount) {
    return str;
  }
  
  // 获取各部分
  const frontPart = str.slice(0, frontCount);
  const backPart = backCount > 0 ? str.slice(-backCount) : '';
  const middlePart = maskChar.repeat(totalLength - frontCount - backCount);
  
  return frontPart + middlePart + backPart;
}