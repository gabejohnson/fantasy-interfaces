'lang sweet.js';

import { protocol, implements } from 'sweet-interfaces';
import { Functor } from './functor';
import { Chain } from './chain';

protocol Monad extends Applicative, Chain {
  [Functor.map](f) {
    return this[Chain.chain](a => this.constructor[Applicative.of](f(a)));
  }
}

Array implements Monad;
Function implements Monad;

export { Monad };
