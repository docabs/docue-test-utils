import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'docuejs'

import { mount } from '../src'

const nestedTemplate =
  '<div><div class="element"><span>Text 1</span></div><div>Text 2</div></div>'
const NestedNodes = defineComponent({
  template: nestedTemplate
})

describe('html', () => {
  it('returns html when mounting single root node', () => {
    const Component = defineComponent({
      render() {
        return h('div', {}, 'Text content')
      }
    })

    const wrapper = mount(Component)

    expect(wrapper.html()).toBe('<div>Text content</div>')
  })

  it('returns formatted html string', () => {
    const wrapper = mount(NestedNodes)

    expect(wrapper.html()).toBe(
      '<div>\n' +
        '  <div class="element"><span>Text 1</span></div>\n' +
        '  <div>Text 2</div>\n' +
        '</div>'
    )
    expect(wrapper.html()).toBe(
      '<div>\n' +
        '  <div class="element"><span>Text 1</span></div>\n' +
        '  <div>Text 2</div>\n' +
        '</div>'
    )
  })

  it('returns raw html string', () => {
    const wrapper = mount(NestedNodes)

    expect(wrapper.html({ raw: true })).toBe(nestedTemplate)
  })

  describe('multiple root components', () => {
    const originalTemplate = [
      '<div>foo</div>',
      '<!-- comment node -->',
      'some text',
      '<div>bar</div>',
      '<div>baz</div>'
    ]

    const Component = defineComponent({
      name: 'TemplateComponent',
      template: originalTemplate.join('')
    })

    it('returns the html when mounting multiple root nodes', () => {
      const wrapper = mount(Component)
      expect(wrapper.html()).toBe(originalTemplate.join('\n'))
    })

    it('returns the raw html when mounting multiple root nodes', () => {
      const wrapper = mount(Component)
      expect(wrapper.html({ raw: true })).toBe(originalTemplate.join(''))
    })

    // it('returns the html when multiple root component is located inside other component', () => {
    //   const ParentComponent = defineComponent({
    //     components: { MultipleRoots: Component },
    //     template: '<div>parent <multiple-roots /></div>'
    //   })
    //   const wrapper = mount(ParentComponent)
    //   expect(wrapper.findComponent(Component).html()).toBe(
    //     originalTemplate.join('\n')
    //   )
    // })
  })

  it('returns the html when mounting a Suspense component', () => {
    const Foo = {
      template: '<div class="Foo">FOO</div>',
      setup() {
        return {}
      }
    }
    const Component = {
      template: `
        <Suspense>
          <template #default>
            <Foo />
          </template>

          <template #fallback>
            Fallback
          </template>
        </Suspense>`,
      components: { Foo }
    }
    const wrapper = mount(Component)
    expect(wrapper.html()).toEqual('<div class="Foo">FOO</div>')
  })

  // it('returns the html with findComponent in a nested Suspense component', () => {
  //   const Foo = defineComponent({
  //     template: '<div class="Foo">FOO</div>',
  //     setup() {
  //       return {}
  //     }
  //   })
  //   const Component = {
  //     template: `
  //     <div>
  //       <span>
  //         <Suspense>
  //           <template #default>
  //             <Foo />
  //           </template>

  //           <template #fallback>
  //             Fallback
  //           </template>
  //         </Suspense>
  //       </span>
  //     </div>`,
  //     components: { Foo }
  //   }
  //   const wrapper = mount(Component)
  //   const foo = wrapper.findComponent(Foo)
  //   expect(foo.html()).toEqual('<div class="Foo">FOO</div>')
  // })

  // it('get component from within root fragments', () => {
  //   const RegularComponent = {
  //     name: 'RegularComponent',
  //     template: '<span>hello world</span>'
  //   }
  //   const ComponentWithRootFragments = {
  //     name: 'ComponentWithRootFragments',
  //     template: '<regular-component /><div>bye bye</div>',
  //     components: { RegularComponent }
  //   }
  //   const wrapper = mount(ComponentWithRootFragments)
  //   const regular = wrapper.getComponent(RegularComponent)

  //   expect(regular.vm.$options.name).toBe('RegularComponent')
  //   expect(regular.html()).toMatchInlineSnapshot(`"<span>hello world</span>"`)
  // })
})
