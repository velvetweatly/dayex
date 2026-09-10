import moment from 'moment'
import MockDate from 'mockdate'
import dayex from '../src'
import '../src/locale/zh-cn'
import '../src/locale/ar'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('StartOf EndOf', () => {
  it('StartOf EndOf Year ... with s and upper case', () => {
    const testArr = ['Year', 'year', 'YearS', 'month', 'day', 'date',
      'week', 'hour', 'minute', 'second']
    testArr.forEach((d) => {
      expect(dayex().startOf(d).valueOf()).toBe(moment().startOf(d).valueOf())
      expect(dayex().endOf(d).valueOf()).toBe(moment().endOf(d).valueOf())
    })
  })

  it('StartOf EndOf Other -> no change', () => {
    expect(dayex().startOf('otherString').valueOf()).toBe(moment().startOf('otherString').valueOf())
    expect(dayex().endOf('otherString').valueOf()).toBe(moment().endOf('otherString').valueOf())
  })

  it('StartOf week with locale', () => {
    const testDate = [undefined, '2019-02-10', '2019-02-11', '2019-02-12', '2019-02-13', '2019-02-14', '2019-02-15', '2019-02-16']
    const testLocale = ['zh-cn', 'ar', 'en']
    testDate.forEach((d) => {
      testLocale.forEach((l) => {
        expect(dayex(d).locale(l).startOf('week').date())
          .toBe(moment(d).locale(l).startOf('week').date())
        expect(dayex(d).locale(l).endOf('week').date())
          .toBe(moment(d).locale(l).endOf('week').date())
      })
    })
  })
})


it('Add Time days', () => {
  expect(dayex().add(1, 'ms').valueOf()).toBe(moment().add(1, 'ms').valueOf())
  expect(dayex().add(1, 'milliseconds').valueOf()).toBe(moment().add(1, 'milliseconds').valueOf())
  expect(dayex().add(1, 's').valueOf()).toBe(moment().add(1, 's').valueOf())
  expect(dayex().add(1, 'seconds').valueOf()).toBe(moment().add(1, 'seconds').valueOf())
  expect(dayex().add(1, 'm').valueOf()).toBe(moment().add(1, 'm').valueOf())
  expect(dayex().add(1, 'minutes').valueOf()).toBe(moment().add(1, 'minutes').valueOf())
  expect(dayex().add(1, 'h').valueOf()).toBe(moment().add(1, 'h').valueOf())
  expect(dayex().add(1, 'hours').valueOf()).toBe(moment().add(1, 'hours').valueOf())
  expect(dayex().add(1, 'w').valueOf()).toBe(moment().add(1, 'w').valueOf())
  expect(dayex().add(1, 'weeks').valueOf()).toBe(moment().add(1, 'weeks').valueOf())
  expect(dayex().add(1, 'd').valueOf()).toBe(moment().add(1, 'd').valueOf())
  expect(dayex().add(1, 'days').valueOf()).toBe(moment().add(1, 'days').valueOf())
  expect(dayex().add(1, 'M').valueOf()).toBe(moment().add(1, 'M').valueOf())
  expect(dayex().add(1, 'y').valueOf()).toBe(moment().add(1, 'y').valueOf())
  expect(dayex('20111031').add(1, 'months').valueOf()).toBe(moment('20111031').add(1, 'months').valueOf())
  expect(dayex('20160131').add(1, 'months').valueOf()).toBe(moment('20160131').add(1, 'months').valueOf())
  expect(dayex('20160229').add(1, 'year').valueOf()).toBe(moment('20160229').add(1, 'year').valueOf())

  expect(dayex().add('2', 'years').valueOf()).toBe(moment().add('2', 'years').valueOf())
})

it('Add Time with decimal', () => {
  expect(dayex().add(0.4, 'day').valueOf()).toBe(moment().add(0.4, 'day').valueOf())
  expect(dayex().add(0.5, 'day').valueOf()).toBe(moment().add(0.5, 'day').valueOf())
  expect(dayex().add(0.4, 'week').valueOf()).toBe(moment().add(0.4, 'week').valueOf())
  expect(dayex().add(0.5, 'week').valueOf()).toBe(moment().add(0.5, 'week').valueOf())
})

it('Subtract Time days', () => {
  expect(dayex().subtract(1, 'days').valueOf()).toBe(moment().subtract(1, 'days').valueOf())
})
