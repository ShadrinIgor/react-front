import {shape, bool, number, objectOf} from 'prop-types';
import typeOfEnglishType from './typeOfEnglishType';

const typesOfEnglishType = shape({
  fetching: bool.isRequired,
  count: number.isRequired,
  items: objectOf(typeOfEnglishType).isRequired,
});

export default typesOfEnglishType;