'lang sweet.js';

import { protocol, implements } from 'sweet-interfaces';
import { Functor } from './functor';

protocol Bifunctor extends Functor {
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

const bimap = (f, g, bifunctor) => bifunctor[Bifunctor.bimap](f, g);
const first = (f, bifunctor) => bifunctor[Bifunctor.first](f);
const second = (f, bifunctor) => bifunctor[Bifunctor.second](f);

export {
  Bifunctor,
  bimap,
  first,
  second,
};
