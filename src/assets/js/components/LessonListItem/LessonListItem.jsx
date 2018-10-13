import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import cx from 'classnames';
import moment from 'moment';
import Panel from 'js/components/Panel';
import Timezone from 'js/components/Timezone';
import DateTime from 'js/components/DateTime';
import styles from './style.sass';

class LessonListItem extends PureComponent {
  static getStartTitle(startTime, prevStartTime, todayTitle) {
    const startTimeObject = moment(startTime, 'YYYY-MM-DD h:mm:ss');
    if (startTimeObject.diff(moment(), 'days') === 0) {
      return todayTitle;
    }

    if (!prevStartTime || startTimeObject.diff(moment(prevStartTime, 'YYYY-MM-DD h:mm:ss'), 'days') > 0) {
      return startTimeObject.format('D MMMM');
    }

    return null;
  }

  render() {
    const {
      startTime, title, description, prevDate, todayTitle, course, groupId, courseId
    } = this.props;

    const startTimeTitle = LessonListItem.getStartTitle(startTime, prevDate, todayTitle);
    const courseAvatar = course && course.avatar && course.avatar.urls && course.avatar.urls.original ? course.avatar.urls.original : null;

    return (
      <Link to={`/courses/real/my/${courseId}/${groupId}`} className={styles.container}>
        <Panel type={Panel.type.ITEM} nobody={true} className={styles.panel}>
          <div className="container-table">
            <div className={styles['container-startTime']}>
              <h6><Timezone datetime={startTime} outputFormat={DateTime.outputFormats.LT}/></h6>
            </div>
            <div className={cx(styles['container-cover'], 'hidden-xs')}>
              <div className={styles.cover} style={{backgroundImage: courseAvatar ? `url(${courseAvatar})` : ''}}/>
            </div>
            <div className={styles['container-content']}>
              <h5>{title}</h5>
              <p className="text-muted">{description}</p>
            </div>
          </div>
        </Panel>
      </Link>
    );
  }
}

LessonListItem.propTypes = {
  groupId: PropTypes.number.isRequired,
  courseId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  course: PropTypes.object,
  todayTitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  prevDate: PropTypes.string,
  cover: PropTypes.string
};

export default LessonListItem;