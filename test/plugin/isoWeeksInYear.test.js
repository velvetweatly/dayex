import MockDate from 'mockdate'
import dayex from '../../src'
import isoWeeksInYear from '../../src/plugin/isoWeeksInYear'
import isLeapYear from '../../src/plugin/isLeapYear'

dayex.extend(isoWeeksInYear)
dayex.extend(isLeapYear)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('isoWeeksInYear', () => {
  expect(dayex('2004').isoWeeksInYear()).toBe(53)
  expect(dayex('2005').isoWeeksInYear()).toBe(52)
  expect(dayex('2006').isoWeeksInYear()).toBe(52)
  expect(dayex('2007').isoWeeksInYear()).toBe(52)
  expect(dayex('2008').isoWeeksInYear()).toBe(52)
  expect(dayex('2009').isoWeeksInYear()).toBe(53)
  expect(dayex('2010').isoWeeksInYear()).toBe(52)
  expect(dayex('2011').isoWeeksInYear()).toBe(52)
  expect(dayex('2012').isoWeeksInYear()).toBe(52)
  expect(dayex('2013').isoWeeksInYear()).toBe(52)
  expect(dayex('2014').isoWeeksInYear()).toBe(52)
  expect(dayex('2015').isoWeeksInYear()).toBe(53)
})
