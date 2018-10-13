import {shape, number, string} from 'prop-types';

const englishLevelType = shape({
  id: number.isRequired,
  name: string.isRequired
});

export default englishLevelType;