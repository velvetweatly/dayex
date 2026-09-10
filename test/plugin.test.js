import MockDate from 'mockdate'
import dayex from '../src'

const testPlugin = (o, c, d) => {
  c.prototype.newApi = () => ('hello world')
  d.newFunc = () => ('hi world')
}
const testPluginWithConfig = (o, c) => {
  c.prototype.newApiWithConfig = () => (`hello world ${o || ''}`)
}

dayex.extend(testPlugin)
dayex.extend(testPluginWithConfig, 'good')

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Plugin extend method and option', () => {
  expect(dayex().newApi()).toBe('hello world')
  expect(dayex().newApiWithConfig()).toBe('hello world good')
})

it('Plugin extend dayex', () => {
  expect(dayex.newFunc()).toBe('hi world')
})

it('Plugin use core utils', () => {
  // u => isUndefined
  expect(dayex().$utils().u).toBeInstanceOf(Function)
})
