import { camelize, capitalize } from './docueShared'

export function matchName(target: string, sourceName: string): boolean {
  const camelized = camelize(target)
  const capitalized = capitalize(camelized)

  return (
    !!sourceName &&
    (sourceName === target ||
      sourceName === camelized ||
      sourceName === capitalized ||
      capitalize(camelize(sourceName)) === capitalized)
  )
}
