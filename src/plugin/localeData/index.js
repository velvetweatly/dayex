import { t } from '../localizedFormat/utils'

export default (o, c, dayex) => { // locale needed later
  const proto = c.prototype
  const getLocalePart = part => (part && (part.indexOf ? part : part.s))
  const getShort = (ins, target, full, num, localeOrder) => {
    const locale = ins.name ? ins : ins.$locale()
    const targetLocale = getLocalePart(locale[target])
    const fullLocale = getLocalePart(locale[full])
    const result = targetLocale || fullLocale.map(f => f.slice(0, num))
    if (!localeOrder) return result
    const { weekStart } = locale
    return result.map((_, index) => (result[(index + (weekStart || 0)) % 7]))
  }
  const getDayexLocaleObject = () => dayex.Ls[dayex.locale()]
  const getLongDateFormat = (l, format) =>
    l.formats[format] || t(l.formats[format.toUpperCase()])

  const localeData = function () {
    return {
      months: instance =>
        (instance ? instance.format('MMMM') : getShort(this, 'months')),
      monthsShort: instance =>
        (instance ? instance.format('MMM') : getShort(this, 'monthsShort', 'months', 3)),
      firstDayOfWeek: () => this.$locale().weekStart || 0,
      weekdays: instance => (instance ? instance.format('dddd') : getShort(this, 'weekdays')),
      weekdaysMin: instance =>
        (instance ? instance.format('dd') : getShort(this, 'weekdaysMin', 'weekdays', 2)),
      weekdaysShort: instance =>
        (instance ? instance.format('ddd') : getShort(this, 'weekdaysShort', 'weekdays', 3)),
      longDateFormat: format => getLongDateFormat(this.$locale(), format),
      meridiem: this.$locale().meridiem,
      ordinal: this.$locale().ordinal
    }
  }
  proto.localeData = function () {
    return localeData.bind(this)()
  }

  dayex.localeData = () => {
    const localeObject = getDayexLocaleObject()
    return {
      firstDayOfWeek: () => localeObject.weekStart || 0,
      weekdays: () => dayex.weekdays(),
      weekdaysShort: () => dayex.weekdaysShort(),
      weekdaysMin: () => dayex.weekdaysMin(),
      months: () => dayex.months(),
      monthsShort: () => dayex.monthsShort(),
      longDateFormat: format => getLongDateFormat(localeObject, format),
      meridiem: localeObject.meridiem,
      ordinal: localeObject.ordinal
    }
  }

  dayex.months = () => getShort(getDayexLocaleObject(), 'months')

  dayex.monthsShort = () => getShort(getDayexLocaleObject(), 'monthsShort', 'months', 3)

  dayex.weekdays = localeOrder => getShort(getDayexLocaleObject(), 'weekdays', null, null, localeOrder)

  dayex.weekdaysShort = localeOrder => getShort(getDayexLocaleObject(), 'weekdaysShort', 'weekdays', 3, localeOrder)

  dayex.weekdaysMin = localeOrder => getShort(getDayexLocaleObject(), 'weekdaysMin', 'weekdays', 2, localeOrder)
}
