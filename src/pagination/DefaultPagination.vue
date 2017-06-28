<template>
  <div id="clickPagination">
    <div class="lf prev">
      <p
        v-if="!fast"
        class="lf firstBtn"
        :class="{'disabled': currentPage === 1}"
        @click.stop="first_page">{{_btnText.first}}</p>
      <p
        class="lf prevBtn"
        :class="{'disabled': currentPage === 1}"
        @click.stop="prev_page">{{_btnText.prev}}</p>
    </div>
    <ul class="lf">
      <li
        class="lf"
        v-if="pageItem !== 'right' && pageItem !== 'left'"
        :class="{'active': pageItem === currentPage}"
        v-for="(pageItem, index) in visiblePageArr"
        @mouseenter="rightArrow=leftArrow=true"
        @mouseleave="rightArrow=leftArrow=true"
        @click="changePage(pageItem)">
        {{pageItem}}</li>
      <li 
        class="lf" 
        v-else-if="pageItem === 'right'"
        @mouseenter="rightArrow=!rightArrow"
        @mouseleave="rightArrow=!rightArrow"
        @click="fastForward">
          <i 
            class="iconfont"
            :class="[
            {'icon-more': rightArrow},
            {'icon-arrow-right': !rightArrow}
          ]"></i>
      </li>
      <li 
        class="lf" 
        v-else-if="pageItem === 'left'"
        @mouseenter="leftArrow=!leftArrow"
        @mouseleave="leftArrow=!leftArrow"
        @click="fastBackward">
          <i
            class="iconfont"
            :class="[
            {'icon-more': leftArrow},
            {'icon-arrow-left': !leftArrow}
          ]"></i>
      </li>
    </ul>
    <div class="lf next">
      <p
        class="lf nextBtn"
        :class="{'disabled': currentPage === _totalPage}"
        @click.stop="next_page">{{_btnText.next}}</p>
      <p
        v-if="!fast"
        class="lf lastBtn"
        :class="{'disabled': currentPage === _totalPage}"
        @click.stop="last_page">{{_btnText.last}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DefaultPagination',
    props: ['page', 'basePage', 'totalPage', 'pageSize', 'pageCount', 'visiblePages', 'fast', 'fastStep', 'btnText'],
    data () {
      return {
        currentPage: this.page,
        rightArrow: true,
        leftArrow: true
      }
    },
    methods: {
      changePage (page) {
        this.currentPage = page
      },
      prev_page () {
        this.currentPage === 1 ? 1 : this.currentPage--
      },
      first_page () {
        this.currentPage = 1
      },
      next_page () {
        this.currentPage === this._totalPage ? this.currentPage = this._totalPage : this.currentPage++
      },
      last_page (){
        this.currentPage = this._totalPage
      },
      fastForward () {
        let step = this.currentPage + this.fastStep
        if(step > this._totalPage)
          this.leftArrow = this.rightArrow = true
        this.currentPage = step > this._totalPage ? this._totalPage : step
      },
      fastBackward () {
        let step = this.currentPage - this.fastStep
        if(step < 1 )
          this.leftArrow = this.rightArrow = true
        this.currentPage = step < 1 ? 1 : step
      }
    },
    watch: {
      currentPage (newVal, oldValue) {
        this.$emit('current-change', newVal)
      }
    },
    computed: {
      visiblePageArr () {
        let start = this.currentPage - this.basePage <= 0 ? 0 : this.currentPage - this.basePage
        start = start + this.visiblePages > this._totalPage ? this._totalPage - this.visiblePages : start
        let end = start + this.visiblePages > this._totalPage ? this._totalPage : start + this.visiblePages
        let arr = []
        let newArr = []
        for(let i=0; i<this._totalPage; i++){
          arr.push(i+1)
        }
        newArr = arr.slice(start, end)
        
        if(end !== this._totalPage && this.fast){
          newArr.splice(this.visiblePages, 0, "right")
          newArr.splice(this.visiblePages+1, 0 , this._totalPage)
        }
        if(start > 0 && this.fast){
          newArr.splice(0, 0, 'left')
          newArr.splice(0, 0, 1)
        }
        return newArr
      },
      _totalPage () {
        if(this.pageSize && this.pageCount)
          return Math.ceil(this.pageCount / this.pageSize)
        else if (this.totalPage)
          return this.totalPage
        else 
          throw new Error('参数不正确')
      },
      _btnText () {
        return Object.assign({
          first: 'First',
          prev: 'Previous',
          next: 'Next',
          last: 'Last'
        }, this.btnText)
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
        &.active {
          color: #fff;
          background-color: #337ab7;
          border-color: #337ab7;
        }
        // &.rightArrow {
        //   &:hover {
        //     color: #337ab7;
        //     background-color: #fff;
        //     // border-color: #337ab7;
        //   }
        // }
      }
    }
  }
</style>
