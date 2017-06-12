'lang sweet.js';

import { implements, interface } from 'sweet-interfaces';

interface Functor {
  // map :: Functor f => f a ~> (a -> b) -> f b
  map;
}

Array.prototype[Functor.map] = function map(f) {
  return this.map(x => f(x));
};
Array implements Functor;

Object.prototype[Functor.map] = function map(f) {
  var result = {};
  for (var k in this) result[k] = f(this[k]);
  return result;
};
Object implements Functor;

Function.prototype[Functor.map] = function map(f) {
  return x => f(this(x));
};
Function implements Functor;

export { Functor };
