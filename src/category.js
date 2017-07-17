'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import Semigroupoid from './semigroupoid';

protocol Category extends Semigroupoid {
  static id;
}

Function[Category.id] = x => x;
Function implements Category;

const id = typeRep => x => typeRep[Category.id](x);

export { Category, id };
