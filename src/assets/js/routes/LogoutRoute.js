import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _authActions from 'js/actions/auth';

const LogoutRoute = ({authActions}) => {
  authActions.logout();

  return <Redirect to="/"/>;
};

LogoutRoute.propTypes = {
  authActions: PropTypes.shape({
    logout: PropTypes.func.isRequired
  }).isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(_authActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LogoutRoute);