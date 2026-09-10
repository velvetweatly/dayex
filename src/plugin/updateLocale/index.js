export default (option, Dayex, dayex) => {
  dayex.updateLocale = function (locale, customConfig) {
    const localeList = dayex.Ls
    const localeConfig = localeList[locale]
    if (!localeConfig) return
    const customConfigKeys = customConfig ? Object.keys(customConfig) : []
    customConfigKeys.forEach((c) => {
      if (localeConfig[c] && customConfig[c] && typeof localeConfig[c] === 'object' && typeof customConfig[c] === 'object'
        && !Array.isArray(localeConfig[c])) {
        localeConfig[c] = {
          ...localeConfig[c],
          ...customConfig[c]
        }
      } else {
        localeConfig[c] = customConfig[c]
      }
    })
    return localeConfig // eslint-disable-line consistent-return
  }
}

