import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import * as C from '../../src/constant'
import relativeTime from '../../src/plugin/relativeTime'
import updateLocale from '../../src/plugin/updateLocale'
import utc from '../../src/plugin/utc'
import '../../src/locale/ru'

dayex.extend(relativeTime)

beforeEach(() => {
  MockDate.set(new Date('2018-04-04T16:00:00.000Z'))
})

afterEach(() => {
  MockDate.reset()
})

it('Time from X', () => {
  const T = [
    [0, 'second'], // a few seconds
    [1, 'second'], // a few seconds
    [44, 'second'], // a few seconds
    [44.4, 'second'], // a few seconds
    [44.5, 'second'], // a minute
    [45, 'second'], // a minute
    [1, 'minute'], // a minute
    [89, 'second'], // a minute
    [89.4, 'second'], // a minute
    [89.5, 'second'], // a minute
    [90, 'second'], // 2 minutes
    [44, 'minute'], // 44 minutes
    [44.4, 'minute'],
    [44.5, 'minute'],
    [45, 'minute'], // an hour
    [1, 'hour'], // an hour
    [89, 'minute'], // an hour
    [89.4, 'minute'],
    [89.5, 'minute'],
    [90, 'minute'], // 2 hours
    [21, 'hour'], // 21 hours
    [21.4, 'hour'],
    [21.5, 'hour'],
    [22, 'hour'], // a day
    [1, 'day'], // a day
    [35, 'hour'], // a day
    [35.4, 'hour'],
    [35.5, 'hour'],
    [36, 'hour'], // 2 days
    [25, 'day'], // 25 days
    [26, 'day'], // a month
    [1, 'month'], // a month
    [45, 'day'], // a month
    [47, 'day'], // 2 month
    [10, 'month'], // 10 month
    [11, 'month'], // a year
    [1, 'year'], // a year
    [17, 'month'], // a year
    [18, 'month'] // 2 years
  ]

  T.forEach((t) => {
    expect(dayex().from(dayex().add(t[0], t[1]))).toBe(moment().from(moment().add(t[0], t[1])))
  })
  // withoutSuffix
  expect(dayex().from(dayex().add(3, 'year'), true)).toBe(moment().from(moment().add(3, 'year'), true))
  // past date
  expect(dayex().from(dayex().subtract(3, 'year'))).toBe(moment().from(moment().subtract(3, 'year')))
})

it('Time from now', () => {
  expect(dayex().fromNow()).toBe(moment().fromNow())
  expect(dayex().fromNow(true)).toBe(moment().fromNow(true))
})

it('Time to now', () => {
  expect(dayex().toNow()).toBe(moment().toNow())
  expect(dayex().toNow(true)).toBe(moment().toNow(true))
})

it('Time to X', () => {
  // withoutSuffix
  expect(dayex().to(dayex().add(3, 'year'), true)).toBe(moment().to(moment().add(3, 'year'), true))
  // past date
  expect(dayex().to(dayex().subtract(3, 'year'))).toBe(moment().to(moment().subtract(3, 'year')))
})

it('Locale Function', () => {
  // e.g. in ru locale, m: x minute require additional processing
  // and provides as a function instead of a string
  const str0 = '2020-01-06 15:53:00'
  const str = '2020-01-06 15:52:15'
  const result = dayex(str0).locale('ru').to(str)
  expect(result).toEqual(expect.any(String))
})

// https://github.com/velvetweatly/dayex/issues/646
it('Time from now with UTC', () => {
  dayex.extend(utc)

  expect(dayex.utc().fromNow()).toBe(moment.utc().fromNow())

  const currentTime = new Date()
  const currentTimestamp = currentTime.getTime()
  const currentTimestampAfter37hrs = currentTimestamp + (37 * 60 * 60 * 1000)

  let dutc = dayex.utc(currentTimestampAfter37hrs)
  let mutc = moment.utc(currentTimestampAfter37hrs)

  expect(dutc.fromNow()).toBe(mutc.fromNow())

  // More precise
  const currentTimestampAfter36hrs = currentTimestamp + (36.0001 * 60 * 60 * 1000)
  dutc = dayex.utc(currentTimestampAfter36hrs)
  mutc = moment.utc(currentTimestampAfter36hrs)

  expect(dutc.fromNow()).toBe(mutc.fromNow())
})

it('Custom thresholds and rounding support', () => {
  expect(dayex().subtract(45, 'm').fromNow()).toBe('an hour ago')
  delete relativeTime.$i // this allow plugin to be installed again
  dayex.extend(relativeTime, {
    rounding: Math.floor,
    thresholds: [
      { l: 's', r: 1 },
      { l: 'm', r: 1 },
      { l: 'mm', r: 59, d: C.MIN },
      { l: 'h', r: 1 },
      { l: 'hh', r: 23, d: C.H },
      { l: 'd', r: 1 },
      { l: 'dd', r: 29, d: C.D },
      { l: 'M', r: 1 },
      { l: 'MM', r: 11, d: C.M },
      { l: 'y' },
      { l: 'yy', d: C.Y }
    ]
  })
  expect(dayex().subtract(45, 'm').fromNow()).toBe('45 minutes ago')
})

it('Locale without relativeTime config fallback', () => {
  expect(dayex().locale({
    name: 'test-locale'
  }).fromNow()).toEqual(expect.any(String))
})

it('Past and Future keys should support function for additional processing', () => {
  dayex.extend(updateLocale)
  dayex.updateLocale('en', {
    relativeTime: {
      future: input => `${input} modified`,
      past: input => `${input} modified`,
      s: 'just now',
      m: ' 1 min',
      mm: '%d min',
      h: '1 hr',
      hh: '%d hrs',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    }
  })


  const past = Date.now() - 1000
  expect(dayex(past).fromNow()).toEqual(' 1 min modified')
  const future = Date.now() + 1000
  expect(dayex(future).fromNow()).toEqual(' 1 min modified')
})
