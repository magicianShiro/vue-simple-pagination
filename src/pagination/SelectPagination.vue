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
        <i class="iconfont icon-unfold"></i>
        <transition name="ms-zoom-in-top">
         <ul :style="pageSizeList" v-show="isSelected">
            <li
              :class="[
                {'active': currentPage===pageItem},
                {'hover': hover === pageItem}
              ]"
              v-for="(pageItem, index) in visiblePageArr"
              @mouseenter="mouseenter(pageItem)"
              @mouseleave="mouseleave(pageItem)"
              @click="select_page(pageItem)">{{pageItem}}</li>
         </ul>
        </transition>
      </div>
      <input
        :disabled="_totalPage === currentPage"
        type="button"
        class="btn next lf"
        @click="select_nextPage" value="下一页">
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
        isSelected: false,
        hover: 0
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
      },
      mouseenter (page) {
        this.hover = page
      },
      mouseleave (page) {
        this.hover = 0
      }
    },
    watch: {
      currentPage (newVal, oldValue) {
        this.$emit('current-change', newVal)
      }
    },
    computed: {
      visiblePageArr () {
        let arr =[]
        for(let i=0; i<this._totalPage; i++){
          arr.push(i+1)
        }
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
      drap.ondragstart = function(e){
        return false;
      }
      drap.onclick = e => e.stopPropagation()

    }
  }
</script>

<style scoped lang="less">
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
        top: 8px;
        right: 10px;
        width: 12px;
        height: 12px;
        font-size: 12px;
        color: #333;
        transition: all .4s;
        z-index:101;
      }
      ul {
        position: relative;
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
          &.hover {
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
    .ms-zoom-in-top-enter-active,
    .ms-zoom-in-top-leave-active {
      opacity: 1;
      -ms-transform: scaleY(1);
      transform: scaleY(1);
      transition: transform .3s cubic-bezier(.23, 1, .32, 1) .1s, opacity .3s cubic-bezier(.23, 1, .32, 1) .1s;
      -ms-transform-origin: center top;
      transform-origin: center top;
      z-index: 110;
    }

    .ms-zoom-in-top-enter,
    .ms-zoom-in-top-leave-active {
      opacity: 0;
      -ms-transform: scaleY(0);
      transform: scaleY(0);
    }
  }
</style>
