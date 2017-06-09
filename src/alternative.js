import { implements, interface } from 'sweet-interfaces';
import { Plus } from './plus';
import { Applicative } from './applicative';

interface Alternative extends Applicative, Plus {}
// TODO: change to default export once sweet-js/sweet-core/issues/620 ships
export { Alternative };

Array implements Alternative;
Object implements Alternative;
