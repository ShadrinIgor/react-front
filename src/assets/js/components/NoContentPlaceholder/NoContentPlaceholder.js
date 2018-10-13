import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.sass';

const NoContentPlaceholder = props => (
  <div className={classNames(styles.container, 'text-center')}>
    <div className={styles.cover}/>
    <div className={styles.text}>
      <p>{props.title}</p>
      {props.buttonTitle && <Link to={props.buttonLink} className="btn btn-primary">{props.buttonTitle}</Link>}
    </div>
  </div>
);

NoContentPlaceholder.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string,
  buttonLink: PropTypes.string
};

NoContentPlaceholder.defaultProps = {
  buttonLink: '/courses/real/new'
};

export default NoContentPlaceholder;