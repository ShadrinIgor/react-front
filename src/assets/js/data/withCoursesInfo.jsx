import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _publicationsActions from 'js/actions/publications';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = (state) => {
  const {publications = {}, courseGroupsInfo = {}, courseUserGroups} = state.publications;
  const {items: publicationsItems = {}} = publications;
  const {items: courseGroupsInfoItems = {}} = courseGroupsInfo;
  const {items: courseUserGroupsItems = {}} = courseUserGroups;

  if (Object.keys(publicationsItems).length && Object.keys(courseGroupsInfoItems).length) {
    Object.keys(publicationsItems).forEach((key) => { publicationsItems[key] = {...publicationsItems[key], ...{info: courseGroupsInfoItems[key]}}; });
  }

  if (Object.keys(courseUserGroupsItems).length && Object.keys(courseGroupsInfoItems).length) {
    Object.keys(courseUserGroupsItems).forEach((key) => {
      courseUserGroupsItems[key] = {...courseUserGroupsItems[key], ...{info: courseGroupsInfoItems[courseUserGroupsItems[key].courseId]}};
    });
  }

  return {
    publications: {...publications, items: publicationsItems},
    courseUserGroups: {...courseUserGroups, items: courseUserGroupsItems}
  };
};

const withCoursesInfo = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentDidMount = () => {
      const {
        publicationsActions: {getCoursesInfo},
        publications: {items = {}} = {}
      } = this.props;

      const ids = Object.keys(items);

      if (ids.length) getCoursesInfo(ids.join());
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    publications: PropTypes.object,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withCoursesInfo;