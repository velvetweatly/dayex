import moment from 'moment'
import dayex from '../../src'
import relativeTime from '../../src/plugin/relativeTime'
import '../../src/locale/hu'

dayex.extend(relativeTime)

it('RelativeTime: Time from X', () => {
  const T = [
    [44.4, 'second'], // a few seconds
    [89.5, 'second'], // a minute
    [2, 'minute'], // 2 minutes
    [43, 'minute'], // 43 minutes
    [45, 'minute'], // an hour
    [3, 'hour'], // 3 hours
    [21, 'hour'], // 21 hours
    [1, 'day'], // a day
    [3, 'day'], // 3 day
    [25, 'day'], // 25 days
    [1, 'month'], // a month
    [2, 'month'], // 2 month
    [10, 'month'], // 10 month
    [1, 'year'], // a year
    [2, 'year'], // 2 year
    [5, 'year'], // 5 year
    [18, 'month'] // 2 years
  ]

  T.forEach((t) => {
    dayex.locale('hu')
    moment.locale('hu')

    const dayexDay = dayex()
    const momentDay = moment()

    const dayexCompare = dayex().add(t[0], t[1])
    const momentCompare = moment().add(t[0], t[1])

    expect(dayexDay.from(dayexCompare)).toBe(momentDay.from(momentCompare))

    expect(dayexDay.to(dayexCompare)).toBe(momentDay.to(momentCompare))

    expect(dayexDay.from(dayexCompare, true)).toBe(momentDay.from(momentCompare, true))
  })
})
