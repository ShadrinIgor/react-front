import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import cx from 'classnames';
import {translate} from 'react-i18next';
import FileModel from 'js/models/FileModel';
import Timezone from 'js/components/Timezone';
import DateTime from 'js/components/DateTime';
import {withCoursesInfo, withCourseGroup, withCourseUserGroups} from 'js/data';
import styles from './styles.sass';

class RenderEnrollButton extends PureComponent {
  render() {
    const {t, userEnrolledOnThisCourse} = this.props;

    if (userEnrolledOnThisCourse) {
      return (
        <a className={cx('btn btn-md btn-info', styles.enrolledButton)} type="button">
          <span className="icon icon_24 icon_24_done_gray"/>
          {t('courses:enroll.enrolled')}
        </a>
      );
    }

    return <a onClick={() => document.getElementById('groups').scrollIntoView()} className="btn btn-md btn-warning">{t('courses:enroll.enrollCourse')}</a>;
  }
}

RenderEnrollButton.propTypes = {
  t: PropTypes.func,
  userEnrolledOnThisCourse: PropTypes.bool
};

@withCourseUserGroups
@withCourseGroup
@withCoursesInfo
@translate(['common', 'courses'], {wait: true})
class CourseGroupLandingHeader extends PureComponent {
  render() {
    const {
      t, courseGroup, courseGroup: {publication} = {}, courseUserGroups, courseUserGroups: {fetching: courseUserGroupsFetching} = {}
    } = this.props;

    if (!publication || courseUserGroupsFetching) {
      return null;
    }

    const userEnrolledOnThisCourse = ((courseUserGroups.items[courseGroup.id] || {}).info || {}).isEnrolled || false;

    return (
      <div className={styles.container} style={{backgroundImage: `url(${(new FileModel(publication.course.header)).original})`}}>
        <div className="container">
          <div className="row">
            <div className={cx('col-xs-12', styles.back)}>
              <Link to="/courses/real/my"><span>{t('common:back')}</span></Link>
            </div>
          </div>
          <div className={cx('row', styles.content)}>
            <div className='col-xs-12'>
              <h1>{publication.title}</h1>
              <h4>{courseGroup.name} (<Timezone datetime={courseGroup.startsAt} outputFormat={DateTime.outputFormats.DATE_DAY_MONTH}/> - <Timezone datetime={courseGroup.lastLesson} outputFormat={DateTime.outputFormats.DATE_DAY_MONTH}/>)</h4>
            </div>
          </div>
          <div className={cx('row', styles.actions)}>
            <div className='col-xs-12'>
              <RenderEnrollButton t={t} userEnrolledOnThisCourse={userEnrolledOnThisCourse}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CourseGroupLandingHeader.propTypes = {
  t: PropTypes.func,
  courseGroup: PropTypes.object,
  courseGroups: PropTypes.object,
  courseUserGroups: PropTypes.object
};

export default CourseGroupLandingHeader;