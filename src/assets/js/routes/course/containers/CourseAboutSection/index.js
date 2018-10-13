import React from 'react';
import PropTypes from 'prop-types';
import CourseAbout from 'js/components/CourseAbout';

const CourseAboutSection = ({
  title,
  description,
  video,
  langCode,
  typeOfEnglish
}) => (
  <div>
    {title && <h4>{title}</h4>}
    <CourseAbout description={description} video={video} langCode={langCode} typeOfEnglish={typeOfEnglish}/>
  </div>
);

CourseAboutSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  langCode: PropTypes.string,
  typeOfEnglish: PropTypes.string,
  video: PropTypes.any
};

export default CourseAboutSection;