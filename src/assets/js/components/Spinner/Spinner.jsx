import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.sass';

const Spinner = props => (
  <div className={cx(styles.spinner, styles[props.size], styles[props.style])}>
    <span className={cx(styles.spin, styles.spin1)}/>
    <span className={cx(styles.spin, styles.spin2)}/>
    <span className={cx(styles.spin, styles.spin3)}/>
  </div>
);

Spinner.size = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
};

Spinner.style = {
  WHITE: 'white',
  BLUE: 'blue'
};

Spinner.propTypes = {
  style: PropTypes.string,
  size: PropTypes.string
};

Spinner.defaultProps = {
  style: Spinner.style.BLUE,
  size: Spinner.size.MD
};

export default Spinner;
