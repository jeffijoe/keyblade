/**
 * Undefined Key error.
 */
module.exports = class UndefinedKeyError extends ReferenceError {
  constructor (message = '') {
    super(message)

    // extending Error is weird and does not propagate `message`
    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true
    })

    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true
    })

    if (ReferenceError.hasOwnProperty('captureStackTrace')) {
      ReferenceError.captureStackTrace(this, this.constructor)
      return
    }

    Object.defineProperty(this, 'stack', {
      configurable: true,
      enumerable: false,
      value: (new ReferenceError(message)).stack,
      writable: true
    })
  }
}
