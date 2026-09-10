import MockDate from 'mockdate'
import dayex from '../../src'
import isYesterday from '../../src/plugin/isYesterday'

dayex.extend(isYesterday)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('is yesterday', () => {
  expect(dayex().subtract(1, 'day').isYesterday()).toBeTruthy()
  expect(dayex('2017-01-01').isYesterday()).toBeFalsy()
})
