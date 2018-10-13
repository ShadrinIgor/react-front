import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {BundleLoader} from 'js/containers/Bundle';
import ModalApp from 'js/containers/ModalApp';
import App from 'js/containers/App';
import contactsLoader from 'bundle-loader?lazy!./contacts';
import nameLoader from 'bundle-loader?lazy!./name';
import detailsLoader from 'bundle-loader?lazy!./details';
import ageLoader from 'bundle-loader?lazy!./age';
import locationLoader from 'bundle-loader?lazy!./location';
import completeLoader from 'bundle-loader?lazy!./complete';
import courseLoader from 'bundle-loader?lazy!./course';
import styles from './styles.sass';

const FirstStepRoutes = (props) => {
  const {user} = props;
  const {registrationStep} = user;
  const currentLoader = [
    contactsLoader,
    nameLoader,
    ageLoader,
    detailsLoader,
    locationLoader,
    completeLoader,
    courseLoader
  ][registrationStep - 1];
  let AppWrapper = null;
  let classes = null;

  switch (registrationStep) {
    case 7:
      AppWrapper = App;
      break;
    default:
      AppWrapper = ModalApp;
      classes = styles['container-modal-blue'];
      break;
  }

  return (
    <AppWrapper className={classes}>
      {currentLoader && <Route component={BundleLoader(currentLoader || contactsLoader, true)}/>}
    </AppWrapper>
  );
};

FirstStepRoutes.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(FirstStepRoutes);