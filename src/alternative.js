'lang sweet.js';

import { implements, interface } from 'sweet-interfaces';
import { Plus } from './plus';
import { Applicative } from './applicative';

interface Alternative extends Applicative, Plus {}

Array implements Alternative;
Object implements Alternative;

export { Alternative };
