import {shallow} from '@vue/test-utils'
import DefaultPagination from '@/pagination/DefaultPagination'


describe('DefaultPagination.vue', () => {
    it.skip('缺少必要参数', () => {
        function missArgs() {
            shallow(DefaultPagination)
        }

        expect(missArgs).toThrow('参数不正确')
    })

    describe('普通模式', () => {
        const propsData = {
            page: 3,
            basePage: 5,
            totalPage: 100,
            visiblePages: 10
        }
        const wrapper = shallow(DefaultPagination, {propsData})
        const firstBtn = wrapper.find('.firstBtn')
        const prevBtn = wrapper.find('.prevBtn')
        const nextBtn = wrapper.find('.nextBtn')
        const lastBtn = wrapper.find('.lastBtn')
        const active = wrapper.find('li.active')

        it('基本元素的渲染', () => {
            expect(
                firstBtn.exists() &&
                prevBtn.exists() &&
                nextBtn.exists() &&
                lastBtn.exists() &&
                active.exists()
            ).toBe(true)

            expect(wrapper.findAll('li').length).toEqual(10)
            expect(wrapper.vm.currentPage).toEqual(3)
        })
        it('跳转及事件', () => {
            active.trigger('click')
            expect(wrapper.emitted()).toEqual({})

            prevBtn.trigger('click')
            expect(wrapper.vm.currentPage).toEqual(2)

            nextBtn.trigger('click')
            expect(wrapper.vm.currentPage).toEqual(3)

            firstBtn.trigger('click')
            prevBtn.trigger('click')
            expect(wrapper.vm.currentPage).toEqual(1)

            wrapper.findAll('li').at(9).trigger('click')
            expect(wrapper.vm.currentPage).toEqual(10)

            lastBtn.trigger('click')
            nextBtn.trigger('click')
            expect(wrapper.vm.currentPage).toEqual(100)

            wrapper.findAll('li').at(0).trigger('click')
            expect(wrapper.vm.currentPage).toEqual(91)

            expect(wrapper.emitted()).toEqual({
                "current-change": [
                    [2],
                    [3],
                    [1],
                    [10],
                    [100],
                    [91]
                ]
            })
        })
        it('特殊情况处理', () => {
            wrapper.setProps({
                page: 1,
                totalPage: 8
            })
            expect(wrapper.findAll('li').length).toEqual(8)
        })
    })

    describe('Fast模式', () => {
        const propsData = {
            page: 1,
            basePage: 5,
            totalPage: 100,
            fastStep:10,
            visiblePages: 10,
            fast: true
        }
        const wrapper = shallow(DefaultPagination, {propsData})
        const firstBtn = wrapper.find('.firstBtn')
        const lastBtn = wrapper.find('.lastBtn')

        it('忽略first next', () => {
            expect(firstBtn.exists() || lastBtn.exists()).toBe(false)
        })
        it('fast jump', () => {
            const triggetAt = index => wrapper.findAll('li').at(index).trigger('click')
            expect(wrapper.vm.currentPage).toEqual(1)

            triggetAt(10)
            expect(wrapper.vm.currentPage).toEqual(11)

            triggetAt(13)
            expect(wrapper.vm.currentPage).toEqual(100)

            triggetAt(2)
            triggetAt(12)
            expect(wrapper.vm.currentPage).toEqual(100)

            triggetAt(1)
            expect(wrapper.vm.currentPage).toEqual(90)

            triggetAt(0)
            expect(wrapper.vm.currentPage).toEqual(1)

            triggetAt(6)
            triggetAt(1)
            expect(wrapper.vm.currentPage).toEqual(1)

        })
    })

});
