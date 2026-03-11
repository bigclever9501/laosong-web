import Vue from 'vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/element-variables.scss';
import App from './App.vue';
import router from './router';
import store from './store';
// import fabric from 'fabric';
// import tool from 'until/tool.js'

// import qs from 'qs'
// Vue.prototype.$qs = qs
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import moment from 'moment'
Vue.prototype.$moment = moment


import 'vue-draggable-resizable/dist/VueDraggableResizable.css';


Vue.config.productionTip = false;

Vue.use(ElementUI);
// Vue.use(fabric);


new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');