'lang sweet.js';

import { implements, interface } from 'sweet-interfaces';
import { Alt } from './alt';
import { Monoid } from './monoid';

interface Plus extends Alt {
  // zero :: Plus f => () -> f a
  static zero;
}

Array[Plus.zero] = Array[Monoid.empty];
Array implements Plus;

Object[Plus.zero] = Object[Monoid.empty];
Object implements Plus;

export { Plus };
