import dayex from 'dayex'
// basic usage
dayex().format()

// parse
dayex('2018-08-08').format()

// format
dayex().format('YYYY-MM-DD')

// locale
dayex().locale('zh-cn').format()

// add
dayex().add(1, 'year').format()

// subtract
dayex().subtract(1, 'year').format()

// diff
dayex().diff(dayex().add(1, 'year'), 'year')

// isBefore
dayex().isBefore(dayex().add(1, 'year'))

// isAfter
dayex().isAfter(dayex().subtract(1, 'year'))

// isSame
dayex().isSame(dayex())

// isLeapYear
dayex().isLeapYear()

// isBetween
dayex().isBetween(dayex().subtract(1, 'year'), dayex().add(1, 'year'))

// isSameOrAfter
dayex().isSameOrAfter(dayex().subtract(1, 'year'))

// isSameOrBefore
dayex().isSameOrBefore(dayex().add(1, 'year'))

// startOf
dayex().startOf('year').format()

// endOf
dayex().endOf('year').format()

// week
dayex().week()

// weekday
dayex().weekday()
