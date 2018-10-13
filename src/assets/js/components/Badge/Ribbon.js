import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.sass';

const Ribbon = props => (
  <div {...props} className={classNames(styles.ribbon, styles[props.direction], props.className)}>
    <div className={styles.content}>{props.children}</div>
  </div>
);

Ribbon.direction = {
  LEFT: 'left',
  RIGHT: 'right'
};

Ribbon.propTypes = {
  direction: PropTypes.string.isRequired,
  className: PropTypes.any,
  children: PropTypes.element
};

Ribbon.defaultProps = {
  direction: Ribbon.direction.LEFT
};

export default Ribbon;
