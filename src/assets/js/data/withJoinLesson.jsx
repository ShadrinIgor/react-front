import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as _joinLessonActions from 'js/actions/joinlesson';

const mapDispatchToProps = dispatch => ({
  joinLessonActions: bindActionCreators(_joinLessonActions, dispatch)
});

const mapStateToProps = state => ({
  paymentURLs: {
    ...state.paymentURLs
  }
});

const withJoinLesson = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    paymentURLs: PropTypes.object,
    joinLessonActions: PropTypes.object
  };

  return DataComponent;
};

export default withJoinLesson;