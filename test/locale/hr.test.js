import moment from 'moment'
import dayex from '../../src'
import '../../src/locale/hr'

it('Format month with locale function', () => {
  for (let i = 0; i <= 7; i += 1) {
    const dayexUK = dayex().locale('hr').add(i, 'day')
    const momentUK = moment().locale('hr').add(i, 'day')
    const testFormat1 = 'DD MMMM YYYY MMM'
    const testFormat2 = 'dddd, MMMM D YYYY'
    const testFormat3 = 'MMMM'
    const testFormat4 = 'MMM'
    expect(dayexUK.format(testFormat1)).toEqual(momentUK.format(testFormat1))
    expect(dayexUK.format(testFormat2)).toEqual(momentUK.format(testFormat2))
    expect(dayexUK.format(testFormat3)).toEqual(momentUK.format(testFormat3))
    expect(dayexUK.format(testFormat4)).toEqual(momentUK.format(testFormat4))
  }
})
