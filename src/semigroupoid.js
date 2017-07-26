'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';

protocol Semigroupoid {
  // compose :: Semigroupoid c => c i j ~> c j k -> c i k
  compose;
}

Function.prototype[Semigroupoid.compose] = function compose(g) {
  return x => g(this(x));
};
Reflect.implement(Function, Semigroupoid);

const compose = (f, g) => g[Semigroupoid.compose](f);

export { Semigroupoid, compose };
