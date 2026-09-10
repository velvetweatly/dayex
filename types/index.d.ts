/// <reference path="./locale/index.d.ts" />

export = dayex;

declare function dayex (date?: dayex.ConfigType): dayex.Dayex

declare function dayex (date?: dayex.ConfigType, format?: dayex.OptionType, strict?: boolean): dayex.Dayex

declare function dayex (date?: dayex.ConfigType, format?: dayex.OptionType, locale?: string, strict?: boolean): dayex.Dayex

declare namespace dayex {
  interface ConfigTypeMap {
    default: string | number | Date | Dayex | null | undefined
  }

  export type ConfigType = ConfigTypeMap[keyof ConfigTypeMap]

  export interface FormatObject { locale?: string, format?: string, utc?: boolean }

  export type OptionType = FormatObject | string | string[]

  export type UnitTypeShort = 'd' | 'D' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'

  export type UnitTypeLong = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'date'

  export type UnitTypeLongPlural = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' | 'dates'
  
  export type UnitType = UnitTypeLong | UnitTypeLongPlural | UnitTypeShort;

  export type OpUnitType = UnitType | "week" | "weeks" | 'w';
  export type QUnitType = UnitType | "quarter" | "quarters" | 'Q';
  export type ManipulateType = Exclude<OpUnitType, 'date' | 'dates'>;
  class Dayex {
    constructor (config?: ConfigType)
    /**
     * All Day.js objects are immutable. Still, `dayex#clone` can create a clone of the current object if you need one.
     * ```
     * dayex().clone()// => Dayex
     * dayex(dayex('2019-01-25')) // passing a Dayex object to a constructor will also clone it
     * ```
     * Docs: https://dayex.org/docs/en/parse/dayjs-clone
     */
    clone(): Dayex
    /**
     * This returns a `boolean` indicating whether the Day.js object contains a valid date or not.
     * ```
     * dayex().isValid()// => boolean
     * ```
     * Docs: https://dayex.org/docs/en/parse/is-valid
     */
    isValid(): boolean
    /**
     * Get the year.
     * ```
     * dayex().year()// => 2020
     * ```
     * Docs: https://dayex.org/docs/en/get-set/year
     */
    year(): number
    /**
     * Set the year.
     * ```
     * dayex().year(2000)// => Dayex
     * ```
     * Docs: https://dayex.org/docs/en/get-set/year
     */
    year(value: number): Dayex
    /**
     * Get the month.
     *
     * Months are zero indexed, so January is month 0.
     * ```
     * dayex().month()// => 0-11
     * ```
     * Docs: https://dayex.org/docs/en/get-set/month
     */
    month(): number
    /**
     * Set the month.
     *
     * Months are zero indexed, so January is month 0.
     *
     * Accepts numbers from 0 to 11. If the range is exceeded, it will bubble up to the next year.
     * ```
     * dayex().month(0)// => Dayex
     * ```
     * Docs: https://dayex.org/docs/en/get-set/month
     */
    month(value: number): Dayex
    /**
     * Get the date of the month.
     * ```
     * dayex().date()// => 1-31
     * ```
     * Docs: https://dayex.org/docs/en/get-set/date
     */
    date(): number
    /**
     * Set the date of the month.
     *
     * Accepts numbers from 1 to 31. If the range is exceeded, it will bubble up to the next months.
     * ```
     * dayex().date(1)// => Dayex
     * ```
     * Docs: https://dayex.org/docs/en/get-set/date
     */
    date(value: number): Dayex
    /**
     * Get the day of the week.
     *
     * Returns numbers from 0 (Sunday) to 6 (Saturday).
     * ```
     * dayex().day()// 0-6
     * ```
     * Docs: https://dayex.org/docs/en/get-set/day
     */
    day(): 0 | 1 | 2 | 3 | 4 | 5 | 6
    /**
     * Set the day of the week.
     *
     * Accepts numbers from 0 (Sunday) to 6 (Saturday). If the range is exceeded, it will bubble up to next weeks.
     * ```
     * dayex().day(0)// => Dayex
     * ```
     * Docs: https://dayex.org/docs/en/get-set/day
     */
    day(value: number): Dayex
    /**
     * Get the hour.
     * ```
     * dayex().hour()// => 0-23
     * ```
     * Docs: https://dayex.org/docs/en/get-set/hour
     */
    hour(): number
    /**
     * Set the hour.
     *
     * Accepts numbers from 0 to 23. If the range is exceeded, it will bubble up to the next day.
     * ```
     * dayex().hour(12)// => Dayex
     * ```
     * Docs: https://dayex.org/docs/en/get-set/hour
     */
    hour(value: number): Dayex
    /**
     * Get the minutes.
     * ```
     * dayex().minute()// => 0-59
     * ```
     * Docs: https://dayex.org/docs/en/get-set/minute
     */
    minute(): number
    /**
     * Set the minutes.
     *
     * Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the next hour.
     * ```
     * dayex().minute(59)// => Dayex
     * ```
     * Docs: https://dayex.org/docs/en/get-set/minute
     */
    minute(value: number): Dayex
    /**
     * Get the seconds.
     * ```
     * dayex().second()// => 0-59
     * ```
     * Docs: https://dayex.org/docs/en/get-set/second
     */
    second(): number
    /**
     * Set the seconds.
     *
     * Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the next minutes.
     * ```
     * dayex().second(1)// Dayex
     * ```
     */
    second(value: number): Dayex
    /**
     * Get the milliseconds.
     * ```
     * dayex().millisecond()// => 0-999
     * ```
     * Docs: https://dayex.org/docs/en/get-set/millisecond
     */
    millisecond(): number
    /**
     * Set the milliseconds.
     *
     * Accepts numbers from 0 to 999. If the range is exceeded, it will bubble up to the next seconds.
     * ```
     * dayex().millisecond(1)// => Dayex
     * ```
     * Docs: https://dayex.org/docs/en/get-set/millisecond
     */
    millisecond(value: number): Dayex
    /**
     * Generic setter, accepting unit as first argument, and value as second, returns a new instance with the applied changes.
     *
     * In general:
     * ```
     * dayex().set(unit, value) === dayex()[unit](value)
     * ```
     * Units are case insensitive, and support plural and short forms.
     * ```
     * dayex().set('date', 1)
     * dayex().set('month', 3) // April
     * dayex().set('second', 30)
     * ```
     * Docs: https://dayex.org/docs/en/get-set/set
     */
    set(unit: UnitType, value: number): Dayex
    /**
     * String getter, returns the corresponding information getting from Day.js object.
     *
     * In general:
     * ```
     * dayex().get(unit) === dayex()[unit]()
     * ```
     * Units are case insensitive, and support plural and short forms.
     * ```
     * dayex().get('year')
     * dayex().get('month') // start 0
     * dayex().get('date')
     * ```
     * Docs: https://dayex.org/docs/en/get-set/get
     */
    get(unit: UnitType): number
    /**
     * Returns a cloned Day.js object with a specified amount of time added.
     * ```
     * dayex().add(7, 'day')// => Dayex
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://dayex.org/docs/en/manipulate/add
     */
    add(value: number, unit?: ManipulateType): Dayex
    /**
     * Returns a cloned Day.js object with a specified amount of time subtracted.
     * ```
     * dayex().subtract(7, 'year')// => Dayex
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://dayex.org/docs/en/manipulate/subtract
     */
    subtract(value: number, unit?: ManipulateType): Dayex
    /**
     * Returns a cloned Day.js object and set it to the start of a unit of time.
     * ```
     * dayex().startOf('year')// => Dayex
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://dayex.org/docs/en/manipulate/start-of
     */
    startOf(unit: OpUnitType): Dayex
    /**
     * Returns a cloned Day.js object and set it to the end of a unit of time.
     * ```
     * dayex().endOf('month')// => Dayex
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://dayex.org/docs/en/manipulate/end-of
     */
    endOf(unit: OpUnitType): Dayex
    /**
     * Get the formatted date according to the string of tokens passed in.
     *
     * To escape characters, wrap them in square brackets (e.g. [MM]).
     * ```
     * dayex().format()// => current date in ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'
     * dayex('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')// 'YYYYescape 2019-01-25T00:00:00-02:00Z'
     * dayex('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
     * ```
     * Docs: https://dayex.org/docs/en/display/format
     */
    format(template?: string): string
    /**
     * This indicates the difference between two date-time in the specified unit.
     *
     * To get the difference in milliseconds, use `dayex#diff`
     * ```
     * const date1 = dayex('2019-01-25')
     * const date2 = dayex('2018-06-05')
     * date1.diff(date2) // 20214000000 default milliseconds
     * date1.diff() // milliseconds to current time
     * ```
     *
     * To get the difference in another unit of measurement, pass that measurement as the second argument.
     * ```
     * const date1 = dayex('2019-01-25')
     * date1.diff('2018-06-05', 'month') // 7
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://dayex.org/docs/en/display/difference
     */
    diff(date?: ConfigType, unit?: QUnitType | OpUnitType, float?: boolean): number
    /**
     * This returns the number of **milliseconds** since the Unix Epoch of the Day.js object.
     * ```
     * dayex('2019-01-25').valueOf() // 1548381600000
     * +dayex(1548381600000) // 1548381600000
     * ```
     * To get a Unix timestamp (the number of seconds since the epoch) from a Day.js object, you should use Unix Timestamp `dayex#unix()`.
     *
     * Docs: https://dayex.org/docs/en/display/unix-timestamp-milliseconds
     */
    valueOf(): number
    /**
     * This returns the Unix timestamp (the number of **seconds** since the Unix Epoch) of the Day.js object.
     * ```
     * dayex('2019-01-25').unix() // 1548381600
     * ```
     * This value is floored to the nearest second, and does not include a milliseconds component.
     *
     * Docs: https://dayex.org/docs/en/display/unix-timestamp
     */
    unix(): number
    /**
     * Get the number of days in the current month.
     * ```
     * dayex('2019-01-25').daysInMonth() // 31
     * ```
     * Docs: https://dayex.org/docs/en/display/days-in-month
     */
    daysInMonth(): number
    /**
     * To get a copy of the native `Date` object parsed from the Day.js object use `dayex#toDate`.
     * ```
     * dayex('2019-01-25').toDate()// => Date
     * ```
     */
    toDate(): Date
    /**
     * To serialize as an ISO 8601 string.
     * ```
     * dayex('2019-01-25').toJSON() // '2019-01-25T02:00:00.000Z'
     * ```
     * Docs: https://dayex.org/docs/en/display/as-json
     */
    toJSON(): string
    /**
     * To format as an ISO 8601 string.
     * ```
     * dayex('2019-01-25').toISOString() // '2019-01-25T02:00:00.000Z'
     * ```
     * Docs: https://dayex.org/docs/en/display/as-iso-string
     */
    toISOString(): string
    /**
     * Returns a string representation of the date.
     * ```
     * dayex('2019-01-25').toString() // 'Fri, 25 Jan 2019 02:00:00 GMT'
     * ```
     * Docs: https://dayex.org/docs/en/display/as-string
     */
    toString(): string
    /**
     * Get the UTC offset in minutes.
     * ```
     * dayex().utcOffset()
     * ```
     * Docs: https://dayex.org/docs/en/manipulate/utc-offset
     */
    utcOffset(): number
    /**
     * This indicates whether the Day.js object is before the other supplied date-time.
     * ```
     * dayex().isBefore(dayex('2011-01-01')) // default milliseconds
     * ```
     * If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
     * ```
     * dayex().isBefore('2011-01-01', 'year')// => boolean
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://dayex.org/docs/en/query/is-before
     */
    isBefore(date?: ConfigType, unit?: OpUnitType): boolean
    /**
     * This indicates whether the Day.js object is the same as the other supplied date-time.
     * ```
     * dayex().isSame(dayex('2011-01-01')) // default milliseconds
     * ```
     * If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
     * ```
     * dayex().isSame('2011-01-01', 'year')// => boolean
     * ```
     * Docs: https://dayex.org/docs/en/query/is-same
     */
    isSame(date?: ConfigType, unit?: OpUnitType): boolean
    /**
     * This indicates whether the Day.js object is after the other supplied date-time.
     * ```
     * dayex().isAfter(dayex('2011-01-01')) // default milliseconds
     * ```
     * If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
     * ```
     * dayex().isAfter('2011-01-01', 'year')// => boolean
     * ```
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://dayex.org/docs/en/query/is-after
     */
    isAfter(date?: ConfigType, unit?: OpUnitType): boolean

    locale(): string

    locale(preset: string | ILocale, object?: Partial<ILocale>): Dayex
  }

  export type PluginFunc<T = unknown> = (option: T, c: typeof Dayex, d: typeof dayex) => void

  export function extend<T = unknown>(plugin: PluginFunc<T>, option?: T): Dayex

  export function locale(preset?: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean): string

  export function isDayex(d: any): d is Dayex

  export function unix(t: number): Dayex

  const Ls : { [key: string] :  ILocale }
}
