import { PluginFunc } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  interface Dayex {
    week(): number

    week(value : number): Dayex
  }
}
