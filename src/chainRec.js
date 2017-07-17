'lang sweet.js';

import { implements, protocol } from 'sweet-interfaces';
import { Chain } from './chain';

protocol ChainRec extends Chain {
  // chainRec :: ChainRec m => ((a -> c, b -> c, a) -> m c, a) -> m b
  static chainRec;
}

const iterate = done => value => ({ value, done });
const cont = iterate(false);
const stop = iterate(true);

Array[ChainRec.chainRec] = function chainRec(f, x) {
  const remaining = [x];
  const complete = [];
  while (remaining.length > 0) {
    const xs = f(cont, stop, remaining.shift());
    const additional = [];
    let value, done;
    for (let idx = 0; idx < xs.length; idx += 1) {
      ({ value, done } = xs[idx]);
      (done ? complete : additional).push(value);
    }
    Array.prototype.unshift.apply(remaining, additional);
  }
  return complete;
};
Array implements ChainRec;

Function[ChainRec.chainRec] = function chainRec(f, x) {
  return a => {
    let { value, done } = cont(x);
    while (!done) ({ value, done } = f(cont, stop, value)(a));
    return value;
  };
};
Function implements ChainRec;

const chainRec = typeRep => (f, chain) => typeRep[ChainRec.chainRec](f, chain);

export { ChainRec, chainRec };
