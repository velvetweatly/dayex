const KNOWN_UNITS = {
  millisecond: 1,
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  week: 1,
  month: 1,
  year: 1,
  date: 1,
  quarter: 1
}

const DEFAULT_FORMAT = 'YYYY-MM-DD'
const INVALID_RANGE = 'Invalid Range'

const isInclusiveArg = (value) => {
  if (typeof value !== 'string' || value.length < 2) return false
  const start = value[0]
  const end = value[1]
  return (start === '[' || start === '(') && (end === ']' || end === ')')
}

export default (option, Dayex, d) => {
  const utils = d().$utils()
  const defaultInclusive = (option && option.inclusive) || '[]'

  const isUnitArg = (value) => {
    if (typeof value !== 'string') return false
    return !!KNOWN_UNITS[utils.p(value)]
  }

  const resolveCmp = (unit, inclusive) => {
    if (isInclusiveArg(unit) && inclusive == null) {
      return { unit: undefined, inclusive: unit }
    }
    return { unit, inclusive: inclusive || defaultInclusive }
  }

  const wrap = (date, sample) => utils.w(date, sample)

  const pointIn = (point, start, end, unit, inc) => {
    const afterStart = inc[0] === '('
      ? point.isAfter(start, unit)
      : !point.isBefore(start, unit)
    const beforeEnd = inc[1] === ')'
      ? point.isBefore(end, unit)
      : !point.isAfter(end, unit)
    return afterStart && beforeEnd
  }

  const isRange = value => !!(value && value.$isDayexRange)
  const isRangeSet = value => !!(value && value.$isDayexRangeSet)

  const normalize = (a, b, unit) => {
    let start = d(a)
    let end = d(b)
    if (!start.isValid() || !end.isValid()) {
      return new Range(start, end) // eslint-disable-line no-use-before-define
    }
    if (start.isAfter(end)) {
      const tmp = start
      start = end
      end = tmp
    }
    if (unit && isUnitArg(unit)) {
      start = start.startOf(unit)
      end = end.endOf(unit)
    }
    return new Range(start, end) // eslint-disable-line no-use-before-define
  }

  const createFrom = (input, end, unit) => {
    if (isRange(input)) return input.clone()
    if (Array.isArray(input)) {
      if (input.length < 2) return normalize(null, null)
      return normalize(input[0], input[1], end || unit)
    }
    if (
      input &&
      typeof input === 'object' &&
      !utils.i(input) &&
      !(input instanceof Date) &&
      input.start != null &&
      input.end != null &&
      typeof input.start !== 'function'
    ) {
      return normalize(input.start, input.end, input.unit || end)
    }
    if (end == null) return normalize(null, null)
    return normalize(input, end, unit)
  }

  const asRange = (input) => {
    if (isRange(input)) return input
    if (
      Array.isArray(input) ||
      (input && typeof input === 'object' && input.start != null && input.end != null)
    ) {
      return createFrom(input)
    }
    return null
  }

  const mergeRanges = (list) => {
    const valid = []
    list.forEach((item) => {
      if (isRangeSet(item)) {
        item.ranges().forEach((r) => {
          if (r.isValid()) valid.push(r)
        })
      } else {
        const range = isRange(item) ? item : asRange(item)
        if (range && range.isValid()) valid.push(range)
      }
    })
    valid.sort((a, b) => a.start().valueOf() - b.start().valueOf())
    const out = []
    valid.forEach((range) => {
      if (!out.length) {
        out.push(range)
        return
      }
      const last = out[out.length - 1]
      const combined = last.union(range)
      if (combined) {
        out[out.length - 1] = combined
      } else {
        out.push(range)
      }
    })
    return out
  }

  class Range {
    constructor(start, end) {
      this.$s = start
      this.$e = end
      this.$isDayexRange = true
    }

    start() {
      return this.$s
    }

    end() {
      return this.$e
    }

    isValid() {
      return this.$s.isValid() && this.$e.isValid()
    }

    clone() {
      return new Range(this.$s, this.$e)
    }

    setStart(value) {
      return normalize(value, this.$e)
    }

    setEnd(value) {
      return normalize(this.$s, value)
    }

    contains(target, unit, inclusive) {
      if (!this.isValid()) return false
      const cmp = resolveCmp(unit, inclusive)
      if (isRangeSet(target)) {
        const pieces = target.ranges()
        if (!pieces.length) return false
        for (let i = 0; i < pieces.length; i += 1) {
          if (!this.contains(pieces[i], cmp.unit, cmp.inclusive)) return false
        }
        return true
      }
      if (isRange(target)) {
        if (!target.isValid()) return false
        return this.contains(target.start(), cmp.unit, cmp.inclusive) &&
          this.contains(target.end(), cmp.unit, cmp.inclusive)
      }
      const point = d(target)
      if (!point.isValid()) return false
      return pointIn(point, this.$s, this.$e, cmp.unit, cmp.inclusive)
    }

    overlaps(target, unit, inclusive) {
      if (!this.isValid()) return false
      const cmp = resolveCmp(unit, inclusive)
      if (isRangeSet(target)) {
        const pieces = target.ranges()
        for (let i = 0; i < pieces.length; i += 1) {
          if (this.overlaps(pieces[i], cmp.unit, cmp.inclusive)) return true
        }
        return false
      }
      const other = asRange(target)
      if (!other || !other.isValid()) return false
      const allowEqual = cmp.inclusive[0] === '[' && cmp.inclusive[1] === ']'
      const startVsEnd = allowEqual
        ? !this.$s.isAfter(other.end(), cmp.unit)
        : this.$s.isBefore(other.end(), cmp.unit)
      const otherVsEnd = allowEqual
        ? !other.start().isAfter(this.$e, cmp.unit)
        : other.start().isBefore(this.$e, cmp.unit)
      return startVsEnd && otherVsEnd
    }

    adjacent(target, unit, inclusive) {
      if (!this.isValid()) return false
      const cmp = resolveCmp(unit, inclusive)
      const other = asRange(target)
      if (!other || !other.isValid()) return false
      if (this.overlaps(other, cmp.unit, cmp.inclusive)) return false
      return this.$e.isSame(other.start(), cmp.unit) ||
        other.end().isSame(this.$s, cmp.unit)
    }

    isSame(target, unit) {
      const other = asRange(target)
      if (!this.isValid() || !other || !other.isValid()) return false
      return this.$s.isSame(other.start(), unit) && this.$e.isSame(other.end(), unit)
    }

    isBefore(target, unit, inclusive) {
      if (!this.isValid()) return false
      const cmp = resolveCmp(unit, inclusive)
      if (isRangeSet(target)) {
        const pieces = target.ranges()
        if (!pieces.length) return false
        return this.isBefore(pieces[0], cmp.unit, cmp.inclusive)
      }
      const other = asRange(target) || normalize(target, target)
      if (!other.isValid()) return false
      if (this.overlaps(other, cmp.unit, cmp.inclusive)) return false
      return this.$s.isBefore(other.start(), cmp.unit)
    }

    isAfter(target, unit, inclusive) {
      if (!this.isValid()) return false
      const cmp = resolveCmp(unit, inclusive)
      if (isRangeSet(target)) {
        const pieces = target.ranges()
        if (!pieces.length) return false
        return this.isAfter(pieces[pieces.length - 1], cmp.unit, cmp.inclusive)
      }
      const other = asRange(target) || normalize(target, target)
      if (!other.isValid()) return false
      if (this.overlaps(other, cmp.unit, cmp.inclusive)) return false
      return this.$s.isAfter(other.start(), cmp.unit)
    }

    diff(unit, float) {
      if (!this.isValid()) return NaN
      return this.$e.diff(this.$s, unit, float)
    }

    length(unit, inclusive) {
      if (!this.isValid() || !unit) return NaN
      const inc = inclusive || defaultInclusive
      const span = this.$e.diff(this.$s, unit)
      if (!Number.isFinite(span)) return NaN
      const startInc = inc[0] === '['
      const endInc = inc[1] === ']'
      if (startInc && endInc) return span + 1
      if (!startInc && !endInc) return Math.max(span - 1, 0)
      return span
    }

    format(startFmt, endFmt) {
      if (!this.isValid()) return INVALID_RANGE
      const left = startFmt || DEFAULT_FORMAT
      const right = endFmt || startFmt || DEFAULT_FORMAT
      return `${this.$s.format(left)} ~ ${this.$e.format(right)}`
    }

    toString() {
      return this.format()
    }

    toJSON() {
      if (!this.isValid()) {
        return { start: null, end: null }
      }
      return {
        start: this.$s.toISOString(),
        end: this.$e.toISOString()
      }
    }

    intersect(target, unit, inclusive) {
      if (!this.overlaps(target, unit, inclusive)) return null
      const other = asRange(target)
      const start = this.$s.isAfter(other.start()) ? this.$s : other.start()
      const end = this.$e.isBefore(other.end()) ? this.$e : other.end()
      return new Range(start, end)
    }

    union(target, unit, inclusive) {
      const other = asRange(target)
      if (!this.isValid() || !other || !other.isValid()) return null
      if (
        !this.overlaps(other, unit, inclusive) &&
        !this.adjacent(other, unit, inclusive)
      ) {
        return null
      }
      const start = this.$s.isBefore(other.start()) ? this.$s : other.start()
      const end = this.$e.isAfter(other.end()) ? this.$e : other.end()
      return new Range(start, end)
    }

    subtract(target, unit) {
      if (typeof target === 'number') {
        return this.add(-target, unit)
      }
      if (!this.isValid()) return []
      const other = asRange(target)
      if (!other || !other.isValid() || !this.overlaps(other, unit)) {
        return [this.clone()]
      }
      const step = unit && isUnitArg(unit) ? unit : 'millisecond'
      const pieces = []
      if (this.$s.isBefore(other.start(), unit)) {
        const left = normalize(this.$s, other.start().subtract(1, step))
        if (left.isValid()) pieces.push(left)
      }
      if (this.$e.isAfter(other.end(), unit)) {
        const right = normalize(other.end().add(1, step), this.$e)
        if (right.isValid()) pieces.push(right)
      }
      return pieces
    }

    gap(target, unit) {
      if (!this.isValid()) return null
      const other = asRange(target)
      if (!other || !other.isValid()) return null
      if (this.overlaps(other, unit) || this.adjacent(other, unit)) return null
      const earlier = this.$s.isBefore(other.start()) ? this : other
      const later = earlier === this ? other : this
      const step = unit && isUnitArg(unit) ? unit : 'millisecond'
      const start = earlier.end().add(1, step)
      const end = later.start().subtract(1, step)
      if (start.isAfter(end)) return null
      return new Range(start, end)
    }

    clamp(target) {
      return this.intersect(target)
    }

    snap(unit) {
      if (!this.isValid() || !isUnitArg(unit)) return this.clone()
      return normalize(this.$s, this.$e, unit)
    }

    add(n, unit) {
      if (!this.isValid()) return this.clone()
      return new Range(this.$s.add(n, unit), this.$e.add(n, unit))
    }

    extend(n, unit) {
      if (!this.isValid()) return this.clone()
      return normalize(this.$s, this.$e.add(n, unit))
    }

    extendStart(n, unit) {
      if (!this.isValid()) return this.clone()
      return normalize(this.$s.add(n, unit), this.$e)
    }

    each(unit, limit, inclusive) {
      if (!this.isValid() || !isUnitArg(unit)) return []
      let cap = limit
      let inc = inclusive
      if (isInclusiveArg(limit)) {
        inc = limit
        cap = undefined
      }
      inc = inc || defaultInclusive
      const count = this.length(unit, inc)
      if (!Number.isFinite(count) || count <= 0) return []
      let cursor = this.$s
      if (inc[0] === '(') cursor = cursor.add(1, unit)
      const maxRaw = Number.isFinite(Number(cap)) && Number(cap) > 0
        ? Number(cap)
        : count
      const out = []
      const max = Math.min(count, maxRaw)
      for (let i = 0; i < max; i += 1) {
        out.push(cursor)
        const next = cursor.add(1, unit)
        if (!next.isAfter(cursor)) break
        cursor = next
      }
      return out
    }

    every(n, unit, limit, inclusive) {
      if (!this.isValid() || !isUnitArg(unit)) return []
      const step = Number(n)
      if (!Number.isFinite(step) || step <= 0) return []
      let cap = limit
      let inc = inclusive
      if (isInclusiveArg(limit)) {
        inc = limit
        cap = undefined
      }
      inc = inc || defaultInclusive
      const max = Number.isFinite(Number(cap)) && Number(cap) > 0
        ? Number(cap)
        : 1e5
      const out = []
      let cursor = this.$s
      if (inc[0] === '(') cursor = cursor.add(step, unit)
      let i = 0
      while (i < max && this.contains(cursor, unit, inc)) {
        out.push(cursor)
        const next = cursor.add(step, unit)
        if (!next.isAfter(cursor)) break
        cursor = next
        i += 1
      }
      return out
    }

    split(n, unit) {
      if (!this.isValid()) return []
      if (unit != null && isUnitArg(unit)) {
        const step = Number(n)
        if (!Number.isFinite(step) || step <= 0) return []
        const out = []
        let cursor = this.$s
        let guard = 0
        while (!cursor.isAfter(this.$e) && guard < 1e5) {
          let chunkEnd = cursor.add(step - 1, unit)
          if (chunkEnd.isAfter(this.$e)) chunkEnd = this.$e
          out.push(new Range(cursor, chunkEnd))
          const next = cursor.add(step, unit)
          if (!next.isAfter(cursor)) break
          cursor = next
          guard += 1
        }
        return out
      }
      const count = Math.floor(Number(n))
      if (!Number.isFinite(count) || count <= 0) return []
      const startMs = this.$s.valueOf()
      const endMs = this.$e.valueOf()
      const span = endMs - startMs
      const out = []
      for (let i = 0; i < count; i += 1) {
        const s = wrap(startMs + ((span * i) / count), this.$s)
        const e = wrap(
          i === count - 1 ? endMs : startMs + ((span * (i + 1)) / count),
          this.$s
        )
        out.push(new Range(s, e))
      }
      return out
    }

    eachRange(unit, limit) {
      return this.each(unit, limit).map(inst => inst.toRange(unit))
    }

    toDuration() {
      if (!this.isValid() || typeof d.duration !== 'function') return null
      return d.duration(this.$e.valueOf() - this.$s.valueOf())
    }

    eachBusinessDay(opt) {
      if (!this.isValid() || typeof this.$s.isBusinessDay !== 'function') {
        return []
      }
      const days = d.businessDay && d.businessDay.days
        ? d.businessDay.days(this.$s, this.$e, opt)
        : []
      return days.map((day) => {
        const offset = day.startOf('day').diff(this.$s.startOf('day'), 'day')
        return this.$s.add(offset, 'day')
      })
    }
  }

  class RangeSet {
    constructor(ranges) {
      this.$r = mergeRanges(ranges || [])
      this.$isDayexRangeSet = true
    }

    ranges() {
      return this.$r.slice()
    }

    isEmpty() {
      return this.$r.length === 0
    }

    isValid() {
      return this.$r.every(item => item.isValid())
    }

    clone() {
      return new RangeSet(this.$r)
    }

    contains(target, unit, inclusive) {
      if (isRangeSet(target)) {
        const pieces = target.ranges()
        if (!pieces.length) return false
        for (let i = 0; i < pieces.length; i += 1) {
          if (!this.contains(pieces[i], unit, inclusive)) return false
        }
        return true
      }
      for (let i = 0; i < this.$r.length; i += 1) {
        if (this.$r[i].contains(target, unit, inclusive)) return true
      }
      return false
    }

    overlaps(target, unit, inclusive) {
      for (let i = 0; i < this.$r.length; i += 1) {
        if (this.$r[i].overlaps(target, unit, inclusive)) return true
      }
      return false
    }

    add(target) {
      return new RangeSet(this.$r.concat([target]))
    }

    subtract(target, unit) {
      const others = isRangeSet(target) ? target.ranges() : [target]
      let current = this.$r
      others.forEach((item) => {
        const next = []
        current.forEach((range) => {
          const parts = range.subtract(item, unit)
          parts.forEach((part) => {
            next.push(part)
          })
        })
        current = next
      })
      return new RangeSet(current)
    }

    intersect(target) {
      const others = isRangeSet(target) ? target.ranges() : [target]
      const out = []
      this.$r.forEach((range) => {
        others.forEach((item) => {
          const piece = range.intersect(item)
          if (piece) out.push(piece)
        })
      })
      return new RangeSet(out)
    }

    union(target) {
      const extra = isRangeSet(target) ? target.ranges() : [target]
      return new RangeSet(this.$r.concat(extra))
    }

    each(unit, limit) {
      let out = []
      for (let i = 0; i < this.$r.length; i += 1) {
        out = out.concat(this.$r[i].each(unit, limit))
        if (limit && out.length >= limit) {
          return out.slice(0, limit)
        }
      }
      return out
    }

    eachBusinessDay(opt) {
      let out = []
      for (let i = 0; i < this.$r.length; i += 1) {
        out = out.concat(this.$r[i].eachBusinessDay(opt))
      }
      return out
    }

    diff(unit, float) {
      let total = 0
      for (let i = 0; i < this.$r.length; i += 1) {
        total += this.$r[i].diff(unit, float)
      }
      return total
    }

    length(unit, inclusive) {
      let total = 0
      for (let i = 0; i < this.$r.length; i += 1) {
        const value = this.$r[i].length(unit, inclusive)
        if (!Number.isFinite(value)) return NaN
        total += value
      }
      return total
    }

    format(startFmt, endFmt) {
      if (this.isEmpty()) return ''
      return this.$r.map(range => range.format(startFmt, endFmt)).join(' | ')
    }

    toJSON() {
      return { ranges: this.$r.map(range => range.toJSON()) }
    }
  }

  const proto = Dayex.prototype

  proto.toRange = function (input) {
    if (input == null) return normalize(this, this)
    if (isUnitArg(input)) {
      return normalize(this.startOf(input), this.endOf(input))
    }
    return normalize(this, input)
  }

  proto.isIn = function (range, unit, inclusive) {
    if (!this.isValid()) return false
    if (isRangeSet(range)) return range.contains(this, unit, inclusive)
    if (isRange(range)) return range.contains(this, unit, inclusive)
    return false
  }

  d.range = function (start, end, unit) {
    return createFrom(start, end, unit)
  }

  d.isRange = isRange

  d.rangeSet = function () {
    const args = [].slice.call(arguments, 0) // eslint-disable-line prefer-rest-params
    if (args.length === 1 && isRangeSet(args[0])) return args[0].clone()
    if (args.length === 1 && Array.isArray(args[0])) {
      return new RangeSet(args[0])
    }
    return new RangeSet(args)
  }

  d.isRangeSet = isRangeSet
}
