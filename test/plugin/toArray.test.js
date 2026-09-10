import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import toArray from '../../src/plugin/toArray'

dayex.extend(toArray)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('As Array -> toArray', () => {
  expect(dayex().toArray()).toEqual(moment().toArray())
})
