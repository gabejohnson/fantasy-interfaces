'lang sweet.js';

import { implements, interface } from 'sweet-interfaces';
import { Functor } from './functor';
import { Semigroup } from './semigroup';

interface Alt extends Functor {
  // alt :: Alt f => f a ~> f a -> f a
  alt;
}

Array.prototype[Alt.alt] = Array.prototype[Semigroup.concat];
Array implements Alt;

Object.prototype[Alt.alt] = Object.prototype[Semigroup.concat];
Object implements Alt;

export { Alt };
