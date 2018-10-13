import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _userActions from 'js/actions/user';

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(_userActions, dispatch)
});

const mapStateToProps = state => ({
  user: state.user
});

const withUser = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class DataComponent extends PureComponent {
    componentWillMount = () => {
      // const {userActions: {retrieveInformationAboutUser}} = this.props;
      // retrieveInformationAboutUser();
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  DataComponent.propTypes = {
    user: PropTypes.object,
    userActions: PropTypes.object
  };

  return DataComponent;
};

withUser.propTypes = {
  user: PropTypes.object.isRequired
};

export default withUser;