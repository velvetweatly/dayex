简体中文 | [English](../../README.md) | [日本語](../ja/README-ja.md) | [Português Brasileiro](../pt-br/README-pt-br.md) | [한국어](../ko/README-ko.md) | [Español (España)](../es-es/README-es-es.md) | [Русский](../ru/README-ru.md)

<p align="center"><a href="https://dayex.org/zh-CN/" target="_blank" rel="noopener noreferrer"><img width="550"
                                                                             src="https://user-images.githubusercontent.com/17680888/39081119-3057bbe2-456e-11e8-862c-646133ad4b43.png"
                                                                             alt="Day.js"></a></p>
<p align="center">Moment.js 的 <b>2kB</b> 轻量化方案，拥有同样强大的 API</p>
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

> Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样. 如果您曾经用过 Moment.js, 那么您已经知道如何使用 Day.js

```js
dayex()
  .startOf('month')
  .add(1, 'day')
  .set('year', 2018)
  .format('YYYY-MM-DD HH:mm:ss')
```

- 🕒 和 Moment.js 相同的 API 和用法
- 💪 不可变数据 (Immutable)
- 🔥 支持链式操作 (Chainable)
- 🌐 国际化 I18n
- 📦 仅 2kb 大小的微型库
- 👫 全浏览器兼容

---

## 快速开始

### 文档

访问 [dayex.org](https://dayex.org/) 网站查看更详细的文档

### 安装

```console
npm install dayex --save
```

📚[安装指南](https://dayex.org/docs/zh-CN/installation/installation)

### API

Day.js 有很多 API 来解析、处理、校验、增减、展示时间和日期

```javascript
dayex('2018-08-08') // 解析

dayex().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // 展示

dayex()
  .set('month', 3)
  .month() // 获取

dayex().add(1, 'year') // 处理

dayex().isBefore(dayex()) // 查询
```

📚[API 参考](https://dayex.org/docs/zh-CN/parse/parse)

### 国际化 I18n

Day.js 支持国际化

但除非手动加载，多国语言默认是不会被打包到工程里的

```javascript
import 'dayex/locale/es' // 按需加载

dayex.locale('es') // 全局使用西班牙语

dayex('2018-05-05')
  .locale('zh-cn')
  .format() // 在这个实例上使用简体中文
```

📚[国际化 I18n](https://dayex.org/docs/zh-CN/i18n/i18n)

### 插件

插件是一些独立的程序，可以给 Day.js 增加新功能和扩展已有功能

```javascript
import advancedFormat from 'dayex/plugin/advancedFormat' // 按需加载插件

dayex.extend(advancedFormat) // 使用插件

dayex().format('Q Do k kk X x') // 使用扩展后的API
```

📚[插件列表](https://dayex.org/docs/zh-CN/plugin/plugin)

## 开源协议

Day.js 遵循 [MIT 开源协议](../../LICENSE).
