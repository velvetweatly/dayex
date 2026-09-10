import { PluginFunc, ConfigType } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  interface Dayex {
    calendar(referenceTime?: ConfigType, formats?: object): string
  }
}
