import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {translate} from 'react-i18next';

@translate(['common'], {wait: true})
class SubHeaderMenuLeft extends PureComponent {
  render() {
    const {t, styles} = this.props;
    return (
      <ul className="nav navbar-nav navbar-left">
        <li><NavLink to="/pages/about-us" activeClassName={styles.active}>{t('common:footer:about_us')}</NavLink></li>
        {/** <li><NavLink to="/pages/suggestions" activeClassName={styles.active}>{t('common:suggestions')}</NavLink></li> */}
        <li><NavLink to="/pages/vacancies" activeClassName={styles.active}>{t('common:footer:vacancies')}</NavLink></li>
        <li><NavLink to="/pages/terms-of-use" activeClassName={styles.active}>{t('common:footer:termsOfUse')}</NavLink></li>
      </ul>
    );
  }
}

SubHeaderMenuLeft.propTypes = {
  styles: PropTypes.object,
  t: PropTypes.func
};

export default SubHeaderMenuLeft;