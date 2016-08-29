declare var require: any
declare var describe: any
declare var it: any
declare var expect: any

import env from './env'
const envCommon = require('./env-common')
const { UndefinedKeyError } = require('../../lib/keyblade')

describe('typescript', function () {
  it('supports typescript import-export', function () {
    expect(env.TEST).to.equal(true)
    expect(() => env.LOL).to.throw(UndefinedKeyError)
  })

  it('supports commonjs', function () {
    expect(envCommon.TEST).to.equal(true)
    expect(() => envCommon.LOL).to.throw(UndefinedKeyError)
  })
})
