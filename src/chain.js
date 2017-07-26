'lang sweet.js';

import { protocol, implements } from 'sweet-interfaces';
import { Functor } from './functor';
import { Apply } from './apply';
import { Category } from './category';

protocol Chain extends Apply {
  // chain :: Chain m => m a ~> (a -> m b) -> m b
  chain(f) {
    return this[Chain.join]()[Functor.map](f);
  }

  // join :: Chain m => m (m a) ~> m a
  join() {
    return this[Chain.chain](Function[Category.id]);
  }

  [Apply.ap](m) {
    return m[Chain.chain](f => this[Functor.map](f));
  }
}

Array.prototype[Chain.chain] = function chain(f) {
  const result = [];
  this.forEach(x => Array.prototype.push.apply(result, f(x)));
  return result;
};
Reflect.implement(Array, Chain);

Function.prototype[Chain.chain] = function chain(f) {
  return x => f(this(x))(x);
};
Reflect.implement(Function, Chain);

const chain = (f, ch) => ch[Chain.chain](f);
const join = ch => ch[Chain.join]();

export {
  Chain,
  chain,
  join
};
