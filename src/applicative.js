'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Apply } from './apply';
import { Functor } from './functor';

protocol Applicative extends Apply {
  // of :: Applicative f => a -> f a
  static of;
  [Functor.map](f) {
    return this[Apply.ap](this.constructor[Applicative.of](f));
  }
}

const { of } = Applicative;

Array[of] = function of(a) {
  return [a];
};
Array implements Applicative;

Function[of] = x => _ => x;
Function implements Applicative;

export { Applicative };
