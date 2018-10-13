import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import cx from 'classnames';
import {translate} from 'react-i18next';
import FileModel from 'js/models/FileModel';
import {withCourse} from 'js/data';
import styles from './styles.sass';

class RenderEnrollButton extends PureComponent {
  render() {
    const {t, courseGroups, userEnrolledOnThisCourse} = this.props;

    if (courseGroups.fetching) {
      return null;
    }

    if (userEnrolledOnThisCourse) {
      return (
        <a className={cx('btn btn-lg btn-info', styles.enrolledButton)} type="button">
          <span className="icon icon_24 icon_24_done_gray"/>
          {t('courses:enroll.enrolled')}
        </a>
      );
    }

    return <a onClick={() => document.getElementById('groups').scrollIntoView()} className="btn btn-lg btn-warning">{t('courses:enroll.enrollCourse')}</a>;
  }
}

RenderEnrollButton.propTypes = {
  t: PropTypes.func,
  courseGroups: PropTypes.object,
  userEnrolledOnThisCourse: PropTypes.bool
};


@withCourse
@translate(['common', 'courses'], {wait: true})
class CourseLandingHeader extends PureComponent {
  render() {
    const {
      t, publication, userEnrolledOnThisCourse, courseGroups
    } = this.props;
    const {course = {}} = publication;

    if (!publication || !course) {
      return null;
    }

    return (
      <div className={styles.container} style={{backgroundImage: `url(${(new FileModel(course.header)).original})`}}>
        <div className="container">
          <div className="row">
            <div className={cx('col-xs-12', styles.back)}>
              <Link to="/courses/real/new"><span>{t('common:back')}</span></Link>
            </div>
          </div>
          <div className={cx('row', styles.content)}>
            <div className='col-xs-12'>
              <h1>{publication.title}</h1>
              <h4>{t(`courses:types.${publication.type}`)}</h4>
            </div>
          </div>
          <div className={cx('row', styles.actions)}>
            <div className='col-xs-12'>
              <RenderEnrollButton t={t} courseGroups={courseGroups} userEnrolledOnThisCourse={userEnrolledOnThisCourse}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CourseLandingHeader.propTypes = {
  t: PropTypes.func,
  publication: PropTypes.object,
  courseGroups: PropTypes.object,
  courseUserGroups: PropTypes.object,
  userEnrolledOnThisCourse: PropTypes.bool
};

export default CourseLandingHeader;