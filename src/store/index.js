import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loading: false,
		config:{
		},
		userInfo:{
			
		}
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setConfig(state, value) {
			state.config = value
		},
		setUserInfo(state, value) {
			state.userInfo = value
		}

	},
	getters: {
		config: state => state.config,
		loading: state => state.loading,
		userInfo: state => state.userInfo
	},
	actions: {},
	modules: {}
})