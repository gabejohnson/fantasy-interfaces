'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';

protocol Contravariant {
  // contramap :: Contravariant f => f a ~> (b -> a) -> f b
  contramap;
}

Function.prototype[Contravariant.contramap] = function contramap(f) {
  return x => this(f(x));
};
Reflect.implement(Function, Contravariant);

const contramap = (f, contravariant) => contravariant[Contravariant.contramap](f);

export { Contravariant, contramap };
