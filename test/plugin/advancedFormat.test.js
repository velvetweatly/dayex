import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import advancedFormat from '../../src/plugin/advancedFormat'
import isoWeek from '../../src/plugin/isoWeek'
import weekOfYear from '../../src/plugin/weekOfYear'
import weekYear from '../../src/plugin/weekYear'
import timezone from '../../src/plugin/timezone'
import utc from '../../src/plugin/utc'
import '../../src/locale/zh-cn'
import '../../src/locale/nl'

dayex.extend(utc)
dayex.extend(timezone)
dayex.extend(isoWeek)
dayex.extend(weekYear)
dayex.extend(weekOfYear)
dayex.extend(advancedFormat)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Format of invalid date', () => {
  expect(dayex(null).format('z').toLowerCase()).toEqual(moment(null).format('z').toLowerCase())
})

it('Format empty string', () => {
  expect(dayex().format()).toBe(moment().format())
})

it('Format Quarter Q', () => {
  expect(dayex().format('Q')).toBe(moment().format('Q'))
})

it('Format Timestamp X x', () => {
  expect(dayex().format('X')).toBe(moment().format('X'))
  expect(dayex().format('x')).toBe(moment().format('x'))
})

it('Format Day of Month Do 1 - 31', () => {
  expect(dayex().format('Do')).toBe(moment().format('Do'))
  let d = '2018-05-02 00:00:00.000'
  expect(dayex(d).format('Do')).toBe(moment(d).format('Do'))
  d = '2018-05-01 00:00:00.000'
  expect(dayex(d).format('Do')).toBe(moment(d).format('Do'))
  d = '2018-05-03 00:00:00.000'
  expect(dayex(d).format('Do')).toBe(moment(d).format('Do'))
  d = '2018-05-04 00:00:00.000'
  expect(dayex(d).format('Do')).toBe(moment(d).format('Do'))
  d = '2018-05-08 00:00:00.000'
  expect(dayex(d).locale('nl').format('Do')).toBe(moment(d).locale('nl').format('Do'))
  d = '2018-05-11'
  expect(dayex(d).format('Do')).toBe(moment(d).format('Do'))
  d = '2018-05-12'
  expect(dayex(d).format('Do')).toBe(moment(d).format('Do'))
  d = '2018-05-13'
  expect(dayex(d).format('Do')).toBe(moment(d).format('Do'))
  d = '2018-05-19 00:00:00.000'
  expect(dayex(d).locale('nl').format('Do')).toBe(moment(d).locale('nl').format('Do'))
  d = '2018-05-22'
  expect(dayex(d).format('Do')).toBe(moment(d).format('Do'))
})

it('Format Hour k kk 24-hour 1 - 24', () => {
  expect(dayex().format('k')).toBe(moment().format('k'))
  expect(dayex().format('kk')).toBe(moment().format('kk'))
  let d = '2018-05-02 00:00:00.000'
  expect(dayex(d).format('k')).toBe('24')
  expect(dayex(d).format('k')).toBe(moment(d).format('k'))
  expect(dayex(d).format('kk')).toBe('24')
  expect(dayex(d).format('kk')).toBe(moment(d).format('kk'))
  d = '2018-05-02 01:00:00.000'
  expect(dayex(d).format('k')).toBe('1')
  expect(dayex(d).format('k')).toBe(moment(d).format('k'))
  expect(dayex(d).format('kk')).toBe('01')
  expect(dayex(d).format('kk')).toBe(moment(d).format('kk'))
  d = '2018-05-02 23:59:59.999'
  expect(dayex(d).format('k')).toBe('23')
  expect(dayex(d).format('k')).toBe(moment(d).format('k'))
  expect(dayex(d).format('kk')).toBe('23')
  expect(dayex(d).format('kk')).toBe(moment(d).format('kk'))
})

it('Format Week of Year wo', () => {
  const d = '2018-12-01'
  expect(dayex(d).format('wo')).toBe(moment(d).format('wo'))
  expect(dayex(d).locale('zh-cn').format('wo'))
    .toBe(moment(d).locale('zh-cn').format('wo'))
})

it('Format Week of Year wo', () => {
  const d = '2018-12-01'
  expect(dayex(d).format('wo')).toBe(moment(d).format('wo'))
  expect(dayex(d).locale('zh-cn').format('wo'))
    .toBe(moment(d).locale('zh-cn').format('wo'))
})

it('Format Week Year gggg', () => {
  const d = '2018-12-31'
  expect(dayex(d).format('gggg')).toBe(moment(d).format('gggg'))
})

it('Format Iso Week Year GGGG', () => {
  const d = '2021-01-01'
  expect(dayex(d).format('GGGG')).toBe(moment(d).format('GGGG'))
})

it('Format Iso Week of Year', () => {
  const d = '2021-01-01'
  expect(dayex(d).format('W')).toBe(moment(d).format('W'))
  expect(dayex(d).format('WW')).toBe(moment(d).format('WW'))
})

it('Format offsetName z zzz', () => {
  const dtz = dayex.tz('2012-03-11 01:59:59', 'America/New_York')
  expect(dtz.format('z')).toBe('EST')
  expect(dtz.format('zzz')).toBe('Eastern Standard Time')
  expect(dayex().format('z')).toBeDefined()
  expect(dayex().format('zzz')).toBeDefined()
})

it('Skips format strings inside brackets', () => {
  expect(dayex().format('[Q]')).toBe('Q')
  expect(dayex().format('[Do]')).toBe('Do')
  expect(dayex().format('[gggg]')).toBe('gggg')
  expect(dayex().format('[GGGG]')).toBe('GGGG')
  expect(dayex().format('[w]')).toBe('w')
  expect(dayex().format('[ww]')).toBe('ww')
  expect(dayex().format('[W]')).toBe('W')
  expect(dayex().format('[WW]')).toBe('WW')
  expect(dayex().format('[wo]')).toBe('wo')
  expect(dayex().format('[k]')).toBe('k')
  expect(dayex().format('[kk]')).toBe('kk')
  expect(dayex().format('[X]')).toBe('X')
  expect(dayex().format('[x]')).toBe('x')
})
