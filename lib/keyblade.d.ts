/**
 * Represents the environment.
 */
export interface IEnvironment {
  [key: string]: any
}

/**
 * Options for Keyblade.
 */
export interface IKeybladeOpts {
  /**
   * If specified, will be invoked with the key of the non-existing variable to generate a message.
   * @type {[type]}
   */
  message?: (key: string) => string,

  /**
   * Additional fields to ignore.
   * @type {string[]}
   */
  ignore: string[]
}

/**
 * Thrown when a key isn't found.
 */
export class UndefinedKeyError extends Error {}

/**
 * Protects the given object by wrapping it in a proxy.
 *
 * @param  {T}  obj
 * @param  {IKeybladeOpts} opts
 * @return {T}
 */
export function keyblade<T extends IEnvironment>(obj: T, opts?: IKeybladeOpts): T
