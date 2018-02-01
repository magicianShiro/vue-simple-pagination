<template>

  <ms-selectPagination
    v-if="theme==='select'"
    :page="page"
    :totalPage="totalPage"
    :pageSize="pageSize"
    :pageCount="pageCount"
    :visiblePages="visiblePages"
    @current-change="current_change">
  </ms-selectPagination>
  <ms-defaultPagination
    v-else-if="theme==='default'"
    :page="page"
    :basePage="basePage"
    :totalPage="totalPage"
    :pageSize="pageSize"
    :pageCount="pageCount"
    :visiblePages="visiblePages"
    :fast="fast"
    :fastStep="fastStep"
    :btnText="btnText"
    @current-change="current_change">
  </ms-defaultPagination>
</template>

<script>
  import '@/assets/css/main.css'
  import '@/assets/css/iconfont.css'
  import SelectPagination from './SelectPagination.vue'
  import DefaultPagination from './DefaultPagination.vue'
  export default {
    name: 'Pagination',
    props: {
      theme: {
        type: String,
        default: 'default'
      },
      page: {
        type: Number,
        default: 1
      },
      basePage: {
        type: Number,
        default: 4
      },
      totalPage: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 0
      },
      pageCount: {
        type: Number,
        default: 0
      },
      visiblePages: {
        type: Number,
        default: 5
      },
      fast: {
        type: Boolean,
        default: false
      },
      fastStep: {
        type: Number,
        default: 5
      },
      btnText: {
        type: Object,
        default: _ => {
          return {
            first: 'First',
            prev: 'Previous',
            next: 'Next',
            last: 'Last'
          }
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      current_change (currentPage) {
        this.$emit('current-change', currentPage)
      },
    },
    components: {
      'ms-selectPagination': SelectPagination,
      'ms-defaultPagination': DefaultPagination
    }
  }
</script>
