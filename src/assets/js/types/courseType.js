import PropTypes from 'prop-types';
import imageType from './imageType';

const courseType = PropTypes.shape({
  id: PropTypes.number,
  typeOfCourse: PropTypes.number,
  typeOfEnglish: PropTypes.number,
  levelId: PropTypes.number,
  description: PropTypes.string,
  langCode: PropTypes.string,
  avatar: PropTypes.instanceOf(imageType),
  header: PropTypes.instanceOf(imageType),
  cover: PropTypes.instanceOf(imageType),
  video: PropTypes.object,
  createdAt: PropTypes.string, // "2017-08-15 11:55"
  updatedAt: PropTypes.string, // "2017-09-07 15:30"
});

export default courseType;