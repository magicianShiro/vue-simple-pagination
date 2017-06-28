<template>
	<ms-pagination 
		theme="select"
		:totalPage="100"
		:fast="true"
		:visiblePages="10"
		@current-change="currentChange"></ms-pagination>
</template>
<script>
	export default {
		data () {
			return {
				btnTextOption: {
					first: '首页',
					last: '尾页',
					prev: '上一页',
					next: '下一页'
				}
			}
		},
		methods: {
			currentChange (currentPage) {
				console.log(currentPage)
			}
		}
	}
</script>
<style scoped lang="less"></style>