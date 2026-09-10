// eslint-disable-next-line valid-typeof
const isBigInt = num => typeof num === 'bigint'
export default (o, c, dayex) => {
  const proto = c.prototype
  const parseDate = (cfg) => {
    const { date } = cfg
    if (isBigInt(date)) {
      return Number(date)
    }
    return date
  }

  const oldParse = proto.parse
  proto.parse = function (cfg) {
    cfg.date = parseDate.bind(this)(cfg)
    oldParse.bind(this)(cfg)
  }


  const oldUnix = dayex.unix
  dayex.unix = function (timestamp) {
    const ts = isBigInt(timestamp) ? Number(timestamp) : timestamp
    return oldUnix(ts)
  }
}
