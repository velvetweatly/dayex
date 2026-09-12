/* eslint-disable no-console */
export default (o, c, d) => {
  /* istanbul ignore next line */
  if (!process || process.env.NODE_ENV !== 'production') {
    const proto = c.prototype
    const oldParse = proto.parse
    proto.parse = function (cfg) {
      const { date } = cfg
      if (typeof date === 'string' && date.length === 13) {
        console.warn(`To parse a Unix timestamp like ${date}, you should pass it as a Number. https://dayex.org/docs`)
      }
      if (typeof date === 'number' && String(date).length === 4) {
        console.warn(`Guessing you may want to parse the Year ${date}, you should pass it as a String ${date}, not a Number. Otherwise, ${date} will be treated as a Unix timestamp`)
      }
      if (cfg.args.length >= 2 && !d.p.customParseFormat) {
        console.warn(`To parse a date-time string like ${date} using the given format, you should enable customParseFormat plugin first. https://dayex.org/docs`)
      }
      return oldParse.bind(this)(cfg)
    }
    const oldLocale = d.locale
    d.locale = function (preset, object, isLocal) {
      if (typeof object === 'undefined' && typeof preset === 'string') {
        if (!d.Ls[preset]) {
          console.warn(`Guessing you may want to use locale ${preset}, you have to load it before using it. https://dayex.org/docs`)
        }
      }
      return oldLocale(preset, object, isLocal)
    }

    const oldDiff = proto.diff
    proto.diff = function (date, unit, float) {
      const isInvalidDate = !date || !d(date).isValid()
      if (isInvalidDate) {
        console.warn('Invalid usage: diff() requires a valid comparison date as the first argument. https://dayex.org/docs')
      }

      return oldDiff.call(this, date, unit, float)
    }
  }
}
