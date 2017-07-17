'lang sweet.js';

import { protocol, implements } from 'sweet-interfaces';
import { Functor } from './functor';
import { Category } from './category';

protocol Extend extends Functor {
  // extend :: Extend w => w a ~> (w a -> b) -> w b
  extend(f) {
    return this[Extend.duplicate]()[Functor.map](f);
  }

  // duplicate :: Extend w => w a ~> w (w a)
  duplicate() {
    return this[Extend.extend](Function[Category.id]);
  }
}

Array.prototype[Extend.extend] = function extend(f) {
  return this.map((_, idx, xs) => f(xs.slice(idx)));
};
Array.prototype[Extend.duplicate] = function duplicate() {
  return this.map((_, idx, xs) => xs.slice(idx));
};
Array implements Extend;

Function.prototype[Extend.extend] = function extend(f) {
  return x => f(y => this(x.concat(y)));
};
Function.prototype[Extend.duplicate] = function duplicate() {
  return x => y => this(x.concat(y));
};
Function implements Extend;

const extend = (f, ext) => ext[Extend.extend](f);
const duplicate = ext => ext[Extend.duplicate]();

export {
  Extend,
  extend,
  duplicate
};
