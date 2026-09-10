import MockDate from 'mockdate'
import dayex from '../../src'
import minMax from '../../src/plugin/minMax'

dayex.extend(minMax)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

const arg1 = dayex('2019-01-01')
const arg2 = dayex('2018-01-01')
const arg3 = dayex('2017-01-01')
const arg4 = dayex('Invalid Date')

it('Return current time if no argument', () => {
  expect(dayex.max())
    .toBe(null)
  expect(dayex.min())
    .toBe(null)
  expect(dayex.max(null))
    .toBe(null)
  expect(dayex.min(null))
    .toBe(null)
})

it('Return current time if passing empty array', () => {
  expect(dayex.max([]))
    .toBe(null)
  expect(dayex.min([]))
    .toBe(null)
})

it('Compare between arguments', () => {
  expect(dayex.max(arg1, arg2, arg3).format())
    .toBe(arg1.format())
  expect(dayex.min(arg1, arg2, arg3).format())
    .toBe(arg3.format())
})

it('Compare in array', () => {
  expect(dayex.max([arg1, arg2, arg3]).format())
    .toBe(arg1.format())
  expect(dayex.min([arg1, arg2, arg3]).format())
    .toBe(arg3.format())
})

it('If Invalid Date return Invalid Date', () => {
  expect(dayex.max(arg1, arg2, arg3, arg4).format())
    .toBe(arg4.format())
  expect(dayex.min([arg1, arg2, arg3, arg4]).format())
    .toBe(arg4.format())
})

it('Ignore if exists an "null" argument', () => {
  expect(dayex.max(null, null, arg1, arg2, null, arg3).format())
    .toBe(arg1.format())
  expect(dayex.min([null, null, arg1, arg2, null, arg3]).format())
    .toBe(arg3.format())
})

it('Return the only date if just provided one argument', () => {
  expect(dayex.max(arg1).format())
    .toBe(arg1.format())
  expect(dayex.min([arg1]).format())
    .toBe(arg1.format())
})
