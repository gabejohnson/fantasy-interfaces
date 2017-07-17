'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Semigroup } from './semigroup';

protocol Monoid extends Semigroup {
  // empty :: Monoid m => () -> m
  static empty;
}

const { empty } = Monoid;

String[empty] = () => "";
String implements Monoid;

Array[empty] = () => [];
Array implements Monoid;

Object[empty] = () => ({});
Object implements Monoid;

export { Monoid };
