import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import * as _publicationsActions from 'js/actions/publications';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = state => ({
  courseGroups: state.publications.courseGroups,
});

const withCourseGroups = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  @withRouter
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {
        match: {params: {courseId}},
        publicationsActions: {getCourseGroups}
      } = this.props;

      if (courseId) getCourseGroups(courseId);
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    match: PropTypes.object,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withCourseGroups;