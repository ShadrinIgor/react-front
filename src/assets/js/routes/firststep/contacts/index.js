import {defer} from 'underscore';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.us';
import * as _userActions from 'js/actions/user';
import {isEmail} from 'js/utils/ValidationUtil';
import stylesGlobal from '../styles.sass';
import styles from './styles.sass';

class Contacts extends Component {
  constructor(props) {
    super(props);

    const {user} = this.props;

    this.state = {
      phone: user.phone || '',
      email: user.email || '',
      formValid: false
    };
  }

  componentDidMount() {
    defer(::this.validateForm);
  }

  onSubmit(e) {
    e.preventDefault();

    const {user, userActions} = this.props;
    const {updateUserFields} = userActions;

    updateUserFields(user.id, {
      registrationStep: 2,
      phone: this.state.phone,
      email: this.state.email
    });
  }

  handleInputChange(e) {
    const {target, name} = e.target;
    const value = target.type === 'checkbox' ? target.checked : (target.rawValue || target.value);

    this.setState({
      [name]: value
    });

    defer(::this.validateForm);
  }

  validateForm() {
    const inputPhone = this.inputPhone.props.value.length > 5;
    const inputEmail = isEmail($(this.inputEmail).val());

    this.setState({
      formValid: inputPhone && inputEmail
    });
  }

  render() {
    return (
      <div className={`container ${stylesGlobal['container-modal-blue']}`}>
        <h2>Your contacts</h2>
        <div className="row">
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
            <form method="post" onSubmit={::this.onSubmit}>
              <fieldset disabled={this.props.user.fetching}>
                <div className="form-group">
                  <label className="control-label no-placeholder">Enter your phone</label>
                  <Cleave type="text" name="phone" placeholder="Enter your phone"
                    ref={(el) => {
                      this.inputPhone = el;
                    }}
                    className="form-control" value={this.state.phone}
                    options={{phone: true, phoneRegionCode: 'US'}}
                    onChange={::this.handleInputChange}/>
                  <span className={`icon-speech-recognition ${styles['icon-speech-recognition']}`}/>
                </div>
                <div className="form-group">
                  <label className="control-label no-placeholder">Enter your email</label>
                  <input type="email" name="email" placeholder="Enter your email"
                    ref={(el) => {
                      this.inputEmail = el;
                    }}
                    className="form-control"
                    value={this.state.email}
                    onChange={::this.handleInputChange}/>
                  <span className={`icon-speech-recognition ${styles['icon-speech-recognition']}`}/>
                </div>
                <button type="submit" className={`btn ${stylesGlobal.btn} ${stylesGlobal['btn-extra']}`}
                  disabled={!this.state.formValid}>Go to profile filling
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Contacts.propTypes = {
  user: PropTypes.object,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contacts));