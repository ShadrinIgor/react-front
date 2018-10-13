import {defer, findWhere} from 'underscore';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Panel from 'js/components/Panel';
import * as _userActions from 'js/actions/user';
import * as _uiActions from 'js/actions/ui';
import Dropdown from 'js/components/Dropdown';

const UXLanguages = [
  {
    title: 'Русский',
    value: 3,
    locale: 'ru'
  }, {
    title: 'English',
    value: 1,
    locale: 'en'
  }, {
    title: '中文',
    value: 2,
    locale: 'zh'
  }
];

class SettingsAccount extends PureComponent {
  constructor(props) {
    super(props);

    const {user} = this.props;

    this.state = {
      formEnabled: true,
      email: user.email,
      sex: user.sex,
      uxLanguage: user.uxLanguage
    };
  }

  componentDidMount() {
    defer(::this.validateForm);
  }

  onChangeUXLanguage(item) {
    this.setState({
      uxLanguage: item.value
    });
  }

  onChangeSex(e) {
    this.setState({
      sex: +e.currentTarget.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const {
      i18n, user, userActions, uiActions
    } = this.props;
    const {updateUserFields} = userActions;
    const {switchLanguage} = uiActions;
    const localeObj = findWhere(UXLanguages, {value: this.state.uxLanguage});

    updateUserFields(user.id, {
      email: this.state.email,
      sex: this.state.sex,
      uxLanguage: this.state.uxLanguage
    });

    i18n.changeLanguage(localeObj.locale);
    switchLanguage(localeObj.locale);
  }

  validateForm() {
    this.setState({
      formValid: true
    });
  }

  render() {
    const {t} = this.props;

    return (
      <div>
        <h4 className="compact">{t('profile:settings.account.title')}</h4>
        <Panel>

          <form className="form-horizontal" onSubmit={::this.onSubmit}>
            <fieldset disabled={!this.state.formEnabled}>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:email')}</label>
                <div className="col-sm-9">
                  <p className="form-control-static">{this.state.email}</p>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:gender')}</label>
                <div className="col-sm-9">
                  <div>
                    <label className="radio-inline">
                      <input type="radio" name="sex" id="male" value={1} onChange={::this.onChangeSex}
                        checked={this.state.sex === 1}/>
                      <div className="radio"/>
                      {t('common:male')}
                    </label>
                    <label className="radio-inline">
                      <input type="radio" name="sex" id="female" value={2} onChange={::this.onChangeSex}
                        checked={this.state.sex === 2}/>
                      <div className="radio"/>
                      {t('common:female')}
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-3 control-label">{t('common:uiLanguage')}</label>
                <div className="col-sm-9">
                  <Dropdown caretDark={true} placeholder="UI Language" options={UXLanguages}
                    selectedValue={this.state.uxLanguage} onChange={::this.onChangeUXLanguage}/>
                </div>
              </div>

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

SettingsAccount.propTypes = {
  user: PropTypes.object,
  ui: PropTypes.object,
  i18n: PropTypes.object,
  userActions: PropTypes.func,
  uiActions: PropTypes.func,
  t: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(_userActions, dispatch),
    uiActions: bindActionCreators(_uiActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    user: state.user,
    ui: state.ui
  };
}

export default translate(['common', 'profile'], {wait: true})(connect(mapStateToProps, mapDispatchToProps)(SettingsAccount));
