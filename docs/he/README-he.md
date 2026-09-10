<div dir="rtl">

עברית | [English](../../README.md)  | [简体中文](./docs/zh-cn/README.zh-CN.md) | [日本語](./docs/ja/README-ja.md) | [Português Brasileiro](./docs/pt-br/README-pt-br.md) | [한국어](./docs/ko/README-ko.md) | [Español (España)](./docs/es-es/README-es-es.md) | [Русский](./docs/ru/README-ru.md) | [Türkçe](./docs/tr/README-tr.md) | [සිංහල](./docs/si/README-si.md)

<p align="center"><a href="https://dayex.org/" target="_blank" rel="noopener noreferrer"><img width="550"
                                                                             src="https://user-images.githubusercontent.com/17680888/39081119-3057bbe2-456e-11e8-862c-646133ad4b43.png"
                                                                             alt="Day.js"></a></p>
<p align="center">אלטרנטיבה מהירה ל-Moment.js ששוקלת רק <b>2kB</b> עם אותן יכולות מודרניות</p>
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

> Day.js היא ספרייה מינימלסטית לפענוח, אימות, מניפולציה והצגה של תאריכים ושעות לדפדפנים מודרנים עם תאימות גבוהה ל-API של Moment.js. אם השתמשתם ב-Moment.js, אתם כבר יודעים את Day.js

<div dir="ltr">

```js
dayex().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
```

</div>

* 🕒 תבניות ו-API זהים ל-Moment.js
* 💪 אינו ניתן לשינוי
* 🔥 ניתן לשרשור
* 🌐 תמיכה ב-I18n
* 📦 ספרייה קטנטנה 2kb
* 👫 נתמכת בכל הדפדפנים

---

## צעדים ראשונים

### דוקומנטצייה
באתר [dayex.org](https://dayex.org/) ניתן למצוא פרטים נוספים, API, ותיעודים נוספים.


### התקנה

```console
npm install dayex --save
```

📚[מדריך התקנה](https://dayex.org/docs/en/installation/installation)

### API
מאוד קל להשתמש ב-Day.js לפענוח, אימות, מניפולציה והצגה של תאריכים ושעות.

<div dir="ltr">


```javascript
dayex('2018-08-08') // פענוח

dayex().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // הצגה

dayex().set('month', 3).month() // קבלה והגדרה

dayex().add(1, 'year') // מניפולציה

dayex().isBefore(dayex()) // שאילתה
```

</div>

📚[תיעודי API](https://dayex.org/docs/en/parse/parse)

### I18n
ל-Day.js יש תמיכה מצוינית בבינלאומיות.

אבל אף אחד מהם לא יכלל בקובץ הסופי אלא אם כן יתבצע בהם שימוש.

<div dir="ltr">


```javascript
import 'dayex/locale/es' // טעינה לפי הצורך

dayex.locale('es') // הגדרה לשימוש בספרדית באופן גלובלאלי

dayex('2018-05-05').locale('zh-cn').format() // הגדרה לשימוש בסינית פשוטה למופע ספיציפי בלבד
```

</div>


📚[בינלאומיות](https://dayex.org/docs/en/i18n/i18n)

### תוסף

תוסף הוא מודול בלתי-תלוי הניתן להוספה ל-Day.js להרחבה או להוספה של פונקציות.


<div dir="ltr">


```javascript
import advancedFormat from 'dayex/plugin/advancedFormat' //  טעינה לפי הצורך

dayex.extend(advancedFormat) // שימוש בתוסף

dayex().format('Q Do k kk X x') // כעת יותר אפשרויות זמינות
```

</div>

📚[רשימת תוספים](https://dayex.org/docs/en/plugin/plugin)

## תורמים

פרויקט זה קיים הודות לכל האנשים שתמכו בו.

תנו לנו 💖 כוכב 💖 כדי לתמוך בנו. תודה רבה.

ותודה רבה לכל התומכים שלנו! 🙏

<a href="https://opencollective.com/dayjs#backers" target="_blank"><img src="https://opencollective.com/dayjs/contributors.svg?width=890" /></a>

## רישיון

Day.js מורשה לשימוש עם [רישיון MIT](./LICENSE).
</div>
