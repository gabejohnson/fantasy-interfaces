'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Setoid } from './setoid';

protocol Ord extends Setoid {
  // lte :: Ord a, b => a ~> b -> Boolean
  lte(b) { return this.valueOf() <= b.valueOf(); }

  // lt :: Ord a, b => a ~> b -> Boolean
  lt(b) { return this[Ord.lte](b) && !this[Setoid.equals](b); }

  // gt :: Ord a, b => a ~> b -> Boolean
  gt(b) { return !this[Ord.lte](b); }

  // gte :: Ord a, b => a ~> b -> Boolean
  gte(b) { return !this[Ord.lt](b); }

  [Setoid.equals](b) {
    return this[Ord.lte](b) && b[Ord.lte](this);
  }
}

Boolean.prototype[Ord.lte] = function lte(b) {
  return this === false || b === true;
};
Reflect.implement(Boolean, Ord);

Number.prototype[Ord.lte] = function lte(b) {
  return this <= b || isNaN(this) && isNaN(b);
};
Reflect.implement(Number, Ord);

Reflect.implement(Date, Ord);

Reflect.implement(String, Ord);

Error.prototype[Ord.lte] = function lte(b) {
  return this.name[lte](b.name) && this.message[lte](b.message);
};
Reflect.implement(Error, Ord);

Array.prototype[Ord.lte] =  function lte(b) {
  for (let idx = 0; true; idx += 1) {
    if (idx === this.length) return true;
    if (idx === b.length) return false;
    if (this[idx][Setoid.equals](b[idx])) return this[idx][lte](b[idx]);
  }
};
Reflect.implement(Array, Setoid);

Object.prototype[Ord.lte] = function lte(b) {
  const theseKeys = Object.keys(this).sort();
  const otherKeys = Object.keys(b).sort();
  while (true) {
    if (theseKeys.length === 0) return true;
    if (otherKeys.length === 0) return false;
    let k = theseKeys.shift();
    let z = otherKeys.shift();
    if (k < z) return true;
    if (k > z) return false;
    if (!this[k][Setoid.equals](other[k])) return this[k][lte](b[k]);
  }
};
Reflect.implement(Object, Ord);

const lte = (a, b) => a[Ord.lte](b);
const lt = (a, b) => a[Ord.lt](b);
const gt = (a, b) => a[Ord.gt](b);
const gte = (a, b) => a[Ord.gte](b);

export {
  Ord,
  lte,
  lt,
  gt,
  gte
};
