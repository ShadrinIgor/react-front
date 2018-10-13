import Cookies from 'cookies-js';
import React from 'react';
import {Route} from 'react-router-dom';
import {BundleLoader} from 'js/containers/Bundle';
import landingLoader from 'bundle-loader?lazy!./landing';
import landingMobileLoader from 'bundle-loader?lazy!./landing-mobile';

const LandingRoute = () => {
  const loadedComponent = Cookies.get('LANDING_MOBILE') ? landingMobileLoader : landingLoader;
  return <Route exact path="/" component={BundleLoader(loadedComponent, true)}/>;
};

export default LandingRoute;