import { implements, interface } from 'sweet-interfaces';
import { Semigroup } from './semigroup';

interface Monoid extends Semigroup {
  // empty :: Monoid m => () -> m
  static empty;
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Monoid };

const { empty } = Monoid;

String[empty] = () => "";
String implements Monoid;

Array[empty] = () => [];
Array implements Monoid;

Object[empty] = () => ({});
Object implements Monoid;
