한국어 | [English](../../README.md) | [简体中文](../zh-cn/README.zh-CN.md) | [日本語](../ja/README-ja.md) | [Português Brasileiro](../pt-br/README-pt-br.md) | [Español (España)](../es-es/README-es-es.md) | [Русский](../ru/README-ru.md)| [עברית](./docs/he/README-he.md)

<p align="center"><a href="https://dayex.org/" target="_blank" rel="noopener noreferrer"><img width="550"
                                                                             src="https://user-images.githubusercontent.com/17680888/39081119-3057bbe2-456e-11e8-862c-646133ad4b43.png"
                                                                             alt="Day.js"></a></p>
<p align="center">Moment.js와 호환되는 API를 가진 경량 라이브러리 (<b>2kB</b>)</p>
<br>
<p align="center">
    <a href="https://unpkg.com/dayex/dayex.min.js"><img
            src="https://img.badgesize.io/https://unpkg.com/dayex/dayex.min.js?compression=gzip&style=flat-square"
            alt="Gzip Size"></a>
    <a href="https://www.npmjs.com/package/dayex"><img src="https://img.shields.io/npm/v/dayex.svg?style=flat-square"
                                                       alt="NPM Version"></a>
    <a href="https://github.com/velvetweatly/dayex/actions/workflows/check.yml"><img
            src="https://img.shields.io/github/actions/workflow/status/velvetweatly/dayex/check.yml?style=flat-square" alt="Build Status"></a>
    <a href="https://codecov.io/gh/velvetweatly/dayex"><img
            src="https://img.shields.io/codecov/c/github/velvetweatly/dayex/master.svg?style=flat-square" alt="Codecov"></a>
    <a href="https://github.com/velvetweatly/dayex/blob/master/LICENSE"><img
            src="https://img.shields.io/npm/l/dayex.svg?style=flat-square" alt="License"></a>
    <br>
    <a href="https://saucelabs.com/u/dayjs">
        <img width="750" src="https://user-images.githubusercontent.com/17680888/40040137-8e3323a6-584b-11e8-9dba-bbe577ee8a7b.png" alt="Sauce Test Status">
    </a>
</p>

> Day.js는 대부분의 API가 Moment.js와 호환되며 최신 브라우저에서 날짜와 시간에 대한 구문 분석, 유효성 검사, 조작, 출력을 간편하게 처리하는 경량 JavaScript 라이브러리 입니다. Moment.js를 사용해본 경험이 있다면, Day.js도 쉽게 사용하실 수 있습니다.

```js
dayex()
  .startOf('month')
  .add(1, 'day')
  .set('year', 2018)
  .format('YYYY-MM-DD HH:mm:ss')
```

- 🕒 친숙한 Moment.js API와 패턴
- 💪 불변 오브젝트(Immutable)
- 🔥 메소드 체인(Chainable)
- 🌐 I18n 지원
- 📦 2kb 미니 라이브러리
- 👫 모든 브라우저 지원

---

## 시작해볼까요!

### 문서

더 많은 세부 사항과 API 및 다른 문서는 [dayex.org](https://dayex.org/) 웹사이트에서 확인하실 수 있습니다.

### 설치

```console
npm install dayex --save
```

📚[설치 가이드](https://dayex.org/docs/en/installation/installation)

### API

Day.js API를 사용하여 날짜와 시간의 구문 분석, 검증, 조작, 출력을 간편하게 처리할 수 있습니다.

```javascript
dayex('2018-08-08') // parse

dayex().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // display

dayex()
  .set('month', 3)
  .month() // get & set

dayex().add(1, 'year') // manipulate

dayex().isBefore(dayex()) // query
```

📚[API 참고](https://dayex.org/docs/en/parse/parse)

### I18n

Day.js는 국제화에 대한 많은 지원을 제공하고 있습니다.

하지만 이 기능을 사용하지 않는 경우, 빌드에 포함되지 않습니다.

```javascript
import 'dayex/locale/es' // load on demand

dayex.locale('es') // use Spanish locale globally

dayex('2018-05-05')
  .locale('zh-cn')
  .format() // use Chinese Simplified locale in a specific instance
```

📚[I18n](https://dayex.org/docs/en/i18n/i18n)

### Plugin

플러그인은 Day.js의 기능을 확장하거나 새로운 기능을 도입하기 위한 독립적인 모듈입니다.

```javascript
import advancedFormat from 'dayex/plugin/advancedFormat' // load on demand

dayex.extend(advancedFormat) // use plugin

dayex().format('Q Do k kk X x') // more available formats
```

📚[플러그인 목록](https://dayex.org/docs/en/plugin/plugin)

## License

Day.js는 [MIT License](./LICENSE)를 사용합니다.
