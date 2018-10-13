import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as _publicationsActions from 'js/actions/publications';
import {lessonsType} from 'js/types';

const mapDispatchToProps = dispatch => ({
  publicationsActions: bindActionCreators(_publicationsActions, dispatch)
});

const mapStateToProps = state => ({
  lessons: state.dictionary.lessons
});

const withLessons = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  @withRouter
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      const {match: {params: {courseId: publicationId}}, publicationsActions: {getLessons}} = this.props;

      getLessons(publicationId);
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    match: PropTypes.object,
    lessons: lessonsType,
    publicationsActions: PropTypes.object
  };

  return DataComponent;
};

export default withLessons;