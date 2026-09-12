# Dayex

**A modern date kernel for product work — not a calendar widget, not a Moment clone.**

Dayex is a tiny, immutable JavaScript date library. The core stays under 3 KB gzip. Everything else — locales, time zones, durations, business calendars, date ranges — loads only when you ask for it.

The name is deliberate: **day + next**. A date you can chain, a range you can hold, a working calendar you can actually ship.

[Documentation](https://dayex.org/) · [npm](https://www.npmjs.com/package/@dayex/dayex) · [API](https://dayex.org/docs)

[![gzip](https://img.shields.io/bundlephobia/minzip/dayex?style=flat-square)](https://bundlephobia.com/package/dayex)
[![npm](https://img.shields.io/npm/v/dayex.svg?style=flat-square)](https://www.npmjs.com/package/@dayex/dayex)
[![ci](https://img.shields.io/github/actions/workflow/status/velvetweatly/dayex/check.yml?style=flat-square)](https://github.com/velvetweatly/dayex/actions/workflows/check.yml)
[![coverage](https://img.shields.io/codecov/c/github/velvetweatly/dayex/master.svg?style=flat-square)](https://codecov.io/gh/velvetweatly/dayex)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](./LICENSE)

```js
import dayex from 'dayex'

dayex('2026-01-15')
  .startOf('month')
  .add(1, 'week')
  .format('YYYY-MM-DD')
// '2026-01-08'
```

---

## Why Dayex

Classic date libraries treated time as a single mutable instant. Dayex treats time as **values you compose**.

| You need | Dayex gives you |
| --- | --- |
| A point in time | `dayex()` — parse, format, add, query |
| A working calendar | `businessDay` — holidays, weekends, SLA offsets |
| An interval | `range` — overlap, intersect, iterate, range sets |
| A locale or zone | On-demand modules. Unused code never ships |

The parse / format / add surface will feel familiar if you have used Dayex. The model is not the same. Instances never mutate. Ranges are first-class objects. Business days are a real calendar, not `day() !== 0`.

Zero runtime dependencies. Time zones go through `Intl`, not a bundled tz database.

---

## Install

```bash
npm install dayex
```

```js
import dayex from 'dayex'
// or
const dayex = require('dayex')
```

---

## Core

Every call returns a new instance.

```js
const due = dayex('2026-03-01T09:00:00')

due.add(2, 'week').subtract(1, 'day')
due.startOf('month').endOf('week')
due.set('hour', 18).hour()          // 18
due.isBefore(dayex(), 'day')
due.format('YYYY-MM-DD HH:mm')
```

Parse a value, display it, move it, or compare it. Units accept long, short, and plural forms (`day`, `d`, `days`).

```js
dayex()                             // now
dayex('2026-09-11')
dayex(Date.now())
dayex.unix(1773129600)
```

---

## Locales

Nothing locale-specific is in the default build. Import what the product actually shows.

```js
import 'dayex/locale/ko'
import 'dayex/locale/ja'

dayex.locale('ko')
dayex().format('YYYY년 MMMM D일 dddd')

dayex('2026-01-01').locale('ja').format('LL')
```

---

## Plugins

Extend the kernel only for the features you use.

```js
import dayex from 'dayex'
import utc from 'dayex/plugin/utc'
import timezone from 'dayex/plugin/timezone'
import duration from 'dayex/plugin/duration'
import relativeTime from 'dayex/plugin/relativeTime'

dayex.extend(utc)
dayex.extend(timezone)
dayex.extend(duration)
dayex.extend(relativeTime)

dayex('2026-01-01T00:00:00Z')
  .tz('Asia/Seoul')
  .from(dayex())
```

Other official modules include `customParseFormat`, `isoWeek`, `isBetween`, `minMax`, `localizedFormat`, `advancedFormat`, `quarterOfYear`, and `calendar`.

Two modules define the current Dayex surface — the parts a modern app actually argues about.

### Business days

Weekends and holidays are not the same thing. `businessDay` keeps them separate, then lets you move and count on the result.

```js
import businessDay from 'dayex/plugin/businessDay'

dayex.extend(businessDay, {
  workingWeekdays: [1, 2, 3, 4, 5],
  holidays: ['2026-01-01', { date: '12-25', name: 'Christmas' }]
})

dayex('2026-01-02T17:00:00').addBusinessDays(3)
// 2026-01-07T17:00:00  — weekend skipped, time kept

dayex('2026-01-03').toBusinessDay('nearest')
dayex('2026-01-31').businessDiff('2026-01-01')
dayex().businessDaysInMonth()
```

Override the calendar per call when one process serves more than one jurisdiction.

```js
dayex('2026-07-03').isBusinessDay({ holidays: usFederal })
```

### Ranges

Two timestamps are not an interval. `range` is a value: contains, overlaps, intersect, walk, split.

```js
import range from 'dayex/plugin/range'

dayex.extend(range)

const leave = dayex.range('2026-01-05', '2026-01-09')
const sprint = dayex('2026-01').toRange('month')

leave.contains(dayex())
leave.overlaps(sprint)
leave.each('day').map((d) => d.format('MM/DD'))

// checkout day can be reused
const a = dayex.range('2026-01-01', '2026-01-03')
const b = dayex.range('2026-01-03', '2026-01-05')
a.overlaps(b, 'day', '[)')  // false
a.adjacent(b, 'day', '[)')  // true
```

Disconnected pieces become a `RangeSet` — merge, subtract, query as one calendar.

```js
dayex.rangeSet(leave, dayex.range('2026-02-01', '2026-02-03'))
```

---

## Design

- **Immutable.** `add` never changes the instance you already hold.
- **Composable.** Points, ranges, and working days are separate types that plug together.
- **Paid for only once.** Core has no `dependencies`. Plugins and locales are import-level.
- **Host Intl for zones.** No shipped timezone dump.
- **Typed.** Official plugins ship declaration files.

The chainable grammar is intentionally close to the ecosystem people already type. The types you get back — especially `DayexRange` and a configured business calendar — are the modern part.

---

## Docs

Full parse, display, and plugin reference: [dayex.org](https://dayex.org/)

---

## License

MIT. See [LICENSE](./LICENSE).
