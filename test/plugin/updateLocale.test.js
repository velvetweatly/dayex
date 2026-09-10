import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import updateLocale from '../../src/plugin/updateLocale'
import localizedFormat from '../../src/plugin/localizedFormat'
import '../../src/locale/zh-cn'

dayex.extend(updateLocale)
dayex.extend(localizedFormat)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

const newLocale = {
  months: new Array(12).fill('testMonth'),
  formats: { // formats for dayex and longDateFormat for momentjs
    LT: '[testFormat]'
  },
  longDateFormat: {
    LT: '[testFormat]'
  }
}

const formatString = 'MMMM LT'

describe('Update locale', () => {
  it('Invalid argument', () => {
    const result = dayex.updateLocale('InvalidLocaleName', {})
    expect(result)
      .toEqual(undefined)
    expect(dayex().format(formatString))
      .toEqual(moment().format(formatString))
  })

  it('Return value', () => {
    const result1 = dayex.updateLocale('en')
    expect(typeof result1).toEqual('object')
    const result2 = dayex.updateLocale('en', {})
    expect(typeof result2).toEqual('object')
    const result3 = dayex.updateLocale('en', newLocale)
    expect(typeof result3).toEqual('object')
  })

  it('Update build-in en locale', () => {
    moment.updateLocale('en', newLocale)
    dayex.updateLocale('en', newLocale)

    expect(dayex().format(formatString))
      .toEqual('testMonth testFormat')

    expect(dayex().format(formatString))
      .toEqual(moment().format(formatString))
  })

  it('Update imported zh-cn locale', () => {
    moment.updateLocale('zh-cn', newLocale)
    dayex.updateLocale('zh-cn', newLocale)
    dayex.locale('zh-cn')
    moment.locale('zh-cn')
    expect(dayex().format(formatString))
      .toEqual('testMonth testFormat')

    expect(dayex().format(formatString))
      .toEqual(moment().format(formatString))
  })

  it('Partial update to nested object (formats)', () => {
    dayex.locale('en')
    // First, get the original formats
    const originalLocale = dayex.Ls.en
    const originalLT = originalLocale.formats && originalLocale.formats.LT

    // Update only L format
    dayex.updateLocale('en', {
      formats: {
        L: 'DD/MM/YYYY'
      }
    })

    const updatedLocale = dayex.Ls.en
    // The updated key should have the new value
    expect(updatedLocale.formats.L).toBe('DD/MM/YYYY')
    // Other keys in formats should be preserved
    expect(updatedLocale.formats.LT).toBe(originalLT)
  })

  it('Non-object values should still be replaced entirely', () => {
    const newMonths = new Array(12).fill('newMonth')
    dayex.updateLocale('en', {
      months: newMonths
    })
    const updatedLocale = dayex.Ls.en
    expect(updatedLocale.months).toEqual(newMonths)
  })

  it('Update invalid date string', () => {
    const locale = 'en'
    const localeSetting = { invalidDate: 'bad date' }
    dayex.updateLocale(locale, localeSetting)
    moment.updateLocale(locale, localeSetting)
    dayex.locale(locale)
    moment.locale(locale)
    expect(dayex('').format()).toBe(moment('').format())
    expect(dayex('otherString').format()).toBe(moment('otherString').format())
  })
})
