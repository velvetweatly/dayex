import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import isoWeek from '../../src/plugin/isoWeek'
import utc from '../../src/plugin/utc'

dayex.extend(isoWeek)
dayex.extend(utc)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('get isoWeek', () => {
  expect(dayex().isoWeek()).toBe(moment().isoWeek())
})

it('set isoWeek', () => {
  expect(dayex().isoWeek(1).valueOf()).toBe(moment().isoWeek(1).valueOf())
  expect(dayex().isoWeek(52).valueOf()).toBe(moment().isoWeek(52).valueOf())
})

it('get isoWeekYear', () => {
  expect(dayex().isoWeekYear()).toBe(moment().isoWeekYear())
})

it('startOf/endOf isoWeek', () => {
  const ISOWEEK = 'isoWeek'
  expect(dayex().startOf(ISOWEEK).valueOf()).toBe(moment().startOf(ISOWEEK).valueOf())
  expect(dayex().endOf(ISOWEEK).valueOf()).toBe(moment().endOf(ISOWEEK).valueOf())
})

it('isoWeekday', () => {
  expect(dayex().isoWeekday()).toBe(moment().isoWeekday())
  expect(dayex('20200301').isoWeekday(1).valueOf()).toBe(moment('20200301').isoWeekday(1).valueOf()) // Sunday this.day() -> 0
  for (let i = 0; i < 7; i += 1) {
    expect(dayex().add(i, 'day').isoWeekday()).toBe(moment().add(i, 'day').isoWeekday())
    expect(dayex().isoWeekday(i).valueOf()).toBe(moment().isoWeekday(i).valueOf())
    expect(dayex().add(1, 'day').isoWeekday(i).valueOf()).toBe(moment().add(1, 'day').isoWeekday(i).valueOf())
  }
})

it('isoWeek of year', () => {
  expect(dayex().isoWeek(1).isoWeek()).toBe(1)
  expect(dayex().isoWeek(27).isoWeek()).toBe(27)


  expect(dayex('20191223').isoWeekYear()).toBe(2019)
  expect(dayex('20191223').isoWeek()).toBe(52)
  expect(dayex('20191224').isoWeekYear()).toBe(2019)
  expect(dayex('20191224').isoWeek()).toBe(52)
  expect(dayex('20191225').isoWeekYear()).toBe(2019)
  expect(dayex('20191225').isoWeek()).toBe(52)
  expect(dayex('20191226').isoWeekYear()).toBe(2019)
  expect(dayex('20191226').isoWeek()).toBe(52)
  expect(dayex('20191227').isoWeekYear()).toBe(2019)
  expect(dayex('20191227').isoWeek()).toBe(52)
  expect(dayex('20191228').isoWeekYear()).toBe(2019)
  expect(dayex('20191228').isoWeek()).toBe(52)
  expect(dayex('20191229').isoWeekYear()).toBe(2019)
  expect(dayex('20191229').isoWeek()).toBe(52)

  expect(dayex('20191230').isoWeekYear()).toBe(2020)
  expect(dayex('20191230').isoWeek()).toBe(1)
  expect(dayex('20191231').isoWeekYear()).toBe(2020)
  expect(dayex('20191231').isoWeek()).toBe(1)
  expect(dayex('20200101').isoWeekYear()).toBe(2020)
  expect(dayex('20200101').isoWeek()).toBe(1)
  expect(dayex('20200102').isoWeekYear()).toBe(2020)
  expect(dayex('20200102').isoWeek()).toBe(1)
  expect(dayex('20200103').isoWeekYear()).toBe(2020)
  expect(dayex('20200103').isoWeek()).toBe(1)
  expect(dayex('20200104').isoWeekYear()).toBe(2020)
  expect(dayex('20200104').isoWeek()).toBe(1)
  expect(dayex('20200105').isoWeekYear()).toBe(2020)
  expect(dayex('20200105').isoWeek()).toBe(1)

  expect(dayex('20200106').isoWeekYear()).toBe(2020)
  expect(dayex('20200106').isoWeek()).toBe(2)
  expect(dayex('20200107').isoWeekYear()).toBe(2020)
  expect(dayex('20200107').isoWeek()).toBe(2)


  expect(dayex('20201223').isoWeekYear()).toBe(2020)
  expect(dayex('20201223').isoWeek()).toBe(52)
  expect(dayex('20201224').isoWeekYear()).toBe(2020)
  expect(dayex('20201224').isoWeek()).toBe(52)
  expect(dayex('20201225').isoWeekYear()).toBe(2020)
  expect(dayex('20201225').isoWeek()).toBe(52)
  expect(dayex('20201226').isoWeekYear()).toBe(2020)
  expect(dayex('20201226').isoWeek()).toBe(52)
  expect(dayex('20201227').isoWeekYear()).toBe(2020)
  expect(dayex('20201227').isoWeek()).toBe(52)

  expect(dayex('20201228').isoWeekYear()).toBe(2020)
  expect(dayex('20201228').isoWeek()).toBe(53)
  expect(dayex('20201229').isoWeekYear()).toBe(2020)
  expect(dayex('20201229').isoWeek()).toBe(53)
  expect(dayex('20201230').isoWeekYear()).toBe(2020)
  expect(dayex('20201230').isoWeek()).toBe(53)
  expect(dayex('20201231').isoWeekYear()).toBe(2020)
  expect(dayex('20201231').isoWeek()).toBe(53)
  expect(dayex('20210101').isoWeekYear()).toBe(2020)
  expect(dayex('20210101').isoWeek()).toBe(53)
  expect(dayex('20210102').isoWeekYear()).toBe(2020)
  expect(dayex('20210102').isoWeek()).toBe(53)
  expect(dayex('20210103').isoWeekYear()).toBe(2020)
  expect(dayex('20210103').isoWeek()).toBe(53)

  expect(dayex('20210104').isoWeekYear()).toBe(2021)
  expect(dayex('20210104').isoWeek()).toBe(1)
  expect(dayex('20210105').isoWeekYear()).toBe(2021)
  expect(dayex('20210105').isoWeek()).toBe(1)
  expect(dayex('20210106').isoWeekYear()).toBe(2021)
  expect(dayex('20210106').isoWeek()).toBe(1)
  expect(dayex('20210107').isoWeekYear()).toBe(2021)
  expect(dayex('20210107').isoWeek()).toBe(1)
  expect(dayex('20210108').isoWeekYear()).toBe(2021)
  expect(dayex('20210108').isoWeek()).toBe(1)
  expect(dayex('20210109').isoWeekYear()).toBe(2021)
  expect(dayex('20210109').isoWeek()).toBe(1)
  expect(dayex('20210110').isoWeekYear()).toBe(2021)
  expect(dayex('20210110').isoWeek()).toBe(1)
})


it('utc mode', () => {
  // Wednesday, 1 January 2020 00:00:00 UTC
  const d = dayex.utc(1577836800000).isoWeek()
  expect(d).toBe(1)
  expect(moment.utc(1577836800000).isoWeek()).toBe(d)
})
