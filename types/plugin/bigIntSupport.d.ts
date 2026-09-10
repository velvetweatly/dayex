import { PluginFunc } from 'dayex'

declare module 'dayex' {
  interface ConfigTypeMap {
    bigIntSupport: BigInt
  }
  export function unix(t: BigInt): Dayex
}

declare const plugin: PluginFunc
export = plugin
