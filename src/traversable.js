'lang sweet.js';

import { protocol, implements } from 'sweet-interfaces';
import { Functor } from './functor';
import { Apply, lift } from './apply';
import { Applicative } from './applicative';
import { Foldable } from './foldable';

protocol Traversable extends Functor, Foldable {
  // traverse :: Applicative f, Traversable t => t a ~> (TypeRep f, a -> f b) -> f (t b)
  traverse(typeRep, f) {
    return this[Functor.map](f).sequence(typeRep);
  }

  // sequence :: Applicative f, Traversable t => t (f a) ~> TypeRep f -> f (t a)
  sequence(typeRep) {
    return this.traverse(typeRep, identity);
  }
}

const concat = a => b => a[Semigroup.concat](b);
const pair = x => y => [x, y];

Array.prototype[Traversable.traverse] = function traverse(typeRep, f) {
  const xs = this;
  function go(idx, n) {
    switch (n) {
      case 0: return typeRep[Applicative.of]([]);
      case 2: return lift(typeRep, pair, f(xs[idx]), f(xs[idx + 1]));
      default:
        const m = Math.floor(n / 4) * 2;
        return lift(typeRep, concat, go(idx, m), go(idx + m, n - m));
    }
  }
  return this.length % 2 === 1 ?
    lift(concat, f(this[0])[Functor.map](Array[Applicative.of]), go(1, this.length - 1)) :
    go(0, this.length);
};
Array implements Traversable;

Object.prototype[Traversable.traverse] =   function traverse(typeRep, f) {
  return Object
    .keys(this)
    .reduce((applicative, k) => lift(o => v => (o[k] = v, o), applicative, f(this[k]))
            , typeRep[Applicative.of]({}));
}
Object implements Traversable;

const traverse = (typeRep, f, traversable) => traversable[Traversable.traverse](typeRep, f);
const sequence = (typeRep, traversable) => traversable[Traversable.sequence](typeRep);

export {
  Traversable,
  traverse,
  sequence
};
