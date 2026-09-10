import moment from 'moment'
import MockDate from 'mockdate'
import dayex from '../../src'
import relativeTime from '../../src/plugin/relativeTime'
import '../../src/locale/et'

dayex.extend(relativeTime)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
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
    dayex.locale('et')
    moment.locale('et')
    expect(dayex().from(dayex().add(t[0], t[1])))
      .toBe(moment().from(moment().add(t[0], t[1])))
    expect(dayex().from(dayex().subtract(t[0], t[1])))
      .toBe(moment().from(moment().subtract(t[0], t[1])))
    expect(dayex().from(dayex().add(t[0], t[1]), true))
      .toBe(moment().from(moment().add(t[0], t[1]), true))
  })
})
