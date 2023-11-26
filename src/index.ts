import { DOMWrapper } from './domWrapper'
import { DocueWrapper } from './docueWrapper'
import BaseWrapper from './baseWrapper'
import { mount, shallowMount } from './mount'
// import { renderToString } from './renderToString'
import { MountingOptions } from './types'
// import { RouterLinkStub } from './components/RouterLinkStub'
import { createWrapperError } from './errorWrapper'
import { config } from './config'
import { flushPromises } from './utils/flushPromises'
// import { enableAutoUnmount, disableAutoUnmount } from './utils/autoUnmount'

export {
  mount,
  shallowMount,
  // renderToString,
  // enableAutoUnmount,
  // disableAutoUnmount,
  // RouterLinkStub,
  DocueWrapper,
  DOMWrapper,
  BaseWrapper,
  config,
  flushPromises,
  MountingOptions,
  createWrapperError
}

export type { ComponentMountingOptions } from './mount'
