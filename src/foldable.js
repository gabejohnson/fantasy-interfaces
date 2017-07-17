'lang sweet.js';

import { protocol, implements } from 'sweet-interfaces';

const flip = f => (a, b) => f(b, a);

protocol Foldable {
  // reduce :: Foldable f => f a ~> ((b, a) -> b, b) -> b
  reduce(f, init) {
    this[Foldable.reduceRight](flip(f), init);
  }

  // reduceRight :: Foldable f => f a ~> ((a, b) -> b, b) -> b
  reduceRight(f, init) {
    this[Foldable.reduce](flip(f), init);
  }

  // reduceMap :: Foldable f, Monoid m => f a ~> (TypeRep m, (a -> m)) -> m
  reduceMap(typeRep, f) {
    return this[Foldable.reduce]((acc, a) => f(a)[Semigroup.concat](acc), typeRep[Monoid.empty]());
  }
}

Array.prototype[Foldable.reduce] = function reduce(f, init) {
  return this.reduce((acc, x) => f(acc, x), init);
};
Array implements Foldable;

Object.prototype[Foldable.reduce] = function reduce(f, init) {
  return Object
    .keys(this)
    .sort()
    .reduce((acc, k) => f(acc, this[k]), init);
};
Object implements Foldable;

const reduce = (f, init, foldable) => foldable[Foldable.reduce](f, init);
const reduceRight = (f, init, foldable) => foldable[Foldable.reduceRight](f, init);
const reduceMap = (typeRep, f, foldable) => foldable[Foldable.reduceMap](typeRep, f);

export {
  Foldable
  reduce,
  reduceRight,
  reduceMap
};
