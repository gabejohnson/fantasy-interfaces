'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';

protocol Semigroup {
  // concat :: Semigroup a => a ~> a -> a
  concat(b) {
    return this.concat(b);
  }
}

Reflect.implement(String, Semigroup);
Reflect.implement(Array, Semigroup);

Object.prototype[Semigroup.concat] = function concat(b) {
  const result = {};
  let k;
  for (k in this) result[k] = this[k];
  for (k in b) result[k] = b[k];
  return result;
};
Reflect.implement(Object, Semigroup);

const concat = (a, b) => a[Semigroup.concat](b);

export { Semigroup, concat };
