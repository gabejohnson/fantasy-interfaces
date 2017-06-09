import { implements, interface } from 'sweet-interfaces';

interface Setoid {
  // equals :: Setoid a => a ~> a -> Boolean
  equals(b) { return this.valueOf() === b.valueOf(); }
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Setoid };

const { equals } = Setoid;

Boolean implements Setoid;

Number.prototype[equals] = function equals(b) {
  return this === b || isNaN(this) && isNaN(b);
};
Number implements Setoid;

Date implements Setoid;

String implements Setoid;

Error.prototype[equals] = function equals(b) {
  return this.name[equals](b.name) && this.message[equals](b.message);
}
Error implements Setoid;

Array.prototype[equals] =  function equals(b) {
  if (b.length !== this.length) return false;
  for (var idx = 0; idx < this.length; idx += 1) {
    if (!this[idx][equals](b[idx])) return false;
  }
  return true;
};
Array implements Setoid;

Object.prototype[equals] = function equals(b) {
  const keys = Object.keys(this).sort();
  return keys[equals](Object.keys(b).sort()) &&
    keys.every(k => this[k][equals](other[k]));
};
Object implements Setoid;
