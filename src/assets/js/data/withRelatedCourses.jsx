import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _publicationsActions from 'js/actions/publications';
import {withCoursesInfo} from 'js/data';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = (state) => {
  const {related = {}, courseGroupsInfo = {}} = state.publications;
  const {items: relatedItems = {}} = related;
  const {items: courseGroupsInfoItems = {}} = courseGroupsInfo;

  if (Object.keys(relatedItems).length && Object.keys(courseGroupsInfoItems).length) {
    Object.keys(relatedItems).forEach((key) => {
      const relatedItem = relatedItems[key];
      const courseGroupsInfoItem = courseGroupsInfoItems[key];
      if (relatedItem && courseGroupsInfoItem) relatedItems[key] = {...relatedItem, ...{info: courseGroupsInfoItem}};
    });
  }
  return {
    related: {...state.publications.related, items: relatedItems}
  };
};

const withRelatedCourses = (WrappedComponent) => {
  @withCoursesInfo
  @connect(mapStateToProps, mapDispatchToProps)
  @withRouter
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {match: {params: {courseId: publicationId}}, publicationsActions: {getRelated}} = this.props;
      getRelated(+publicationId);
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    match: PropTypes.object,
    related: PropTypes.object,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withRelatedCourses;