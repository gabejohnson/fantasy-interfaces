'lang sweet.js';

import { class, interface, implements } from 'sweet-interfaces';

const constant = x => _ => x;
const identity = x => x;
const flip = f => (a, b) => f(b, c);

export interface Setoid {
  // eq :: Setoid a => a ~> a -> Boolean
  eq(b) { return this === b; }
}

export interface Ord extends Setoid {
  // lte :: Ord a => a ~> a -> Boolean
  lte(b) { return this <= b; }
  [Setoid.eq](b) {
    return this[Ord.lte](b) && b[Ord.lte](this);
  }
}

export interface Semigroupoid {
  // compose :: Semigroupoid c => c i j ~> c j k -> c i k
  compose;
}

export interface Category extends Semigroupoid {
  // id :: Category c => () -> c a a
  static id;
}

export interface Semigroup {
  // concat :: Semigroup a => a ~> a -> a
  concat;
}

export interface Monoid extends Semigroup {
  // empty :: Monoid m => () -> m
  static empty;
}

export interface Functor {
  // map :: Functor f => f a ~> (a -> b) -> f b
  map;
}

export interface Contravariant {
  // contramap :: Contravariant f => f a ~> (b -> a) -> f b
  contramap;
}

export interface Apply extends Functor {
  // ap :: Apply f => f a ~> f (a -> b) -> f b
  ap(f) {
    this.constructor[Apply.lift](f, this);
  }

  // lift :: Apply f => (a -> b -> ... -> c) -> f a -> f b -> ... -> f c
  static lift(f, a, ...bs) {
    const result = a[Functor.map](f);
    return bs.slice.reduce((f, a) => a[Apply.ap](f), result);
  }

  // apFirst :: Apply f => f a ~> f b -> f a
  apFirst(y) {
    this.constructor[Apply.lift](constant, this, y);
  }

  // apSecond :: Apply f => f a ~> f b -> f b
  apSecond(y) {
    this.constructor[Apply.lift](constant(identity), this, y);
  }
}

export interface Applicative extends Apply {
  // of :: Applicative f => a -> f a
  static of;
  [Functor.map](f) {
    return this[Apply.ap](this.constructor[Applicative.of](f));
  }
}

export interface Alt extends Functor {
  // alt :: Alt f => f a ~> f a -> f a
  alt;
}

export interface Plus extends Alt {
  // zero :: Plus f => () -> f a
  static zero;
}

export interface Alternative extends Applicative, Plus {}

export interface Foldable {
  // reduce :: Foldable f => f a ~> ((b, a) -> b, b) -> b
  reduce(f, init) {
    this[Foldable.reduceRight](flip(f), init);
  }

  // reduceRight :: Foldable f => f a ~> ((a, b) -> b, b) -> b
  reduceRight(f, init) {
    this[Foldable.reduce](flip(f), init);
  }

  // mapReduce :: Foldable f, Monoid m => f a ~> (TypeRep m, (a -> m)) -> m
  mapReduce(typeRep, f) {
    return this[Foldable.reduce]((acc, a) => f(a)[Semigroup.concat](acc), typeRep[Monoid.empty]());
  }
}

export interface Traversable extends Functor, Foldable {
  // traverse :: Applicative f, Traversable t => t a ~> (TypeRep f, a -> f b) -> f (t b)
  traverse(typeRep, f) {
    return this[Functor.map](f).sequence(typeRep);
  }

  // sequence :: Applicative f, Traversable t => t (f a) ~> TypeRep f -> f (t a)
  sequence(typeRep) {
    return this.traverse(typeRep, identity);
  }
}

export interface Chain extends Apply {
  // chain :: Chain m => m a ~> (a -> m b) -> m b
  chain(f) {
    return this[Chain.join]()[Functor.map](f);
  }

  // join :: Chain m => m (m a) ~> m a
  join() {
    return this[Chain.chain](identity);
  }

  [Apply.ap](m) {
    return m[Chain.chain](f => this[Functor.map](f));
  }
}

export interface ChainRec extends Chain {
  // chainRec :: ChainRec m => ((a -> c, b -> c, a) -> m c, a) -> m b
  static chainRec;
}

export interface Monad extends Applicative, Chain {
  [Functor.map](f) {
    return this[Chain.chain](a => this.constructor[Applicative.of](f(a)));
  }
}

export interface Extend extends Functor {
  // extend :: Extend w => w a ~> (w a -> b) -> w b
  extend(f) {
    return this[Extend.duplicate]()[Functor.map](f);
  }

  // duplicate :: Extend w => w a -> w (w a)
  duplicate() {
    return this[Extend.extend](identity);
  }
}

export interface Comonad extends Extend {
  // extract :: Comonad w => w a ~> () -> a
  extract;
}

export interface Bifunctor extends Functor {
  // bimap :: Bifunctor f => f a c ~> (a -> b, c -> d) -> f b d
  bimap(f, g) {
    return this[Bifunctor.lmap](f)[Bifunctor.rmap](g);
  }

  // lmap :: Bifunctor f => f a c ~> (a -> b) -> f b c
  lmap(f) {
    return this[Bifunctor.bimap](f, identity);
  }

  // rmap :: Bifunctor f => f a b ~> (b -> c) -> f a c
  rmap(f) {
    return this[Bifunctor.bimap](identity, f);
  }

  [Functor.map](f) { return this[Bifunctor.bimap](identity, f); }
}

export interface Profunctor extends Functor {
  // promap :: Profunctor p => p b c ~> (a -> b, c -> d) -> p a d
  promap(f, g) {
    return this[Profunctor.lmap](f)[Profunctor.rmap](g);
  }

  // lmap :: Profunctor p => p b c ~> (a -> b) -> p a c
  lmap(f) {
    return this[Profunctor.promap](f, identity);
  }

  // rmap :: Profunctor p => p a b ~> (b -> c) -> p a c
  rmap(f) {
    return this[Profunctor.promap](identity, f);
  }

  // arr :: (Category p, Profunctor p) => (a -> b) -> p a b
  static arr(f) {
    return this[Profunctor.rmap](f, identity);
  }

  [Functor.map](f) { return this[Profunctor.promap](identity, f); }
}
