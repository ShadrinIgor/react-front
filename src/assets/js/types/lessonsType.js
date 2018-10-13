import PropTypes from 'prop-types';
import lessonType from './lessonType';

const lessonsType = PropTypes.shape({
  fetching: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  items: PropTypes.instanceOf(lessonType).isRequired,
});

export default lessonsType;