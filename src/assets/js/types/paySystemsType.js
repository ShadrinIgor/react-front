import {shape, bool, number, objectOf} from 'prop-types';
import paySystemType from './paySystemType';

const paySystemsType = shape({
  fetching: bool.isRequired,
  count: number.isRequired,
  items: objectOf(paySystemType).isRequired,
});

export default paySystemsType;