import {shape, bool, number, objectOf} from 'prop-types';
import languageType from './languageType';

const languagesType = shape({
  fetching: bool.isRequired,
  count: number.isRequired,
  items: objectOf(languageType).isRequired,
});

export default languagesType;