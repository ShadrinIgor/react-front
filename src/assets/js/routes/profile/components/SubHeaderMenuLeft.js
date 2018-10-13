import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {translate} from 'react-i18next';

const SubHeaderMenuLeft = ({styles, t}) => (
  <ul className="nav navbar-nav navbar-left">
    <li><NavLink exact to="/user/profile" activeClassName={styles.active}>{t('profile:subHeader:profile')}</NavLink>
    </li>
    <li><NavLink to="/user/profile/status" activeClassName={styles.active}>{t('profile:subHeader:status')}</NavLink>
    </li>
    <li><NavLink to="/user/profile/invitation"
      activeClassName={styles.active}>{t('profile:subHeader:invitation')}</NavLink></li>
    <li><NavLink to="/user/profile/settings" activeClassName={styles.active}>{t('profile:subHeader:settings')}</NavLink>
    </li>
  </ul>
);

SubHeaderMenuLeft.propTypes = {
  styles: PropTypes.object,
  t: PropTypes.func
};

export default translate(['profile'], {wait: true})(SubHeaderMenuLeft);