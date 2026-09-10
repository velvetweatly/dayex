import MockDate from 'mockdate'
import dayex from '../../src'
import isTomorrow from '../../src/plugin/isTomorrow'

dayex.extend(isTomorrow)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('is tomorrow', () => {
  expect(dayex().add(1, 'day').isTomorrow()).toBeTruthy()
  expect(dayex('2017-01-01').isTomorrow('2019-01-01', '2017-01-01')).toBeFalsy()
})
