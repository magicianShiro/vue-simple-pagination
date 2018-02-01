<template>
  <ms-selectPagination
    v-if="theme==='select'"
    class="ms-pagination"
    :page="page"
    :totalPage="totalPage"
    :pageSize="pageSize"
    :pageCount="pageCount"
    :visiblePages="visiblePages"
    @current-change="current_change">
  </ms-selectPagination>
  <ms-defaultPagination
    v-else-if="theme==='default'"
    class="ms-pagination"
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
  import SelectPagination from './SelectPagination.vue'
  import DefaultPagination from './DefaultPagination.vue'
  export default {
    name: 'ms-pagination',
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
    },
    mounted () {
      console.log(this.$options.name)
    }
  }
</script>
