import { Pagination, default as Install } from '../../src'
import { createLocalVue, shallow } from '@vue/test-utils'

describe('猛男启动!', () => {
    const localVue = createLocalVue()
    const name = 'ms-pagination'
    it('Install!', () => {
        localVue.use(Install)
        expect(localVue.sealedOptions.components[name]).toBeTruthy()
        expect(shallow(Pagination).name()).toEqual(name)
    })
})
