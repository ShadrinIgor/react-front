import React from 'react';
import PropTypes from 'prop-types';
import {NavLink, withRouter} from 'react-router-dom';
import cx from 'classnames';
import {translate} from 'react-i18next';
import SubHeader from 'js/components/SubHeader';
import _styles from './styles.sass';

const SubHeaderMenuCenter = ({t, styles, match}) => {
  const {courseId, groupId} = match.params;
  return (
    <ul className={cx('nav', 'navbar-nav', 'navbar-center')}>
      <li><NavLink exact to={`/courses/real/my/${courseId}/${groupId}`} activeClassName={styles.active}>{t('common:schedule')}</NavLink></li>
      <li><NavLink to={`/courses/real/my/${courseId}/${groupId}/about`} activeClassName={styles.active}>{t('common:about')}</NavLink></li>
    </ul>
  );
};

SubHeaderMenuCenter.propTypes = {
  t: PropTypes.func,
  styles: PropTypes.object,
  match: PropTypes.object
};

const CourseNavBarSection = () => (
  <div className={_styles.container}>
    <SubHeader subHeaderMenuCenter={translate(['common'], {wait: true})(withRouter(SubHeaderMenuCenter))}/>
  </div>
);

export default CourseNavBarSection;