import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AuthUtil from 'js/utils/AuthUtil';
import * as _authActions from 'js/actions/auth';
import * as _userActions from 'js/actions/user';
import {BundleLoader} from 'js/containers/Bundle';
import Toasts from 'js/components/Toasts/Toasts';
import Modal from 'js/components/Modal';
import App from 'js/containers/App';
import Utils from 'js/utils/Utils';
import pageNotFoundLoader from 'bundle-loader?lazy!./pageNotFound';
import paymentCallbackLoader from 'bundle-loader?lazy!./paymentCallback';
import coursesLoader from 'bundle-loader?lazy!./courses/routes';
// import wordsLoader from 'bundle-loader?lazy!./words/routes';
import pagesLoader from 'bundle-loader?lazy!./pages/routes';
import profileLoader from 'bundle-loader?lazy!./profile/routes';
// import completionLoader from 'bundle-loader?lazy!./firststep/routes';
import uiKitLoader from 'bundle-loader?lazy!./ui-kit/routes';
import LogoutRoute from './LogoutRoute';
// import landingsRoute from './landings';

const PrivateRoute = ({component: CurrentComponent, useAppWrapper = false, ...rest}) => (
  <Route {...rest} render={(props) => {
    // if (AuthUtil.hasAuthCookie() && AuthUtil.checkFirstStepIsComplete()) {
    if (AuthUtil.hasAuthCookie()) {
      if (useAppWrapper) {
        return (
          <App key={Utils.uuid()}>
            <CurrentComponent {...props}/>
          </App>
        );
      }
      return <App><CurrentComponent {...props}/></App>;
    }
    // return <Redirect to={CONFIG.serverURL}/>;
    window.location.href = CONFIG.serverURL;
    return null;
  }}/>
);

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  useAppWrapper: PropTypes.bool
};

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(_userActions, dispatch)
});

const mapStateToProps = state => ({
  user: state.user
});

@connect(mapStateToProps, mapDispatchToProps)
class Routes extends PureComponent {
  componentDidMount() {
    const {userActions} = this.props;
    const {retrieveInformationAboutUser} = userActions;

    if (AuthUtil.hasAuthCookie()) {
      retrieveInformationAboutUser();
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/logout" component={LogoutRoute}/>
          <Route exact path="/auth" render={_authActions.auth}/>
          <Route path="/pages" component={BundleLoader(pagesLoader, true)}/>
          <Route exact path="/ui-kit" component={BundleLoader(uiKitLoader, true)} useAppWrapper={true}/>

          <Redirect exact from="/user" to="/user/profile"/>
          <PrivateRoute path="/user/profile" component={BundleLoader(profileLoader, true)}/>

          <Redirect exact from='/courses' to="/courses/real" />
          <PrivateRoute path="/courses/real" component={BundleLoader(coursesLoader, true)}/>
          <PrivateRoute path="/payment-callback" component={BundleLoader(paymentCallbackLoader, true)}/>
          {/** <PrivateRoute path="/words" component={BundleLoader(wordsLoader, true)}/> */}

          {/** <Route exact path="/" render={() => {
            if (AuthUtil.hasAuthCookie() && AuthUtil.checkFirstStepIsComplete()) {
              return <Redirect to="/dashboard"/>;
            } else if (AuthUtil.hasAuthCookie() && !AuthUtil.checkFirstStepIsComplete()) {
              return <Route component={BundleLoader(completionLoader, true)}/>;
            }
            return <Route component={landingsRoute}/>;
          }}/> */}

          <Route component={BundleLoader(pageNotFoundLoader, true)}/>
        </Switch>

        <Modal/>
        <Toasts/>
      </div>
    );
  }
}

Routes.propTypes = {
  user: PropTypes.object,
  publication: PropTypes.object,
  userActions: PropTypes.object,
  publicationsActions: PropTypes.object,
};

export default Routes;