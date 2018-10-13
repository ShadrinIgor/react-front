import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {translate} from 'react-i18next';
import {withCourseUserGroups, withCoursesInfo} from 'js/data';
import MyCourseListItem from 'js/components/MyCourseListItem';
import NoContentPlaceholder from 'js/components/NoContentPlaceholder';
import Spinner from 'js/components/Spinner';
import styles from './styles.sass';

const RenderList = ({t, courseUserGroups: {fetching, count, items}}) => {
  if (fetching && !count) {
    return <Spinner/>;
  }

  if (items && !count && !fetching) {
    return <NoContentPlaceholder title={t('courses:my:noCoursesMessage')} buttonTitle={t('courses:addNewCourse')}/>;
  }

  if (fetching) return null;

  return Object.keys(items).map(key => <MyCourseListItem key={key} {...items[key]} />);
};

RenderList.propTypes = {
  t: PropTypes.func,
  courseUserGroups: PropTypes.object
};

@withCourseUserGroups
@withCoursesInfo
@translate(['courses'], {wait: true})
class MyCourses extends PureComponent {
  render() {
    const {t, courseUserGroups} = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h3 className="compact">{t('courses:my:title')}</h3>
          </div>
          <div className="col-sm-8 text-right">
            <div className={styles.filter}>
              <span>{t('courses:my:filter:title')}</span>
              <NavLink exact to="/courses/real/my"><span>{t('courses:my:filter:all')}</span></NavLink>
              <NavLink exact to="/courses/real/my/enrolled"><span>{t('courses:my:filter:enrolled')}</span></NavLink>
              <NavLink exact to="/courses/real/my/progress"><span>{t('courses:my:filter:inProgress')}</span></NavLink>
              <NavLink exact to="/courses/real/my/finished"><span>{t('courses:my:filter:finished')}</span></NavLink>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <RenderList t={t} courseUserGroups={courseUserGroups}/>
          </div>
        </div>
      </div>
    );
  }
}

MyCourses.propTypes = {
  t: PropTypes.func,
  publicationsActions: PropTypes.object,
  courseUserGroups: PropTypes.object
};

export default MyCourses;