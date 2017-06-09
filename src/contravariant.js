import { implements, interface } from 'sweet-interfaces';

interface Contravariant {
  // contramap :: Contravariant f => f a ~> (b -> a) -> f b
  contramap;
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Contravariant };

Function.prototype[Contravariant.contramap] = function contramap(f) {
  return x => this(f(x));
};
Function implements Contravariant;
