import classNames from 'classnames';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Utils from 'js/utils/Utils';
import * as _userActions from 'js/actions/user';
import stylesGlobal from '../styles.sass';
import styles from './styles.sass';

class CompleteProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: Utils.uuid()
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const {user} = this.props;
    const {updateUserFields} = this.props.userActions;

    updateUserFields(user.id, {
      registrationStep: 7
    });
  }

  render() {
    return (
      <div className={classNames('container', styles.container, stylesGlobal['container-modal-blue'])}>
        <div className="row">
          <div className="col-xs-12">
            <h2>Thank you for information!</h2>
            <h4>Your profile is finished</h4>
            <div className={styles.cover}/>
          </div>
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
            <h4>You are now ready to select courses what you need.</h4>
            <br/>
            <Link to="" className={classNames('btn', stylesGlobal.btn, stylesGlobal['btn-extra'])}
              onClick={::this.onSubmit}>Select courses</Link>
          </div>
        </div>
      </div>
    );
  }
}

CompleteProfile.propTypes = {
  user: PropTypes.func,
  userActions: PropTypes.object
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompleteProfile));