import MockDate from 'mockdate'
import dayex from '../../src'
import relativeTime from '../../src/plugin/relativeTime'
import '../../src/locale/ru'
import locale from '../../src/locale/ar-ma'

dayex.extend(relativeTime)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Meridiem', () => {
  dayex.locale(locale)
  expect(dayex('2020-01-01 03:00:00').locale('ar-ma').format('A')).toEqual('ص')
  expect(dayex('2020-01-01 11:00:00').locale('ar-ma').format('A')).toEqual('ص')
  expect(dayex('2020-01-01 16:00:00').locale('ar-ma').format('A')).toEqual('م')
  expect(dayex('2020-01-01 20:00:00').locale('ar-ma').format('A')).toEqual('م')
})
