import {shape, bool, number, objectOf} from 'prop-types';
import degreeType from './degreeType';

const degreesType = shape({
  fetching: bool.isRequired,
  count: number.isRequired,
  items: objectOf(degreeType).isRequired,
});

export default degreesType;