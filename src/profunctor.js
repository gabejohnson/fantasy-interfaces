'lang sweet.js';

import { protocol, implements } from 'sweet-interfaces';
import { Functor } from './functor';
import { id } from './category';

const identity = id(Function);

protocol Profunctor extends Functor {
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
    return f[Profunctor.rmap](identity);
  }

  [Functor.map](f) {
    return this[Profunctor.promap](identity, f);
  }
}

Function.prototype[Profunctor.promap] = function promap(f, g) {
  return x => g(this(f(x)));
};
Function.prototype[Profunctor.lmap] = Function.prototype[Contravariant.contramap];
Function.prototype[Profunctor.rmap] = Function.prototype[Functor.map];

Function implements Profunctor;

const promap = (f, g, profunctor) => profunctor[Profunctor.promap](f, g);
const lmap = (f, profunctor) => profunctor[Profunctor.lmap](f);
const rmap = (f, profunctor) => profunctor[Profunctor.rmap](f);
const arr = typeRep => f => typeRep[Profunctor.arr](f);

export {
  Profunctor,
  promap,
  lmap,
  rmap,
  arr
};
