import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import quarterOfYear from '../../src/plugin/quarterOfYear'

dayex.extend(quarterOfYear)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('get QuarterOfYear', () => {
  expect(dayex('2013-01-01T00:00:00.000').quarter()).toBe(1)
  expect(dayex('2013-04-01T00:00:00.000').subtract(1, 'ms').quarter()).toBe(1)
  expect(dayex('2013-04-01T00:00:00.000').quarter()).toBe(2)
  expect(dayex('2013-07-01T00:00:00.000').subtract(1, 'ms').quarter()).toBe(2)
  expect(dayex('2013-07-01T00:00:00.000').quarter()).toBe(3)
  expect(dayex('2013-10-01T00:00:00.000').subtract(1, 'ms').quarter()).toBe(3)
  expect(dayex('2013-10-01T00:00:00.000').quarter()).toBe(4)
  expect(dayex('2014-01-01T00:00:00.000').subtract(1, 'ms').quarter()).toBe(4)
})

it('set QuarterOfYear', () => {
  const d1 = '2013-01-01T00:00:00.000'
  expect(dayex(d1).quarter(2).format())
    .toBe(moment(d1).quarter(2).format())
  const d2 = '2013-02-05T05:06:07.000'
  expect(dayex(d2).quarter(2).format())
    .toBe(moment(d2).quarter(2).format())
  const d3 = '2018-11-25T05:06:07.000'
  expect(dayex(d3).quarter(3).format())
    .toBe(moment(d3).quarter(3).format())
})

it('add subtract quarter', () => {
  expect(dayex().add(2, 'quarter').format())
    .toBe(moment().add(2, 'quarter').format())
  expect(dayex().subtract(2, 'quarter').format())
    .toBe(moment().subtract(2, 'quarter').format())
})

it('startOf endOf quarter', () => {
  expect(dayex().startOf('quarter').format())
    .toBe(moment().startOf('quarter').format())
  expect(dayex().endOf('quarter').format())
    .toBe(moment().endOf('quarter').format())
})
