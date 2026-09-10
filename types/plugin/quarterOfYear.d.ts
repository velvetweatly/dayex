import { PluginFunc, ConfigType, QUnitType, OpUnitType } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  interface Dayex {
    quarter(): number

    quarter(quarter: number): Dayex

    add(value: number, unit: QUnitType): Dayex

    subtract(value: number, unit: QUnitType): Dayex

    startOf(unit: QUnitType | OpUnitType): Dayex

    endOf(unit: QUnitType | OpUnitType): Dayex

    isSame(date?: ConfigType, unit?: QUnitType): boolean

    isBefore(date?: ConfigType, unit?: QUnitType): boolean

    isAfter(date?: ConfigType, unit?: QUnitType): boolean
  }
}
