import classNames from 'classnames';
import {defer} from 'underscore';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Utils from 'js/utils/Utils';
import * as _userActions from 'js/actions/user';
import * as _filesActions from 'js/actions/files';
import Avatar from 'js/components/Avatar';
import stylesGlobal from '../styles.sass';
import styles from './styles.sass';

class uploadPhotoAndSetSex extends Component {
  refUpload = null;

  constructor(props) {
    super(props);

    const {user} = this.props;

    this.state = {
      formValid: false,
      sex: user.sex,
      avatar: user.avatar || null,
      clientFile: null,
      uuid: Utils.uuid()
    };
  }

  componentDidMount() {
    defer(::this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: true
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const {user, files, userActions} = this.props;
    const {updateUserFields} = userActions;
    const file = files[this.state.uuid];

    updateUserFields(user.id, {
      registrationStep: 5,
      sex: this.state.sex,
      avatar: file ? file.id : null
    });
  }

  updateSex(e) {
    this.setState({sex: +e.currentTarget.value});
  }

  readFile(e) {
    const {filesActions} = this.props;
    const {uploadFile} = filesActions;
    const file = e.target.files[0];

    this.setState({
      clientFile: file,
      avatar: {
        urls: {
          [Avatar.sizeMap.LG]: URL.createObjectURL(file)
        }
      }
    });

    uploadFile(this.state.uuid, file, 'users', 'users', 'avatar');
    defer(::this.validateForm);
  }

  chooseFile() {
    $(this.refUpload).trigger('click');
  }

  render() {
    return (
      <div className={`container ${stylesGlobal['container-modal-blue']}`}>
        <h2>Tell me about yourself</h2>
        <div className="row">
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
            <form className={stylesGlobal.form} method="post" onSubmit={::this.onSubmit}>
              <div className="form-group">
                <input ref={(c) => {
                  this.refUpload = c;
                }} type="file" accept="image/*" onChange={::this.readFile} className="hidden" name="avatar"/>
                <div className="row">
                  <div className="col-xs-12 text-center">
                    <div className={classNames(styles.avatar)}>
                      <Avatar className={styles.avatar} sex={this.state.sex} avatar={this.state.avatar}
                        size={Avatar.size.LG}/>
                    </div>
                  </div>
                </div>
                <div className={`btn btn-default ${stylesGlobal.btn} ${stylesGlobal['btn-default']}`}
                  onClick={::this.chooseFile}>
                  Upload photo
                </div>
              </div>
              <div className="form-group">
                <h4 className={stylesGlobal['text-muted']}>Your gender</h4>
                <label className="radio-inline">
                  <input type="radio" name="sex" id="male" value={1} onChange={::this.updateSex}
                    checked={this.state.sex === 1}/>
                  <div className={`radio ${stylesGlobal.radio}`}/>
                  Male
                </label>
                <label className="radio-inline">
                  <input type="radio" name="sex" id="female" value={2} onChange={::this.updateSex}
                    checked={this.state.sex === 2}/>
                  <div className={`radio ${stylesGlobal.radio}`}/>
                  Female
                </label>
              </div>
              <button type="submit" className={`btn ${stylesGlobal.btn} ${stylesGlobal['btn-extra']}`}
                disabled={!this.state.formValid}>
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

uploadPhotoAndSetSex.propTypes = {
  user: PropTypes.object,
  files: PropTypes.object,
  userActions: PropTypes.object,
  filesActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user,
    files: state.files
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(_userActions, dispatch),
    filesActions: bindActionCreators(_filesActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(uploadPhotoAndSetSex));