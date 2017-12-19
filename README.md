# 开始

## 安装

 `npm i --save ms-vue-simple-pagination`

## 初始化

  ``` javascript
import Vue form 'vue'
import Pagination from 'ms-vue-simple-pagination'
    
Vue.use(Pagination)
  ```

## 使用

  ``` vue
<template>
	<ms-pagination :totalPage="100"></ms-pagination>
</template>
  ```



##  属性	

| 参数           | 说明                               | 类型      | 可选值                    | 默认值                    |
| ------------ | -------------------------------- | ------- | ---------------------- | ---------------------- |
| theme        | 主题                               | String  | default/select         | default                |
| page         | 当前的页数                            | Number  |                        | 1                      |
| basePage     | 从第几页开始页码不从第一页显示                  | Number  |                        | 4                      |
| totalPage    | 总页数(传了此参数,不用传pageSize&pageCount) | Number  |                        |                        |
| pageSize     | 一页显示多少条数据(必须配合pageCount)         | Number  |                        |                        |
| pageCount    | 一共多少条数据(必须配合pageSize)            | Number  |                        |                        |
| visiblePages | 插件上显示多少个页码                       | Number  |                        | 5                      |
| fast         | 是否开启快进模式                         | Boolean | true/false             | true                   |
| fastStep     | 快进的页数                            | Number  |                        | 5                      |
| btnText      | 按钮的文字内容                          | Object  | {first,prev,next,last} | {first,prev,next,last} |



## 事件

| 事件名称           | 说明                | 回调参数            |
| -------------- | ----------------- | --------------- |
| current-change | currentPage改变时会触发 | 当前页 currentPage |

