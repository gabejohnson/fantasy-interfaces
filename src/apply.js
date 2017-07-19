'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Functor } from './functor';
import { id } from './category';

const constant = k => () => k;

protocol Apply extends Functor {
  // ap :: Apply f => f a ~> f (a -> b) -> f b
  ap(f) {
    this.constructor[Apply.lift](x => x, f, this);
  }

  // lift :: Apply f => (a -> b -> ... -> c) -> f a -> f b -> ... -> f c
  static lift(f, a, ...bs) {
    const result = a[Functor.map](f);
    return bs.reduce((f, a) => a[Apply.ap](f), result);
  }

  // apFirst :: Apply f => f a ~> f b -> f a
  apFirst(y) {
    this.constructor[Apply.lift](constant, this, y);
  }

  // apSecond :: Apply f => f a ~> f b -> f b
  apSecond(y) {
    this.constructor[Apply.lift](constant(id(Function)), this, y);
  }
}

Array.prototype[Apply.ap] = function ap(fs) {
  const result = [];
  for (let idx = 0; idx < fs.length; idx += 1) {
    for (let idx2 = 0; idx2 < this.length; idx2 += 1) {
      result.push(fs[idx](this[idx2]));
    }
  }
  return result;
};
Array implements Apply;

Object.prototype[Apply.ap] = function ap(b) {
  var result = {};
  for (let k in this) if (k in b) result[k] = b[k](this[k]);
  return result;
};
Object implements Apply;

Function.prototype[Apply.ap] = function ap(f) {
  return x => f(x)(this(x));
};
Function implements Apply;

const ap = (f, other) => other[Apply.ap](f);
const apFirst = (a, b) => b[Apply.apFirst](a);
const apSecond = (a, b) => b[Apply.apSecond](a);
const lift = typeRep => (f, a, ...bs) => typeRep[Apply.lift](f, a, ...bs);
export {
  Apply,
  ap,
  apFirst,
  apSecond,
  lift
};
