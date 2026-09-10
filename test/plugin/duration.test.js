import MockDate from 'mockdate'
import dayex from '../../src'
import duration from '../../src/plugin/duration'
import relativeTime from '../../src/plugin/relativeTime'
import '../../src/locale/fr'
import '../../src/locale/es'

dayex.extend(relativeTime)
dayex.extend(duration)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('Creating', () => {
  it('no argument', () => {
    expect(dayex.duration().toISOString()).toBe('P0D')
    expect(dayex.duration().asMilliseconds()).toBe(0)
  })
  it('milliseconds', () => {
    expect(dayex.duration(1, 'ms').toISOString()).toBe('PT0.001S')
    expect(dayex.duration(100).toISOString()).toBe('PT0.1S')
    expect(dayex.duration(1000).toISOString()).toBe('PT1S')
  })
  it('two argument will bubble up to the next', () => {
    expect(dayex.duration(59, 'seconds').toISOString()).toBe('PT59S')
    expect(dayex.duration(60, 'seconds').toISOString()).toBe('PT1M')
    expect(dayex.duration(13213, 'seconds').toISOString()).toBe('PT3H40M13S')
  })
  it('two argument will bubble up to the next (negative number)', () => {
    expect(dayex.duration(-59, 'seconds').toISOString()).toBe('-PT59S')
    expect(dayex.duration(-60, 'seconds').toISOString()).toBe('-PT1M')
    expect(dayex.duration(-13213, 'seconds').toISOString()).toBe('-PT3H40M13S')
  })
  it('object with float', () => {
    expect(dayex.duration({
      seconds: 1,
      minutes: 2,
      hours: 3,
      days: 4,
      months: 6,
      years: 7
    }).toISOString()).toBe('P7Y6M4DT3H2M1S')
  })
  it('object with weeks and float', () => {
    expect(dayex.duration({
      seconds: 1.1,
      minutes: 2,
      hours: 3,
      days: 4,
      weeks: 5,
      months: 6,
      years: 7
    }).toISOString()).toBe('P7Y6M39DT3H2M1.1S')
  })
  it('object with millisecond', () => {
    expect(dayex.duration({
      ms: 1
    }).toISOString()).toBe('PT0.001S')
  })
  it('object with negative millisecond', () => {
    expect(dayex.duration({
      ms: -1
    }).toISOString()).toBe('-PT0.001S')
  })
  it('convert to milliseconds', () => {
    expect(+dayex.duration(100)).toBe(100)
  })
  it('handles rounding to millisecond precision', () => {
    expect(dayex.duration(2 / 3).toISOString()).toBe('PT0.001S')
  })
  it('should handle round with millisecond precision when negative', () => {
    expect(dayex.duration(1000.5).toISOString()).toBe('PT1.001S')
    expect(dayex.duration(-1000.5).toISOString()).toBe('-PT1S')
  })
  it('should handle floating point rounding errors', () => {
    // An example of this is when adding 2 to 0.812 seconds, which is how
    // the seconds component is calculated in .toISOString().
    // > 2 + 0.812
    // 2.8120000000000003
    expect(dayex.duration(-2812).toISOString()).toBe('-PT2.812S') // was -PT2.8120000000000003S
    expect(dayex.duration(3121632.27382247).toISOString()).toBe('PT52M1.632S') // was PT52M1.6320000000000001S
    expect(dayex.duration(7647826.525774224).toISOString()).toBe('PT2H7M27.827S') // was PT2H7M27.826999999999998S
  })
})

describe('Parse ISO string', () => {
  it('Full ISO string', () => {
    expect(dayex.duration('P7Y6M4DT3H2M1S').toISOString()).toBe('P7Y6M4DT3H2M1S')
  })
  it('Part ISO string', () => {
    expect(dayex.duration('PT2777H46M40S').toISOString()).toBe('PT2777H46M40S')
  })
  it('Formatting missing components', () => {
    expect(dayex.duration('PT1H').format('YYYY-MM-DDTHH:mm:ss')).toBe('0000-00-00T01:00:00')
  })
  it('ISO string with week', () => {
    const d = dayex.duration('P2M3W4D')
    expect(d.toISOString()).toBe('P2M25D')
    expect(d.asDays()).toBe(85.83333333333333) // moment 86, count 2M as 61 days
    expect(d.asWeeks()).toBe(12.261904761904763) // moment 12.285714285714286
    expect(d.asMonths()).toBe(2.8219178082191783) // moment 2.8213721020965523
  })
  it('Invalid ISO string', () => {
    expect(dayex.duration('Invalid').toISOString()).toBe('P0D')
  })
})

it('Is duration', () => {
  expect(dayex.isDuration(dayex.duration())).toBe(true)
  expect(dayex.isDuration(dayex.duration(1))).toBe(true)
  expect(dayex.isDuration(dayex())).toBe(false)
  expect(dayex.isDuration({})).toBe(false)
  expect(dayex.isDuration()).toBe(false)
})

it('toJSON', () => {
  expect(JSON.stringify({
    postDuration: dayex.duration(5, 'minutes')
  })).toBe('{"postDuration":"PT5M"}')
})

describe('Humanize', () => {
  it('Humaniz', () => {
    expect(dayex.duration(1, 'minutes').humanize()).toBe('a minute')
    expect(dayex.duration(2, 'minutes').humanize()).toBe('2 minutes')
    expect(dayex.duration(24, 'hours').humanize()).toBe('a day')
    expect(dayex.duration(1, 'minutes').humanize(true)).toBe('in a minute')
    expect(dayex.duration(-1, 'minutes').humanize(true)).toBe('a minute ago')
  })

  it('Locale', () => {
    expect(dayex.duration(1, 'minutes').humanize(true)).toBe('in a minute')
    expect(dayex.duration(1, 'minutes').locale('fr').humanize(true)).toBe('dans une minute')
    expect(dayex.duration(1, 'minutes').locale('es').humanize(true)).toBe('en un minuto')
  })
  it('Global Locale', () => {
    dayex.locale('en')
    expect(dayex.duration(1, 'minutes').humanize(true)).toBe('in a minute')
    dayex.locale('fr')
    expect(dayex.duration(1, 'minutes').humanize(true)).toBe('dans une minute')
    dayex.locale('es')
    expect(dayex.duration(1, 'minutes').humanize(true)).toBe('en un minuto')
    dayex.locale('en')
  })
})

describe('Clone', () => {
  it('Locale clone', () => {
    const d = dayex.duration(1, 'minutes').locale('fr')
    const r = 'dans une minute'
    expect(d.humanize(true)).toBe(r)
    expect(d.clone().humanize(true)).toBe(r)
  })
})

describe('Milliseconds', () => {
  expect(dayex.duration(500).milliseconds()).toBe(500)
  expect(dayex.duration(1500).milliseconds()).toBe(500)
  expect(dayex.duration(15000).milliseconds()).toBe(0)
  expect(dayex.duration(500).asMilliseconds()).toBe(500)
  expect(dayex.duration(1500).asMilliseconds()).toBe(1500)
  expect(dayex.duration(15000).asMilliseconds()).toBe(15000)
})

describe('Milliseconds', () => {
  describe('Positive number', () => {
    expect(dayex.duration(500).milliseconds()).toBe(500)
    expect(dayex.duration(1500).milliseconds()).toBe(500)
    expect(dayex.duration(15000).milliseconds()).toBe(0)
    expect(dayex.duration(500).asMilliseconds()).toBe(500)
    expect(dayex.duration(1500).asMilliseconds()).toBe(1500)
    expect(dayex.duration(15000).asMilliseconds()).toBe(15000)
  })

  describe('Negative number', () => {
    expect(dayex.duration(-500).milliseconds()).toBe(-500)
    expect(dayex.duration(-1500).milliseconds()).toBe(-500)
    expect(dayex.duration(-15000).milliseconds()).toBe(0)
    expect(dayex.duration(-500).asMilliseconds()).toBe(-500)
    expect(dayex.duration(-1500).asMilliseconds()).toBe(-1500)
    expect(dayex.duration(-15000).asMilliseconds()).toBe(-15000)
  })
})

describe('Add', () => {
  const a = dayex.duration(1, 'days')
  const b = dayex.duration(2, 'days')
  expect(a.add(b).days()).toBe(3)
  expect(a.add(1, 'days').days()).toBe(2)
  expect(a.add({ days: 5 }).days()).toBe(6)
})

describe('Add to a dayex()', () => {
  const a = dayex()
  const b = dayex.duration({ hours: 7, minutes: 10 })
  expect(a.add(b)).toEqual(a.add(7, 'hours').add(10, 'minutes'))
})

test('Add duration', () => {
  const a = dayex('2020-10-01')
  const days = dayex.duration(2, 'days')
  expect(a.add(days).format('YYYY-MM-DD')).toBe('2020-10-03')

  const b = dayex('2023-02-01 00:00:00')
  const p = dayex.duration('P1Y1M1DT1H1M1S')
  expect(b.add(p).format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-02 01:01:01')
})

describe('Subtract', () => {
  const a = dayex.duration(3, 'days')
  const b = dayex.duration(2, 'days')
  expect(a.subtract(b).days()).toBe(1)
})

test('Subtract duration', () => {
  const a = dayex('2020-10-20')
  const days = dayex.duration(2, 'days')
  expect(a.subtract(days).format('YYYY-MM-DD')).toBe('2020-10-18')

  const b = dayex('2023-03-02 02:02:02')
  const p = dayex.duration('P1Y1M1DT1H1M1S')
  expect(b.subtract(p).format('YYYY-MM-DD HH:mm:ss')).toBe('2022-02-01 01:01:01')
})

describe('Seconds', () => {
  expect(dayex.duration(500).seconds()).toBe(0)
  expect(dayex.duration(1500).seconds()).toBe(1)
  expect(dayex.duration(15000).seconds()).toBe(15)
  expect(dayex.duration(61000).seconds()).toBe(1) // 1 minute 1 second
  expect(dayex.duration(500).asSeconds()).toBe(0.5)
  expect(dayex.duration(1500).asSeconds()).toBe(1.5)
  expect(dayex.duration(15000).asSeconds()).toBe(15)
})

describe('Minutes', () => {
  expect(dayex.duration(100000).minutes()).toBe(1)
  expect(dayex.duration(61000).minutes()).toBe(1) // 1 minute 1 second
  expect(dayex.duration(100000).asMinutes().toFixed(2)).toBe('1.67')
})

describe('Hours', () => {
  expect(dayex.duration(10000000).hours()).toBe(2)
  expect(dayex.duration(10000000).asHours().toFixed(2)).toBe('2.78')
})

describe('Days', () => {
  it('positive number', () => {
    expect(dayex.duration(100000000).days()).toBe(1)
    expect(dayex.duration(100000000).asDays().toFixed(2)).toBe('1.16')
  })

  it('negative number', () => {
    expect(dayex.duration(-1).days()).toBe(0)
    expect(dayex.duration(-86399999).asDays()).toBeCloseTo(-0.999999, 4)
  })
})

describe('Weeks', () => {
  expect(dayex.duration(1000000000).weeks()).toBe(1)
  expect(dayex.duration(1000000000).asWeeks().toFixed(2)).toBe('1.65')
})

describe('Month', () => {
  expect(dayex.duration(10000000000).months()).toBe(3)
  expect(dayex.duration({ months: 3 }).asMonths()).toBe(3)
})

describe('Years', () => {
  expect(dayex.duration(100000000000).years()).toBe(3)
  expect(dayex.duration(100000000000).asYears().toFixed(2)).toBe('3.17')
})

describe('prettyUnit', () => {
  const d = dayex.duration(2, 's')
  expect(d.toISOString()).toBe('PT2S')
  expect(d.as('seconds')).toBe(2)
  expect(d.get('s')).toBe(2)
  expect(dayex.duration({
    M: 12,
    m: 12
  }).toISOString()).toBe('P12MT12M')
})

describe('Format', () => {
  test('no formatStr', () => {
    const d = dayex.duration(15, 'seconds')
      .add(13, 'hours')
      .add(35, 'minutes')
      .add(16, 'days')
      .add(10, 'months')
      .add(22, 'years')
    expect(d.format()).toBe('0022-10-16T13:35:15')
  })

  test('with formatStr for all tokens', () => {
    const d = dayex.duration(1, 'seconds')
      .add(8, 'hours')
      .add(5, 'minutes')
      .add(6, 'days')
      .add(9, 'months')
      .add(2, 'years')
      .add(10, 'milliseconds')
    expect(d.format('Y/YY.YYYYTESTM:MM:D:DD:H:HH:m:mm:s:ss:SSS'))
      .toBe('2/02.0002TEST9:09:6:06:8:08:5:05:1:01:010')
  })

  test('formats YYY as YY + Y', () => {
    const d = dayex.duration(2, 'years')
    expect(d.format('YYY')).toBe('022')
  })
})
