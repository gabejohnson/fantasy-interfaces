'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';

protocol Functor {
  // map :: Functor f => f a ~> (a -> b) -> f b
  map;
}

Array.prototype[Functor.map] = function map(f) {
  return this.map(f);
};
Reflect.implement(Array, Functor);

Object.prototype[Functor.map] = function map(f) {
  var result = {};
  for (var k in this) result[k] = f(this[k]);
  return result;
};
Reflect.implement(Object, Functor);

Function.prototype[Functor.map] = function map(f) {
  return x => f(this(x));
};
Reflect.implement(Function, Functor);

const map = (f, functor) => functor[Functor.map](f);

export { Functor, map };
