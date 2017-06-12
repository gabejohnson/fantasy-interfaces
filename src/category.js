'lang sweet.js';

import { implements, interface } from 'sweet-interfaces';
import Semigroupoid from './semigroupoid';

interface Category extends Semigroupoid {
  static id;
}

Function[Category.id] = x => x;
Function implements Category;

export { Category };
