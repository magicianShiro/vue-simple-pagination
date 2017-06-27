<template>
  <div id="clickPagination">
    <div class="lf prev">
      <p
        class="lf firstBtn"
        :class="{'disabled': currentPage === 1}"
        @click.stop="first_page">First</p>
      <p
        class="lf prevBtn"
        :class="{'disabled': currentPage === 1}"
        @click.stop="prev_page">Previous</p>
    </div>
    <ul class="lf">
      <li
        class="lf"
        :class="{'active': pageItem === currentPage}"
        v-for="(pageItem, index) in visiblePageArr">
        {{pageItem}}</li>
      <!-- <li v-else class="lf">asdf</li> -->
    </ul>
    <div class="lf next">
      <p
        class="lf nextBtn"
        :class="{'disabled': currentPage === pageTotal}"
        @click.stop="next_page">Next</p>
      <p
        class="lf lastBtn"
        :class="{'disabled': currentPage === pageTotal}"
        @click.stop="last_page">Last</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      page: {
        type: Number,
        default: 1
      },
      pageTotal: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 10
      },
      visiblePages: {
        type: Number,
        default: 7
      },
      quick: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        currentPage: this.page
      }
    },
    methods: {
      prev_page () {
        this.currentPage === 1 ? 1 : this.currentPage--
      },
      first_page () {
        this.currentPage = 1
      },
      next_page () {
        this.currentPage === this.pageTotal ? this.currentPage = this.pageTotal : this.currentPage++
      },
      last_page (){
        this.currentPage = this.pageTotal
      }
    },
    watch: {
      currentPage (newVal, oldValue) {
        this.$emit('current-change', newVal)
      }
    },
    computed: {
      visiblePageArr () {
        // 这里的 4 可以当成配置项
        // 表情从第几项开始 页面开始移动
        let start = this.currentPage - 4 <= 0 ? 0 : this.currentPage - 4
        start = start + this.visiblePages > this.pageTotal ? this.pageTotal - this.visiblePages : start
        let end = start + this.visiblePages > this.pageTotal ? this.pageTotal : start + this.visiblePages

        let arr = []
        for(let i=0; i<this.pageTotal; i++){
          arr.push(i+1)
        }
        return arr.slice(start, end)
      }
    }
  }
</script>

<style scoped lang="less">
  .btnStyle {
    font-size: 12px;
    line-height: 1.5;
    padding: 5px 10px;
    color: #337ab7;
    background-color: #fff;
    border: 1px solid #ddd;
    cursor: pointer;
    &:hover {
      color: #23527c;
      background-color: #eee;
      border-color: #ddd;
    }
  }
  #clickPagination {
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    margin: 100px;
    &>div{
      p {
        .btnStyle;
        &.firstBtn {
        }
        &.prevBtn {
        }
        &:nth-child(n+2){
          border-left: none;
        }
        &.disabled {
          color: #777;
          cursor: not-allowed;
          background-color: #fff;
          border-color: #ddd;
        }
      }
      &.prev {
        .prevBtn {
          border-right: none;
        }
      }
      &.next {
        .nextBtn {
          border-left: none;
        }
      }
    }
    ul {
      li {
        .btnStyle;
        &+li {
          border-left: none;
        }
        &.active{
          color: #fff;
          background-color: #337ab7;
          border-color: #337ab7;
        }
      }
    }
  }
</style>
