'lang sweet.js';

import { implements, interface } from 'sweet-interfaces';

interface Semigroupoid {
  // compose :: Semigroupoid c => c i j ~> c j k -> c i k
  compose;
}

Function.prototype[Semigroupoid.compose] = function compose(g) {
  return x => g(this(x));
};
Function implements Semigroupoid;

export { Semigroupoid };
