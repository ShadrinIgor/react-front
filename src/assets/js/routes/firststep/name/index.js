import {defer, isEmpty} from 'underscore';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _userActions from 'js/actions/user';
import stylesGlobal from '../styles.sass';

class InputName extends Component {
  refInputName = null;

  constructor(props) {
    super(props);

    const {user} = this.props;

    this.state = {
      name: user.name || '',
      formValid: false
    };
  }

  componentDidMount() {
    defer(::this.validateForm);
  }

  handleInputChange(e) {
    const {target, name} = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({[name]: value});

    defer(::this.validateForm);
  }

  onSubmit(e) {
    e.preventDefault();

    const {user, userActions} = this.props;
    const {updateUserFields} = userActions;

    updateUserFields(user.id, {
      registrationStep: 3,
      name: this.state.name
    });
  }

  validateForm() {
    const value = $(this.refInputName).val().trim();
    const inputName = !isEmpty(value);

    this.setState({
      formValid: inputName
    });
  }

  render() {
    return (
      <div className={`container ${stylesGlobal['container-modal-blue']}`}>
        <h2>Hi! My name is react! <br/> What is your name?</h2>
        <div className="row">
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
            <form method="post" onSubmit={::this.onSubmit}>
              <fieldset disabled={this.props.user.fetching}>
                <div className="form-group">
                  <label className="control-label no-placeholder">Input your name</label>
                  <input type="text" placeholder="Input your name" name="name" value={this.state.name}
                    className="form-control" onChange={::this.handleInputChange}
                    ref={(c) => {
                      this.refInputName = c;
                    }}/><span
                    className="icon-speech-recognition"/>
                </div>
                <button type="submit" disabled={!this.state.formValid}
                  className={`btn ${stylesGlobal.btn} ${stylesGlobal['btn-extra']}`}> Next
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

InputName.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(InputName);