import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import buddhistEra from '../../src/plugin/buddhistEra'

dayex.extend(buddhistEra)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Format empty string', () => {
  expect(dayex().format()).toBe(moment().format())
})

it('Format Buddhist Era 2 digit', () => {
  expect(dayex().format('BB')).toBe(`${(moment().year() + 543) % 100}`)
})

it('Format Buddhist Era 4 digit', () => {
  expect(dayex().format('BBBB')).toBe(`${moment().year() + 543}`)
})

it('Format Buddhist Era 4 digit with other format', () => {
  const format = 'D MMM BBBB'
  const today = moment()
  const momentDate = today.format(format).replace('BBBB', today.year() + 543)
  expect(dayex().format(format)).toBe(momentDate)
})

it('Skips format strings inside brackets', () => {
  expect(dayex().format('[BBBB]')).toBe('BBBB')
  expect(dayex().format('[BB]')).toBe('BB')
})
