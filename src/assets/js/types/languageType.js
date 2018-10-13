import {shape, number, string, bool} from 'prop-types';

const languageType = shape({
  id: number,
  code: string,
  label: string,
  isVisible: bool
});

export default languageType;