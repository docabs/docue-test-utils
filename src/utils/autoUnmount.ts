import { ComponentPublicInstance } from 'docuejs'
import type { DocueWrapper } from '../docueWrapper'

let isEnabled = false
const wrapperInstances: DocueWrapper<ComponentPublicInstance>[] = []

export function disableAutoUnmount() {
  isEnabled = false
  wrapperInstances.length = 0
}

export function enableAutoUnmount(hook: (callback: () => void) => void) {
  if (isEnabled) {
    throw new Error('enableAutoUnmount cannot be called more than once')
  }

  isEnabled = true

  hook(() => {
    wrapperInstances.forEach(
      (wrapper: DocueWrapper<ComponentPublicInstance>) => {
        wrapper.unmount()
      }
    )

    wrapperInstances.length = 0
  })
}

export function trackInstance(wrapper: DocueWrapper<ComponentPublicInstance>) {
  if (!isEnabled) return

  wrapperInstances.push(wrapper)
}
