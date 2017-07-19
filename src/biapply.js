'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Bifunctor } from './bifunctor';
import { id } from './category';

const identity = id(Function);
const constant = k => () => k;

protocol Biapply extends Bifunctor {
  // biap :: Biapply w => w a c ~> w (a -> b) (c -> d) -> w b d
  biap(w) {
    this.constructor[Biapply.bilift](identity, identity, w, this);
  }

  // bilift :: Biapply w => (a -> b -> ... -> c) -> (d -> e -> ... -> f) -> w a d -> w b e -> ... -> w c f
  static bilift(f, g, a, ...bs) {
    const result = a[Bifunctor.bimap](f, g);
    return bs.reduce((f, a) => a[Biapply.biap](f), result);
  }

  // biapFirst :: Biapply w => w a b ~> w c d -> w a b
  biapFirst(y) {
    this.constructor[Biapply.bilift](constant, constant, this, y);
  }

  // biapSecond :: Apply f => f a ~> f b -> f b
  biapSecond(y) {
    this.constructor[Biapply.bilift](constant(identity), constant(identity), this, y);
  }
}

const biap = (other, biapply) => biapply[Biapply.biap](other);
const biapFirst = (other, biapply) => biapply[Biapply.biapFirst](other);
const biapSecond = (other, biapply) => biapply[Biapply.biapSecond](other);
const bilift = typeRep => (f, g, a, ...bs) => typeRep[Biapply.bilift](f, g, a, ...bs);
export {
  Biapply,
  biap,
  biapFirst,
  biapSecond,
  bilift
};
