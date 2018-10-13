import {shape, number, string} from 'prop-types';

const paySystemType = shape({
  id: number.isRequired,
  name: string.isRequired,
  url: string
});

export default paySystemType;