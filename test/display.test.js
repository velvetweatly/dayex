import moment from 'moment'
import MockDate from 'mockdate'
import dayex from '../src'
import th from '../src/locale/th'
import '../src/locale/ja'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Format no formatStr', () => {
  expect(dayex().format()).toBe(moment().format())
})

it('Format invalid date', () => {
  expect(dayex('').format()).toBe(new Date('').toString())
  expect(dayex('otherString').format()).toBe(new Date('otherString').toString())
})

it('Format Year YY YYYY', () => {
  expect(dayex().format('YY')).toBe(moment().format('YY'))
  expect(dayex().format('YYYY')).toBe(moment().format('YYYY'))
  expect(dayex().format('Y')).toBe('Y')
  expect(dayex().format('YYY')).toBe(`${moment().format('YY')}Y`)
})

it('Format Month M MM MMM MMMM', () => {
  expect(dayex().format('M')).toBe(moment().format('M'))
  expect(dayex().format('MM')).toBe(moment().format('MM'))
  expect(dayex().format('MMM')).toBe(moment().format('MMM'))
  expect(dayex().format('MMMM')).toBe(moment().format('MMMM'))
})

it('Format Day of Month D DD 1 - 31', () => {
  expect(dayex().format('D')).toBe(moment().format('D'))
  expect(dayex().format('DD')).toBe(moment().format('DD'))
})

it('Format Day of Week d Sun - Sat', () => {
  expect(dayex().format('d')).toBe(moment().format('d'))
  expect(dayex().format('dd')).toBe(moment().format('dd'))
  expect(dayex().format('ddd')).toBe(moment().format('ddd'))
  expect(dayex().format('dddd')).toBe(moment().format('dddd'))
})

it('Format Hour H HH 24-hour', () => {
  expect(dayex().format('H')).toBe(moment().format('H'))
  expect(dayex().format('HH')).toBe(moment().format('HH'))
})

it('Format Hour h hh 12-hour', () => {
  const time = '2018-05-02T00:00:00.000'
  const expected = '12'
  expect(dayex(time).format('h')).toBe(expected)
  expect(dayex(time).format('h')).toBe(moment(time).format('h'))
  expect(dayex(time).format('hh')).toBe(expected)
  expect(dayex(time).format('hh')).toBe(moment(time).format('hh'))

  const time2 = '2018-05-02T01:00:00.000'
  expect(dayex(time2).format('h')).toBe(moment(time2).format('h'))
  expect(dayex(time2).format('h')).toBe('1')
  expect(dayex(time2).format('hh')).toBe(moment(time2).format('hh'))
  expect(dayex(time2).format('hh')).toBe('01')

  const time3 = '2018-05-02T23:00:00.000'
  const expected3 = '11'
  expect(dayex(time3).format('h')).toBe(moment(time3).format('h'))
  expect(dayex(time3).format('h')).toBe(expected3)
  expect(dayex(time3).format('hh')).toBe(moment(time3).format('hh'))
  expect(dayex(time3).format('hh')).toBe(expected3)
})

it('Format meridiens a A am / pm', () => {
  const time = '2018-05-02T01:00:00.000'
  expect(dayex(time).format('a')).toBe('am')
  expect(dayex(time).format('a')).toBe(moment(time).format('a'))
  expect(dayex(time).format('A')).toBe('AM')
  expect(dayex(time).format('A')).toBe(moment(time).format('A'))
  expect(dayex(time).locale('ja').format('a')).toBe('午前')
  expect(dayex(time).locale('ja').format('a'))
    .toBe(moment(time).locale('ja').format('a'))

  const time2 = '2018-05-02T23:00:00.000'
  expect(dayex(time2).format('a')).toBe('pm')
  expect(dayex(time2).format('a')).toBe(moment(time2).format('a'))
  expect(dayex(time2).format('A')).toBe('PM')
  expect(dayex(time2).format('A')).toBe(moment(time2).format('A'))
  expect(dayex(time2).locale('ja').format('a')).toBe('午後')
  expect(dayex(time2).locale('ja').format('a'))
    .toBe(moment(time2).locale('ja').format('a'))
})

it('Format Minute m mm', () => {
  expect(dayex().format('m')).toBe(moment().format('m'))
  expect(dayex().format('mm')).toBe(moment().format('mm'))
})

it('Format Second s ss SSS', () => {
  expect(dayex().format('s')).toBe(moment().format('s'))
  expect(dayex().format('ss')).toBe(moment().format('ss'))
  expect(dayex().format('SSS')).toBe(moment().format('SSS'))
  const date = '2011-11-05T14:48:01.002Z'
  expect(dayex(date).format('s-ss-SSS')).toBe(moment(date).format('s-ss-SSS'))
})

it('Format Time Zone ZZ', () => {
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 8)
  expect(dayex().format('Z')).toBe(moment().format('Z'))
  expect(dayex().format('ZZ')).toBe(moment().format('ZZ'))
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 8 * -1)
  expect(dayex().format('ZZ')).toBe(moment().format('ZZ'))
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 0)
  expect(dayex().format('ZZ')).toBe(moment().format('ZZ'))
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 10)
  expect(dayex().format('ZZ')).toBe(moment().format('ZZ'))
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 11 * -1)
  expect(dayex().format('ZZ')).toBe(moment().format('ZZ'))
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 5.5 * -1)
  expect(dayex().format('ZZ')).toBe(moment().format('ZZ'))
})

it('Format ddd dd MMM with short locale', () => {
  expect(dayex()
    .locale(th)
    .format('dd')).toBe(moment()
    .locale('th')
    .format('dd'))
  expect(dayex()
    .locale(th)
    .format('ddd')).toBe(moment()
    .locale('th')
    .format('ddd'))
  expect(dayex()
    .locale(th)
    .format('MMM')).toBe(moment()
    .locale('th')
    .format('MMM'))
})

it('Format token value is 0', () => {
  const sundayDate = '2000-01-02'
  const sundayStr = 'd H m s'
  expect(dayex(sundayDate).format(sundayStr))
    .toBe(moment(sundayDate).format(sundayStr))
})

it('Format Complex with other string - : / ', () => {
  const string = 'YY-M-D / HH:mm:ss'
  expect(dayex().format(string)).toBe(moment().format(string))
})

it('Format Escaping characters', () => {
  let string = '[Z] Z'
  expect(dayex().format(string)).toBe(moment().format(string))
  string = '[Z] Z [Z]'
  expect(dayex().format(string)).toBe(moment().format(string))
})

describe('Difference', () => {
  it('empty -> default milliseconds', () => {
    const dateString = '20110101'
    const dayexA = dayex()
    const dayexB = dayex(dateString)
    const momentA = moment()
    const momentB = moment(dateString)
    expect(dayexA.diff(dayexB)).toBe(momentA.diff(momentB))
  })

  it('diff -> none dayex object', () => {
    const dateString = '2013-02-08'
    const dayexA = dayex()
    const dayexB = new Date(dateString)
    const momentA = moment()
    const momentB = new Date(dateString)
    expect(dayexA.diff(dayexB)).toBe(momentA.diff(momentB))
  })

  it('diff -> in seconds, minutes, hours, days, weeks, months, quarters, years ', () => {
    const dayexA = dayex()
    const dayexB = dayex().add(1000, 'days')
    const dayexC = dayex().subtract(1000, 'days')
    const momentA = moment()
    const momentB = moment().add(1000, 'days')
    const momentC = moment().subtract(1000, 'days')
    const units = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'quarters', 'years']
    units.forEach((unit) => {
      expect(dayexA.diff(dayexB, unit)).toBe(momentA.diff(momentB, unit))
      expect(dayexA.diff(dayexB, unit, true)).toBe(momentA.diff(momentB, unit, true))
      expect(dayexA.diff(dayexC, unit)).toBe(momentA.diff(momentC, unit))
      expect(dayexA.diff(dayexC, unit, true)).toBe(momentA.diff(momentC, unit, true))
    })
  })

  it('Special diff in month according to moment.js', () => {
    const dayexA = dayex('20160115')
    const dayexB = dayex('20160215')
    const dayexC = dayex('20170115')
    const momentA = moment('20160115')
    const momentB = moment('20160215')
    const momentC = moment('20170115')
    const units = ['months', 'quarters', 'years']
    units.forEach((unit) => {
      expect(dayexA.diff(dayexB, unit)).toBe(momentA.diff(momentB, unit))
      expect(dayexA.diff(dayexB, unit, true)).toBe(momentA.diff(momentB, unit, true))
      expect(dayexA.diff(dayexC, unit)).toBe(momentA.diff(momentC, unit))
      expect(dayexA.diff(dayexC, unit, true)).toBe(momentA.diff(momentC, unit, true))
    })
  })

  it('MonthDiff', () => {
    expect(dayex('2018-08-08').diff(dayex('2018-08-08'), 'month')).toEqual(0)
    expect(dayex('2018-09-08').diff(dayex('2018-08-08'), 'month')).toEqual(1)
    expect(dayex('2018-08-08').diff(dayex('2018-09-08'), 'month')).toEqual(-1)
    expect(dayex('2018-01-01').diff(dayex('2018-01-01'), 'month')).toEqual(0)
  })

  it('undefined edge case', () => {
    expect(dayex().diff(undefined, 'seconds')).toBeDefined()
  })
})

it('Unix Timestamp (milliseconds)', () => {
  expect(dayex().valueOf()).toBe(moment().valueOf())
})

it('Unix Timestamp (seconds)', () => {
  expect(dayex().unix()).toBe(moment().unix())
})

it('Days in Month', () => {
  expect(dayex().daysInMonth()).toBe(moment().daysInMonth())
  expect(dayex('20140201').daysInMonth()).toBe(moment('20140201').daysInMonth())
})

it('Utc Offset', () => {
  expect(dayex('2013-01-01T00:00:00.000').utcOffset()).toBe(moment('2013-01-01T00:00:00.000').utcOffset())
  expect(dayex('2013-01-01T05:00:00.000').utcOffset()).toBe(moment('2013-01-01T05:00:00.000').utcOffset())
})

it('As Javascript Date -> toDate', () => {
  const base = dayex()
  const momentBase = moment()
  const jsDate = base.toDate()
  expect(jsDate).toEqual(momentBase.toDate())
  expect(jsDate).toEqual(new Date())

  jsDate.setFullYear(1970)
  expect(jsDate.toUTCString()).not.toBe(base.toString())
})

it('As JSON -> toJSON', () => {
  expect(dayex().toJSON()).toBe(moment().toJSON())
  global.console.warn = jest.genMockFunction()// moment.js otherString will throw warn
  expect(dayex('otherString').toJSON()).toBe(moment('otherString').toJSON())
  expect(dayex('otherString').toJSON()).toBe(null)
})

it('As ISO 8601 String -> toISOString e.g. 2013-02-04T22:44:30.652Z', () => {
  expect(dayex().toISOString()).toBe(moment().toISOString())
})

it('Year 1 formatted with YYYY should pad with zeroes', () => {
  const date = new Date(1, 0, 1)
  date.setUTCFullYear(1) // Required because 0-99 are parsed as 19xx in JS: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#year
  const res = dayex(date).format('YYYY')
  expect(res.slice(0, 3)).toBe('000') // because of timezone, the result might be 0000 0001 or 0002
  expect(res).toBe(moment(date).format('YYYY'))
})
