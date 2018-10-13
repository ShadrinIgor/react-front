import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {NavLink, withRouter} from 'react-router-dom';
import {translate} from 'react-i18next';

@withRouter
@translate(['courses'], {wait: true})
class CoursesSubHeaderMenuLeft extends PureComponent {
  isActive(linkPath) {
    const {match: {path}} = this.props;
    return path.indexOf(linkPath) === 0;
  }

  onClickMenu(e) {
    e.preventDefault();

    window.location.href = e.currentTarget.getAttribute('alt');
  }

  render() {
    const {styles, t} = this.props;
    return (
      <ul className="nav navbar-nav navbar-left">
        <li><NavLink to="/courses/real/timetable" activeClassName={styles.active}>{t('courses:subHeader.timetable')}</NavLink></li>
        <li><NavLink to="/courses/real/my" activeClassName={styles.active}>{t('courses:subHeader.my')}</NavLink></li>
        <li><NavLink to="/grammar/my" alt={`${CONFIG.serverURL}/grammar/my`} onClick={ (e) => { ::this.onClickMenu(e); } } className={cx({[styles.active]: ::this.isActive('/grammar/my')})}>{t('courses:subHeader.selfPacesCourses')}</NavLink></li>
        <li><NavLink to="/courses/real/new" alt={`${CONFIG.serverURL}/courses`} onClick={ (e) => { ::this.onClickMenu(e); } } activeClassName={styles.active}>{t('courses:subHeader.catalogue')}</NavLink></li>
      </ul>
    );
  }
}

CoursesSubHeaderMenuLeft.propTypes = {
  t: PropTypes.func,
  match: PropTypes.object,
  styles: PropTypes.object
};

export default CoursesSubHeaderMenuLeft;