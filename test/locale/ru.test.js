import moment from 'moment'
import MockDate from 'mockdate'
import dayex from '../../src'
import relativeTime from '../../src/plugin/relativeTime'
import '../../src/locale/ru'

dayex.extend(relativeTime)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Format Month with locale function', () => {
  for (let i = 0; i <= 7; i += 1) {
    const dayexRU = dayex().locale('ru').add(i, 'day')
    const momentRU = moment().locale('ru').add(i, 'day')
    const testFormat1 = 'DD MMMM YYYY MMM'
    const testFormat2 = 'MMMM'
    const testFormat3 = 'MMM'
    expect(dayexRU.format(testFormat1)).toEqual(momentRU.format(testFormat1))
    expect(dayexRU.format(testFormat2)).toEqual(momentRU.format(testFormat2))
    expect(dayexRU.format(testFormat3)).toEqual(momentRU.format(testFormat3))
  }
})

it('RelativeTime: Time from X', () => {
  const T = [
    [44.4, 'second'], // a few seconds
    [89.5, 'second'], // a minute
    [43, 'minute'], // 44 minutes
    [21, 'hour'], // 21 hours
    [25, 'day'], // 25 days
    [10, 'month'], // 2 month
    [18, 'month'] // 2 years
  ]

  T.forEach((t) => {
    dayex.locale('ru')
    moment.locale('ru')
    expect(dayex().from(dayex().add(t[0], t[1])))
      .toBe(moment().from(moment().add(t[0], t[1])))
    expect(dayex().from(dayex().add(t[0], t[1]), true))
      .toBe(moment().from(moment().add(t[0], t[1]), true))
  })
})

it('Meridiem', () => {
  expect(dayex('2020-01-01 03:00:00').locale('ru').format('A')).toEqual('ночи')
  expect(dayex('2020-01-01 11:00:00').locale('ru').format('A')).toEqual('утра')
  expect(dayex('2020-01-01 16:00:00').locale('ru').format('A')).toEqual('дня')
  expect(dayex('2020-01-01 20:00:00').locale('ru').format('A')).toEqual('вечера')
})
