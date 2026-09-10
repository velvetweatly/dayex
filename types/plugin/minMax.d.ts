import { PluginFunc } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  export function max(dayex: [Dayex, ...Dayex[]]): Dayex
  export function max(noDates: never[]): null
  export function max(maybeDates: Dayex[]): Dayex | null

  export function max(...dayex: [Dayex, ...Dayex[]]): Dayex
  export function max(...noDates: never[]): null
  export function max(...maybeDates: Dayex[]): Dayex | null

  export function min(dayex: [Dayex, ...Dayex[]]): Dayex
  export function min(noDates: never[]): null
  export function min(maybeDates: Dayex[]): Dayex | null

  export function min(...dayex: [Dayex, ...Dayex[]]): Dayex
  export function min(...noDates: never[]): null
  export function min(...maybeDates: Dayex[]): Dayex | null
}
