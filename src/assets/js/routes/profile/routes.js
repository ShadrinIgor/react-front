import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BundleLoader} from 'js/containers/Bundle';
import * as _uiActions from 'js/actions/ui';
import profileLoader from 'bundle-loader?lazy!./user/profile';
import statusLoader from 'bundle-loader?lazy!./user/status';
import invitationLoader from 'bundle-loader?lazy!./user/invitation';
import profileMainLoader from 'bundle-loader?lazy!./user/settings/profile';
import profileAccountLoader from 'bundle-loader?lazy!./user/settings/account';
import profileNotificationsLoader from 'bundle-loader?lazy!./user/settings/notifications';
import profileAdditionalLoader from 'bundle-loader?lazy!./user/settings/additional';
import Panel from 'js/components/Panel';
import ContainerWithSidebar from 'js/containers/ContainerWithSidebar';
import SubHeaderMenuLeft from './components/SubHeaderMenuLeft';

const ContentLeft = (
  <Switch>
    <Route path='/user/profile/settings/profile' component={BundleLoader(profileMainLoader, true)}/>
    <Route path='/user/profile/settings/account' component={BundleLoader(profileAccountLoader, true)}/>
    <Route path='/user/profile/settings/notifications' component={BundleLoader(profileNotificationsLoader, true)}/>
    <Route path='/user/profile/settings/additional' component={BundleLoader(profileAdditionalLoader, true)}/>
    <Redirect from="/user/profile/settings" to='/user/profile/settings/profile'/>
    <Redirect to="/pageNotFound"/>
  </Switch>
);

const ContentRight = t => (
  <Panel type={Panel.type.CONTAINER}>
    <div className="list-group">
      <NavLink to="/user/profile/settings/profile"
        className="list-group-item list-group-item-nav">{t('profile:settings.menu.profile')}</NavLink>
      <NavLink to="/user/profile/settings/account"
        className="list-group-item list-group-item-nav">{t('profile:settings.menu.account')}</NavLink>
      <NavLink to="/user/profile/settings/notifications"
        className="list-group-item list-group-item-nav">{t('profile:settings.menu.notifications')}</NavLink>
      <NavLink to="/user/profile/settings/additional"
        className="list-group-item list-group-item-nav">{t('profile:settings.menu.additional')}</NavLink>
    </div>
  </Panel>
);

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(_uiActions, dispatch)
});

@connect(null, mapDispatchToProps)
@translate(['profile'], {wait: true})
class ProfileRoute extends PureComponent {
  componentDidMount() {
    this.props.uiActions.renderSubHeader(SubHeaderMenuLeft);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/user/profile' component={BundleLoader(profileLoader, true)}/>
        <Route exact path='/user/profile/status' component={BundleLoader(statusLoader, true)}/>
        <Route exact path='/user/profile/invitation' component={BundleLoader(invitationLoader, true)}/>

        <Route path='/user/profile/settings' render={() => (
          <ContainerWithSidebar contentLeft={ContentLeft} contentRight={ContentRight(this.props.t)}/>
        )}/>

        <Redirect to="/pageNotFound"/>
      </Switch>
    );
  }
}

ProfileRoute.propTypes = {
  uiActions: PropTypes.object,
  t: PropTypes.func
};

export default ProfileRoute;