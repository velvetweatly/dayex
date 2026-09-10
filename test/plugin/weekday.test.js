import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import weekday from '../../src/plugin/weekday'
import '../../src/locale/zh-cn'
import '../../src/locale/ar'

dayex.extend(weekday)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
  moment.locale('en')
  dayex.locale('en')
})

it('Sunday is the first day of the week', () => {
  expect(dayex().weekday()).toBe(moment().weekday())
  expect(dayex().weekday(0).date()).toBe(moment().weekday(0).date())
  expect(dayex().weekday(-7).format()).toBe(moment().weekday(-7).format())
  expect(dayex().weekday(7).format()).toBe(moment().weekday(7).format())
})

it('Monday is the first day of the week', () => {
  moment.locale('zh-cn')
  dayex.locale('zh-cn')
  expect(dayex().weekday()).toBe(moment().weekday())
  expect(dayex().weekday(0).date()).toBe(moment().weekday(0).date())
  expect(dayex().weekday(-7).format()).toBe(moment().weekday(-7).format())
  expect(dayex().weekday(7).format()).toBe(moment().weekday(7).format())
  const d1 = '2020-01-05'
  expect(dayex(d1).weekday()).toBe(moment(d1).weekday())
  const d2 = '2020-01-07'
  expect(dayex(d2).weekday()).toBe(moment(d2).weekday())
})

it('Saturday is the first day of the week', () => {
  moment.locale('ar')
  dayex.locale('ar')
  expect(dayex().weekday()).toBe(moment().weekday())
  expect(dayex().weekday(0).date()).toBe(moment().weekday(0).date())
  expect(dayex().weekday(-7).valueOf()).toBe(moment().weekday(-7).valueOf())
  expect(dayex().weekday(7).valueOf()).toBe(moment().weekday(7).valueOf())
})
