'lang sweet.js';

import { interface, implements } from 'sweet-interfaces';
import { Functor } from './functor';
import { Apply } from './apply';
import { Category } from './category';

interface Chain extends Apply {
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

const { chain } = Chain;

Array.prototype[chain] = function chain(f) {
  const result = [];
  this.forEach(x => Array.prototype.push.apply(result, f(x)));
  return result;
};
Array implements Chain;

Function.prototype[chain] = function chain(f) {
  return x => f(this(x))(x);
};
Function implements Chain;

export { Chain };
