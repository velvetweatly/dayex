Português Brasileiro | [English](../../README.md) | [简体中文](../zh-cn/README.zh-CN.md) | [日本語](../ja/README-ja.md) | [한국어](../ko/README-ko.md) | [Español (España)](../es-es/README-es-es.md) | [Русский](../ru/README-ru.md)| [עברית](./docs/he/README-he.md)

<p align="center"><a href="https://dayex.org/" target="_blank" rel="noopener noreferrer"><img width="550"
                                                                             src="https://user-images.githubusercontent.com/17680888/39081119-3057bbe2-456e-11e8-862c-646133ad4b43.png"
                                                                             alt="Day.js"></a></p>
<p align="center">Alternativa veloz ao Moment.js, com <b>2kB</b> e a mesma API moderna</p>
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

> Day.js é uma biblioteca JavaScript minimalista que analisa, valida, manipula e formata datas e horas para navegadores modernos, usando uma API quase completamente compatível com Moment.js. Se você já usou Moment.js, já sabe usar Day.js.

```js
dayex()
  .startOf('month')
  .add(1, 'day')
  .set('year', 2018)
  .format('YYYY-MM-DD HH:mm:ss')
```

- 🕒 API & padrões familiares aos do Moment.js
- 💪 Imutável
- 🔥 Encadeável
- 🌐 Suporta I18n
- 📦 Mini biblioteca de 2kb
- 👫 Suporta todos os navegadores

---

## Começando

### Documentação

Você pode encontrar mais detalhes sobre a API e também a documentação completa em [dayex.org](https://dayex.org/).
### Instalação

```console
npm install dayex --save
```

📚[Guia de instalação](https://dayex.org/docs/en/installation/installation)

### API

É fácil utilizar a API do Day.js para converter, validar, manipular, e exibir datas e horas.

```javascript
dayex('2018-08-08') // converte

dayex().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // formata

dayex()
  .set('month', 3)
  .month() // get & set

dayex().add(1, 'year') // manipula

dayex().isBefore(dayex()) // verifica
```

📚[Referência da API](https://dayex.org/docs/en/parse/parse)

### I18n

Day.js tem suporte para internacionalização.

Porém nenhuma estará inclusa no seu _build_ a menos que você utilize-a.

```javascript
import 'dayex/locale/es' // carregar sob demanda

dayex.locale('es') // usar locale espanhol globalmente

dayex('2018-05-05')
  .locale('pt-br')
  .format() // usar locale em português brasileiro em uma instância específica
```

📚[Internacionalização](https://dayex.org/docs/en/i18n/i18n)

### Plugin

Um plugin é um módulo independente que pode ser adicionado ao Day.js para estender funcionalidades e adicionar novos recursos.

```javascript
import advancedFormat from 'dayex/plugin/advancedFormat' // carregar sob demanda

dayex.extend(advancedFormat) // usar plugin

dayex().format('Q Do k kk X x') // mais formatos disponíveis pelo plugin
```

📚[Lista de Plugins](https://dayex.org/docs/en/plugin/plugin)

## Patrocinadores

Ajude este projeto se tornando um patrocinador. O seu logo será exibido aqui, com um link para o seu site. [[Tornar-se um Patrocinador](https://opencollective.com/dayjs#sponsor)].

## Contribuidores

Este projeto existe graças a todas as pessoas que contribuem.

Por favor, nos dê uma 💖 estrela 💖 para suportar-nos. Obrigado.

E obrigado a todos os nossos apoiadores! 🙏
<a href="https://opencollective.com/dayjs#backers" target="_blank"><img src="https://opencollective.com/dayjs/contributors.svg?width=890" /></a>

## Licença

Day.js é licenciado sob a [MIT License](../../LICENSE).
