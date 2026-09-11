import MockDate from 'mockdate'
import dayex from '../../src'
import businessDay from '../../src/plugin/businessDay'

dayex.extend(businessDay)

const YMD = 'YYYY-MM-DD'
const ymd = inst => inst.format(YMD)

beforeEach(() => {
  MockDate.set(new Date())
  dayex.businessDay.reset()
})

afterEach(() => {
  dayex.businessDay.reset()
  MockDate.reset()
})

describe('config', () => {
  it('starts with weekday defaults and empty holiday lists', () => {
    const cfg = dayex.businessDay.get()
    expect(cfg.workingWeekdays).toEqual([1, 2, 3, 4, 5])
    expect(cfg.holidays).toEqual([])
    expect(cfg.additionalWorkingDays).toEqual([])
    expect(cfg.holidayFormat).toBe(YMD)
  })

  it('set merges keys and get returns a copy', () => {
    const holidays = ['2026-01-01']
    dayex.businessDay.set({ holidays })
    const first = dayex.businessDay.get()
    first.holidays.push('2026-12-25')
    first.workingWeekdays.push(6)
    expect(dayex.businessDay.get().holidays).toEqual(['2026-01-01'])
    expect(dayex.businessDay.get().workingWeekdays).toEqual([1, 2, 3, 4, 5])
    dayex.businessDay.set({ workingWeekdays: [0, 1, 2, 3, 4] })
    expect(dayex.businessDay.get().workingWeekdays).toEqual([0, 1, 2, 3, 4])
    expect(dayex.businessDay.get().holidays).toEqual(['2026-01-01'])
  })

  it('set ignores non-objects and drops invalid weekdays', () => {
    dayex.businessDay.set(null)
    dayex.businessDay.set('nope')
    dayex.businessDay.set({ workingWeekdays: [1, 1, 8, -1, 5] })
    expect(dayex.businessDay.get().workingWeekdays).toEqual([1, 5])
  })

  it('set coerces a single holiday value into a list', () => {
    dayex.businessDay.set({ holidays: '2026-01-01', additionalWorkingDays: '2026-01-03' })
    expect(dayex.businessDay.get().holidays).toEqual(['2026-01-01'])
    expect(dayex.businessDay.get().additionalWorkingDays).toEqual(['2026-01-03'])
    dayex.businessDay.set({ holidays: null, additionalWorkingDays: null })
    expect(dayex.businessDay.get().holidays).toEqual([])
    expect(dayex.businessDay.get().additionalWorkingDays).toEqual([])
    dayex.businessDay.addHolidays(undefined)
    expect(dayex.businessDay.get().holidays).toEqual([])
  })

  it('addHolidays accepts a single value or a list', () => {
    dayex.businessDay.addHolidays('2026-01-01')
    dayex.businessDay.addHolidays(['2026-03-01', { date: '12-25', name: 'Christmas' }])
    expect(dayex.businessDay.get().holidays).toEqual([
      '2026-01-01',
      '2026-03-01',
      { date: '12-25', name: 'Christmas' }
    ])
  })

  it('removeHolidays matches strings, objects, dates, and functions', () => {
    const easter = inst => inst.format(YMD) === '2026-04-05'
    const newYear = new Date(2026, 0, 1)
    dayex.businessDay.set({
      holidays: [
        '2026-01-01',
        { date: '2026-03-01', name: 'Samil' },
        easter,
        newYear,
        { date: '12-25' }
      ]
    })
    dayex.businessDay.removeHolidays(['2026-01-01', { date: '2026-03-01' }])
    dayex.businessDay.removeHolidays(easter)
    dayex.businessDay.removeHolidays(new Date(2026, 0, 1))
    expect(dayex.businessDay.get().holidays).toEqual([{ date: '12-25' }])
    dayex.businessDay.removeHolidays([{ date: '12-25' }])
    expect(dayex.businessDay.get().holidays).toEqual([])
    dayex.businessDay.set({ holidays: [{ kind: 'unknown' }, '2026-06-06'] })
    dayex.businessDay.removeHolidays([{ kind: 'other' }])
    expect(dayex.businessDay.get().holidays.length).toBe(2)
    const invalidDate = new Date(NaN)
    dayex.businessDay.set({ holidays: [invalidDate] })
    dayex.businessDay.removeHolidays([new Date(NaN)])
    expect(dayex.businessDay.get().holidays.length).toBe(1)
    dayex.businessDay.removeHolidays([invalidDate])
    expect(dayex.businessDay.get().holidays).toEqual([])
  })

  it('reset restores the config from extend time', () => {
    dayex.businessDay.set({
      holidays: ['2026-01-01'],
      workingWeekdays: [0, 1, 2, 3, 4]
    })
    const afterReset = dayex.businessDay.reset()
    expect(afterReset.holidays).toEqual([])
    expect(afterReset.workingWeekdays).toEqual([1, 2, 3, 4, 5])
  })
})

describe('query', () => {
  it('isWeekend follows workingWeekdays and ignores additional working days', () => {
    expect(dayex('2026-01-02').isWeekend()).toBe(false)
    expect(dayex('2026-01-03').isWeekend()).toBe(true)
    expect(dayex('2026-01-04').isWeekend()).toBe(true)
    dayex.businessDay.set({
      workingWeekdays: [0, 1, 2, 3, 4],
      additionalWorkingDays: ['2026-01-03']
    })
    expect(dayex('2026-01-03').isWeekend()).toBe(true)
    expect(dayex('2026-01-03').isBusinessDay()).toBe(true)
    expect(dayex('2026-01-02').isWeekend()).toBe(true)
  })

  it('isHoliday and holiday() support strings, objects, recurring, Date, and functions', () => {
    const easter = (inst) => {
      if (inst.format(YMD) === '2026-04-05') return { name: 'Easter' }
      return false
    }
    dayex.businessDay.set({
      holidays: [
        '2026-01-01',
        { date: '2026-03-01', name: 'Samil' },
        { date: '12-25', name: 'Christmas' },
        '01-01',
        new Date(2026, 4, 5),
        easter,
        inst => inst.format(YMD) === '2026-08-15'
      ]
    })
    expect(dayex('2026-01-01').isHoliday()).toBe(true)
    expect(dayex('2026-01-01').holiday()).toEqual({ date: '2026-01-01' })
    expect(dayex('2026-03-01').holiday()).toEqual({ date: '2026-03-01', name: 'Samil' })
    expect(dayex('2027-12-25').holiday()).toEqual({ date: '2027-12-25', name: 'Christmas' })
    expect(dayex('2026-05-05').isHoliday()).toBe(true)
    expect(dayex('2026-04-05').holiday()).toEqual({ date: '2026-04-05', name: 'Easter' })
    expect(dayex('2026-08-15').holiday()).toEqual({ date: '2026-08-15' })
    expect(dayex('2026-01-02').isHoliday()).toBe(false)
    expect(dayex('2026-01-02').holiday()).toBeNull()
    expect(dayex('2026-01-09').isHoliday({
      holidays: [dayex('2026-01-09')]
    })).toBe(true)
    expect(dayex('2026-12-25').holiday({
      holidays: [{ date: '12-25' }]
    })).toEqual({ date: '2026-12-25' })
    expect(dayex('2026-01-01').isHoliday({ holidays: [new Date(NaN)] })).toBe(false)
  })

  it('isBusinessDay applies additionalWorkingDay over holiday and weekend', () => {
    dayex.businessDay.set({
      holidays: ['2026-01-01', '2026-01-02'],
      additionalWorkingDays: ['2026-01-03', '2026-01-01']
    })
    expect(dayex('2026-01-01').isBusinessDay()).toBe(true)
    expect(dayex('2026-01-01').isHoliday()).toBe(true)
    expect(dayex('2026-01-02').isBusinessDay()).toBe(false)
    expect(dayex('2026-01-03').isBusinessDay()).toBe(true)
    expect(dayex('2026-01-05').isBusinessDay()).toBe(true)
  })

  it('accepts per-call option overrides', () => {
    const us = { holidays: ['2026-07-03'] }
    expect(dayex('2026-07-03').isBusinessDay()).toBe(true)
    expect(dayex('2026-07-03').isBusinessDay(us)).toBe(false)
    expect(dayex('2026-07-03').isHoliday(us)).toBe(true)
  })

  it('invalid instances return false / null for queries', () => {
    const bad = dayex(null)
    expect(bad.isBusinessDay()).toBe(false)
    expect(bad.isHoliday()).toBe(false)
    expect(bad.isWeekend()).toBe(false)
    expect(bad.holiday()).toBeNull()
  })

  it('ignores unknown holiday entries', () => {
    dayex.businessDay.set({ holidays: [1, null, {}, { date: 12 }] })
    expect(dayex('2026-01-01').isHoliday()).toBe(false)
    expect(dayex('2026-01-01').isBusinessDay()).toBe(true)
  })

  it('matches custom holidayFormat strings', () => {
    dayex.businessDay.set({
      holidayFormat: 'YYYY/MM/DD',
      holidays: ['2026/01/01']
    })
    expect(dayex('2026-01-01').isHoliday()).toBe(true)
    expect(dayex('2026-01-01').holiday()).toEqual({ date: '2026/01/01' })
  })
})

describe('manipulate', () => {
  it('addBusinessDays skips weekends and does not count the start day', () => {
    const friday = dayex('2026-01-02T17:30:00')
    const monday = friday.addBusinessDays(1)
    expect(ymd(monday)).toBe('2026-01-05')
    expect(monday.format('HH:mm:ss')).toBe('17:30:00')
    expect(ymd(friday)).toBe('2026-01-02')
    expect(ymd(dayex('2026-01-03').addBusinessDays(1))).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-02').addBusinessDays(5))).toBe('2026-01-09')
  })

  it('addBusinessDays(0) clones without snapping', () => {
    expect(ymd(dayex('2026-01-03').addBusinessDays(0))).toBe('2026-01-03')
    expect(ymd(dayex('2026-01-02').addBusinessDays(0))).toBe('2026-01-02')
  })

  it('truncates fractional steps toward zero and rejects non-finite values', () => {
    expect(ymd(dayex('2026-01-02').addBusinessDays(1.9))).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-05').addBusinessDays(-1.9))).toBe('2026-01-02')
    expect(dayex('2026-01-02').addBusinessDays(NaN).isValid()).toBe(false)
    expect(dayex('2026-01-02').addBusinessDays(Infinity).isValid()).toBe(false)
  })

  it('subtractBusinessDays and negative add move backward', () => {
    expect(ymd(dayex('2026-01-05').subtractBusinessDays(1))).toBe('2026-01-02')
    expect(ymd(dayex('2026-01-05').addBusinessDays(-1))).toBe('2026-01-02')
    expect(ymd(dayex('2026-01-05').subtractBusinessDays(1)))
      .toBe(ymd(dayex('2026-01-05').addBusinessDays(-1)))
  })

  it('skips configured holidays while adding', () => {
    dayex.businessDay.set({ holidays: ['2026-01-06'] })
    expect(ymd(dayex('2026-01-05').addBusinessDays(1))).toBe('2026-01-07')
    expect(ymd(dayex('2026-01-07').subtractBusinessDays(1, {
      holidays: ['2026-01-06']
    }))).toBe('2026-01-05')
  })

  it('nextBusinessDay and prevBusinessDay are strictly adjacent', () => {
    expect(ymd(dayex('2026-01-05').nextBusinessDay())).toBe('2026-01-06')
    expect(ymd(dayex('2026-01-03').nextBusinessDay())).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-05').prevBusinessDay())).toBe('2026-01-02')
    expect(ymd(dayex('2026-01-04').prevBusinessDay())).toBe('2026-01-02')
  })

  it('toBusinessDay snaps with next, prev, and nearest (ties go prev)', () => {
    expect(ymd(dayex('2026-01-05').toBusinessDay())).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-03').toBusinessDay())).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-03').toBusinessDay('next'))).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-03').toBusinessDay('prev'))).toBe('2026-01-02')
    expect(ymd(dayex('2026-01-03').toBusinessDay('nearest'))).toBe('2026-01-02')
    expect(ymd(dayex('2026-01-04').toBusinessDay('nearest'))).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-07').toBusinessDay('nearest', {
      holidays: ['2026-01-07']
    }))).toBe('2026-01-06')
    expect(ymd(dayex('2026-01-03').toBusinessDay({ holidays: [] }))).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-03').toBusinessDay('unknown'))).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-01').toBusinessDay('nearest', {
      workingWeekdays: [],
      additionalWorkingDays: ['2026-01-02']
    }))).toBe('2026-01-02')
    expect(ymd(dayex('2026-01-02').toBusinessDay('nearest', {
      workingWeekdays: [],
      additionalWorkingDays: ['2026-01-01']
    }))).toBe('2026-01-01')
  })

  it('returns invalid when no business day exists within 366 days', () => {
    const none = { workingWeekdays: [] }
    expect(dayex('2026-01-01').addBusinessDays(1, none).isValid()).toBe(false)
    expect(dayex('2026-01-01').toBusinessDay('next', none).isValid()).toBe(false)
    expect(dayex('2026-01-01').toBusinessDay('nearest', none).isValid()).toBe(false)
  })

  it('invalid instances stay invalid when moved', () => {
    const bad = dayex(null)
    expect(bad.addBusinessDays(2).isValid()).toBe(false)
    expect(bad.subtractBusinessDays(2).isValid()).toBe(false)
    expect(bad.toBusinessDay().isValid()).toBe(false)
    expect(bad.firstBusinessDayOfMonth().isValid()).toBe(false)
    expect(bad.lastBusinessDayOfMonth().isValid()).toBe(false)
  })
})

describe('count and list', () => {
  it('businessDiff is signed and exclusive of the start day', () => {
    expect(dayex('2026-01-05').businessDiff('2026-01-02')).toBe(1)
    expect(dayex('2026-01-02').businessDiff('2026-01-05')).toBe(-1)
    expect(dayex('2026-01-02').businessDiff('2026-01-02')).toBe(0)
    expect(dayex('2026-01-03').businessDiff('2026-01-04')).toBe(0)
    expect(dayex('2026-01-09').businessDiff('2026-01-02')).toBe(5)
    expect(dayex('2026-01-05').businessDiff(dayex('2026-01-02'))).toBe(1)
  })

  it('businessDiff skips holidays on the slow path', () => {
    dayex.businessDay.set({ holidays: ['2026-01-06'] })
    expect(dayex('2026-01-07').businessDiff('2026-01-05')).toBe(1)
    expect(dayex('2026-01-05').businessDiff('2026-01-07')).toBe(-1)
  })

  it('businessDaysInMonth and businessDaysInYear count inclusively', () => {
    expect(dayex('2026-01-15').businessDaysInMonth()).toBe(22)
    dayex.businessDay.set({ holidays: ['2026-01-01'] })
    expect(dayex('2026-01-15').businessDaysInMonth()).toBe(21)
    dayex.businessDay.reset()
    expect(dayex('2026-01-01').businessDaysInYear()).toBe(261)
    dayex.businessDay.set({ holidays: ['2026-01-01', { date: '12-25' }] })
    expect(dayex('2026-06-01').businessDaysInYear()).toBe(259)
  })

  it('first and last business day of the month keep the original time', () => {
    const mid = dayex('2026-01-15T09:15:00')
    const first = mid.firstBusinessDayOfMonth()
    const last = mid.lastBusinessDayOfMonth()
    expect(ymd(first)).toBe('2026-01-01')
    expect(ymd(last)).toBe('2026-01-30')
    expect(first.format('HH:mm:ss')).toBe('09:15:00')
    expect(last.format('HH:mm:ss')).toBe('09:15:00')
    expect(ymd(dayex('2026-01-15').firstBusinessDayOfMonth({
      holidays: ['2026-01-01']
    }))).toBe('2026-01-02')
    expect(ymd(dayex('2026-01-15').lastBusinessDayOfMonth({
      holidays: ['2026-01-30']
    }))).toBe('2026-01-29')
  })

  it('first/last business day of month are invalid when the month has none', () => {
    const none = { workingWeekdays: [] }
    expect(dayex('2026-01-15').firstBusinessDayOfMonth(none).isValid()).toBe(false)
    expect(dayex('2026-01-15').lastBusinessDayOfMonth(none).isValid()).toBe(false)
    const janSaturdays = {
      workingWeekdays: [6],
      holidays: ['2026-01-03', '2026-01-10', '2026-01-17', '2026-01-24', '2026-01-31']
    }
    expect(dayex('2026-01-15').firstBusinessDayOfMonth(janSaturdays).isValid())
      .toBe(false)
    expect(dayex('2026-01-15').lastBusinessDayOfMonth(janSaturdays).isValid())
      .toBe(false)
    const decSaturdays = {
      workingWeekdays: [6],
      holidays: ['2026-12-05', '2026-12-12', '2026-12-19', '2026-12-26']
    }
    expect(dayex('2026-12-15').firstBusinessDayOfMonth(decSaturdays).isValid())
      .toBe(false)
  })

  it('days() lists inclusive business days and returns [] when reversed or invalid', () => {
    const listed = dayex.businessDay.days('2026-01-02', '2026-01-06')
    expect(listed.map(ymd)).toEqual(['2026-01-02', '2026-01-05', '2026-01-06'])
    expect(dayex.businessDay.days('2026-01-06', '2026-01-02')).toEqual([])
    expect(dayex.businessDay.days(null, '2026-01-02')).toEqual([])
    expect(dayex.businessDay.days('2026-01-02', null)).toEqual([])
    expect(dayex.businessDay.days('2026-01-03', '2026-01-04')).toEqual([])
    expect(dayex.businessDay.days('2026-01-05', '2026-01-05').map(ymd))
      .toEqual(['2026-01-05'])
  })

  it('count() is inclusive by default and can be exclusive', () => {
    expect(dayex.businessDay.count('2026-01-02', '2026-01-05')).toBe(2)
    expect(dayex.businessDay.count('2026-01-02', '2026-01-05', { inclusive: false }))
      .toBe(1)
    expect(dayex.businessDay.count('2026-01-05', '2026-01-02')).toBe(0)
    expect(dayex.businessDay.count('2026-01-07', '2026-01-05', {
      holidays: ['2026-01-06']
    })).toBe(0)
    expect(dayex.businessDay.count('2026-01-02', '2026-01-02', { inclusive: false }))
      .toBe(0)
    expect(dayex.businessDay.count(null, '2026-01-02')).toBeNaN()
    expect(dayex.businessDay.count('2026-01-02', null)).toBeNaN()
    expect(dayex.businessDay.count('2026-01-03', '2026-01-03')).toBe(0)
    expect(dayex.businessDay.count('2026-01-02', '2026-01-02')).toBe(1)
    expect(dayex.businessDay.count('2026-01-05', '2026-01-07', {
      holidays: ['2026-01-06']
    })).toBe(2)
  })

  it('returns NaN for count helpers on invalid instances', () => {
    const bad = dayex(null)
    expect(bad.businessDiff('2026-01-01')).toBeNaN()
    expect(dayex('2026-01-01').businessDiff(null)).toBeNaN()
    expect(bad.businessDaysInMonth()).toBeNaN()
    expect(bad.businessDaysInYear()).toBeNaN()
  })
})

describe('add and diff units', () => {
  it('add / subtract / diff accept businessDay units', () => {
    expect(ymd(dayex('2026-01-02').add(1, 'businessDay'))).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-02').add(1, 'businessDays'))).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-02').add(1, 'bd'))).toBe('2026-01-05')
    expect(ymd(dayex('2026-01-05').subtract(1, 'businessDay'))).toBe('2026-01-02')
    expect(dayex('2026-01-05').diff('2026-01-02', 'businessDay')).toBe(1)
    expect(dayex('2026-01-05').diff('2026-01-02', 'bd')).toBe(1)
    expect(dayex('2026-01-02').add(1).valueOf())
      .toBe(dayex('2026-01-02').add(1, 'millisecond').valueOf())
    expect(dayex('2026-01-02').add(1, 'day').format(YMD)).toBe('2026-01-03')
    expect(dayex('2026-01-05').diff('2026-01-02', 'day')).toBe(3)
  })
})

describe('additional working days as functions', () => {
  it('treats a matching function as a working day', () => {
    const saturdayShift = inst => inst.format(YMD) === '2026-01-03'
    expect(dayex('2026-01-02').isBusinessDay({
      additionalWorkingDays: [saturdayShift]
    })).toBe(true)
    expect(dayex('2026-01-03').isBusinessDay({
      additionalWorkingDays: [saturdayShift]
    })).toBe(true)
    expect(ymd(dayex('2026-01-02').addBusinessDays(1, {
      additionalWorkingDays: [saturdayShift]
    }))).toBe('2026-01-03')
  })
})
