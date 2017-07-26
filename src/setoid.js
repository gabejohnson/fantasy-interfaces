'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';

protocol Setoid {
  // equals :: Setoid a => a ~> a -> Boolean
  equals(b) { return this.valueOf() === b.valueOf(); }
}

Reflect.implement(Boolean, Setoid);

Number.prototype[Setoid.equals] = function equals(b) {
  return this === b || isNaN(this) && isNaN(b);
};
Reflect.implement(Number, Setoid);

Reflect.implement(Date, Setoid);

Reflect.implement(String, Setoid);

Error.prototype[Setoid.equals] = function equals(b) {
  return this.name[equals](b.name) && this.message[equals](b.message);
};
Reflect.implement(Error, Setoid);

Array.prototype[Setoid.equals] =  function equals(b) {
  if (b.length !== this.length) return false;
  for (var idx = 0; idx < this.length; idx += 1) {
    if (!this[idx][equals](b[idx])) return false;
  }
  return true;
};
Reflect.implement(Array, Setoid);

Object.prototype[Setoid.equals] = function equals(b) {
  const keys = Object.keys(this).sort();
  return keys[equals](Object.keys(b).sort()) &&
    keys.every(k => this[k][equals](other[k]));
};
Reflect.implement(Object, Setoid);

const equals = (a, b) => a[Setoid.equals](b);

export { Setoid, equals };
