import { interface, implements } from 'sweet-interfaces';
import { Functor } from './functor';
import { Chain } from './chain';

interface Monad extends Applicative, Chain {
  [Functor.map](f) {
    return this[Chain.chain](a => this.constructor[Applicative.of](f(a)));
  }
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Monad };

Array implements Monad;
Function implements Chain;
