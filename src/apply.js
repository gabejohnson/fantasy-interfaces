'lang sweet.js';

import { implements, interface } from 'sweet-interfaces';
import { Functor } from './functor';;

interface Apply extends Functor {
  // ap :: Apply f => f a ~> f (a -> b) -> f b
  ap(f) {
    this.constructor[Apply.lift](f, this);
  }

  // lift :: Apply f => (a -> b -> ... -> c) -> f a -> f b -> ... -> f c
  static lift(f, a, ...bs) {
    const result = a[Functor.map](f);
    return bs.slice.reduce((f, a) => a[Apply.ap](f), result);
  }

  // apFirst :: Apply f => f a ~> f b -> f a
  apFirst(y) {
    this.constructor[Apply.lift](constant, this, y);
  }

  // apSecond :: Apply f => f a ~> f b -> f b
  apSecond(y) {
    this.constructor[Apply.lift](constant(identity), this, y);
  }
}

const { ap } = Apply;

Array.prototype[ap] = function ap(fs) {
  const result = [];
  for (let idx = 0; idx < fs.length; idx += 1) {
    for (let idx2 = 0; idx2 < this.length; idx2 += 1) {
      result.push(fs[idx](this[idx2]));
    }
  }
  return result;
};
Array implements Apply;

Object.prototype[ap] = function ap(b) {
  var result = {};
  for (let k in this) if (k in b) result[k] = b[k](this[k]);
  return result;
};
Object implements Apply;

Function.prototype[ap] = function ap(f) {
  return x => f(x)(this(x));
};
Function implements Apply;

export { Apply };
