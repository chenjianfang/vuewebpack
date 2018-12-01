import Vue from 'vue';
import TestMain from './main.vue';  // https://vue.docschina.org/v2/guide/single-file-components.html


var app = new Vue({
	el: '#app',
	data: {
		message: 'hello world'
	},
	components: {
		TestMain
	}
})