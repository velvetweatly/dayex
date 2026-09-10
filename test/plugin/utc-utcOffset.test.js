import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import utc from '../../src/plugin/utc'

dayex.extend(utc)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Set utcOffset -> Get utcOffset', () => {
  expect(dayex().utcOffset(540).utcOffset()).toBe(moment().utcOffset(540).utcOffset())
  expect(dayex().utcOffset(540).format()).toBe(moment().utcOffset(540).format())
  expect(dayex().utcOffset(60).format()).toBe(moment().utcOffset(60).format())
  expect(dayex().utcOffset(8).format()).toBe(moment().utcOffset(8).format())

  expect(dayex().utcOffset(-540).utcOffset()).toBe(moment().utcOffset(-540).utcOffset())
  expect(dayex().utcOffset(-540).format()).toBe(moment().utcOffset(-540).format())

  expect(dayex().utcOffset(-60).format()).toBe(moment().utcOffset(-60).format())
  expect(dayex().utcOffset(-8).format()).toBe(moment().utcOffset(-8).format())
})

it('valueOf, toDate, toString, toISOString should be the same as original', () => {
  const d = dayex()
  const du = dayex().utcOffset(9)
  const mu = moment().utcOffset(9)
  expect(d.valueOf()).toBe(du.valueOf())
  expect(du.valueOf()).toBe(mu.valueOf())
  expect(d.toDate()).toEqual(du.toDate())
  expect(du.toDate()).toEqual(mu.toDate())
  expect(du.toISOString()).toEqual(mu.toISOString())
  expect(d.toString()).toEqual(d.toString())
})

it('clone', () => {
  const du = dayex().utcOffset(9)
  const duClone = du.clone()
  expect(du.valueOf()).toBe(duClone.valueOf())
  expect(du.format()).toBe(duClone.format())
  expect(du.utcOffset()).toBe(duClone.utcOffset())
})

it('immutable', () => {
  const d = dayex()
  const du = d.utcOffset(d.utcOffset() + 1)
  expect(d.utcOffset()).not.toBe(du.utcOffset())
  expect(d.format()).not.toBe(du.format())
})

it('utcOffset(0) enable utc mode', () => {
  expect(dayex().utcOffset(0).format()).toBe(moment().utcOffset(0).format())
  expect(dayex().utcOffset(0).isUTC()).toBeTruthy()
})

it('utcOffset keepLocalTime', () => {
  const d = '2000-01-01T06:00:00Z'
  expect(dayex.utc(d).utcOffset(5, true).format())
    .toBe(moment.utc(d).utcOffset(5, true).format())
  expect(dayex.utc(d).utcOffset(0, true).format())
    .toBe(moment.utc(d).utcOffset(0, true).format())
  expect(dayex.utc(d).utcOffset(-5, true).format())
    .toBe(moment.utc(d).utcOffset(-5, true).format())
  const d2 = '2016-01-01 00:00:00'
  expect(dayex(d2).utcOffset(0, true).format())
    .toBe(moment(d2).utcOffset(0, true).format())
  expect(dayex(d2).utcOffset(-5, true).format())
    .toBe(moment(d2).utcOffset(-5, true).format())
  expect(dayex(d2).utcOffset(5, true).format())
    .toBe(moment(d2).utcOffset(5, true).format())
})

test('UTC mode', () => {
  const d = dayex.utc('2000-01-01T06:00:00Z')
  expect(d.isUTC()).toBeTruthy()
  expect(d.utcOffset(0).isUTC()).toBeTruthy()
  expect(d.utcOffset(1).isUTC()).toBeFalsy()
})

test('change hours when changing the utc offset in UTC mode', () => {
  const d = dayex.utc('2000-01-01T06:31:00Z')
  expect(d.hour()).toBe(6)
  expect(d.utcOffset(0).hour()).toBe(6)
  expect(d.utcOffset(-60).hour()).toBe(5)
  expect(d.utcOffset(60).hour()).toBe(7)
  expect(d.utcOffset(-30).format('HH:mm')).toBe('06:01')
  expect(d.utcOffset(30).format('HH:mm')).toBe('07:01')
  expect(d.utcOffset(-1380).format('HH:mm')).toBe('07:31')
})

test('correctly set and add hours in offset mode', () => {
  const d10 = dayex('2000-01-30T06:31:00+10:00').utcOffset(10)
  const dm8 = dayex('2000-01-30T06:31:00-08:00').utcOffset(-8)

  expect(d10.hour(5).hour()).toBe(5)
  expect(d10.hour(5).add(1, 'hour').hour()).toBe(6)
  expect(d10.hour(5).add(-10, 'hour').hour()).toBe(19)

  expect(dm8.hour(5).hour()).toBe(5)
  expect(dm8.hour(5).add(1, 'hour').hour()).toBe(6)
  expect(dm8.hour(5).add(-10, 'hour').hour()).toBe(19)
})

test('keep hours when adding month in offset mode', () => {
  const d10 = dayex('2000-01-30T06:31:00+10:00').utcOffset(10)
  const dm8 = dayex('2000-01-30T06:31:00-08:00').utcOffset(-8)

  expect(d10.add(1, 'month').hour()).toBe(6)
  expect(dm8.add(1, 'month').hour()).toBe(6)

  expect(d10.add(-2, 'month').hour()).toBe(6)
  expect(dm8.add(-2, 'month').hour()).toBe(6)
})

test('utc costrustor', () => {
  const d = new Date(2019, 8, 11, 0, 0, 0).getTime()
  expect(moment(d).utc().utcOffset(480).valueOf())
    .toBe(dayex(d).utc().utcOffset(480).valueOf())

  expect(moment(d).utc().local()
    .utcOffset(480)
    .valueOf())
    .toBe(dayex(d).utc().local()
      .utcOffset(480)
      .valueOf())
})

test('utc startOf', () => {
  const d = new Date(2019, 8, 11, 0, 0, 0, 0).getTime()
  expect(moment(d).utc().utcOffset(480).endOf('day')
    .valueOf())
    .toBe(dayex(d).utc().utcOffset(480).endOf('day')
      .valueOf())

  expect(moment(d).utc().utcOffset(480).endOf('day')
    .valueOf())
    .toBe(dayex(d).utc().utcOffset(480).endOf('day')
      .valueOf())
  const d2 = '2017-07-20T11:00:00+00:00'
  const d2d = dayex(d2).utcOffset(-12).startOf('day').valueOf()
  const d2m = moment(d2).utcOffset(-12).startOf('day').valueOf()
  expect(d2d)
    .toBe(d2m)
  expect(d2d)
    .toBe(1500465600000)
})

test('cloning dates modified with utcOffset', () => {
  const djs = dayex('2023-10-29T00:00:00+03:00')

  const tests = [
    djs,
    djs.utcOffset(-240),
    djs.utcOffset(-240, true),
    djs.utcOffset(120),
    djs.utcOffset(120, true),
    djs.utcOffset(0),
    djs.utcOffset(0, true)
  ]

  tests.forEach((d) => {
    expect(dayex(d).format()).toEqual(d.format())
  })
})
