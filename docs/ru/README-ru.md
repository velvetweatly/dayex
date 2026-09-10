Русский | [English](../../README.md) | [简体中文](../zh-cn/README.zh-CN.md) | [日本語](../ja/README-ja.md) | [Português Brasileiro](../pt-br/README-pt-br.md) | [한국어](../ko/README-ko.md) | [Español (España)](../es-es/README-es-es.md)| [עברית](./docs/he/README-he.md)

<p align="center"><a href="https://dayex.org/" target="_blank" rel="noopener noreferrer"><img width="550"
                                                                             src="https://user-images.githubusercontent.com/17680888/39081119-3057bbe2-456e-11e8-862c-646133ad4b43.png"
                                                                             alt="Day.js"></a></p>
<p align="center">Быстрая <b>2kB</b> альтернатива Moment.js с тем же современным API</p>
<br>
<p align="center">
    <a href="https://unpkg.com/dayex/dayex.min.js"><img
            src="https://img.badgesize.io/https://unpkg.com/dayex/dayex.min.js?compression=gzip&style=flat-square"
            alt="Gzip Size"></a>
    <a href="https://www.npmjs.com/package/dayex"><img src="https://img.shields.io/npm/v/dayex.svg?style=flat-square&colorB=51C838"
                                                       alt="NPM Version"></a>
    <a href="https://github.com/velvetweatly/dayex/actions/workflows/check.yml"><img
            src="https://img.shields.io/github/actions/workflow/status/velvetweatly/dayex/check.yml?style=flat-square" alt="Build Status"></a>
    <a href="https://codecov.io/gh/velvetweatly/dayex"><img
            src="https://img.shields.io/codecov/c/github/velvetweatly/dayex/master.svg?style=flat-square" alt="Codecov"></a>
    <a href="https://github.com/velvetweatly/dayex/blob/master/LICENSE"><img
            src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="License"></a>
    <br>
    <a href="https://saucelabs.com/u/dayjs">
        <img width="750" src="https://user-images.githubusercontent.com/17680888/40040137-8e3323a6-584b-11e8-9dba-bbe577ee8a7b.png" alt="Sauce Test Status">
    </a>
</p>

> Day.js - это миниатюрная JavaScript библиотека, которая парсит, валидирует, управляет, и отображает даты и время для современных браузеров, обладающая большой совместимостью с Moment.js API. Если вы используете Moment.js, вы уже знаете как пользоваться Day.js.

```js
dayex().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
```

* 🕒 Хорошо знакомые API и паттерны Moment.js
* 💪 Неизменная
* 🔥 Цепная
* 🌐 Поддержка интернационализации (I18n)
* 📦 2kb мини-библиотека
* 👫 Поддерживающаяся всеми браузерами

---

## Начало работы

### Документация

Вы можете найти больше детальной информации, API, и других документов на веб-сайте [dayex.org](https://dayex.org/).

### Установка

```console
npm install dayex --save
```

📚[Инструкция по установке](https://dayex.org/docs/en/installation/installation)

### API

API Day.js легко использовать для парсинга, валидации, управления, и отображения дат и времени.

```javascript
dayex('2018-08-08') // парсинг

dayex().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // отображение

dayex().set('month', 3).month() // получение и установка

dayex().add(1, 'year') // управление

dayex().isBefore(dayex()) // осведомление
```

📚[Ссылка на API](https://dayex.org/docs/en/parse/parse)

### I18n

Day.js обладает великолепной поддержкой интернационализации.

Но ни одна из локализаций не будет включена в вашу сборку до тех пор, пока вы не начнёте её использовать.
```javascript
import 'dayex/locale/es' // загрузка по требованию

dayex.locale('es') // глобальное использование Испанской локали

dayex('2018-05-05').locale('zh-cn').format() // использование упрощённой Китайской локали в конкретном случае
```
📚[Интернационализация](https://dayex.org/docs/en/i18n/i18n)

### Плагин

Плагин - это независимый модуль, который может быть добавлен в Day.js с целью расширения функциональных возможностей или добавления новых особенностей.

```javascript
import advancedFormat from 'dayex/plugin/advancedFormat' // загрузка по требованию

dayex.extend(advancedFormat) // использование плагина

dayex().format('Q Do k kk X x') // больше доступных форматов
```

📚[Список плагинов](https://dayex.org/docs/en/plugin/plugin)

## Спонсоры

Поддержите этот проект, став спонсором. Ваш логотип будет показан здесь с ссылкой на ваш веб-сайт. [[Стать спонсором](https://opencollective.com/dayjs#sponsor)]

## Контрибьюторы

Этот проект существует благодаря всем людям, кто вносит свой вклад в его развитие.

Пожалуйста поставьте 💖 звездочку 💖, чтобы поддержать нас. Спасибо.

Также выражаю благодарность всем нашим спонсорам! 🙏

<a href="https://opencollective.com/dayjs#backers" target="_blank"><img src="https://opencollective.com/dayjs/contributors.svg?width=890" /></a>

## Лицензия

Day.js распространяется под [лицензией MIT](./LICENSE-ru).
