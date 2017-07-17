'lang sweet.js';

import { protocol, implements } from 'sweet-interfaces';
import { Extend } from './functor';

protocol Comonad extends Extend {
  // extract :: Comonad w => w a ~> () -> a
  extract;
}

const extract = comonad => comonad[Comonad.extract]();

export { Comonad, extract };
