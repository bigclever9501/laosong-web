<template>
	<div class="layout_body">
		<div>
			<nav-bar />
			<app-main style="background: #1E1C2A;min-height: 500px;" />
			<foo-ter />
		</div>
	</div>
</template>
<script>
	import AppMain from "./components/AppMain";
	import NavBar from "./components/NavBar";
	import FooTer from "./components/FooTer";
	export default {
		name: "Layout",
		components: {
			AppMain,
			NavBar,
			FooTer
		},
		created() {},
		methods: {
			Init() {}
		},
		watch: {
			$route() {}
		},
		data() {
			return {
				loading: false,
				all_menu: [],
				miao: 3
			}
		}
	};
</script>