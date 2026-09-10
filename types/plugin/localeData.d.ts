import { PluginFunc } from 'dayex'

declare const plugin: PluginFunc
export = plugin

declare module 'dayex' {
  type WeekdayNames = [string, string, string, string, string, string, string];
  type MonthNames = [string, string, string, string, string, string, string, string, string, string, string, string];

  interface InstanceLocaleDataReturn {
    firstDayOfWeek(): number;
    weekdays(instance?: Dayex): WeekdayNames;
    weekdaysShort(instance?: Dayex): WeekdayNames;
    weekdaysMin(instance?: Dayex): WeekdayNames;
    months(instance?: Dayex): MonthNames;
    monthsShort(instance?: Dayex): MonthNames;
    longDateFormat(format: string): string;
    meridiem(hour?: number, minute?: number, isLower?: boolean): string;
    ordinal(n: number): string
  }

  interface GlobalLocaleDataReturn {
    firstDayOfWeek(): number;
    weekdays(): WeekdayNames;
    weekdaysShort(): WeekdayNames;
    weekdaysMin(): WeekdayNames;
    months(): MonthNames;
    monthsShort(): MonthNames;
    longDateFormat(format: string): string;
    meridiem(hour?: number, minute?: number, isLower?: boolean): string;
    ordinal(n: number): string
  }

  interface Dayex {
    localeData(): InstanceLocaleDataReturn;
  }

  export function weekdays(localOrder?: boolean): WeekdayNames;
  export function weekdaysShort(localOrder?: boolean): WeekdayNames;
  export function weekdaysMin(localOrder?: boolean): WeekdayNames;
  export function monthsShort(): MonthNames;
  export function months(): MonthNames;
  export function localeData(): GlobalLocaleDataReturn;
}
