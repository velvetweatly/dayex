import MockDate from 'mockdate'
import dayex from '../../src'
import isLeapYear from '../../src/plugin/isLeapYear'

dayex.extend(isLeapYear)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('IsLeapYear', () => {
  expect(dayex('20000101').isLeapYear()).toBe(true)
  expect(dayex('2100-01-01').isLeapYear()).toBe(false)
})
