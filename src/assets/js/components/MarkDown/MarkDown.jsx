import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.sass';

const MarkDown = props => <div dangerouslySetInnerHTML={{__html: props.html}} className={styles.markdown}/>;

MarkDown.propTypes = {
  html: PropTypes.string.isRequired
};

export default MarkDown;