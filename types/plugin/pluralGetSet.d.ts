import { PluginFunc, UnitType, ConfigType } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  interface Dayex {
    years(): number

    years(value: number): Dayex

    months(): number

    months(value: number): Dayex

    dates(): number

    dates(value: number): Dayex

    weeks(): number

    weeks(value: number): Dayex

    days(): number

    days(value: number): Dayex

    hours(): number

    hours(value: number): Dayex

    minutes(): number

    minutes(value: number): Dayex

    seconds(): number

    seconds(value: number): Dayex

    milliseconds(): number

    milliseconds(value: number): Dayex
  }
}
