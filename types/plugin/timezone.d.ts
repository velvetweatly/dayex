import { PluginFunc, ConfigType } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  interface Dayex {
    tz(timezone?: string, keepLocalTime?: boolean): Dayex
    offsetName(type?: 'short' | 'long'): string | undefined
  }

  interface DayexTimezone {
    (date?: ConfigType, timezone?: string): Dayex
    (date: ConfigType, format: string, timezone?: string): Dayex
    guess(): string
    setDefault(timezone?: string): void
  }

  const tz: DayexTimezone
}
