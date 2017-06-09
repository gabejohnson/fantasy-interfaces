import { implements, interface } from 'sweet-interfaces';

interface Semigroup {
  // concat :: Semigroup a => a ~> a -> a
  concat;
}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Semigroup };

String.prototype[concat] = String.prototype.concat;
String implements Semigroup;

Array.prototype[concat] = Array.prototype.concat;
Array implements Semigroup;

Object.prototype[concat] = function concat(b) {
  const result = {};
  let k;
  for (k in this) result[k] = this[k];
  for (k in b) result[k] = b[k];
  return result;
};
Object implements Semigroup;
