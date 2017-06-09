import { implements, interface } from 'sweet-interfaces';
import Semigroupoid from './semigroupoid';

interface Category extends Semigroupoid {
  static id;
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Category };

Function[Category.id] = x => x;
Function implements Category;
