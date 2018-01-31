import VueSimplePagination from '../../src'
import { createLocalVue, mount } from '@vue/test-utils'

describe('猛男启动!', () => {
    const localVue = createLocalVue()
    const testComponent = {
        template: `<ms-pagination theme="default" :total-page="100" />`
    }
    it('Install!', () => {
        localVue.use(VueSimplePagination)
        const wrapper = mount(testComponent, { localVue })
        expect(wrapper.find({ name: 'ms-pagination' }).exists()).toBe(true)
    })
})
