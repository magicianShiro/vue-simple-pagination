<template>
  <div id="pagination">
    <div class="wrap clearfix">
      <input
        :disabled="1 === currentPage"
        type="button"
        class="btn prev lf"
        @click="select_prevPage" value="上一页"></input>
      <div 
        id="drap" 
        class="pagesize lf" 
        :class="{selected: isSelected}" 
        @click="isSelected=!isSelected">
        <input type="text"
          readonly
          v-model="currentPage">
        <i class="el-icon-arrow-down"></i>
        <transition name="el-zoom-in-top">
         <ul :style="pageSizeList" v-if="isSelected">
            <li
              :class="{'active': currentPage===pageItem}"
              v-for="(pageItem, index) in visiblePageArr"
              @click="select_page(pageItem)">{{pageItem}}</li>
         </ul>
        </transition>
      </div>
      <input
        :disabled="_totalPage === currentPage"
        type="button"
        class="btn next lf"
        @click="select_nextPage" value="下一页"></span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SelectPagination',
    props: ['page', 'totalPage', 'pageSize', 'pageCount', 'visiblePages'],
    data () {
      return {
        currentPage: this.page,
        pageSizeList: {
          height: this.visiblePages*30 + 7 +'px'
        },
        isSelected: false
      }
    },
    methods: {
      // 选择页数
      select_page (page) {
        this.currentPage = page
      },
      // 选择上一页
      select_nextPage () {
        this.currentPage >= this._totalPage ? this._totalPage : this.currentPage++
      },
      // 选择下一页
      select_prevPage () {
        this.currentPage <= 1 ? 1 : this.currentPage--
      }
    },
    watch: {
      currentPage (newVal, oldValue) {
        this.$emit('current-change', newVal)
      }
    },
    computed: {
      visiblePageArr () {
        console.log(this._totalPage)
        let arr =[]
        for(let i=0; i<this._totalPage; i++){
          arr.push(i+1)
        }
        console.log(arr)
        return arr
      },
      _totalPage () {
        if(this.pageSize && this.pageCount)
          return Math.ceil(this.pageCount / this.pageSize)
        else if (this.totalPage)
          return this.totalPage
        else 
          throw new Error('参数不正确')
      },
    },
    mounted () {
      let doc = document.documentElement || document.body
      let drap = document.getElementById('drap')
      doc.onclick = () => {
        this.isSelected=false
      }
      drap.onclick = e => e.stopPropagation()

    }
  }
</script>

<style scoped lang="less">
  /* 浮动以及清除浮动 */
  .lf {
    float: left;
  }
  .rf {
    float: right;
  }
  .clearfix:after{
    content: '';
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  #pagination {
    color: #fff;
    .wrap {
      .btn {
        height: 30px;
        line-height: 30px;
        background-color: #fff;
        color: #333;
        padding:0 10px;
        border-radius: 3px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        outline: none;
        cursor: pointer;
        &:hover {
          background-color: #f6f6f6;
          color: #666;
        }
        &:disabled {
          cursor: not-allowed;
          background-color: #f0f0f0;
          color: #aaa;
        }
      }
    }
    .pagesize {
      position: relative;
      width: 80px;
      height: 30px;
      margin:0 10px;
      input {
        width: 100%;
        border: 1px solid #ddd;
        height: 30px;
        outline: none;
        padding-right: 25px;
        text-align: center;
        text-indent: 15px;
        color: #333;
        box-sizing: border-box;
      }
      // icon样式
      i {
        position: absolute;
        top: 11px;
        right: 10px;
        width: 12px;
        height: 12px;
        font-size: 12px;
        color: #333;
        transition: all .5s;
      }
      ul {
        margin-top: 5px;
        background-color: #fff;
        color: #333;
        border: 1px solid #ddd;
        box-shadow: 0px 0px 5px rgba(255,255,255,.5);
        padding: 5px 0;
        overflow-y: auto;
        box-sizing: border-box;
        li {
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
          text-align: left;
          cursor: pointer;
          &:hover {
            background-color: #e4e8f1;
          }
          &.active{
            background-color: #e4e8f1;
          }
        }
      }
      &.selected {
        i {
          top: 8px;
          transform: rotateZ(180deg);
        }
      }
    }
  }
</style>
