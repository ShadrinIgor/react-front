import {groupBy, sortBy} from 'underscore';
import moment from 'moment';
import cx from 'classnames';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as _publicationsActions from 'js/actions/publications';
import DateTime from 'js/components/DateTime';
import Spinner from 'js/components/Spinner';
import Panel from 'js/components/Panel';
import Avatar from 'js/components/Avatar';
import Price from 'js/components/Price';
import Timezone from 'js/components/Timezone';
import ModalReactBootstrap from 'js/components/ModalReactBootstrap';
import CourseTeacherItem from 'js/components/CourseTeachers/CourseTeacherItem';
import styles from './styles.sass';

const mapStateToProps = state => ({
  groupSchedules: state.publications.groupSchedules
});

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class WeekSchedule extends PureComponent {
  componentWillMount() {
    const {groupId, publicationsActions} = this.props;
    const {getGroupSchedules} = publicationsActions;

    getGroupSchedules(groupId);
  }

  render() {
    const {groupId, groupSchedules: {items}} = this.props;

    const schedule = Object.keys(items)
      .filter(key => items[key].groupId === +groupId)
      .reduce((arr, key) => {
        arr.push(items[key]);
        return arr;
      }, []);

    const weekdaysShort = moment.weekdaysShort();
    const groupedByWeekDays = groupBy(schedule, 'dayOfWeek');

    if (!schedule.length) return <Spinner/>;

    return (
      <div className={cx('container-table', styles['container-week'])}>
        {weekdaysShort.map((day, index) => {
          const currentDay = groupedByWeekDays[index];
          return (
            <div key={`schedule-day-${index}`} className={currentDay ? styles['schedule-item-active'] : 'text-muted'}>
              <h6>{day}</h6>
              {currentDay && sortBy(currentDay, 'startTime').map((item, index2) => (
                <div key={`schedule-day-time-${index2}`} className={styles.range}>
                  <Timezone datetime={item.startTime} inputFormat={'HH:mm'}/> - <Timezone datetime={item.endTime} inputFormat={'HH:mm'}/>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

WeekSchedule.propTypes = {
  groupId: PropTypes.number.isRequired,
  groupSchedules: PropTypes.object,
  publicationsActions: PropTypes.object
};

const onClickHandler = (e, notClickable) => {
  if (notClickable) {
    e.preventDefault();
  }
};

const Actions = (props) => {
  const {
    price, t, enrolled, enrolledToGroup, enrollUrl,
  } = props;

  const EnrolledButton = () => <div className={cx(styles.extraDisabled, 'pull-right')}><i className={styles.icon}/>{t('courses:enroll.enrolled')}</div>;
  const EnrollButton = () => {
    if (enrolledToGroup) {
      return <a disabled className="btn btn-primary pull-right">{t('courses:enroll.enroll')}</a>;
    }
    return <Link to={enrollUrl} disabled={enrolledToGroup || enrolled} className="btn btn-primary pull-right">{t('courses:enroll.enroll')}</Link>;
  };
  const EnrollGroupButton = () => {
    if (enrolledToGroup) {
      return <a disabled className="btn btn-warning pull-right">{t('courses:schedule.enrollButton')}</a>;
    }
    return <Link to={enrollUrl} onClick={e => onClickHandler(e, (enrolledToGroup || enrolled))} className="btn btn-warning pull-right">{t('courses:schedule.enrollButton')}</Link>;
  };

  if (enrolled) return <EnrolledButton/>;

  return price ? <EnrollGroupButton/> : <EnrollButton/>;
};

Actions.propTypes = {
  t: PropTypes.func.isRequired,
  price: PropTypes.number,
  enrolled: PropTypes.bool,
  enrolledToGroup: PropTypes.bool,
  enrollUrl: PropTypes.object,
};

class CourseSchedule extends PureComponent {
  state = {
    showTeacherInfo: false
  };
  openTeacherInfoModal() {
    this.setState({showTeacherInfo: true});
  }
  closeTeacherInfoModal() {
    this.setState({showTeacherInfo: false});
  }
  render() {
    const {
      t, startsAt, endTime, groupId, teacher, name, price,
    } = this.props;
    return (
      <Panel type={Panel.type.ITEM} nobody={true}>
        <div className={styles.scheduleBlock}>
          <div className="row">
            <div className="col-sm-6">
              <h4 className="compact">{name} (
                <DateTime src={startsAt} outputFormat={DateTime.outputFormats.DATE}/> — <DateTime src={endTime} outputFormat={DateTime.outputFormats.DATE}/>
                )</h4>
            </div>
            <div className="col-sm-6">
              <Actions {...this.props}/>
              <div className={cx(styles.price, 'pull-right')}><Price price={price}/></div>
            </div>
          </div>
          {teacher.user && <div className={styles.user} onClick={ (e) => { ::this.openTeacherInfoModal(e); }}>
            <div className={styles.teacherLabel}>{t('common:teacher')}:</div>
            <Avatar avatar={teacher.user.avatar} size={Avatar.size.XSM} avatarSource={teacher.user.avatarSource} className={styles.avatar}/>
            <div className={styles.teacherName}>{teacher.user.name}</div>
          </div>}
          <WeekSchedule groupId={groupId}/>
        </div>
        <ModalReactBootstrap title={t('common:teacherInfo')} open={this.state.showTeacherInfo} onClose={::this.closeTeacherInfoModal}>
          <CourseTeacherItem {...teacher}/>
        </ModalReactBootstrap>
      </Panel>
    );
  }
}

CourseSchedule.propTypes = {
  groupId: PropTypes.number.isRequired,
  enrollUrl: PropTypes.object,
  price: PropTypes.number,
  startsAt: PropTypes.string.isRequired,
  enrolledToGroup: PropTypes.bool,
  endTime: PropTypes.string.isRequired, // 2017-07-09 10:06:19
  enrolled: PropTypes.bool,
  schedule: PropTypes.arrayOf(PropTypes.shape({
    dayOfWeek: PropTypes.number.isRequired,
    startsAt: PropTypes.string.isRequired // 17:06:19
  })),
  t: PropTypes.func.isRequired,
  teacher: PropTypes.object,
  name: PropTypes.string.isRequired
};

CourseSchedule.defaultProps = {
  enrollUrl: '#',
  enrolled: false
};

export default CourseSchedule;