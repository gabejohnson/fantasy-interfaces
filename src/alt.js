import { implements, interface } from 'sweet-interfaces';
import { Functor } from './functor';
import { Semigroup } from './semigroup';

interface Alt extends Functor {
  // alt :: Alt f => f a ~> f a -> f a
  alt;
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Alt };

Array.prototype[Alt.alt] = Array.prototype[Semigroup.concat];
Array implements Alt;

Object.prototype[Alt.alt] = Object.prototype[Semigroup.concat];
Object implements Alt;
