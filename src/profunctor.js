import { interface, implements } from 'sweet-interfaces';
import { Functor } from './functor';
import { Contravariant } from './contravariant';
import { Category } from './category';

const identity = Function[Category.id]();

interface Profunctor extends Functor, Contravariant {
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
  [Contravariant.contramap](f) {
    return this[Profunctor.promap](f, identity);
  }
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Profunctor };

Function.prototype[Profunctor.promap] = function promap(f, g) {
  return x => g(this(f(x)));
};
Function.prototype[Profunctor.lmap] = Function.prototype[Contravariant.contramap];
Function.prototype[Profunctor.rmap] = Function.prototype[Functor.map];

Function implements Profunctor;
