import * as Docue from 'docuejs'
import type { ComponentOptions } from 'docuejs'
import { hasOwnProperty } from '../utils'

function isCompatEnabled(key: string): boolean {
  return (Docue as any).compatUtils?.isCompatEnabled(key) ?? false
}

export function isLegacyExtendedComponent(component: unknown): component is {
  (): Function
  super: Function
  options: ComponentOptions
} {
  if (!isCompatEnabled('GLOBAL_EXTEND') || typeof component !== 'function') {
    return false
  }

  return (
    hasOwnProperty(component, 'super') &&
    (component.super as any).extend({}).super === component.super
  )
}

export function unwrapLegacyDocueExtendComponent<T>(
  selector: T
): T | ComponentOptions {
  return isLegacyExtendedComponent(selector) ? selector.options : selector
}

export function isLegacyFunctionalComponent(component: unknown): boolean {
  return Boolean(
    component &&
      typeof component === 'object' &&
      hasOwnProperty(component, 'functional') &&
      component.functional
  )
}
