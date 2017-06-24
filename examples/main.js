import Vue from 'vue'
import App from './components/App.vue'

import Pagination from '@/index.js'
Vue.use(Pagination)

export default new Vue ({
	el: '#app',
	render: h => h(App)
})