import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.sass';

const Currency = props => <div
  className={classNames(styles.currency, styles[props.value], {...props.className})} {...props}/>;

Currency.value = {
  RMB: 'rmb',
  RUB: 'rub'
};

Currency.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string
};

Currency.defaultProps = {
  value: Currency.value.RMB
};

export default Currency;
