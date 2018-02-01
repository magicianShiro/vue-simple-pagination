import { shallow } from '@vue/test-utils'
import SelectPagination from '@/pagination/SelectPagination'

/* eslint-disable no-undef */
describe('SelectPagination.vue', () => {
  let propsData = {
    theme: 'select'
  }
  it.skip('缺少必要参数', () => {
    function missArgs () {
      shallow(SelectPagination, { propsData })
    }

    expect(missArgs).toThrow('参数不正确')
  })

  propsData = Object.assign(propsData, {
    page: 3,
    totalPage: 100,
    visiblePages: 10
  })

  const wrapper = shallow(SelectPagination, { propsData })
  const prevBtn = wrapper.find('.prevBtn')
  const nextBtn = wrapper.find('.nextBtn')
  const active = wrapper.find('li.active')

  it('基本元素的渲染', () => {
    expect(
      prevBtn.exists() &&
      nextBtn.exists() &&
      active.exists()
    ).toBe(true)

    expect(wrapper.findAll('li').length).toEqual(100)
    expect(wrapper.vm.currentPage).toEqual(3)
  })

  it('跳转及事件', () => {
    prevBtn.trigger('click')
    expect(wrapper.vm.currentPage).toEqual(2)

    nextBtn.trigger('click')
    expect(wrapper.vm.currentPage).toEqual(3)

    wrapper.findAll('li').at(9).trigger('click')
    expect(wrapper.vm.currentPage).toEqual(10)

    wrapper.findAll('li').at(0).trigger('click')
    prevBtn.trigger('click')
    expect(wrapper.vm.currentPage).toEqual(1)

    wrapper.findAll('li').at(99).trigger('click')
    nextBtn.trigger('click')
    expect(wrapper.vm.currentPage).toEqual(100)

    expect(wrapper.emitted()).toEqual({
      'current-change': [[2], [3], [10], [1], [100]]
    })

    wrapper.findAll('li').at(9).trigger('mouseenter')
    expect(wrapper.vm.hover).toEqual(10)

    wrapper.findAll('li').at(9).trigger('mouseleave')
    expect(wrapper.vm.hover).toEqual(0)
  })

  it('特殊情况处理', () => {
    wrapper.setProps({
      page: 1,
      totalPage: 8
    })
    expect(wrapper.vm.pageSizeList.height).toEqual(8 * 30 + 7 + 'px')
  })
})
