import {shape, bool, number, objectOf} from 'prop-types';
import englishLevelType from './englishLevelType';

const englishLevelsType = shape({
  fetching: bool.isRequired,
  count: number.isRequired,
  items: objectOf(englishLevelType).isRequired,
});

export default englishLevelsType;