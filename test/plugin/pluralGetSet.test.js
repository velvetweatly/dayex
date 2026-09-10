import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import pluralGetSet from '../../src/plugin/pluralGetSet'

dayex.extend(pluralGetSet)
const warnBackup = global.console.warn
beforeEach(() => {
  MockDate.set(new Date())
  global.console.warn = jest.genMockFunction()
  // moment.js .years, .dates, .months will throw warn
})

afterEach(() => {
  MockDate.reset()
  global.console.warn = warnBackup
})

it('Years', () => {
  expect(dayex().get('years')).toBe(moment().get('years'))
  expect(dayex().years()).toBe(moment().years())
  expect(dayex().years(0).valueOf()).toBe(moment().years(0).valueOf())
  expect(dayex().years(2000).valueOf()).toBe(moment().years(2000).valueOf())
})

it('Months', () => {
  expect(dayex().get('months')).toBe(moment().get('months'))
  expect(dayex().months()).toBe(moment().months())
  expect(dayex().months(0).valueOf()).toBe(moment().months(0).valueOf())
  expect(dayex().months(1).valueOf()).toBe(moment().months(1).valueOf())
})

it('Days of Week', () => {
  expect(dayex().get('days')).toBe(moment().get('days'))
  expect(dayex().days()).toBe(moment().days())
  expect(dayex().days(0).format()).toBe(moment().days(0).format())
  expect(dayex().days(1).format()).toBe(moment().days(1).format())
})

it('Dates', () => {
  expect(dayex().get('dates')).toBe(moment().get('dates'))
  expect(dayex().dates()).toBe(moment().dates())
  expect(dayex().dates(0).valueOf()).toBe(moment().dates(0).valueOf())
  expect(dayex().dates(1).valueOf()).toBe(moment().dates(1).valueOf())
})

it('Hours', () => {
  expect(dayex().get('hours')).toBe(moment().get('hours'))
  expect(dayex().hours()).toBe(moment().hours())
  expect(dayex().hours(0).valueOf()).toBe(moment().hours(0).valueOf())
  expect(dayex().hours(1).valueOf()).toBe(moment().hours(1).valueOf())
})

it('Minutes', () => {
  expect(dayex().get('minutes')).toBe(moment().get('minutes'))
  expect(dayex().minutes()).toBe(moment().minutes())
  expect(dayex().minutes(0).valueOf()).toBe(moment().minutes(0).valueOf())
  expect(dayex().minutes(1).valueOf()).toBe(moment().minutes(1).valueOf())
})

it('Seconds', () => {
  expect(dayex().get('seconds')).toBe(moment().get('seconds'))
  expect(dayex().seconds()).toBe(moment().seconds())
  expect(dayex().seconds(0).valueOf()).toBe(moment().seconds(0).valueOf())
  expect(dayex().seconds(1).valueOf()).toBe(moment().seconds(1).valueOf())
})

it('Milliseconds', () => {
  expect(dayex().get('milliseconds')).toBe(moment().get('milliseconds'))
  expect(dayex().milliseconds()).toBe(moment().milliseconds())
  expect(dayex().milliseconds(0).valueOf()).toBe(moment().milliseconds(0).valueOf())
  expect(dayex().milliseconds(1).valueOf()).toBe(moment().milliseconds(1).valueOf())
})

it('Set Dates', () => {
  expect(dayex().date(30).valueOf()).toBe(moment().dates(30).valueOf())
  expect(dayex().set('dates', 30).valueOf()).toBe(moment().set('dates', 30).valueOf())
})

it('Set Days of Week', () => {
  expect(dayex().days(0).valueOf()).toBe(moment().days(0).valueOf())
  expect(dayex().set('days', 0).valueOf()).toBe(moment().set('days', 0).valueOf())
})

it('Set Months', () => {
  expect(dayex().months(11).valueOf()).toBe(moment().months(11).valueOf())
  expect(dayex().set('months', 11).valueOf()).toBe(moment().set('months', 11).valueOf())
})

it('Set Years', () => {
  expect(dayex().years(2008).valueOf()).toBe(moment().year(2008).valueOf())
  expect(dayex().set('years', 2008).valueOf()).toBe(moment().set('years', 2008).valueOf())
})

it('Set Hours', () => {
  expect(dayex().set('hours', 6).valueOf()).toBe(moment().set('hours', 6).valueOf())
  expect(dayex().hours(6).valueOf()).toBe(moment().hours(6).valueOf())
})

it('Set Minutes', () => {
  expect(dayex().minutes(59).valueOf()).toBe(moment().minutes(59).valueOf())
  expect(dayex().set('minutes', 59).valueOf()).toBe(moment().set('minutes', 59).valueOf())
})

it('Set Seconds', () => {
  expect(dayex().seconds(59).valueOf()).toBe(moment().seconds(59).valueOf())
  expect(dayex().set('second', 59).valueOf()).toBe(moment().set('second', 59).valueOf())
})

it('Set Milliseconds', () => {
  expect(dayex().milliseconds(999).valueOf()).toBe(moment().milliseconds(999).valueOf())
  expect(dayex().set('millisecond', 999).valueOf()).toBe(moment().set('millisecond', 999).valueOf())
})

it('Set Month and Year in last day of month', () => {
  // 2011-07-31 -> 2011-02-28
  const origin = dayex('2011-07-31T14:48:00.000Z')
  const setMonth = origin.set('month', 1)
  expect(setMonth.months()).toBe(1)
  expect(origin.dates()).toBe(31)
  expect(setMonth.dates()).toBe(28)
  // 2000-02-29 -> 2001-02-28
  const origin2 = dayex('2000-02-29T14:48:00.000Z')
  const setYear = origin2.set('years', 2001)
  expect(setYear.months()).toBe(1)
  expect(origin2.dates()).toBe(29)
  expect(setYear.dates()).toBe(28)
})
