import { describe, expect, it } from 'vitest'
import { h } from 'docuejs'
import { mount } from '../src'
// import Hello from './components/Hello.docue'

describe('attributes', () => {
  it('returns an object with attributes', () => {
    const value = 'value'
    const component = {
      render() {
        return h('div', { attribute: value })
      }
    }
    const wrapper = mount(component)
    expect(wrapper.attributes()).toEqual({ attribute: value })
  })

  it('returns empty object if wrapper does not contain any attributes', () => {
    const component = {
      render() {
        return h('div', 'text')
      }
    }
    const wrapper = mount(component)
    expect(wrapper.attributes()).toEqual({})
  })

  it('returns the given attribute if wrapper contains attribute matching value', () => {
    const value = 'value'
    const component = {
      render() {
        return h('div', { attribute: value })
      }
    }
    const wrapper = mount(component)
    expect(wrapper.attributes('attribute')).toEqual(value)
  })

  it('returns undefined if the wrapper does not contain the matching value', () => {
    const value = 'value'
    const component = {
      render() {
        return h('div', { attribute: value })
      }
    }
    const wrapper = mount(component)
    expect(wrapper.attributes('fake')).toEqual(undefined)
  })

  // it('returns attributes on a stubbed component', () => {
  //   const Component = {
  //     template: '<hello class="hello-outside" data-testid="hello" disabled />',
  //     components: { Hello }
  //   }

  //   const wrapper = mount(Component, {
  //     global: {
  //       stubs: ['Hello']
  //     }
  //   })

  //   expect(wrapper.findComponent('.hello-outside').attributes()).toEqual({
  //     class: 'hello-outside',
  //     'data-testid': 'hello',
  //     disabled: ''
  //   })
  // })
})
