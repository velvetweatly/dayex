import MockDate from 'mockdate'
import dayex from '../../src'
import range from '../../src/plugin/range'
import duration from '../../src/plugin/duration'
import businessDay from '../../src/plugin/businessDay'

dayex.extend(range, { inclusive: '[]' })

const YMD = 'YYYY-MM-DD'
const ymd = inst => inst.format(YMD)
const rangeYmd = r => [ymd(r.start()), ymd(r.end())]

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('create', () => {
  it('builds a sorted range from two dates', () => {
    const r = dayex.range('2026-01-11', '2026-01-05')
    expect(dayex.isRange(r)).toBe(true)
    expect(rangeYmd(r)).toEqual(['2026-01-05', '2026-01-11'])
  })

  it('accepts an array, an object, and another range', () => {
    expect(rangeYmd(dayex.range(['2026-01-05', '2026-01-11'])))
      .toEqual(['2026-01-05', '2026-01-11'])
    expect(rangeYmd(dayex.range(['2026-01-05T13:00:00', '2026-01-07T09:00:00'], 'day')))
      .toEqual(['2026-01-05', '2026-01-07'])
    expect(dayex.range({ start() {}, end() {} }).isValid()).toBe(false)
    expect(rangeYmd(dayex.range({
      start: '2026-01-05T13:00:00',
      end: '2026-01-07T09:00:00',
      unit: 'day'
    }))).toEqual(['2026-01-05', '2026-01-07'])
    expect(rangeYmd(dayex.range({
      start: '2026-01-05T13:00:00',
      end: '2026-01-07T09:00:00'
    }, 'day'))).toEqual(['2026-01-05', '2026-01-07'])
    const first = dayex.range('2026-01-01', '2026-01-02')
    const copy = dayex.range(first)
    expect(copy).not.toBe(first)
    expect(copy.isSame(first)).toBe(true)
  })

  it('snaps both ends when a unit is passed', () => {
    const r = dayex.range('2026-01-05T13:00:00', '2026-01-07T09:00:00', 'day')
    expect(r.start().format('HH:mm:ss')).toBe('00:00:00')
    expect(r.end().format('HH:mm:ss.SSS')).toBe('23:59:59.999')
    expect(rangeYmd(r)).toEqual(['2026-01-05', '2026-01-07'])
  })

  it('returns an invalid range for incomplete input', () => {
    expect(dayex.range().isValid()).toBe(false)
    expect(dayex.range('2026-01-01').isValid()).toBe(false)
    expect(dayex.range(['2026-01-01']).isValid()).toBe(false)
    expect(dayex.range(null, '2026-01-01').isValid()).toBe(false)
  })

  it('toRange covers a unit or a pair of instants', () => {
    const month = dayex('2026-01-15').toRange('month')
    expect(rangeYmd(month)).toEqual(['2026-01-01', '2026-01-31'])
    const pair = dayex('2026-01-02').toRange('2026-01-05')
    expect(rangeYmd(pair)).toEqual(['2026-01-02', '2026-01-05'])
    const point = dayex('2026-01-02').toRange()
    expect(point.start().isSame(point.end())).toBe(true)
  })
})

describe('query', () => {
  const stay = () => dayex.range('2026-01-01', '2026-01-03')

  it('contains points and nested ranges with inclusivity', () => {
    expect(stay().contains('2026-01-01')).toBe(true)
    expect(stay().contains('2026-01-01', '()')).toBe(false)
    expect(stay().contains('2026-01-01', 'day', '()')).toBe(false)
    expect(stay().contains(dayex.range('2026-01-01', '2026-01-03'))).toBe(true)
    expect(stay().contains(dayex.range('2026-01-01', '2026-01-04'))).toBe(false)
    expect(stay().contains(dayex(null))).toBe(false)
    expect(dayex.range().contains('2026-01-01')).toBe(false)
    expect(stay().contains(dayex.rangeSet())).toBe(false)
    expect(stay().contains(dayex.rangeSet([
      dayex.range('2026-01-01', '2026-01-02')
    ]))).toBe(true)
    expect(stay().contains(dayex.rangeSet([
      dayex.range('2026-01-01', '2026-01-04')
    ]))).toBe(false)
    expect(stay().contains(dayex.range())).toBe(false)
  })

  it('overlaps and adjacent follow inclusivity', () => {
    const next = dayex.range('2026-01-03', '2026-01-05')
    expect(stay().overlaps(next)).toBe(true)
    expect(stay().overlaps(next, 'day', '[)')).toBe(false)
    expect(stay().overlaps({ start: '2026-01-03', end: '2026-01-05' })).toBe(true)
    expect(stay().overlaps(['2026-01-03', '2026-01-05'])).toBe(true)
    expect(stay().overlaps(next, '(]')).toBe(false)
    expect(stay().adjacent(next, 'day')).toBe(false)
    expect(stay().adjacent(next, 'day', '[)')).toBe(true)
    expect(stay().overlaps(dayex.range('2026-02-01', '2026-02-02'))).toBe(false)
    expect(stay().overlaps('nope')).toBe(false)
    expect(stay().adjacent('nope')).toBe(false)
    expect(dayex.range().overlaps(next)).toBe(false)
    expect(dayex.range().adjacent(next)).toBe(false)
    expect(stay().overlaps(dayex.rangeSet([next]))).toBe(true)
    expect(stay().overlaps(dayex.rangeSet())).toBe(false)
  })

  it('isSame / isBefore / isAfter compare whole ranges or points', () => {
    expect(stay().isSame(dayex.range('2026-01-01', '2026-01-03'))).toBe(true)
    expect(stay().isSame(dayex.range('2026-01-01', '2026-01-04'))).toBe(false)
    expect(stay().isSame(dayex.range())).toBe(false)
    expect(dayex.range().isSame(stay())).toBe(false)
    expect(stay().isBefore(dayex.range('2026-02-01', '2026-02-07'))).toBe(true)
    expect(stay().isBefore('2026-02-01')).toBe(true)
    expect(stay().isBefore(dayex.range('2026-01-03', '2026-01-05'))).toBe(false)
    expect(stay().isAfter(dayex.range('2025-12-01', '2025-12-02'))).toBe(true)
    expect(stay().isAfter('2025-12-01')).toBe(true)
    expect(stay().isAfter(stay())).toBe(false)
    expect(dayex.range().isBefore(stay())).toBe(false)
    expect(dayex.range().isAfter(stay())).toBe(false)
    expect(stay().isBefore(dayex.rangeSet())).toBe(false)
    expect(stay().isAfter(dayex.rangeSet())).toBe(false)
    expect(stay().isBefore(dayex.rangeSet([
      dayex.range('2026-02-01', '2026-02-02')
    ]))).toBe(true)
    expect(stay().isAfter(dayex.rangeSet([
      dayex.range('2025-12-01', '2025-12-02')
    ]))).toBe(true)
    expect(stay().isBefore(null)).toBe(false)
    expect(stay().isAfter(dayex(null))).toBe(false)
  })

  it('isIn works for ranges and range sets', () => {
    expect(dayex('2026-01-02').isIn(stay())).toBe(true)
    expect(dayex('2026-01-04').isIn(stay())).toBe(false)
    expect(dayex(null).isIn(stay())).toBe(false)
    expect(dayex('2026-01-02').isIn('nope')).toBe(false)
    expect(dayex('2026-01-02').isIn(dayex.rangeSet([stay()]))).toBe(true)
  })
})

describe('measure and display', () => {
  it('diff matches core and length is inclusive', () => {
    const r = dayex.range('2026-01-01', '2026-01-03')
    expect(r.diff('day')).toBe(2)
    expect(r.length('day')).toBe(3)
    expect(r.length('day', '[)')).toBe(2)
    expect(r.length('day', '()')).toBe(1)
    expect(r.length('day', '(]')).toBe(2)
    expect(r.length()).toBeNaN()
    expect(dayex.range().diff('day')).toBeNaN()
    expect(dayex.range().length('day')).toBeNaN()
  })

  it('format / toJSON / toString', () => {
    const r = dayex.range('2026-01-01', '2026-01-03')
    expect(r.format()).toBe('2026-01-01 ~ 2026-01-03')
    expect(r.format('YYYY/MM/DD')).toBe('2026/01/01 ~ 2026/01/03')
    expect(r.format('YYYY-MM-DD', 'MM/DD')).toBe('2026-01-01 ~ 01/03')
    expect(r.toString()).toBe(r.format())
    expect(r.toJSON().start).toBe(r.start().toISOString())
    expect(dayex.range().format()).toBe('Invalid Range')
    expect(dayex.range().toJSON()).toEqual({ start: null, end: null })
  })

  it('accessors clone and can rewrite either end', () => {
    const r = dayex.range('2026-01-05', '2026-01-11')
    const moved = r.setEnd('2026-01-03')
    expect(rangeYmd(moved)).toEqual(['2026-01-03', '2026-01-05'])
    expect(rangeYmd(r.setStart('2026-01-01'))).toEqual(['2026-01-01', '2026-01-11'])
    expect(r.start().add(1, 'day').format(YMD)).toBe('2026-01-06')
    expect(ymd(r.start())).toBe('2026-01-05')
    expect(r.clone().isSame(r)).toBe(true)
  })
})

describe('set operations', () => {
  const a = () => dayex.range('2026-01-01', '2026-01-10')
  const mid = () => dayex.range('2026-01-04', '2026-01-06')
  const far = () => dayex.range('2026-02-01', '2026-02-03')

  it('intersect / union / clamp / snap', () => {
    expect(rangeYmd(a().intersect(mid()))).toEqual(['2026-01-04', '2026-01-06'])
    expect(a().intersect(far())).toBeNull()
    expect(rangeYmd(a().union(dayex.range('2026-01-08', '2026-01-15'))))
      .toEqual(['2026-01-01', '2026-01-15'])
    expect(a().union(far())).toBeNull()
    expect(a().union(dayex.range())).toBeNull()
    expect(rangeYmd(a().clamp(mid()))).toEqual(['2026-01-04', '2026-01-06'])
    const snapped = dayex.range('2026-01-05T13:00:00', '2026-01-07T09:00:00')
      .snap('day')
    expect(ymd(snapped.start())).toBe('2026-01-05')
    expect(snapped.end().format('HH:mm:ss.SSS')).toBe('23:59:59.999')
    expect(dayex.range().snap('day').isValid()).toBe(false)
    expect(a().snap('nope').isSame(a())).toBe(true)
  })

  it('subtracts a range or shifts by a number', () => {
    const parts = a().subtract(mid(), 'day')
    expect(parts.map(rangeYmd)).toEqual([
      ['2026-01-01', '2026-01-03'],
      ['2026-01-07', '2026-01-10']
    ])
    expect(a().subtract(mid()).length).toBe(2)
    expect(a().subtract(far()).map(rangeYmd)).toEqual([rangeYmd(a())])
    expect(a().subtract(a(), 'day')).toEqual([])
    expect(dayex.range().subtract(mid())).toEqual([])
    expect(a().subtract('nope').map(rangeYmd)).toEqual([rangeYmd(a())])
    expect(rangeYmd(a().subtract(1, 'day'))).toEqual(['2025-12-31', '2026-01-09'])
    const onlyRight = dayex.range('2026-01-05', '2026-01-10')
      .subtract(dayex.range('2026-01-01', '2026-01-06'), 'day')
    expect(onlyRight.map(rangeYmd)).toEqual([['2026-01-07', '2026-01-10']])
  })

  it('gap is the empty space between two ranges', () => {
    const gap = a().gap(far(), 'day')
    expect(rangeYmd(gap)).toEqual(['2026-01-11', '2026-01-31'])
    expect(a().gap(mid())).toBeNull()
    const left = dayex.range('2026-01-01', '2026-01-03')
    const right = dayex.range('2026-01-03', '2026-01-05')
    expect(left.gap(right)).toBeNull()
    expect(left.gap(dayex.range('2026-01-04', '2026-01-05'), 'day')).toBeNull()
    expect(dayex.range().gap(far())).toBeNull()
    expect(a().gap('nope')).toBeNull()
    expect(far().gap(a(), 'day').isSame(gap)).toBe(true)
  })
})

describe('manipulate and iterate', () => {
  it('add / extend / extendStart keep or change length', () => {
    const r = dayex.range('2026-01-05', '2026-01-11')
    expect(rangeYmd(r.add(1, 'week'))).toEqual(['2026-01-12', '2026-01-18'])
    expect(rangeYmd(r.extend(2, 'day'))).toEqual(['2026-01-05', '2026-01-13'])
    expect(rangeYmd(r.extendStart(-2, 'day'))).toEqual(['2026-01-03', '2026-01-11'])
    expect(dayex.range().add(1, 'day').isValid()).toBe(false)
    expect(dayex.range().extend(1, 'day').isValid()).toBe(false)
    expect(dayex.range().extendStart(1, 'day').isValid()).toBe(false)
  })

  it('each / every / split / eachRange', () => {
    const r = dayex.range('2026-01-01', '2026-01-03')
    expect(r.each('day').map(ymd)).toEqual(['2026-01-01', '2026-01-02', '2026-01-03'])
    expect(r.each('day', 2).map(ymd)).toEqual(['2026-01-01', '2026-01-02'])
    expect(r.each('day', '()').map(ymd)).toEqual(['2026-01-02'])
    expect(r.each('nope')).toEqual([])
    expect(dayex.range().each('day')).toEqual([])
    expect(dayex.range('2026-01-01', '2026-01-01').each('day', '[)')).toEqual([])

    const week = dayex.range('2026-01-01', '2026-01-07')
    expect(week.every(2, 'day').map(ymd))
      .toEqual(['2026-01-01', '2026-01-03', '2026-01-05', '2026-01-07'])
    expect(week.every(2, 'day', 2).map(ymd)).toEqual(['2026-01-01', '2026-01-03'])
    expect(week.every(2, 'day', '()').map(ymd))
      .toEqual(['2026-01-03', '2026-01-05'])
    expect(week.every(0, 'day')).toEqual([])
    expect(week.every(2, 'nope')).toEqual([])
    expect(dayex.range().every(2, 'day')).toEqual([])

    expect(week.split(3, 'day').map(rangeYmd)).toEqual([
      ['2026-01-01', '2026-01-03'],
      ['2026-01-04', '2026-01-06'],
      ['2026-01-07', '2026-01-07']
    ])
    expect(week.split(0, 'day')).toEqual([])
    expect(week.split(-1)).toEqual([])
    expect(dayex.range().split(2)).toEqual([])
    expect(week.split(2).length).toBe(2)
    expect(ymd(week.split(2)[0].start())).toBe('2026-01-01')
    expect(ymd(week.split(2)[1].end())).toBe('2026-01-07')

    const boxes = r.eachRange('day')
    expect(boxes).toHaveLength(3)
    expect(boxes[0].start().format('HH:mm:ss')).toBe('00:00:00')
  })

  it('toDuration is null until the duration plugin is loaded', () => {
    expect(dayex.range('2026-01-01', '2026-01-02').toDuration()).toBeNull()
    expect(dayex.range().toDuration()).toBeNull()
  })

  it('eachBusinessDay is empty until the businessDay plugin is loaded', () => {
    expect(dayex.range('2026-01-01', '2026-01-07').eachBusinessDay()).toEqual([])
  })
})

describe('duration integration', () => {
  it('toDuration uses the duration plugin when present', () => {
    dayex.extend(duration)
    const value = dayex.range('2026-01-01', '2026-01-02').toDuration()
    expect(dayex.isDuration(value)).toBe(true)
    expect(value.asDays()).toBe(1)
  })
})

describe('businessDay integration', () => {
  it('lists business days and keeps the start time', () => {
    dayex.extend(businessDay)
    const r = dayex.range('2026-01-02T17:30:00', '2026-01-06T17:30:00')
    const days = r.eachBusinessDay()
    expect(days.map(ymd)).toEqual(['2026-01-02', '2026-01-05', '2026-01-06'])
    expect(days[0].format('HH:mm')).toBe('17:30')
    expect(dayex.range().eachBusinessDay()).toEqual([])
    const daysFn = dayex.businessDay.days
    dayex.businessDay.days = null
    expect(r.eachBusinessDay()).toEqual([])
    dayex.businessDay.days = daysFn
  })
})

describe('RangeSet', () => {
  const a = () => dayex.range('2026-01-01', '2026-01-03')
  const b = () => dayex.range('2026-01-10', '2026-01-12')
  const c = () => dayex.range('2026-01-02', '2026-01-11')

  it('merges overlapping pieces and keeps gaps', () => {
    const set = dayex.rangeSet(a(), c(), b())
    expect(dayex.isRangeSet(set)).toBe(true)
    expect(set.ranges().map(rangeYmd)).toEqual([['2026-01-01', '2026-01-12']])
    const gapped = dayex.rangeSet([a(), b()])
    expect(gapped.ranges()).toHaveLength(2)
    expect(dayex.rangeSet(gapped).ranges()).toHaveLength(2)
    expect(dayex.rangeSet(['nope', a()]).ranges()).toHaveLength(1)
    expect(dayex.rangeSet().isEmpty()).toBe(true)
    expect(dayex.rangeSet().isValid()).toBe(true)
    expect(gapped.isValid()).toBe(true)
    expect(gapped.clone().format()).toBe(gapped.format())
  })

  it('queries, mutates, and measures a set', () => {
    const set = dayex.rangeSet(a(), b())
    expect(set.contains('2026-01-02')).toBe(true)
    expect(set.contains('2026-01-05')).toBe(false)
    expect(set.contains(a())).toBe(true)
    expect(set.contains(dayex.rangeSet([a()]))).toBe(true)
    expect(set.contains(dayex.rangeSet())).toBe(false)
    expect(set.contains(dayex.rangeSet([
      dayex.range('2026-02-01', '2026-02-02')
    ]))).toBe(false)
    expect(set.overlaps(c())).toBe(true)
    expect(set.overlaps(dayex.range('2026-02-01', '2026-02-02'))).toBe(false)

    const added = set.add(c())
    expect(added.ranges()).toHaveLength(1)
    expect(set.ranges()).toHaveLength(2)

    const cut = set.subtract(dayex.range('2026-01-02', '2026-01-11'), 'day')
    expect(cut.ranges().map(rangeYmd)).toEqual([
      ['2026-01-01', '2026-01-01'],
      ['2026-01-12', '2026-01-12']
    ])
    const cutSet = set.subtract(dayex.rangeSet([a()]))
    expect(cutSet.contains('2026-01-02')).toBe(false)

    const overlap = set.intersect(c())
    expect(overlap.ranges().map(rangeYmd)).toEqual([
      ['2026-01-02', '2026-01-03'],
      ['2026-01-10', '2026-01-11']
    ])
    expect(set.intersect(dayex.rangeSet([c()])).ranges().length).toBe(2)
    expect(set.union(dayex.range('2026-01-03', '2026-01-10')).ranges())
      .toHaveLength(1)
    expect(set.union(dayex.rangeSet([c()])).ranges()).toHaveLength(1)
    expect(set.intersect(dayex.range('2026-02-01', '2026-02-02')).isEmpty())
      .toBe(true)

    expect(set.each('day').map(ymd)).toEqual([
      '2026-01-01', '2026-01-02', '2026-01-03',
      '2026-01-10', '2026-01-11', '2026-01-12'
    ])
    expect(set.each('day', 2).map(ymd)).toEqual(['2026-01-01', '2026-01-02'])
    expect(set.diff('day')).toBe(4)
    expect(set.length('day')).toBe(6)
    expect(set.length()).toBeNaN()
    expect(set.format()).toBe('2026-01-01 ~ 2026-01-03 | 2026-01-10 ~ 2026-01-12')
    expect(dayex.rangeSet().format()).toBe('')
    expect(set.toJSON().ranges).toHaveLength(2)
    expect(dayex.rangeSet().diff('day')).toBe(0)
    expect(dayex.rangeSet().length('day')).toBe(0)
    expect(dayex.rangeSet(set, a()).ranges()).toHaveLength(2)
  })

  it('eachBusinessDay concatenates pieces', () => {
    const set = dayex.rangeSet(
      dayex.range('2026-01-02', '2026-01-02'),
      dayex.range('2026-01-05', '2026-01-06')
    )
    expect(set.eachBusinessDay().map(ymd))
      .toEqual(['2026-01-02', '2026-01-05', '2026-01-06'])
  })
})
