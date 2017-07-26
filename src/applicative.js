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

Array[Applicative.of] = function of(a) {
  return [a];
};
Reflect.implement(Array, Applicative);

Function[Applicative.of] = x => _ => x;
Reflect.implement(Function, Applicative);

const of = typeRep => v => typeRep[Applicative.of](v);

export { Applicative, of };
