import MockDate from 'mockdate'
import dayex from 'dayex'
import negativeYear from '../../src/plugin/negativeYear'
import utc from '../../src/plugin/utc'
import { REGEX_PARSE } from '../../src/constant'


dayex.extend(negativeYear)
dayex.extend(utc)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('negativeYear', () => {
  it('parses negative years', () => {
    expect(dayex('-2020-01-01').year()).toBe(-2020)
    const date = '-2021/01/03'
    const date2 = '01/03/-2021'
    const date3 = '01-03--2021'
    const date4 = '-03-15'
    const d = date.match(REGEX_PARSE)
    expect(dayex(date).format('YYYY-MM-DD')).toBe('-2021-01-03')
    expect(dayex(date2).format('YYYY-MM-DD')).toBe('Invalid Date')
    expect(dayex(date3).format()).toBe('Invalid Date')
    expect(dayex(date4).format('YYYY-MM-DD')).toBe('2001-03-15')
    expect(d).toBe(null)
  })

  it('does not parse non-negative years', () => {
    expect(dayex('2020-01-01').year()).toBe(2020)
  })

  it('works with other plugins', () => {
    expect(dayex.utc('-2020-01-01').year()).toBe(-2020)
  })

  it('Add and subtract with negative years', () => {
    expect(dayex('-2006').add(1, 'y')).toEqual(dayex('-2005'))
    expect(dayex('-2006').subtract(1, 'y')).toEqual(dayex('-2007'))
    expect(dayex('-2006').add(1, 'y').format('YYYY')).toBe(dayex('-2005').format('YYYY'))
    expect(dayex('-2006').subtract(1, 'y').format('YYYY')).toBe(dayex('-2007').format('YYYY'))
  })

  it('Compare date with negative years', () => {
    expect(dayex('-2006').isAfter(dayex('-2007'))).toBeTruthy()
    expect(dayex('-2006').isBefore(dayex('-2005'))).toBeTruthy()
    expect(dayex('-2006').isSame('-2006')).toBeTruthy()
  })
})
