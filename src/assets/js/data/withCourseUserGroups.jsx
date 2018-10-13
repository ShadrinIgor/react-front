import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import * as _publicationsActions from 'js/actions/publications';
import {withUser} from 'js/data';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = (state) => {
  const {
    courseUserGroups,
    courseUserGroups: {fetching: courseUserGroupsFetching, items: courseUserGroupsItems = {}} = {},
    courseGroupsInfo: {fetching: courseGroupsInfoFetching, items: courseGroupsInfoItems = {}} = {},
  } = state.publications;

  // courseUserGroups.fetching = !courseUserGroupsFetching && !courseGroupsInfoFetching;

  Object.keys(courseUserGroupsItems).map((key) => {
    courseUserGroupsItems[key].info = courseGroupsInfoItems[key];
    return key;
  });

  courseUserGroups.items = courseUserGroupsItems;

  return {
    courseUserGroups
  };
};

const withCourseUserGroups = (WrappedComponent) => {
  @withUser
  @withRouter
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {
        match,
        user: {id: userId},
        publicationsActions: {getCourseUserGroups}
      } = this.props;

      if (userId) getCourseUserGroups(userId, match.params.filter);
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    match: PropTypes.object,
    user: PropTypes.object,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withCourseUserGroups;