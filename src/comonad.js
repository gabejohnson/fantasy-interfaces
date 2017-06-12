'lang sweet.js';

import { interface, implements } from 'sweet-interfaces';
import { Extend } from './functor';

export interface Comonad extends Extend {
  // extract :: Comonad w => w a ~> () -> a
  extract;
}
