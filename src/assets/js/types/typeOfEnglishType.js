import {shape, number, string} from 'prop-types';

const typeOfEnglishType = shape({
  id: number.isRequired,
  label: string.isRequired
});

export default typeOfEnglishType;