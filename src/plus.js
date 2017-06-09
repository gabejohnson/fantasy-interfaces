import { implements, interface } from 'sweet-interfaces';
import { Alt } from './alt';
import { Monoid } from './monoid';

interface Plus extends Alt {
  // zero :: Plus f => () -> f a
  static zero;
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Plus };

Array[Plus.zero] = Array[Monoid.empty];
Array implements Plus;

Object[Plus.zero] = Object[Monoid.empty];
Object implements Plus;
