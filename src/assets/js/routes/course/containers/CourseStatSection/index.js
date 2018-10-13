import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.sass';

const CourseStatSection = ({children}) => (
  <div className={styles.container}>
    <div className="container">
      {children}
    </div>
  </div>
);

CourseStatSection.propTypes = {
  children: PropTypes.element
};

export default CourseStatSection;