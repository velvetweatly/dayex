/// <reference path="./types.d.ts" />

declare module 'dayex/locale/*' {
  namespace locale {
    interface Locale extends ILocale {}
  }

  const locale: locale.Locale

  export = locale
}
