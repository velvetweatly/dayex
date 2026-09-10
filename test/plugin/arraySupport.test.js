import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import arraySupport from '../../src/plugin/arraySupport'
import utc from '../../src/plugin/utc'

dayex.extend(utc)
dayex.extend(arraySupport)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('parse empty array', () => {
  it('local', () => {
    expect(dayex([]).format())
      .toBe(moment([]).format())
  })
  it('utc', () => {
    expect(dayex.utc([]).format())
      .toBe(moment.utc([]).format())
  })
})

const testArrs = [
  [2010, 1, 14, 15, 25, 50, 125],
  [2010],
  [2010, 6],
  [2010, 6, 10]
]

describe('parse array local', () => {
  testArrs.forEach((testArr) => {
    it(testArr, () => {
      expect(dayex(testArr).format())
        .toBe(moment(testArr).format())
    })
  })
})

describe('parse array utc', () => {
  testArrs.forEach((testArr) => {
    it(testArr, () => {
      expect(dayex.utc(testArr).format())
        .toBe(moment.utc(testArr).format())
    })
  })
})
