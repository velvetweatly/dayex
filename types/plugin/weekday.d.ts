import { PluginFunc } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  interface Dayex {
    weekday(): number

    weekday(value: number): Dayex
  }
}
