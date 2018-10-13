import {intersection} from 'underscore';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as _publicationsActions from 'js/actions/publications';
import {withEnglishLevels, withLessons, withCourseGroups, withCourseUserGroups, withCourseClosestLesson} from 'js/data';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = (state, props) => {
  const {
    match: {params: {courseId}}
  } = props;

  const {courseGroups, courseUserGroups, publications = {}} = state.publications;
  const publication = (publications.items || {})[courseId] || {};
  const courseClosestLesson = state.publications.courseClosestLesson.items[courseId] || {};
  const {group: courseClosestLessonGroup = {}} = courseClosestLesson;

  return {
    publication,
    courseUserGroups,
    courseGroups,
    lessons: state.publications.lessons,
    userEnrolledOnThisCourse: intersection(Object.keys(courseGroups.items || {}), Object.keys(courseUserGroups.items || {})).length,
    englishLevel: state.dictionary.englishLevels.items[(publication.course || {}).levelId] || {},
    courseClosestLesson: state.publications.courseClosestLesson,
    courseStatistic: {
      nextLesson: courseClosestLessonGroup.startsAt,
      lessons: state.publications.lessons.count,
      groups: courseGroups.count,
      level: (state.dictionary.englishLevels.items[(publication.course || {}).levelId] || {}).name || ''
    }
  };
};

const withCourse = (WrappedComponent) => {
  @withRouter
  @withEnglishLevels
  @withLessons
  @withCourseUserGroups
  @withCourseGroups
  @withCourseClosestLesson
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {
        match: {
          params: {courseId: publicationId}
        },
        publicationsActions: {getPublication}
      } = this.props;

      if (publicationId) getPublication(publicationId);
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    match: PropTypes.object,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withCourse;