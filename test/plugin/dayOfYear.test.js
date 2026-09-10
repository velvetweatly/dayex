import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import dayOfYear from '../../src/plugin/dayOfYear'

dayex.extend(dayOfYear)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('DayOfYear get', () => {
  expect(dayex().dayOfYear()).toBe(moment().dayOfYear())
  expect(dayex('2015-01-01T00:00:00.000').dayOfYear()).toBe(1)
  expect(dayex('2015-01-31T00:00:00.000').dayOfYear()).toBe(31)
  expect(dayex('2015-02-01T00:00:00.000').dayOfYear()).toBe(32)
  expect(dayex('2015-02-28T00:00:00.000').dayOfYear()).toBe(59)
  expect(dayex('2015-12-31T00:00:00.000').dayOfYear()).toBe(365)
})

it('DayOfYear set', () => {
  expect(dayex().dayOfYear(4).dayOfYear()).toBe(moment().dayOfYear(4).dayOfYear())
  expect(dayex('2015-01-01T00:00:00.000Z')
    .dayOfYear(4)
    .dayOfYear()).toBe(4)

  expect(dayex('2015-01-01T00:00:00.000Z')
    .dayOfYear(4)
    .toISOString()).toBe('2015-01-04T00:00:00.000Z')

  expect(dayex('2015-01-01T00:00:00.000Z')
    .dayOfYear(32)
    .dayOfYear()).toBe(32)

  expect(dayex('2015-01-01T00:00:00.000Z')
    .dayOfYear(32)
    .toISOString()).toBe('2015-02-01T00:00:00.000Z')

  expect(dayex('2015-01-01T00:00:00.000Z')
    .dayOfYear(365)
    .dayOfYear()).toBe(365)

  expect(dayex('2015-01-01T00:00:00.000Z')
    .dayOfYear(365)
    .toISOString()).toBe('2015-12-31T00:00:00.000Z')
})
