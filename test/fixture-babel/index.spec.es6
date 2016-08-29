import env from './env'
import envCommon from './env-common'
import { UndefinedKeyError } from '../../lib/keyblade'

describe('babel', function () {
  it('supports babel import-export', function () {
    expect(env.TEST).to.equal(true)
    expect(() => env.LOL).to.throw(UndefinedKeyError)
  })

  it('supports commonjs', function () {
    expect(envCommon.TEST).to.equal(true)
    expect(() => envCommon.LOL).to.throw(UndefinedKeyError)
  })
})
