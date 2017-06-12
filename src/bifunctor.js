'lang sweet.js';

import { interface, implements } from 'sweet-interfaces';
import { Functor } from './functor';

export interface Bifunctor extends Functor {
  // bimap :: Bifunctor f => f a c ~> (a -> b, c -> d) -> f b d
  bimap(f, g) {
    return this[Bifunctor.first](f)[Bifunctor.second](g);
  }

  // first :: Bifunctor f => f a c ~> (a -> b) -> f b c
  first(f) {
    return this[Bifunctor.bimap](f, identity);
  }

  // second :: Bifunctor f => f a b ~> (b -> c) -> f a c
  second(f) {
    return this[Bifunctor.bimap](identity, f);
  }

  [Functor.map](f) { return this[Bifunctor.bimap](identity, f); }
}
