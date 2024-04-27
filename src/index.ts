import { Eventer } from "./Eventer";
/**
 * Creates and returns a new Eventer instance.
 *
 * @return {Eventer} The newly created Eventer instance.
 */
export function createStore(): Eventer {
  return new Eventer();
}
