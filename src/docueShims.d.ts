declare module '*.docue' {
  // TODO: Figure out the typing for this
  import type { DefineComponent } from 'docuejs'
  const component: DefineComponent
  export default component
}
