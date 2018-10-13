import {defer} from 'underscore';
import Utils from 'js/utils/Utils';
import cx from 'classnames';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import * as _userActions from 'js/actions/user';
import * as _filesActions from 'js/actions/files';
import Panel from 'js/components/Panel';
import Avatar from 'js/components/Avatar';
import Slider from 'js/components/Slider';
import styles from './styles.sass';

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(_userActions, dispatch),
  filesActions: bindActionCreators(_filesActions, dispatch)
});

const mapStateToProps = state => ({
  user: state.user,
  files: state.files
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'profile'], {wait: true})
class ProfileSettings extends Component {
  constructor(props) {
    super(props);

    const {user} = this.props;
    this.uploadElement = null;

    this.state = {
      formEnabled: true,
      sex: user.sex,
      name: user.name,
      avatar: user.avatar || null,
      clientFile: null,
      durationOfTraining: user.durationOfTraining,
      uuid: Utils.uuid(),
      deleteAvatar: false,
      durationOfTrainingTitle: ''
    };
  }

  componentDidMount() {
    defer(::this.validateForm);
  }

  readFile(e) {
    const {filesActions} = this.props;
    const {uploadFile} = filesActions;
    const file = e.target.files[0];

    this.setState({
      clientFile: file,
      avatar: {
        urls: {
          [Avatar.sizeMap.MD]: URL.createObjectURL(file)
        }
      }
    });

    uploadFile(this.state.uuid, file, 'users', 'users', 'avatar');
  }

  chooseFile() {
    $(this.uploadElement).trigger('click');
  }

  handleInputChange(e) {
    const {target, name} = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({[name]: value});

    defer(::this.validateForm);
  }

  handleDurationOfTraining(value) {
    this.setState({
      durationOfTraining: value,
      durationOfTrainingTitle: `${value} ${this.props.t('common:minutes')}`
    });

    defer(::this.validateForm);
  }

  onSubmit(e) {
    e.preventDefault();

    const {user, files, userActions} = this.props;
    const {updateUserFields} = userActions;
    const file = files[this.state.uuid];

    const userFields = {
      name: this.state.name,
      durationOfTraining: this.state.durationOfTraining
    };
    if (file) userFields.avatar = file.id;
    if (this.state.deleteAvatar) userFields.avatar = null;

    updateUserFields(user.id, userFields);
  }

  deleteFile() {
    this.setState({
      clientFile: null,
      avatar: null,
      deleteAvatar: true
    });
  }

  validateForm() {
    const {user} = this.props;

    this.setState({
      formValid: !user.fetching
    });
  }

  render() {
    const {user, files, t} = this.props;
    const file = files[this.state.uuid] || {};

    return (
      <div>
        <h4 className="compact">{t('profile:settings.profile.title')}</h4>
        <Panel>

          <form className="form-horizontal" onSubmit={::this.onSubmit}>
            <fieldset disabled={!this.state.formEnabled || user.fetching}>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:photo')}</label>
                <div className="col-sm-9">
                  <input ref={(c) => {
                    this.uploadElement = c;
                  }} type="file" accept="image/jpg,image/jpeg,image/png" onChange={::this.readFile} className="hidden"
                  name="avatar"/>
                  <Avatar avatar={this.state.avatar} sex={this.state.sex} size={Avatar.size.MD}
                    fetching={file.fetching} avatarSource={user.avatarSource}/>
                  <div className={`btn btn-default ${styles.uploadButton}`} onClick={::this.chooseFile}
                    disabled={file.fetching}>{t('common:choosePhoto')}</div>
                  {user.avatar &&
                  <div className={cx(styles.delete, 'hidden-xs', 'hidden-sm')} onClick={::this.deleteFile}/>}
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:name')}</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" placeholder="Name" name="name"
                    value={this.state.name || ''}
                    onChange={::this.handleInputChange}/>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:startLearnOn')}</label>
                <div className="col-sm-9">
                  <p className="form-control-static">{user.signUpDatetime}</p>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:dailyGoal')}</label>
                <div className="col-sm-9">
                  <Slider min={10} max={40} steps={4} value={user.durationOfTraining}
                    onChange={::this.handleDurationOfTraining}
                    colors={['#377DD3', '#2BC6CB', '#2BCB8A', '#B7CB32', '#EBC257']}
                    title={this.state.durationOfTrainingTitle}
                    message="To achieve the objective you need to collect 600 points"/>
                </div>
              </div>

              {/** <br/>

               <h4>Connections:</h4>

               <div className="form-group">
               <label className="col-sm-3 control-label">Alipay</label>
               <div className="col-sm-9">
               <Link className="btn btn-info" to="">Connect</Link>
               </div>
               </div>

               <div className="form-group">
               <label className="col-sm-3 control-label">Kaixin</label>
               <div className="col-sm-9">
               <Link className="btn btn-info" to="">Connect</Link>
               </div>
               </div>

               <div className="form-group">
               <label className="col-sm-3 control-label">QQ</label>
               <div className="col-sm-9">
               <Link className="btn btn-info" to="">Connect</Link>
               </div>
               </div>

               <div className="form-group">
               <label className="col-sm-3 control-label">Weibo</label>
               <div className="col-sm-9">
               <Link className="btn btn-info" to="">Connect</Link>
               </div>
               </div>

               <div className="form-group">
               <label className="col-sm-3 control-label">Renren</label>
               <div className="col-sm-9">
               <Link className="btn btn-info" to="">Connect</Link>
               </div>
               </div> */}

              <div className="form-group" style={{marginBottom: -8}}>
                <div className="col-xs-12">
                  <button type="submit" className="btn btn-primary"
                    disabled={!this.state.formValid}>{t('common:saveChanges')}</button>
                </div>
              </div>

            </fieldset>
          </form>

        </Panel>
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  user: PropTypes.object,
  files: PropTypes.object,
  userActions: PropTypes.object,
  filesActions: PropTypes.object,
  t: PropTypes.func
};

export default ProfileSettings;
