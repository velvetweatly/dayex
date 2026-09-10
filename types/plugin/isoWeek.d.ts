import { PluginFunc, OpUnitType, ConfigType } from 'dayex'

declare const plugin: PluginFunc
export = plugin

type ISOUnitType = OpUnitType | 'isoWeek';

declare module 'dayex' {
  interface Dayex {
    isoWeekYear(): number
    isoWeek(): number
    isoWeek(value: number): Dayex

    isoWeekday(): number
    isoWeekday(value: number): Dayex

    startOf(unit: ISOUnitType): Dayex

    endOf(unit: ISOUnitType): Dayex

    isSame(date?: ConfigType, unit?: ISOUnitType): boolean

    isBefore(date?: ConfigType, unit?: ISOUnitType): boolean

    isAfter(date?: ConfigType, unit?: ISOUnitType): boolean
  }
}
