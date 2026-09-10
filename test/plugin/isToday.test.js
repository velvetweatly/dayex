import MockDate from 'mockdate'
import dayex from '../../src'
import isToday from '../../src/plugin/isToday'

dayex.extend(isToday)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('is today', () => {
  expect(dayex(new Date()).isToday()).toBeTruthy()
  expect(dayex('2017-01-01').isToday()).toBeFalsy()
})
