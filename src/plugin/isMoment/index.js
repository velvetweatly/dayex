export default (o, c, f) => {
  f.isMoment = function (input) {
    return f.isDayex(input)
  }
}

