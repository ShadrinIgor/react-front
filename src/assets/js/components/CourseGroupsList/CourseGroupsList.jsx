import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {withCourseGroups, withCourseUserGroups} from 'js/data';
import Spinner from 'js/components/Spinner';
import CourseSchedule from 'js/components/CourseSchedule';
import PlaceholderPanelNoDescription from 'js/components/PlaceholderPanelNoDescription';

@withCourseGroups
@withCourseUserGroups
@translate(['common', 'courses'], {wait: true})
class CourseGroupsList extends PureComponent {
  render() {
    const {
      t, courseId, courseGroups, courseUserGroups, showNoContentMessage,
      courseGroups: {count, fetching, items}
    } = this.props;

    if (fetching || courseGroups.fetching || courseUserGroups.fetching) {
      return <Spinner/>;
    }

    if (!count) {
      return showNoContentMessage ? <PlaceholderPanelNoDescription title={t('courses:notify.description')}/> : null;
    }

    return (
      <div>
        {Object.keys(items).map(groupId => <CourseSchedule
          key={groupId} groupId={groupId}
          startsAt={items[groupId].startsAt}
          endTime={items[groupId].lastLesson}
          teacher={items[groupId].teacher}
          name={items[groupId].name}
          price={items[groupId].price}
          enrolled={Object.keys(courseUserGroups.items).includes(groupId)}
          enrolledToGroup={Object.keys(courseGroups.items).filter(n => Object.keys(courseUserGroups.items).includes(n)).length}
          enrollUrl={{
            pathname: `/courses/real/enroll`,
            state: {
              courseId,
              groupId
            }
          }} t={t}
          schedule={{}}/>)}
      </div>
    );
  }
}

CourseGroupsList.propTypes = {
  t: PropTypes.func,
  showNoContentMessage: PropTypes.bool,
  courseId: PropTypes.number.isRequired,
  courseGroups: PropTypes.object,
  courseUserGroups: PropTypes.object,
  publicationsActions: PropTypes.object
};

CourseGroupsList.defaultProps = {
  showNoContentMessage: true
};

export default CourseGroupsList;