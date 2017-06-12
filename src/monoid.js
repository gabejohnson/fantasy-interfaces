'lang sweet.js';

import { implements, interface } from 'sweet-interfaces';
import { Semigroup } from './semigroup';

interface Monoid extends Semigroup {
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
