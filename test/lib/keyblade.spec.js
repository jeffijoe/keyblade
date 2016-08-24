const { inspect } = require('util')
const { keyblade, UndefinedKeyError } = require('../../lib/keyblade')

describe('keyblade', function () {
  it('exists', function () {
    expect(keyblade).to.exist.and.to.be.a.Function
  })

  it('returns the value of a defined property', function () {
    const obj = {
      hello: 'world'
    }

    const safe = keyblade(obj)
    expect(safe).to.exist
    expect(safe.hello).to.exist.and.to.equal('world')
    expect(safe).to.not.equal(obj)
  })

  it('throws when a key is not defined', function () {
    const safe = keyblade({ })
    expect(() => safe.nope).to.throw(UndefinedKeyError, /nope/)
  })

  it('uses a custom message when throwing', function () {
    const safe = keyblade({ }, {
      message: (key) => `how about ${key}`
    })

    expect(() => safe.no).to.throw(UndefinedKeyError, /how about no/)
  })

  it('throws an error that derives from ReferenceError', function () {
    const safe = keyblade({ })
    expect(() => safe.nope).to.throw(ReferenceError)
  })

  it('does not fuck with the input', function () {
    const obj = {
      hello: 'world'
    }

    const safe = keyblade(obj)
    expect(() => obj.hehe).to.not.throw()
    expect(() => safe.hehe).to.throw(UndefinedKeyError)
  })

  it('sets things directly on the object', function () {
    const obj = {}
    const safe = keyblade(obj)
    safe.yip = 'yip'
    expect(safe.yip).to.equal('yip')
  })

  it('supports deleting on the proxy', function () {
    const obj = { yip: 'yip' }
    const safe = keyblade(obj)
    delete safe.yip
    expect(() => safe.yip).to.throw(UndefinedKeyError)
  })

  it('supports deleting on the object', function () {
    const obj = { yip: 'yip' }
    const safe = keyblade(obj)
    delete obj.yip
    expect(() => safe.yip).to.throw(UndefinedKeyError)
  })

  it('supports toString', function () {
    const safe = keyblade({})
    expect(safe.toString()).to.equal({}.toString())
  })

  it('supports custom toString', function () {
    const safe = keyblade({
      toString: () => 'yep'
    })
    expect(safe.toString()).to.equal('yep')
  })

  it('supports typeof on the error', function () {
    try {
      keyblade({ }).nope()
    } catch (err) {
      expect(err instanceof UndefinedKeyError).to.be.true
      return
    }

    expect.fail('should have thrown')
  })

  describe('when using classes', function () {
    it('supports them', function () {
      class Test {
        constructor () {
          this.yep = 'indeed'
        }

        method () {
          return 'sweet'
        }
      }

      const obj = new Test()
      const safe = keyblade(obj)
      expect(() => safe.yep).to.not.throw(UndefinedKeyError)
      expect(() => safe.nope).to.throw(UndefinedKeyError)
      expect(safe.toString()).to.equal(obj.toString())
      expect(safe.method()).to.equal(obj.method())
    })

    it('supports custom toString', function () {
      class Test {
        toString () {
          return 'yep'
        }
      }

      const obj = new Test()
      const safe = keyblade(obj)

      expect(safe.toString()).to.equal('yep')
    })
  })

  describe('toJSON', function () {
    it('calls toJSON on the object if it exists', function () {
      const obj = {
        toJSON: () => ({ hello: 'world' })
      }

      const safe = keyblade(obj)
      expect(JSON.stringify(safe)).to.equal(JSON.stringify(obj))
    })

    it('works without having defined toJSON', function () {
      const obj = {
        hello: 'world'
      }

      const safe = keyblade(obj)
      expect(JSON.stringify(safe)).to.equal(JSON.stringify(obj))
    })
  })

  describe('hasOwnProperty', function () {
    it('does not trigger the trap', function () {
      const safe = keyblade({})
      expect(safe.hasOwnProperty('test')).to.be.false
    })
  })

  describe('inspect', function () {
    it('uses the inspect method defined on the object', function () {
      const safe = keyblade({
        inspect: () => 'yep'
      })

      expect(inspect(safe)).to.equal('yep')
    })

    it('is supported', function () {
      const safe = keyblade({
        hello: () => 42
      })

      expect(inspect(safe)).to.equal('{ hello: [Function] }')
    })
  })
})
