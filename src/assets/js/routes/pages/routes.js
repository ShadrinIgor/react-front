import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as _uiActions from 'js/actions/ui';
import {BundleLoader} from 'js/containers/Bundle';
import App from 'js/containers/App';
import aboutUsLoader from 'bundle-loader?lazy!./about-us';
import vacanciesLoader from 'bundle-loader?lazy!./vacancies';
// import suggestionsLoader from 'bundle-loader?lazy!./suggestions';
// import contactsLoader from 'bundle-loader?lazy!./contacts';
import termsOfUseLoader from 'bundle-loader?lazy!./terms-of-use';
import SubHeaderMenuLeft from './components/SubHeaderMenuLeft';

class Pages extends PureComponent {
  componentDidMount() {
    this.props.uiActions.renderSubHeader(SubHeaderMenuLeft);
  }

  render() {
    return (
      <App>
        <Switch>
          <Redirect exact from='/pages' to='/pages/about-us'/>
          <Route exact path='/pages/about-us' render={BundleLoader(aboutUsLoader, true)}/>
          <Route exact path='/pages/vacancies' render={BundleLoader(vacanciesLoader, true)}/>
          {/** <Route exact path='/pages/suggestions' render={BundleLoader(suggestionsLoader, true)}/>
          <Route exact path='/pages/contacts' render={BundleLoader(contactsLoader, true)}/> */}
          <Route exact path='/pages/terms-of-use' render={BundleLoader(termsOfUseLoader, true)}/>
          <Redirect to="/pageNotFound"/>
        </Switch>
      </App>
    );
  }
}

Pages.propTypes = {
  uiActions: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(_uiActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Pages);