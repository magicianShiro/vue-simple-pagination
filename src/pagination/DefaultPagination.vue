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
        :class="{'active': index+1 === currentPage}"
        v-for="(pageItem, index) in '_'.repeat(pageTotal)">
        {{index+1}}</li>
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
      }
    },
    data () {
      return {
        currentPage: 1
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
