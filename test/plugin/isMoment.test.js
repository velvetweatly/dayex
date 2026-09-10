import MockDate from 'mockdate'
import dayex from '../../src'
import isMoment from '../../src/plugin/isMoment'

dayex.extend(isMoment)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('IsLeapYear', () => {
  expect(dayex.isMoment(dayex())).toBe(true)
  expect(dayex.isMoment(new Date())).toBe(false)
})
