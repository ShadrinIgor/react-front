import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as _publicationsActions from 'js/actions/publications';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = state => ({
  courseClosestLesson: state.publications.courseClosestLesson
});

const withCourseClosestLesson = (WrappedComponent) => {
  @withRouter
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {
        match: {
          params: {courseId}
        },
        publicationsActions: {getCourseClosestLesson}
      } = this.props;

      if (courseId) getCourseClosestLesson(courseId);
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    match: PropTypes.object,
    courseClosestLesson: PropTypes.object,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withCourseClosestLesson;