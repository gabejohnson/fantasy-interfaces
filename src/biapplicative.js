'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Bipply } from './biapply';
import { Bifunctor } from './bifunctor';

protocol Applicative extends Apply {
  // biof :: Biapplicative w => a -> b -> w a b
  static biof;
  [Bifunctor.bimap](f, g) {
    return this[Biapply.biap](this.constructor[Biapplicative.biof](f, g));
  }
}

const biof = typeRep => (a, b) => typeRep[Biapplicative.biof](a, b);

export { Biapplicative, biof };
