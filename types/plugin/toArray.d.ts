import { PluginFunc } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  interface Dayex {
    toArray(): number[]
  }
}
