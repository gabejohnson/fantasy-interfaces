import { interface, implements } from 'sweet-interfaces';

const flip = f => (a, b) => f(b, a);

interface Foldable {
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
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Foldable };

const { reduce } = Foldable;

Array.prototype[reduce] = function reduce(f, init) {
  return this.reduce((acc, x) => f(acc, x), init);
};
Array implements Foldable;

Object.prototype[reduce] = function reduce(f, init) {
  return Object
    .keys(this)
    .sort()
    .reduce((acc, k) => f(acc, this[k]), init);
};
Object implements Foldable;
