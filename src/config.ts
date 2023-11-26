import { GlobalMountOptions, Stub } from './types'
import { DocueWrapper } from './docueWrapper'
import { DOMWrapper } from './domWrapper'
import { CustomCreateStub } from './vnodeTransformers/stubComponentsTransformer'

export interface GlobalConfigOptions {
  global: Required<Omit<GlobalMountOptions, 'stubs'>> & {
    stubs: Record<string, Stub>
  }
  plugins: {
    DocueWrapper: Pluggable<DocueWrapper>
    DOMWrapper: Pluggable<DOMWrapper<Node>>
    createStubs?: CustomCreateStub
  }
  /**
   * @deprecated use global.
   */
  renderStubDefaultSlot?: boolean
}

interface Plugin<Instance, O> {
  handler(instance: Instance): Record<string, any>
  handler(instance: Instance, options: O): Record<string, any>
  options: O
}

class Pluggable<Instance = DOMWrapper<Node>> {
  installedPlugins: Plugin<Instance, any>[] = []

  //   install<O>(handler: (instance: Instance) => Record<string, any>): void
  //   install<O>(
  //     handler: (instance: Instance, options: O) => Record<string, any>,
  //     options: O
  //   ): void
  //   install<O>(
  //     handler: (instance: Instance, options?: O) => Record<string, any>,
  //     options?: O
  //   ): void {
  //     if (typeof handler !== 'function') {
  //       console.error('plugin.install must receive a function')
  //       handler = () => ({})
  //     }
  //     this.installedPlugins.push({ handler, options })
  //   }

  extend(instance: Instance) {
    const invokeSetup = ({ handler, options }: Plugin<Instance, any>) => {
      return handler(instance, options) // invoke the setup method passed to install
    }
    //     const bindProperty = ([property, value]: [string, any]) => {
    //       // eslint-disable-next-line no-extra-semi
    //       ;(instance as any)[property] =
    //         typeof value === 'function' ? value.bind(instance) : value
    //     }
    //     const addAllPropertiesFromSetup = (setupResult: Record<string, any>) => {
    //       setupResult = typeof setupResult === 'object' ? setupResult : {}
    //       Object.entries(setupResult).forEach(bindProperty)
    //     }

    //     this.installedPlugins.map(invokeSetup).forEach(addAllPropertiesFromSetup)
  }

  /** For testing */
  reset() {
    this.installedPlugins = []
  }
}

export const config: GlobalConfigOptions = {
  global: {
    stubs: {
      transition: true,
      'transition-group': true
    },
    provide: {},
    // components: {},
    // config: {},
    // directives: {},
    // mixins: [],
    // mocks: {},
    plugins: [],
    renderStubDefaultSlot: false
  },
  plugins: {
    DocueWrapper: new Pluggable(),
    DOMWrapper: new Pluggable()
  }
}
