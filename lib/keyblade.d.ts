/**
 * Represents the environment.
 */
export interface IEnvironment {
  [key: string]: any
}

/**
 * Function signature for logging before throwing.
 */
export type LogFunc = (message: string, key: string) => void

/**
 * Options for Keyblade.
 */
export interface IKeybladeOpts {
  /**
   * If specified, will be invoked with the key of the non-existing variable to generate a message.
   */
  message?: (key: string) => string,

  /**
   * Additional fields to ignore.
   */
  ignore: string[]

  /**
   * If specified, and is a function, is invoked before throwing.
   * If specified, and is truthy, `console.error` before throwing.
   */
  logBeforeThrow?: boolean | LogFunc
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
