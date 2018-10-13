import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {translate} from 'react-i18next';
import cx from 'classnames';
import DateTime from 'js/components/DateTime';
import Panel from 'js/components/Panel/Panel';
import Label from 'js/components/Label/Label';
import WebinarTimer from 'js/components/WebinarTimer';
import Timezone from 'js/components/Timezone';
import {withJoinLesson} from 'js/data';
import {WEBINAR_STATUS_IN_PROGRESS, WEBINAR_STATUS_PLANNED, WEBINAR_STATUS_MOVED} from 'js/constants/webinar';
import styles from './style.sass';

@withJoinLesson
@translate(['courses'], {wait: true})
class LessonListNext extends PureComponent {
  state = {
    timerState: null,
    timerLabel: null
  };
  constructor() {
    super();
    this.state = {status: null};
    this.updateTimer = 0;
  }

  callBack(timerState) {
    this.setState({
      timerState: timerState.status,
      timerLabel: timerState.label
    });
    if (this.updateTimer > 5) {
      this.updateTimer = 0;
      if (this.props.refreshTimetable) this.props.refreshTimetable();
    } else {
      this.updateTimer += 1;
    }
  }

  componentWillMount() {
    this.setState({...this.state, status: this.props.group_lesson.status});
    // this.setState({...this.state, status: 1});
  }

  getStartTitle(startTime, todayTitle) {
    const startTimeObj = moment(startTime, 'YYYY-MM-DD h:mm:ss');
    if (startTimeObj.dayOfYear() === moment().dayOfYear()) {
      return todayTitle;
    }

    return <Timezone datetime={startTime} inputFormat={'YYYY-MM-DD HH:mm:ss'} outputFormat={DateTime.outputFormats.DATE_DAY_MONTH}/>;
  }

  openJoinLesson(e) {
    e.preventDefault();
    const {joinLessonActions: {joinLesson}, groupId, groupLessonId} = this.props;
    joinLesson(groupId, groupLessonId);
  }

  renderLabel() {
    const types = {
      [WEBINAR_STATUS_IN_PROGRESS]: Label.type.PRIMARY,
      [WEBINAR_STATUS_PLANNED]: Label.type.DEFAULT,
      [WEBINAR_STATUS_MOVED]: Label.type.DEFAULT
    };

    let type = types[this.state.status];
    const label = this.state.timerLabel;

    switch (this.state.timerState) {
      case 0:
        type = Label.type.PRIMARY;
        break;
      case 2:
        type = Label.type.WARNING;
        break;
      case 1:
      default:
        type = Label.type.DEFAULT;
        break;
    }

    return <Label type={type}>{label}</Label>;
  }

  renderButton() {
    const {startLessonTitle} = this.props;

    if (this.state.timerState === 2 || this.state.timerState === 0) {
      return <Link to="#" className="btn btn-primary" onClick={::this.openJoinLesson}>{startLessonTitle}</Link>;
    }

    return <Link to="#" disabled="disabled" className="btn btn-primary" onClick={e => e.preventDefault()}>{startLessonTitle}</Link>;
  }

  render() {
    const {
      todayTitle,
      startTime,
      endTime,
      description,
      nextLessonTitle
    } = this.props;

    const timeTitle = this.getStartTitle(startTime, todayTitle);

    return (
      <div>
        <h4 className={styles.nextLessonsTitle}>{nextLessonTitle}:</h4>
        <Panel type={Panel.type.ITEM} nobody={true} className={styles.panel}>
          <div className={cx('container-table', styles.container)}>
            <div className={styles['container-startTime']}>
              <h5>{timeTitle}</h5>
              <h2><Timezone datetime={startTime} inputFormat={'YYYY-MM-DD HH:mm:ss'} outputFormat={DateTime.outputFormats.TIME}/></h2>
              <WebinarTimer callBack={::this.callBack} lessonStartDateTime={startTime} lessonEndDateTime={endTime}/>
              {this.renderLabel()}
            </div>
            <div className={styles['container-content']}>
              <h4>{this.props.title}</h4>
              <small className="text-muted">{description}</small>
              <div className={styles['container-actions']}>
                {this.renderButton()}
              </div>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}

LessonListNext.propTypes = {
  t: PropTypes.func,
  id: PropTypes.number.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string,
  prevDate: PropTypes.string,
  groupLessonId: PropTypes.number,
  group_lesson: PropTypes.object,
  groupId: PropTypes.number,
  title: PropTypes.string.isRequired,
  nextLessonTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  startLessonTitle: PropTypes.string.isRequired,
  bookLessonTitle: PropTypes.string.isRequired,
  todayTitle: PropTypes.string.isRequired,
  remainingTitle: PropTypes.string.isRequired,
  joinLessonActions: PropTypes.object,
  refreshTimetable: PropTypes.func
};

export default LessonListNext;