import { PluginFunc } from 'dayex'

declare const plugin: PluginFunc
export = plugin

interface DayexObject {
  years: number
  months: number
  date: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

declare module 'dayex' {
  interface Dayex {
    toObject(): DayexObject
  }
}
