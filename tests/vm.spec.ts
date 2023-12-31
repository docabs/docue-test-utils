import { describe, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'docuejs'
import { mount } from '../src'

describe('vm', () => {
  it('returns the component vm', () => {
    const Component = defineComponent({
      name: 'DTUComponent',
      template: '<div>{{ msg }}</div>',
      setup() {
        const msg = 'hello'
        const isEnabled = ref(true)
        const toggle = () => (isEnabled.value = !isEnabled.value)
        return { msg, isEnabled, toggle }
      }
    })

    const wrapper = mount(Component)

    expect(wrapper.vm.msg).toBe('hello')
    expect(wrapper.vm.isEnabled).toBe(true)

    wrapper.vm.toggle()

    expect(wrapper.vm.isEnabled).toBe(false)
  })

  it('allows spying on vm', async () => {
    const Component = defineComponent({
      name: 'DTUComponent',
      template: '<div @click="toggle()">{{ msg }}</div>',
      setup() {
        const msg = 'hello'
        const isEnabled = ref(true)
        const toggle = () => (isEnabled.value = !isEnabled.value)
        return { msg, isEnabled, toggle }
      }
    })

    const wrapper = mount(Component)

    vi.spyOn(wrapper.vm, 'toggle')

    await wrapper.get('div').trigger('click')

    expect(wrapper.vm.toggle).toHaveBeenCalled()
  })
})
