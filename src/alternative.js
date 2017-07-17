'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Plus } from './plus';
import { Applicative } from './applicative';

protocol Alternative extends Applicative, Plus {}

Array implements Alternative;
Object implements Alternative;

export { Alternative };
