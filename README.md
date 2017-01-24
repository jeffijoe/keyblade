# keyblade

[![npm](https://img.shields.io/npm/v/keyblade.svg?maxAge=1000)](https://www.npmjs.com/package/keyblade)
[![dependency Status](https://img.shields.io/david/jeffijoe/keyblade.svg?maxAge=1000)](https://david-dm.org/jeffijoe/keyblade)
[![devDependency Status](https://img.shields.io/david/dev/jeffijoe/keyblade.svg?maxAge=1000)](https://david-dm.org/jeffijoe/keyblade)
[![Build Status](https://img.shields.io/travis/jeffijoe/keyblade.svg?maxAge=1000)](https://travis-ci.org/jeffijoe/keyblade)
[![Coveralls](https://img.shields.io/coveralls/jeffijoe/keyblade.svg?maxAge=1000)](https://coveralls.io/github/jeffijoe/keyblade)
[![Code Climate](https://img.shields.io/codeclimate/github/jeffijoe/keyblade.svg?maxAge=1000)](https://codeclimate.com/github/jeffijoe/keyblade)
[![npm](https://img.shields.io/npm/dt/keyblade.svg?maxAge=1000)](https://www.npmjs.com/package/keyblade)
[![npm](https://img.shields.io/npm/l/keyblade.svg?maxAge=1000)](https://github.com/jeffijoe/keyblade/blob/master/LICENSE.md)
[![node](https://img.shields.io/node/v/keyblade.svg?maxAge=1000)](https://www.npmjs.com/package/keyblade)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Fail fast when accessing undefined properties on objects.

# Installation

This is not the library you need. _This is the library you deserve!_

```
npm install keyblade --save
```

_Requires Node v6 or above._

# Usage

```js
const { keyblade, UndefinedKeyError } = require('keyblade')

// Object to protect
const unsafe = {
  hello: 'world'
}

console.log(unsafe.hello)
// < 'world'
console.log(unsafe.goodbye)
// < undefined

// Create a protected version (does not modify `unsafe`)
const safe = keyblade(unsafe)

console.log(safe.hello)
// < 'world'
console.log(safe.goodbye)
// < UndefinedKeyError: The key 'goodbye' does not exist on the object.
```

**Note**: to ensure interoperability with utilities that use Symbols, checking them has been disabled. This means using `util.inspect` and `JSON.stringify` works without issues. I don't know why you would need to stringify a protected object but... you can!

# Why do I <strike>need</strike> deserve it?

Glad you asked! Heard of those wonderful things we call _environment variables_? They're fun! Even more so when _someone_ forgets to define them.

```js
const env = process.env

const cert = someModuleThatNeedsACertFile(env.CERT_FILE_PATH)

// Later...

// < Error: something about strings or buffers I dunno man..
```

Of course, you could be all like..

```js
if (!env.CERT_FILE_PATH) throw new Error('No CERT_FILE_PATH specified')
```

Now repeat that 43 times. **Or**, you could use `keyblade`!

```js
const { keyblade } = require('keyblade')
const env = keyblade(process.env)

const cert = someModuleThatNeedsACertFile(env.CERT_FILE_PATH)
// < UndefinedKeyError: The key 'CERT_FILE_PATH' does not exist on the object.
```

One could even get fancy and customize the error message.

```js
const env = keyblade(process.env, {
  message: (key) => `Environment variable ${key} is not set.`
})

const cert = someModuleThatNeedsACertFile(env.CERT_FILE_PATH)
// < UndefinedKeyError: Environment variable CERT_FILE_PATH is not set.
```

If you are not a fan of the `console.error` happening before throwing, you can either customize it:

```js
const env = keyblade(process.env, {
  message: (key) => `Environment variable ${key} is not set.`,
  logBeforeThrow: (message, key) => mylogger.error(message, 'key was ' + key)
})
```

Or disable it entirely.

```js
const env = keyblade(process.env, {
  message: (key) => `Environment variable ${key} is not set.`,
  logBeforeThrow: false
})
```

# Contributing

## `npm run` scripts

* `npm run test`: Runs tests once
* `npm run test-watch`: Runs tests in watch-mode
* `npm run lint`: Lints the code once
* `npm run lint-watch`: Lints the code in watch-mode
* `npm run cover`: Runs code coverage using `nyc` (`istanbul`)
* `npm run coveralls`: Used by coveralls


# Author

Jeff Hansen - [@Jeffijoe](https://twitter.com/Jeffijoe)
