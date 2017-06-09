import { interface, implements } from 'sweet-interfaces';
import { Extend } from './functor';

interface Comonad extends Extend {
  // extract :: Comonad w => w a ~> () -> a
  extract;
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Comonad };
