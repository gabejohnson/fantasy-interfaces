import { implements, interface } from 'sweet-interfaces';

interface Semigroupoid {
  // compose :: Semigroupoid c => c i j ~> c j k -> c i k
  compose;
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Semigroupoid };

Function.prototype[Semigroupoid.compose] = function compose(g) {
  return x => g(this(x));
};
Function implements Semigroupoid;
