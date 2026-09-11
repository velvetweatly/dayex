import moment from 'moment'
import MockDate from 'mockdate'
import dayex from '../src'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Year', () => {
  expect(dayex().get('year')).toBe(moment().get('year'))
  expect(dayex().year()).toBe(moment().year())
  expect(dayex().year(0).valueOf()).toBe(moment().year(0).valueOf())
  expect(dayex().year(2000).valueOf()).toBe(moment().year(2000).valueOf())
})

it('Month', () => {
  expect(dayex().get('month')).toBe(moment().get('month'))
  expect(dayex().month()).toBe(moment().month())
  expect(dayex().month(0).valueOf()).toBe(moment().month(0).valueOf())
  expect(dayex().month(1).valueOf()).toBe(moment().month(1).valueOf())
})

it('Day of Week', () => {
  expect(dayex().get('day')).toBe(moment().get('day'))
  expect(dayex().day()).toBe(moment().day())
  expect(dayex().day(0).format()).toBe(moment().day(0).format())
  expect(dayex().day(1).format()).toBe(moment().day(1).format())
})

it('Date', () => {
  expect(dayex().get('date')).toBe(moment().get('date'))
  expect(dayex().date()).toBe(moment().date())
  expect(dayex().date(0).valueOf()).toBe(moment().date(0).valueOf())
  expect(dayex().date(1).valueOf()).toBe(moment().date(1).valueOf())
})

it('Hour', () => {
  expect(dayex().get('hour')).toBe(moment().get('hour'))
  expect(dayex().hour()).toBe(moment().hour())
  expect(dayex().hour(0).valueOf()).toBe(moment().hour(0).valueOf())
  expect(dayex().hour(1).valueOf()).toBe(moment().hour(1).valueOf())
})

it('Minute', () => {
  expect(dayex().get('minute')).toBe(moment().get('minute'))
  expect(dayex().minute()).toBe(moment().minute())
  expect(dayex().minute(0).valueOf()).toBe(moment().minute(0).valueOf())
  expect(dayex().minute(1).valueOf()).toBe(moment().minute(1).valueOf())
})

it('Second', () => {
  expect(dayex().get('second')).toBe(moment().get('second'))
  expect(dayex().second()).toBe(moment().second())
  expect(dayex().second(0).valueOf()).toBe(moment().second(0).valueOf())
  expect(dayex().second(1).valueOf()).toBe(moment().second(1).valueOf())
})

it('Millisecond', () => {
  expect(dayex().get('millisecond')).toBe(moment().get('millisecond'))
  expect(dayex().millisecond()).toBe(moment().millisecond())
  expect(dayex().millisecond(0).valueOf()).toBe(moment().millisecond(0).valueOf())
  expect(dayex().millisecond(1).valueOf()).toBe(moment().millisecond(1).valueOf())
})

it('Set Day', () => {
  expect(dayex().set('date', 30).valueOf()).toBe(moment().set('date', 30).valueOf())
})

it('Set Day of Week', () => {
  expect(dayex().set('day', 0).valueOf()).toBe(moment().set('day', 0).valueOf())
})

it('Set Month', () => {
  expect(dayex().set('month', 11).valueOf()).toBe(moment().set('month', 11).valueOf())
})

it('Set Year', () => {
  expect(dayex().set('year', 2008).valueOf()).toBe(moment().set('year', 2008).valueOf())
})

it('Set Hour', () => {
  expect(dayex().set('hour', 6).valueOf()).toBe(moment().set('hour', 6).valueOf())
})

it('Set Minute', () => {
  expect(dayex().set('minute', 59).valueOf()).toBe(moment().set('minute', 59).valueOf())
})

it('Set Second', () => {
  expect(dayex().set('second', 59).valueOf()).toBe(moment().set('second', 59).valueOf())
})

it('Set Millisecond', () => {
  expect(dayex().set('millisecond', 999).valueOf()).toBe(moment().set('millisecond', 999).valueOf())
})

it('Set Month and Year in last day of month', () => {
  // 2011-07-31 -> 2011-02-28
  const origin = dayex('2011-07-31T14:48:00.000Z')
  const setMonth = origin.set('month', 1)
  expect(setMonth.month()).toBe(1)
  expect(origin.date()).toBe(31)
  expect(setMonth.date()).toBe(28)
  // 2000-02-29 -> 2001-02-28
  const origin2 = dayex('2000-02-29T14:48:00.000Z')
  const setYear = origin2.set('year', 2001)
  expect(setYear.month()).toBe(1)
  expect(origin2.date()).toBe(29)
  expect(setYear.date()).toBe(28)
})

it('Set Unknown String', () => {
  const newDate = dayex().set('Unknown String', 1)
  expect(newDate.valueOf())
    .toBe(moment().set('Unknown String', 1).valueOf())
})

it('Immutable Set', () => {
  const dayexA = dayex()
  const dayexB = dayexA.set('year', 2011)
  const momentA = moment()
  const momentB = momentA.set('year', 2011)
  expect(dayexA.valueOf()).not.toBe(dayexB.valueOf())
  expect(momentA.valueOf()).toBe(momentB.valueOf())
})

