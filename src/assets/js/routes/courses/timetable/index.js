import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import cx from 'classnames';
import {withUserTimetable} from 'js/data';
import Spinner from 'js/components/Spinner';
import LessonListItem from 'js/components/LessonListItem';
import LessonListNext from 'js/components/LessonListNext';
import EmptyPagePlaceholder from 'js/components/NoContentPlaceholder';
import DateTime from 'js/components/DateTime';
import styles from './styles.sass';
import Timezone from '../../../components/Timezone/Timezone';

class RenderLessonsGroup extends PureComponent {
  render() {
    const {title, group} = this.props;
    return (
      <div className={styles.lessonsGroup}>
        <h4>{<Timezone datetime={title} inputFormat={'YYYY-MM-DD'} outputFormat={DateTime.outputFormats.DATE_DAY_MONTH_FULL}/>}</h4>
        {group.map(lesson => <LessonListItem key={`groupLesson${lesson.id}`} {...lesson}/>)}
      </div>
    );
  }
}

RenderLessonsGroup.propTypes = {
  title: PropTypes.object,
  group: PropTypes.object
};

class RenderTimetable extends PureComponent {
  static getCourseTitle(publications, courseId) {
    return publications && publications.items && publications.items[courseId] ? publications.items[courseId].title : null;
  }

  render() {
    const {
      t, lessons, nextLesson, publications, groupedLessons, refreshTimetable
    } = this.props;

    const lessonsArray = Object.keys(lessons).map(key => lessons[key]);

    if (!nextLesson) {
      return null;
    }

    if (!lessonsArray.length) return null;

    return (
      <div>
        {nextLesson && (
          <LessonListNext startLessonTitle={t('courses:timetable.startLessons')}
            bookLessonTitle={t('courses:timetable.bookTitle')} todayTitle={t('courses:timetable.today')}
            nextLessonTitle={t('courses:timetable.nextLesson')}
            remainingTitle={t('courses:timetable.remaining')}
            refreshTimetable={refreshTimetable}
            description={RenderTimetable.getCourseTitle(publications, nextLesson.courseId)}
            {...nextLesson}/>
        )}

        {Object.keys(groupedLessons).map(key => <RenderLessonsGroup key={`timetableLesson${key}`} title={key} group={groupedLessons[key]}/>)}
      </div>
    );
  }
}

RenderTimetable.propTypes = {
  t: PropTypes.func,
  nextLesson: PropTypes.object,
  groupedLessons: PropTypes.object,
  lessons: PropTypes.object,
  publications: PropTypes.object,
  refreshTimetable: PropTypes.func
};

@withUserTimetable
@translate(['courses'], {wait: true})
class Timetable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {sendPublicationRequest: false};
  }

  componentWillUpdate(nextProps) {
    if (this.state.sendPublicationRequest || !nextProps.publications || nextProps.publications.count > 0) {
      return;
    }

    const listPublication = [];
    if (nextProps.userLessons && nextProps.userLessons.items) {
      Object.keys(nextProps.userLessons.items).forEach((key) => {
        const {courseId} = nextProps.userLessons.items[key];
        if (listPublication.indexOf(courseId) === -1) listPublication.push(courseId);
      });
      this.props.publicationsActions.getPublications({id: listPublication.join(',')});
      this.setState({sendPublicationRequest: true});
    }
  }

  render() {
    const {
      t, nextLesson, groupedLessons, userLessons: {count, items, fetching}, publications, refreshTimetable
    } = this.props;

    return (
      <div className="container">
        <h3 className={cx('compact', styles.h3Title)}>{t('courses:timetable.title')}</h3>
        {(fetching && !items) && <Spinner/>}
        {(!fetching || items) && <RenderTimetable t={t} publications={publications} groupedLessons={groupedLessons} nextLesson={nextLesson} lessons={items} refreshTimetable={refreshTimetable}/>}
        {(items && !count && !fetching) &&
        <EmptyPagePlaceholder title={t('courses:timetable:noCoursesMessage')} buttonTitle={t('courses:addNewCourse')}/>}
      </div>
    );
  }
}

Timetable.propTypes = {
  t: PropTypes.func,
  nextLesson: PropTypes.object,
  groupedLessons: PropTypes.object,
  userLessons: PropTypes.object,
  publications: PropTypes.object,
  getPublications: PropTypes.object,
  publicationsActions: PropTypes.object,
  refreshTimetable: PropTypes.func
};

export default Timetable;