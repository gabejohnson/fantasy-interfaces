'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';

protocol Semigroupoid {
  // compose :: Semigroupoid c => c i j ~> c j k -> c i k
  compose;
}

Function.prototype[Semigroupoid.compose] = function compose(g) {
  return x => g(this(x));
};
Function implements Semigroupoid;

const compose = (f, g) => g[Semigroupoid.compose](f);

export { Semigroupoid, compose };
