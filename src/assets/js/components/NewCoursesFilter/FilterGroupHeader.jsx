import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.sass';

const FilterGroupHeader = ({title, separator}) => (
  <div>
    <div className="list-group-item list-group-item-separator" style={{opacity: Number(separator)}}/>
    {title && (
      <div className="list-group-item-nav">
        <h6 className={`collapsed ${styles.h6Height}`}>{title}</h6>
      </div>
    )}
  </div>
);

FilterGroupHeader.propTypes = {
  title: PropTypes.string,
  separator: PropTypes.bool,
};

FilterGroupHeader.defaultProps = {
  separator: true,
};


export default FilterGroupHeader;