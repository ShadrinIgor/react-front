import classNames from 'classnames';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _userActions from 'js/actions/user';
import styles from './styles.sass';

class FirstStepsStatusBar extends Component {
  renderSteps() {
    const {user} = this.props;
    const {registrationStep} = user;
    const step = registrationStep - 2;
    const steps = Array(...Array(4)).map((value, index) => index);

    return steps.map((key, index) => <li key={index} className={classNames({
      [styles.active]: index === step,
      [styles.passed]: index < step
    })}/>);
  }

  skipProfile(e) {
    e.preventDefault();

    const {user, userActions} = this.props;
    const {updateUserFields} = userActions;

    updateUserFields(user.id, {
      registrationStep: user.registrationSteps
    });
  }

  render() {
    const {user} = this.props;

    return (
      <div className={classNames(styles.statusbar, {
        [styles.hidden]: !(user.registrationStep < user.registrationSteps - 2 && user.registrationStep > 1)
      })}>
        <div className="container">
          <div className="row">
            <div className="col-sm-3 hidden-xs"/>
            <div className="col-xs-8 col-sm-6 text-center">
              <ul className={classNames('list-unstyled', styles['list-navigation-steps'])}>
                {this.renderSteps()}
              </ul>
            </div>
            <div className="col-xs-4 col-sm-3 text-right">
              <NavLink to="" onClick={::this.skipProfile} className={styles['btn-link']}>Skip profile</NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FirstStepsStatusBar.propTypes = {
  userActions: PropTypes.object,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(_userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstStepsStatusBar);
