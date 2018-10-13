import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

const SubHeaderMenuLeft = ({styles}) => (
  <ul className="nav navbar-nav navbar-left">
    <li><NavLink to="/words/self-placed-learning" activeClassName={styles.active}>Self-placed learning</NavLink></li>
    <li><NavLink to="/words/new-sets" activeClassName={styles.active}>New sets</NavLink></li>
  </ul>
);

SubHeaderMenuLeft.propTypes = {
  styles: PropTypes.object
};

export default SubHeaderMenuLeft;