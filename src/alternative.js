'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Plus } from './plus';
import { Applicative } from './applicative';

protocol Alternative extends Applicative, Plus {}

Reflect.implement(Array, Alternative);
Reflect.implement(Object, Alternative);

export { Alternative };
