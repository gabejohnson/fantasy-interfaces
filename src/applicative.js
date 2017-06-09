import { implements, interface } from 'sweet-interfaces';
import { Apply } from './apply';
import { Functor } from './functor';

interface Applicative extends Apply {
  // of :: Applicative f => a -> f a
  static of;
  [Functor.map](f) {
    return this[Apply.ap](this.constructor[Applicative.of](f));
  }
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Applicative };

const { of } = Applicative;

Array[of] = function of(a) {
  return [a];
};
Array implements Applicative;

Function[of] = x => _ => x;
Function implements Applicative;
