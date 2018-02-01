import Pagination from './pagination/Pagination.vue'

export default {
	install (Vue, options) {
		Vue.component('ms-pagination', Pagination)
	}
}

export {
	Pagination
}
