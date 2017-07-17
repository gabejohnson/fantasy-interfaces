'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Setoid } from './setoid';

protocol Ord extends Setoid {
  // lte :: Setoid a => a ~> a -> Boolean
  lte(b) { return this.valueOf() <= b.valueOf(); }
  [Setoid.equals](b) {
    return this[Ord.lte](b) && b[Ord.lte](this);
  }
}

const { lte } = Ord;

Boolean.prototype[lte] = function lte(b) {
  return this === false || b === true;
};
Boolean implements Ord;

Number.prototype[lte] = function lte(b) {
  return this <= b || isNaN(this) && isNaN(b);
};
Number implements Ord;

Date implements Ord;

String implements Ord;

Error.prototype[lte] = function lte(b) {
  return this.name[lte](b.name) && this.message[lte](b.message);
}
Error implements Ord;

Array.prototype[lte] =  function lte(b) {
  for (let idx = 0; true; idx += 1) {
    if (idx === this.length) return true;
    if (idx === b.length) return false;
    if (this[idx][Setoid.equals](b[idx])) return this[idx][lte](b[idx]);
  }
};
Array implements Setoid;

Object.prototype[lte] = function lte(b) {
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
Object implements Ord;

export { Ord };
