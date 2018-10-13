import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as _publicationsActions from 'js/actions/publications';
import withDegrees from 'js/data/withDegrees';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = (state) => {
  const teachersItems = state.publications.teachers.items || {};
  const degreesItems = state.dictionary.degrees.items;
  return {
    teachers: {
      ...state.publications.teachers,
      items: Object.keys(teachersItems).map((key) => {
        const item = teachersItems[key];
        const {user = {}} = item;
        const degree = degreesItems[item.degreeId] || {};
        return {
          avatar: user ? user.avatar : null,
          title: user ? user.name || user.id : item.userId,
          about: item.about,
          degree: degree.name
        };
      })
    }
  };
};

const withTeachers = (WrappedComponent) => {
  @withDegrees
  @withRouter
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {match: {params: {courseId: publicationId}}, publicationsActions: {getTeachers}} = this.props;

      getTeachers(publicationId);
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    match: PropTypes.object,
    degrees: PropTypes.object,
    teachers: PropTypes.object,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withTeachers;