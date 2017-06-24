<template>

  <ms-selectPagination
    v-if="theme==='select'"
    :pageTotal="pageTotal"
    @current-change="current_change">
  </ms-selectPagination>
  <ms-defaultPagination
    v-else-if="theme==='default'"
    :pageTotal="pageTotal"
    @current-change="current_change">
  </ms-defaultPagination>
</template>

<script>
  import SelectPagination from './SelectPagination.vue'
  import DefaultPagination from './DefaultPagination.vue'
  export default {
    props: {
      theme: {
        type: String,
        default: 'default'
      },
      pageTotal: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {}
    },
    methods: {
      current_change (currentPage) {
        this.$emit('current-change', currentPage)
      }
    },
    components: {
      'ms-selectPagination': SelectPagination,
      'ms-defaultPagination': DefaultPagination
    },
  }
</script>
