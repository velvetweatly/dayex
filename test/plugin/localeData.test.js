import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import '../../src/locale/fr'
import '../../src/locale/ru'
import '../../src/locale/zh-cn'
import localeData from '../../src/plugin/localeData'
import localizedFormat from '../../src/plugin/localizedFormat'

dayex.extend(localizedFormat)
dayex.extend(localeData)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('Instance localeData', () => {
  ['zh-cn', 'en', 'fr'].forEach((lo) => {
    it(`Locale: ${lo}`, () => {
      dayex.locale(lo)
      moment.locale(lo)
      const d = dayex()
      const m = moment()
      const dayjsLocaleData = dayex().localeData()
      const momentLocaleData = moment().localeData()
      expect(dayjsLocaleData.firstDayOfWeek()).toBe(momentLocaleData.firstDayOfWeek())
      expect(dayjsLocaleData.months(d)).toBe(momentLocaleData.months(m))
      expect(dayjsLocaleData.months()).toEqual(momentLocaleData.months())
      expect(dayjsLocaleData.monthsShort(d)).toBe(momentLocaleData.monthsShort(m))
      expect(dayjsLocaleData.monthsShort()).toEqual(momentLocaleData.monthsShort())
      expect(dayjsLocaleData.weekdays(d)).toBe(momentLocaleData.weekdays(m))
      expect(dayjsLocaleData.weekdays()).toEqual(momentLocaleData.weekdays())
      expect(dayjsLocaleData.weekdaysMin(d)).toBe(momentLocaleData.weekdaysMin(m))
      expect(dayjsLocaleData.weekdaysMin()).toEqual(momentLocaleData.weekdaysMin())
      expect(dayjsLocaleData.weekdaysShort(d)).toBe(momentLocaleData.weekdaysShort(m))
      expect(dayjsLocaleData.weekdaysShort()).toEqual(momentLocaleData.weekdaysShort())
      const longDateFormats = ['LT', 'LTS', 'L', 'LL', 'LLL', 'LLLL', 'l', 'll', 'lll', 'llll']
      longDateFormats.forEach((f) => {
        expect(dayjsLocaleData.longDateFormat(f)).toEqual(momentLocaleData.longDateFormat(f))
      })
    })
  })
  dayex.locale('en')
  moment.locale('en')
})


it('Global localeData', () => {
  ['zh-cn', 'en', 'fr'].forEach((lo) => {
    dayex.locale(lo)
    moment.locale(lo)
    const dayjsLocaleData = dayex.localeData()
    const momentLocaleData = moment.localeData()
    expect(dayjsLocaleData.firstDayOfWeek()).toBe(momentLocaleData.firstDayOfWeek())
    expect(dayjsLocaleData.months()).toEqual(momentLocaleData.months())
    expect(dayjsLocaleData.monthsShort()).toEqual(momentLocaleData.monthsShort())
    expect(dayjsLocaleData.weekdays()).toEqual(momentLocaleData.weekdays())
    expect(dayjsLocaleData.weekdaysShort()).toEqual(momentLocaleData.weekdaysShort())
    expect(dayjsLocaleData.weekdaysMin()).toEqual(momentLocaleData.weekdaysMin())
    const longDateFormats = ['LT', 'LTS', 'L', 'LL', 'LLL', 'LLLL', 'l', 'll', 'lll', 'llll']
    longDateFormats.forEach((f) => {
      expect(dayjsLocaleData.longDateFormat(f)).toEqual(momentLocaleData.longDateFormat(f))
    })
  })
})


it('Listing the months and weekdays', () => {
  ['zh-cn', 'en', 'fr'].forEach((lo) => {
    dayex.locale(lo)
    moment.locale(lo)
    expect(dayex.months()).toEqual(moment.months())
    expect(dayex.monthsShort()).toEqual(moment.monthsShort())
    expect(dayex.weekdays()).toEqual(moment.weekdays())
    expect(dayex.weekdaysShort()).toEqual(moment.weekdaysShort())
    expect(dayex.weekdaysMin()).toEqual(moment.weekdaysMin())
  })
})

it('Month function', () => {
  const dayjsLocaleData = dayex().locale('ru').localeData()
  const momentLocaleData = moment().locale('ru').localeData()
  expect(dayjsLocaleData.months()).toEqual(momentLocaleData.months())
  expect(dayjsLocaleData.monthsShort()).toEqual(momentLocaleData.monthsShort())
  dayex.locale('ru')
  moment.locale('ru')
  expect(dayex.months()).toEqual(moment.months())
  expect(dayex.monthsShort()).toEqual(moment.monthsShort())
})

it('Locale order', () => {
  dayex.locale('fr')
  moment.locale('fr')
  expect(dayex.weekdays(true)).toEqual(moment.weekdays(true))
  expect(dayex.weekdaysShort(true)).toEqual(moment.weekdaysShort(true))
  expect(dayex.weekdaysMin(true)).toEqual(moment.weekdaysMin(true))
  expect(dayex.weekdays()).not.toEqual(dayex.weekdays(true))
  dayex.locale('en')
  moment.locale('en')
  expect(dayex.weekdays(true)).toEqual(moment.weekdays(true))
})

it('meridiem', () => {
  dayex.locale('zh-cn')
  expect(typeof dayex.localeData().meridiem).toEqual('function')
  expect(typeof dayex().localeData().meridiem).toEqual('function')
  dayex.locale('en')
})

it('ordinal', () => {
  dayex.locale('zh-cn')
  expect(typeof dayex.localeData().ordinal).toEqual('function')
  expect(typeof dayex().localeData().ordinal).toEqual('function')
  dayex.locale('en')
})
