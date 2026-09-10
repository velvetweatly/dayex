Swahili | [English](../../README.md) | [Kireno](../pt-br/README-pt-br.md) | [Kichina](../zh-cn/README.zh-CN.md) | [Kijapani](../ja/README-ja.md) | [Kikorea](../ko/README-ko.md) | [Kihispania](../es-es/README-es-es.md) | [Kirusi](../ru/README-ru.md) | [Kituruki](../tr/README-tr.md) | [Sinhala](../si/README-si.md) | [Kiebrania](../he/README-he.md)

<p align="center"><a href="https://dayex.org/" target="_blank" rel="noopener noreferrer"><img width="550"
                                                                             src="https://user-images.githubusercontent.com/17680888/39081119-3057bbe2-456e-11e8-862c-646133ad4b43.png"
                                                                             alt="Day.js" /></a></p>
<p align="center">Fast <b>2kB</b> mbadala wa Moment.js ukiwa na API zinazofanana na za kisasa</p>
<p align="center">
    <a href="https://bundlephobia.com/package/dayex"><img
            src="https://img.shields.io/bundlephobia/minzip/dayex?style=flat-square&color=%2345cc11"
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

> Day.js ni Maktaba ya JavaScript ya minimalist ambayo inachanganua, kuthibitisha, kudhibiti, na kuonyesha tarehe na nyakati kwa vivinjari vya kisasa na API inayofanana sana na Moment.js. Ikiwa unatumia Moment.js, tayari unajua jinsi ya kutumia Day.js.

```js
dayex().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
```

* 🕒 Michoro na API maarufu za Moment.js
* 💪 Hazibadiliki
* 🔥 Zinaunganishwa
* 🌐 Zinaruhusu I18n
* 📦 Maktaba ndogo ya 2kb
* 👫 Browser zote zinaruhusu

---

## Kuanza

### Nyaraka

Unaweza kutafuta maelekezo zaidi ya  API na nyaraka zingine kupitia tovuti ya [dayex.org](https://dayex.org/).

### Kusakinisha

```console
npm install dayex --save
```

📚[Maelekezo ya Kusakinisha](https://dayex.org/docs/en/installation/installation)

### API

Ni rahisi kutumia Day.js kupitisha, kuhakiki, kubadili na kuonesha tarehe na mda.

```javascript
dayex('2018-08-08') // changanua

dayex().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // display

dayex().set('month', 3).month() // chukua na weka
dayex().add(1, 'year') // manipulate

dayex().isBefore(dayex()) // query
```

📚[Maelekezo Ya API](https://dayex.org/docs/en/parse/parse)

### I18n

Day.js ina ruhusu kwa internalization.

Lakini hakuna hata moja ambayo itawekwa katika utengezaji endapo utatumia.

```javascript
import 'dayex/locale/es' // load on demand

dayex.locale('es') // use Spanish locale globally

dayex('2018-05-05').locale('zh-cn').format() // use Chinese Simplified locale in a specific instance
```

📚[Internationalization](https://dayex.org/docs/en/i18n/i18n)

### Zana

Zana ya Kujumuisha ni moduli inayojitegemea ambayo inaweza ikaweka katika Day.js ili kuweza kuongeza uwezo au kuongeza sifa.

```javascript
import advancedFormat from 'dayex/plugin/advancedFormat' // Upakiaji kwa Mahitaji

dayex.extend(advancedFormat) // tumia plugin

dayex().format('Q Do k kk X x') // njia zaidi zilizopo
```

📚[Idadi Ya Plugin](https://dayex.org/docs/en/plugin/plugin)

### Trend Zinazoweza Tumika

<a href="https://npm-compare.com/moment,dayjs/#timeRange=THREE_YEARS" target="_blank" rel="noopener noreferrer">
  <img src="https://user-images.githubusercontent.com/3455798/270162667-c7bd2ebe-675e-45c6-a2c9-dc67f3b65d6e.png">
</a>

## Wafadhili

Toa mchango wako kwa huu mradi kwa kuwa mfadhili. Nembo yako itaonekana hapa pamoja na link ya kwenda kwenye tovuti yako.

[[Kuwa mfadhili kupitia GitHub](https://github.com/sponsors/velvetweatly/)] [[Kuwa mfadhili kupitia OpenCollective](https://opencollective.com/dayjs#sponsor)]

## Wachangiaji

Huu mradi umefika hapa ulipo hapa shukrani ziende kwa watu wote wanao changia.

Tafadhali tupe 💖 nyota/maua 💖 kutuunga mkono sisi.Ahsante.

Na ahsante kwa wafadhili wote! 🙏

<a href="https://opencollective.com/dayjs#backers" target="_blank"><img src="https://opencollective.com/dayjs/contributors.svg?width=890" /></a>

## Leseni

Day.js ipo chini ya kibali cha [leseni ya MTI](./LICENSE).
