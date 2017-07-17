'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Semigroup } from './semigroup';

protocol Monoid extends Semigroup {
  // empty :: Monoid m => () -> m
  static empty;
}

String[Monoid.empty] = () => "";
String implements Monoid;

Array[Monoid.empty] = () => [];
Array implements Monoid;

Object[Monoid.empty] = () => ({});
Object implements Monoid;

const empty = typeRep => typeRep[Monoid.empty]();

export { Monoid, empty };
