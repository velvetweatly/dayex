import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import bigIntSupport from '../../src/plugin/bigIntSupport'

dayex.extend(bigIntSupport)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

/* global BigInt */

it('Parse BigInt ts and tsms', () => {
  const tsms = 1666310421101
  const tsmsBig = BigInt(tsms)
  const ts = 1666311003
  const tsBig = BigInt(ts)
  const momentTsms = moment(tsms)
  const momentTs = moment.unix(ts)
  expect(dayex(tsms).valueOf()).toBe(momentTsms.valueOf())
  expect(dayex(tsms).valueOf()).toBe(dayex(tsmsBig).valueOf())
  expect(dayex.unix(ts).valueOf()).toBe(momentTs.valueOf())
  expect(dayex.unix(tsBig).valueOf()).toBe(dayex.unix(tsBig).valueOf())
})

