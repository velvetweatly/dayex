import { PluginFunc, ConfigType, OpUnitType } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  interface Dayex {
    isSameOrAfter(date?: ConfigType, unit?: OpUnitType): boolean
  }
}
