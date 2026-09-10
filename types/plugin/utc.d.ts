import { PluginFunc, ConfigType } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  interface Dayex {
    
    utc(keepLocalTime?: boolean): Dayex
    
    local(): Dayex

    isUTC(): boolean

    utcOffset(offset: number | string, keepLocalTime?: boolean): Dayex
  }

  export function utc(config?: ConfigType, format?: string, strict?: boolean): Dayex
}
