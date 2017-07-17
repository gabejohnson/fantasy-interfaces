'lang sweet.js';

import { protocol, implements } from 'sweet-interfaces';
import { Extend } from './functor';

export protocol Comonad extends Extend {
  // extract :: Comonad w => w a ~> () -> a
  extract;
}
