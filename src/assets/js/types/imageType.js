import PropTypes from 'prop-types';

const imageType = PropTypes.shape({
  status: PropTypes.oneOf(['processed', 'processing', 'failed']).isRequired,
  fieldId: PropTypes.string.isRequired,
  urls: PropTypes.shape({
    original: PropTypes.string
  })
});

export default imageType;