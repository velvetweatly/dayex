import MockDate from 'mockdate'
import dayex from '../src'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('supports instanceof dayex', () => {
  expect(dayex() instanceof dayex).toBeTruthy()
})

it('$isDayexObject', () => {
  const mockOtherVersionDayexObj = {
    $isDayexObject: true
  }
  expect(dayex.isDayex(mockOtherVersionDayexObj)).toBeTruthy()
})

it('does not break isDayex', () => {
  expect(dayex.isDayex(dayex())).toBeTruthy()
  expect(dayex.isDayex(new Date())).toBeFalsy()
})
