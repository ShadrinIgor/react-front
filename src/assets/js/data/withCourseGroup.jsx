import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import * as _publicationsActions from 'js/actions/publications';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = (state, props) => {
  const {
    match: {params: {groupId}}
  } = props;
  return {
    courseGroup: (state.publications.courseGroups.items || {})[groupId],
    courseGroups: state.publications.courseGroups,
  };
};

const withCourseGroup = (WrappedComponent) => {
  @withRouter
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentDidMount = () => {
      const {
        match: {params: {groupId}},
        publicationsActions: {getCourseGroup}
      } = this.props;

      if (groupId) getCourseGroup(groupId);
    };
    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    match: PropTypes.object,
    courseGroup: PropTypes.object,
    courseGroups: PropTypes.object,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withCourseGroup;