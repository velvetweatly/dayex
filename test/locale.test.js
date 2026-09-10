import MockDate from 'mockdate'
import moment from 'moment'
import dayex from '../src'
import es from '../src/locale/es'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

const format = 'dddd D, MMMM'
const NOT_SUPPORTED_LOCALE_STRING = 'not_supported_locale_string'

it('Uses spanish locale through constructor', () => { // not recommend
  expect(dayex('2018-4-28', { locale: es })
    .format(format))
    .toBe('sábado 28, abril')
})

it('set locale for one instance only', () => {
  expect(dayex('2018-4-28')
    .format(format))
    .toBe('Saturday 28, April')

  expect(dayex('2018-4-28')
    .locale(es).format(format))
    .toBe('sábado 28, abril')

  expect(dayex('2018-4-28')
    .format(format))
    .toBe('Saturday 28, April')
})

it('set global locale', () => {
  dayex.locale('en')
  expect(dayex('2018-4-28').format(format))
    .toBe('Saturday 28, April')
  dayex.locale(es)
  expect(dayex('2018-4-28').format(format))
    .toBe('sábado 28, abril')
  dayex.locale('en')
  expect(dayex('2018-4-28').format(format))
    .toBe('Saturday 28, April')
})

it('get instance locale name', () => {
  expect(dayex().locale()).toBe('en')
  expect(dayex().locale()).toBe(moment().locale())
  expect(dayex().locale('es').locale()).toBe('es')
  expect(dayex().locale('es').locale()).toBe(moment().locale('es').locale())
  dayex.locale(es)
  moment.locale('es')
  expect(dayex().locale()).toBe('es')
  expect(dayex().locale()).toBe(moment().locale())
})

it('immutable instance locale', () => {
  dayex.locale('en')
  const origin = dayex('2018-4-28')
  expect(origin.format(format))
    .toBe('Saturday 28, April')
  expect(origin.locale('es').format(format))
    .toBe('sábado 28, abril')
  const changed = origin.locale('es')
  expect(changed.format(format))
    .toBe('sábado 28, abril')
  expect(origin.format(format))
    .toBe('Saturday 28, April')
})

it('User custom locale', () => {
  expect(dayex('2018-4-28')
    .locale('xx', {
      weekdays: Array(7).fill('week'),
      months: Array(12).fill('month')
    })
    .format(format))
    .toBe('week 28, month')
})

describe('Instance locale inheritance', () => {
  const esDayex = dayex('2018-4-28').locale(es)

  it('Clone', () => {
    expect(esDayex.clone().format(format))
      .toBe('sábado 28, abril')
    expect(dayex(esDayex).format(format))
      .toBe('sábado 28, abril')
  })

  it('StartOf EndOf', () => {
    expect(esDayex.startOf('year').format(format))
      .toBe('lunes 1, enero')
    expect(esDayex.endOf('day').format(format))
      .toBe('sábado 28, abril')
  })

  it('Set', () => {
    expect(esDayex.set('year', 2017).format(format))
      .toBe('viernes 28, abril')
  })

  it('Add', () => {
    expect(esDayex.add(1, 'year').format(format))
      .toBe('domingo 28, abril')
    expect(esDayex.add(1, 'month').format(format))
      .toBe('lunes 28, mayo')
    expect(esDayex.add(1, 'minute').format(format))
      .toBe('sábado 28, abril')
  })

  it('dayex.locale() returns locale name', () => {
    dayex.locale(es)
    moment.locale('es')
    expect(dayex.locale()).toBe(moment.locale())

    dayex.locale('en')
    moment.locale('en')
    expect(dayex.locale()).toBe(moment.locale())
  })
})


it('Not supported locale string fallback to previous one (instance)', () => {
  const D = dayex()
  expect(D.locale()).toBe('en')
  const D2 = D.locale(NOT_SUPPORTED_LOCALE_STRING)
  expect(D2.locale()).toBe('en')
  expect(D2.format()).toBe(D.format())
  const D3 = D2.locale('es')
  expect(D3.locale()).toBe('es')
  const D4 = D3.locale(NOT_SUPPORTED_LOCALE_STRING)
  expect(D4.locale()).toBe('es')
})

it('Not supported locale string fallback to previous one (global)', () => {
  expect(dayex().locale()).toBe('en')
  dayex.locale(NOT_SUPPORTED_LOCALE_STRING)
  expect(dayex().locale()).toBe('en')
  dayex.locale('es')
  expect(dayex().locale()).toBe('es')
  dayex.locale(NOT_SUPPORTED_LOCALE_STRING)
  expect(dayex().locale()).toBe('es')
})
