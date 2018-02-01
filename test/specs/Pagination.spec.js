import { shallow } from '@vue/test-utils'
import Pagination from '@/pagination/Pagination.vue'

/* eslint-disable no-undef */
describe('Pagination.vue', () => {
  describe('select主题', () => {
    const propsData = {
      theme: 'select'
    }
    const wrapper = shallow(Pagination, { propsData })
    it('组件的渲染', () => {
      expect(wrapper.find({ name: 'SelectPagination' }).exists()).toBe(true)
    })
    it('事件', () => {
      const currentPage = 1
      wrapper.vm.current_change(currentPage)
      expect(wrapper.emitted()['current-change']).toBeTruthy()
      expect(wrapper.emitted()['current-change'].length).toBe(1)
      expect(wrapper.emitted()['current-change'][0]).toEqual([currentPage])
    })
  })

  describe('default主题', () => {
    const propsData = {
      theme: 'default'
    }
    const wrapper = shallow(Pagination, { propsData })
    it('组件的渲染', () => {
      expect(wrapper.find({ name: 'DefaultPagination' }).exists()).toBe(true)
    })
    it('事件', () => {
      const currentPage = 1
      wrapper.vm.current_change(currentPage)
      expect(wrapper.emitted()['current-change']).toBeTruthy()
      expect(wrapper.emitted()['current-change'].length).toBe(1)
      expect(wrapper.emitted()['current-change'][0]).toEqual([currentPage])
    })
  })
})
