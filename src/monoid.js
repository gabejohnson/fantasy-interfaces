'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Semigroup } from './semigroup';

protocol Monoid extends Semigroup {
  // empty :: Monoid m => () -> m
  static empty;
}

String[Monoid.empty] = () => "";
Reflect.implement(String, Monoid);

Array[Monoid.empty] = () => [];
Reflect.implement(Array, Monoid);

Object[Monoid.empty] = () => ({});
Reflect.implement(Object, Monoid);

const empty = typeRep => typeRep[Monoid.empty]();

export { Monoid, empty };
