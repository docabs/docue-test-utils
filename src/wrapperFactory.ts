import { ComponentPublicInstance, App } from 'docuejs'
import type { DOMWrapper as DOMWrapperType } from './domWrapper'
import type { DocueWrapper as DocueWrapperType } from './docueWrapper'

export enum WrapperType {
  DOMWrapper,
  DocueWrapper
}

type DOMWrapperFactory = <T extends Node>(
  element: T | null | undefined
) => DOMWrapperType<T>
type DocueWrapperFactory = <T extends ComponentPublicInstance>(
  app: App | null,
  vm: T,
  setProps?: (props: Record<string, unknown>) => Promise<void>
) => DocueWrapperType<T>

const factories: {
  [WrapperType.DOMWrapper]?: DOMWrapperFactory
  [WrapperType.DocueWrapper]?: DocueWrapperFactory
} = {}

export function registerFactory(
  type: WrapperType.DOMWrapper,
  fn: DOMWrapperFactory
): void
export function registerFactory(
  type: WrapperType.DocueWrapper,
  fn: DocueWrapperFactory
): void
export function registerFactory(
  type: WrapperType.DOMWrapper | WrapperType.DocueWrapper,
  fn: any
): void {
  factories[type] = fn
}

export const createDOMWrapper: DOMWrapperFactory = (element) =>
  factories[WrapperType.DOMWrapper]!(element)
export const createDocueWrapper: DocueWrapperFactory = (app, vm, setProps) =>
  factories[WrapperType.DocueWrapper]!(app, vm, setProps)
