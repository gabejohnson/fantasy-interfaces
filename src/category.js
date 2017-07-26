'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Semigroupoid } from './semigroupoid';

protocol Category extends Semigroupoid {
  static id;
}

Function[Category.id] = x => x;
Reflect.implement(Function, Category);

const id = typeRep => typeRep[Category.id];

export { Category, id };
