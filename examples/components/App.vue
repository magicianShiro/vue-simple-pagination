<template>
	<div class="ms-pagination">
		<ms-pagination
			theme="select"
			:page="1"
			:totalPage="18"
			:visiblePages="10"
			@current-change="currentChange"></ms-pagination>
		
		<ms-pagination
			:page="3"
			:totalPage="18"
			:fast="true"
			:basePage="5"
			:visiblePages="10"
			@current-change="currentChange"></ms-pagination>
	</div>
	
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
<style scoped lang="less">
.ms-pagination {
	& + & {
		margin-top: 50px;
	}
}
</style>
