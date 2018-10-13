import {shape, number, string} from 'prop-types';

const degreeType = shape({
  id: number.isRequired,
  name: string.isRequired
});

export default degreeType;