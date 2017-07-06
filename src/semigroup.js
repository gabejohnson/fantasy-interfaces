'lang sweet.js';

import { implements, interface } from 'sweet-interfaces';

interface Semigroup {
  // concat :: Semigroup a => a ~> a -> a
  concat(b) {
    return this.concat(b);
  }
}

String implements Semigroup;
Array implements Semigroup;

Object.prototype[Semigroup.concat] = function concat(b) {
  const result = {};
  let k;
  for (k in this) result[k] = this[k];
  for (k in b) result[k] = b[k];
  return result;
};
Object implements Semigroup;

export { Semigroup };
