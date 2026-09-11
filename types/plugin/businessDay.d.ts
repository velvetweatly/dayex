import { PluginFunc, ConfigType, OpUnitType } from 'dayex'

declare const plugin: PluginFunc<plugin.BusinessDayOptions>
export = plugin

declare namespace plugin {
  type BusinessDayDirection = 'next' | 'prev' | 'nearest'

  interface HolidayObject {
    date: string
    name?: string
  }

  type HolidayPredicate = (date: any) => boolean | HolidayObject | void | null

  type HolidayInput = string | Date | HolidayObject | HolidayPredicate

  interface BusinessDayOptions {
    workingWeekdays?: number[]
    holidays?: HolidayInput | HolidayInput[]
    additionalWorkingDays?: HolidayInput | HolidayInput[]
    holidayFormat?: string
    inclusive?: boolean
  }

  interface BusinessDayConfig {
    workingWeekdays: number[]
    holidays: HolidayInput[]
    additionalWorkingDays: HolidayInput[]
    holidayFormat: string
  }

  interface BusinessDayStatic {
    set(opt?: BusinessDayOptions): BusinessDayConfig
    get(): BusinessDayConfig
    addHolidays(holidays: HolidayInput | HolidayInput[]): BusinessDayConfig
    removeHolidays(holidays: HolidayInput | HolidayInput[]): BusinessDayConfig
    reset(): BusinessDayConfig
    days(from: ConfigType, to: ConfigType, opt?: BusinessDayOptions): import('dayex').Dayex[]
    count(from: ConfigType, to: ConfigType, opt?: BusinessDayOptions): number
  }
}

type BusinessDayUnit = OpUnitType | 'businessDay' | 'businessDays' | 'bd'

declare module 'dayex' {
  interface Dayex {
    isBusinessDay(opt?: plugin.BusinessDayOptions): boolean
    isHoliday(opt?: plugin.BusinessDayOptions): boolean
    isWeekend(opt?: plugin.BusinessDayOptions): boolean
    holiday(opt?: plugin.BusinessDayOptions): plugin.HolidayObject | null
    addBusinessDays(n: number, opt?: plugin.BusinessDayOptions): Dayex
    subtractBusinessDays(n: number, opt?: plugin.BusinessDayOptions): Dayex
    nextBusinessDay(opt?: plugin.BusinessDayOptions): Dayex
    prevBusinessDay(opt?: plugin.BusinessDayOptions): Dayex
    toBusinessDay(
      dir?: plugin.BusinessDayDirection | plugin.BusinessDayOptions,
      opt?: plugin.BusinessDayOptions
    ): Dayex
    businessDiff(date?: ConfigType, opt?: plugin.BusinessDayOptions): number
    businessDaysInMonth(opt?: plugin.BusinessDayOptions): number
    businessDaysInYear(opt?: plugin.BusinessDayOptions): number
    firstBusinessDayOfMonth(opt?: plugin.BusinessDayOptions): Dayex
    lastBusinessDayOfMonth(opt?: plugin.BusinessDayOptions): Dayex
    add(value: number, unit?: BusinessDayUnit): Dayex
    subtract(value: number, unit?: BusinessDayUnit): Dayex
    diff(date?: ConfigType, unit?: BusinessDayUnit, float?: boolean): number
  }

  export const businessDay: plugin.BusinessDayStatic
}
