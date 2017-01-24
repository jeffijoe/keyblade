module.exports.keyblade = keyblade

const UndefinedKeyError = module.exports.UndefinedKeyError = require('./UndefinedKeyError')

/**
 * Protects the given object by wrapping it in a Proxy.
 *
 * @param  {object} obj
 * The object to wrap.
 *
 * @param  {(string) => string} opts.message
 * Optional function used to construct the error message.
 * Will get the key passed as the only argument.
 *
 * @param {string[]} ignore
 * Fields to ignore.
 *
 * @param {bool|Function(message: string, key: string)}
 * If specified, and is a function, is invoked before throwing.
 * If specified, and is truthy, `console.error` before throwing.
 *
 * @return {Proxy<object>}
 */
function keyblade (obj, opts) {
  opts = Object.assign({
    message: _defaultMessage,
    logBeforeThrow: true,
    ignore: []
  }, opts)
  opts.ignore = (opts.ignore && Array.isArray(opts.ignore)) ? opts.ignore : []

  return new Proxy(obj, {
    get (target, propKey, receiver) {
      const useGetter = Reflect.has(target, propKey, receiver) || _isReserved(propKey, opts.ignore)
      if (useGetter) {
        return Reflect.get(target, propKey, receiver)
      }

      // Leave symbols alone.
      if (typeof propKey === 'symbol') {
        return Reflect.get(target, propKey, receiver)
      }

      const message = opts.message(propKey)
      if (opts.logBeforeThrow) {
        if (typeof opts.logBeforeThrow === 'function') {
          opts.logBeforeThrow(message, propKey)
        } else {
          console.error(message)
        }
      }

      throw new UndefinedKeyError(message)
    }
  })
}

/**
 * Default message creator.
 *
 * @param  {string} key
 * @return {string}
 */
function _defaultMessage (key) {
  key = String(key)

  return `The key '${key}' does not exist on the object.`
}

const RESERVED_PROPS = [
  'toJSON',
  'toString',
  'inspect',
  '__esModule'
]

/**
 * Determines if the key name is a reserved key.
 *
 * @param  {string}  name
 * @param  {string[]}  additionalFieldsToIgnore
 * @return {Boolean}
 * @api private
 */
function _isReserved (name, additionalFieldsToIgnore) {
  return [].concat(RESERVED_PROPS, additionalFieldsToIgnore).includes(name)
}
