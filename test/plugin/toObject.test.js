import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../../src'
import toObject from '../../src/plugin/toObject'

dayex.extend(toObject)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('As Object -> toObject', () => {
  expect(dayex().toObject()).toEqual(moment().toObject())
})
