import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.sass';

const Label = (props) => {
  const {
    type,
    round,
    extended,
    clickHandler
  } = props;
  const classes = classNames(
    `label-${type}`,
    styles.label,
    styles[`label-${type}`], {
      [styles.round]: round,
      [styles.extended]: extended
    },
    (clickHandler && typeof clickHandler === 'function' ? styles.cursorPointer : '')
  );

  return (
    <span onClick={e => (typeof clickHandler === 'function' ? clickHandler(e) : '')} className={classes}>
      {props.children}
    </span>
  );
};

Label.type = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger'
};

Label.propTypes = {
  round: PropTypes.bool,
  extended: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.element,
  clickHandler: PropTypes.func
};

Label.defaultProps = {
  round: false,
  extended: false,
  type: Label.type.DEFAULT
};

export default Label;