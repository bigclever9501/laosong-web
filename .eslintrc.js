module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-undef': 0,
		'no-useless-escape': 0,
		'no-unused-vars': 0,
		'no-mixed-spaces-and-tabs': 0,
		'no-unreachable': 0,
		'no-use-v-if-with-v-for': 0,
		'no-extra-semi': 0,

		'no-prototype-builtins': 0,
		'no-inner-declarations': 0,
		'no-constant-condition': 0,
		'no-control-regex': 'off',
	},
	overrides: [{
		files: [
			'**/__tests__/*.{j,t}s?(x)',
			'**/tests/unit/**/*.spec.{j,t}s?(x)'
		],
		env: {
			jest: true
		}
	}]
}