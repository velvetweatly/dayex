const DEFAULT_WEEKDAYS = [1, 2, 3, 4, 5]
const DEFAULT_FORMAT = 'YYYY-MM-DD'
const MD_RE = /^\d{2}-\d{2}$/
const MAX_GAP = 366
const BD_UNIT = 'businessday'
const BD_SHORT = 'bd'

const isFn = value => typeof value === 'function'

const asList = (value) => {
  if (value == null) return []
  return (Array.isArray(value) ? value : [value]).slice()
}

const normalizeWeekdays = (days) => {
  const uniq = []
  asList(days).forEach((day) => {
    if (day >= 0 && day <= 6 && uniq.indexOf(day) < 0) {
      uniq.push(day)
    }
  })
  return uniq
}

const cloneCfg = cfg => ({
  workingWeekdays: cfg.workingWeekdays.slice(),
  holidays: cfg.holidays.slice(),
  additionalWorkingDays: cfg.additionalWorkingDays.slice(),
  holidayFormat: cfg.holidayFormat
})

const mergeCfg = (base, opt) => {
  if (!opt || typeof opt !== 'object') return cloneCfg(base)
  return {
    workingWeekdays: opt.workingWeekdays !== undefined
      ? normalizeWeekdays(opt.workingWeekdays)
      : base.workingWeekdays.slice(),
    holidays: opt.holidays !== undefined ? asList(opt.holidays) : base.holidays.slice(),
    additionalWorkingDays: opt.additionalWorkingDays !== undefined
      ? asList(opt.additionalWorkingDays)
      : base.additionalWorkingDays.slice(),
    holidayFormat: opt.holidayFormat || base.holidayFormat
  }
}

const isDateLike = value =>
  value instanceof Date || !!(value && value.$isDayexObject)

const matchFixed = (entry, inst, format, d) => {
  const key = inst.format(format)
  const md = inst.format('MM-DD')
  if (typeof entry === 'string') {
    return entry === key || (MD_RE.test(entry) && entry === md)
  }
  if (!entry || typeof entry !== 'object') return false
  if (typeof entry.date === 'string') {
    return entry.date === key || (MD_RE.test(entry.date) && entry.date === md)
  }
  if (isDateLike(entry)) {
    const other = d(entry)
    return other.isValid() && other.format(format) === key
  }
  return false
}

const findHoliday = (inst, holidays, format, d) => {
  const key = inst.format(format)
  for (let i = 0; i < holidays.length; i += 1) {
    const entry = holidays[i]
    if (isFn(entry)) {
      const result = entry(inst)
      if (result) {
        const meta = { date: key }
        if (typeof result === 'object' && result.name) {
          meta.name = result.name
        }
        return meta
      }
    } else if (matchFixed(entry, inst, format, d)) {
      const meta = { date: key }
      if (entry && typeof entry === 'object' && entry.name) {
        meta.name = entry.name
      }
      return meta
    }
  }
  return null
}

const listHas = (list, inst, format, d) => {
  for (let i = 0; i < list.length; i += 1) {
    const entry = list[i]
    if (isFn(entry)) {
      if (entry(inst)) return true
    } else if (matchFixed(entry, inst, format, d)) {
      return true
    }
  }
  return false
}

const isWeekendInst = (inst, cfg) =>
  cfg.workingWeekdays.indexOf(inst.day()) < 0

const isHolidayInst = (inst, cfg, d) =>
  !!findHoliday(inst, cfg.holidays, cfg.holidayFormat, d)

const isAdditionalInst = (inst, cfg, d) =>
  listHas(cfg.additionalWorkingDays, inst, cfg.holidayFormat, d)

// additionalWorkingDay > holiday > weekend
const isBusinessInst = (inst, cfg, d) => {
  if (isAdditionalInst(inst, cfg, d)) return true
  if (isHolidayInst(inst, cfg, d)) return false
  return !isWeekendInst(inst, cfg)
}

const hasRules = cfg =>
  cfg.holidays.length > 0 || cfg.additionalWorkingDays.length > 0

const weekdayCount = (start, end, weekdays) => {
  const from = start.startOf('day')
  const to = end.startOf('day')
  const totalDays = to.diff(from, 'day')
  if (totalDays <= 0) return 0
  const weeks = Math.floor(totalDays / 7)
  let count = weeks * weekdays.length
  let dow = from.day()
  const remainder = totalDays % 7
  for (let i = 0; i < remainder; i += 1) {
    dow = (dow + 1) % 7
    if (weekdays.indexOf(dow) >= 0) count += 1
  }
  return count
}

const walkBusinessDays = (start, end, cfg, inclusive, d, collect) => {
  const out = collect ? [] : null
  let count = 0
  let cursor = start.startOf('day')
  const last = end.startOf('day')
  if (cursor.isAfter(last, 'day')) {
    return collect ? out : count
  }
  if (!inclusive) {
    cursor = cursor.add(1, 'day')
  }
  while (!cursor.isAfter(last, 'day')) {
    if (isBusinessInst(cursor, cfg, d)) {
      count += 1
      if (collect) out.push(cursor)
    }
    cursor = cursor.add(1, 'day')
  }
  return collect ? out : count
}

const countBusinessDays = (start, end, cfg, inclusive, d) => {
  if (!hasRules(cfg)) {
    if (!inclusive) return weekdayCount(start, end, cfg.workingWeekdays)
    return weekdayCount(start.subtract(1, 'day'), end, cfg.workingWeekdays)
  }
  return walkBusinessDays(start, end, cfg, inclusive, d, false)
}

const entryKey = (entry, format, d) => {
  if (isFn(entry) || typeof entry === 'string') return entry
  if (entry && typeof entry === 'object' && typeof entry.date === 'string') {
    return entry.date
  }
  if (entry && isDateLike(entry)) {
    const parsed = d(entry)
    if (parsed.isValid()) return parsed.format(format)
  }
  return entry
}

const isBdUnit = (unit) => {
  const pretty = String(unit || '').toLowerCase().replace(/s$/, '')
  return pretty === BD_UNIT || pretty === BD_SHORT
}

export default (option, Dayex, d) => {
  const builtIn = {
    workingWeekdays: DEFAULT_WEEKDAYS.slice(),
    holidays: [],
    additionalWorkingDays: [],
    holidayFormat: DEFAULT_FORMAT
  }
  const initial = mergeCfg(builtIn, option)
  let current = cloneCfg(initial)

  const resolve = opt => mergeCfg(current, opt)
  const invalid = () => d(null)

  const proto = Dayex.prototype

  proto.isWeekend = function (opt) {
    if (!this.isValid()) return false
    return isWeekendInst(this, resolve(opt))
  }

  proto.isHoliday = function (opt) {
    if (!this.isValid()) return false
    return isHolidayInst(this, resolve(opt), d)
  }

  proto.holiday = function (opt) {
    if (!this.isValid()) return null
    const cfg = resolve(opt)
    return findHoliday(this, cfg.holidays, cfg.holidayFormat, d)
  }

  proto.isBusinessDay = function (opt) {
    if (!this.isValid()) return false
    return isBusinessInst(this, resolve(opt), d)
  }

  proto.addBusinessDays = function (amount, opt) {
    if (!this.isValid()) return this.clone()
    const n = Number(amount)
    if (!Number.isFinite(n)) return invalid()
    const steps = n < 0 ? Math.ceil(n) : Math.floor(n)
    if (!steps) return this.clone()
    const cfg = resolve(opt)
    const dir = steps > 0 ? 1 : -1
    let left = Math.abs(steps)
    let cursor = this
    let gap = 0
    while (left > 0) {
      cursor = cursor.add(dir, 'day')
      if (isBusinessInst(cursor, cfg, d)) {
        left -= 1
        gap = 0
      } else {
        gap += 1
        if (gap >= MAX_GAP) return invalid()
      }
    }
    return cursor
  }

  proto.subtractBusinessDays = function (amount, opt) {
    return this.addBusinessDays(-Number(amount), opt)
  }

  proto.nextBusinessDay = function (opt) {
    return this.addBusinessDays(1, opt)
  }

  proto.prevBusinessDay = function (opt) {
    return this.addBusinessDays(-1, opt)
  }

  proto.toBusinessDay = function (dir, opt) {
    if (!this.isValid()) return this.clone()
    let direction = dir
    let options = opt
    if (dir && typeof dir === 'object') {
      direction = 'next'
      options = dir
    }
    if (this.isBusinessDay(options)) return this.clone()
    const next = this.nextBusinessDay(options)
    const prev = this.prevBusinessDay(options)
    if (direction === 'prev') return prev
    if (direction === 'nearest') {
      if (!next.isValid()) return prev
      if (!prev.isValid()) return next
      const toNext = next.diff(this, 'day')
      const toPrev = this.diff(prev, 'day')
      // equal distance prefers the earlier day
      if (toNext < toPrev) return next
      return prev
    }
    return next
  }

  proto.businessDiff = function (input, opt) {
    const other = d(input)
    if (!this.isValid() || !other.isValid()) return NaN
    if (this.isSame(other, 'day')) return 0
    const cfg = resolve(opt)
    if (this.isAfter(other, 'day')) {
      return countBusinessDays(other, this, cfg, false, d)
    }
    const count = countBusinessDays(this, other, cfg, false, d)
    return count ? -count : 0
  }

  proto.businessDaysInMonth = function (opt) {
    if (!this.isValid()) return NaN
    return countBusinessDays(
      this.startOf('month'),
      this.endOf('month'),
      resolve(opt),
      true,
      d
    )
  }

  proto.businessDaysInYear = function (opt) {
    if (!this.isValid()) return NaN
    return countBusinessDays(
      this.startOf('year'),
      this.endOf('year'),
      resolve(opt),
      true,
      d
    )
  }

  proto.firstBusinessDayOfMonth = function (opt) {
    if (!this.isValid()) return this.clone()
    const start = this.date(1)
    const found = start.toBusinessDay('next', opt)
    if (!found.isValid() || found.month() !== this.month() || found.year() !== this.year()) {
      return invalid()
    }
    return found
  }

  proto.lastBusinessDayOfMonth = function (opt) {
    if (!this.isValid()) return this.clone()
    const end = this.date(this.daysInMonth())
    const found = end.toBusinessDay('prev', opt)
    if (!found.isValid() || found.month() !== this.month() || found.year() !== this.year()) {
      return invalid()
    }
    return found
  }

  const oldAdd = proto.add
  proto.add = function (number, units) {
    if (isBdUnit(this.$utils().p(units))) {
      return this.addBusinessDays(number)
    }
    return oldAdd.call(this, number, units)
  }

  const oldDiff = proto.diff
  proto.diff = function (input, units, float) {
    if (isBdUnit(this.$utils().p(units))) {
      return this.businessDiff(input)
    }
    return oldDiff.call(this, input, units, float)
  }

  d.businessDay = {
    set(opt) {
      current = mergeCfg(current, opt)
      return cloneCfg(current)
    },
    get() {
      return cloneCfg(current)
    },
    addHolidays(holidays) {
      current.holidays = current.holidays.concat(asList(holidays))
      return cloneCfg(current)
    },
    removeHolidays(holidays) {
      const removals = asList(holidays)
      current.holidays = current.holidays.filter((existing) => {
        for (let i = 0; i < removals.length; i += 1) {
          if (existing === removals[i]) return false
          if (entryKey(existing, current.holidayFormat, d)
            === entryKey(removals[i], current.holidayFormat, d)) {
            return false
          }
        }
        return true
      })
      return cloneCfg(current)
    },
    reset() {
      current = cloneCfg(initial)
      return cloneCfg(current)
    },
    days(from, to, opt) {
      const start = d(from)
      const end = d(to)
      if (!start.isValid() || !end.isValid()) return []
      return walkBusinessDays(start, end, resolve(opt), true, d, true)
    },
    count(from, to, opt) {
      const start = d(from)
      const end = d(to)
      if (!start.isValid() || !end.isValid()) return NaN
      const inclusive = !opt || opt.inclusive !== false
      return countBusinessDays(start, end, resolve(opt), inclusive, d)
    }
  }
}
