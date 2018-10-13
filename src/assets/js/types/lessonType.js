import PropTypes from 'prop-types';

const lessonType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  weight: PropTypes.number,
  contentItemId: PropTypes.number,
  contentItemVersion: PropTypes.number
});

export default lessonType;