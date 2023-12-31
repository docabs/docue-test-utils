export function createWrapperError<T extends object>(
  wrapperType: 'DOMWrapper' | 'DocueWrapper'
) {
  return new Proxy<T>(Object.create(null), {
    get(obj, prop) {
      switch (prop) {
        case 'then':
          // allows for better errors when wrapping `find` in `await`
          // https://github.com/vuejs/test-utils/issues/638
          return
        case 'exists':
          return () => false
        default:
          throw new Error(
            `Cannot call ${String(prop)} on an empty ${wrapperType}.`
          )
      }
    }
  })
}
