'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Functor } from './functor';
import { Semigroup } from './semigroup';

protocol Alt extends Functor {
  // alt :: Alt f => f a ~> f a -> f a
  alt;
}

Array.prototype[Alt.alt] = Array.prototype[Semigroup.concat];
Reflect.implement(Array, Alt);

Object.prototype[Alt.alt] = Object.prototype[Semigroup.concat];
Reflect.implement(Object, Alt);

const alt = (a, b) => a[Alt.alt](b);

export { Alt, alt };
