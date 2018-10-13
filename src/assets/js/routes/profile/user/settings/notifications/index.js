import {clone, defer, without} from 'underscore';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as _userActions from 'js/actions/user';
import * as _notificationsActions from 'js/actions/notifications';
import Panel from 'js/components/Panel';
import Spinner from 'js/components/Spinner';

// import styles from './styles.sass'

class SettingsNotifications extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formEnabled: true,
      subscribed: clone(props.notifications.user.items)
    };
  }

  componentDidMount() {
    const {user, notificationsActions} = this.props;
    const {getAll, getForUser} = notificationsActions;

    getAll();
    if (user.id) getForUser(user.id);

    defer(::this.validateForm);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.notifications.user.fetching) {
      this.setState({
        subscribed: clone(nextProps.notifications.user.items)
      });
    }
  }

  handleInputChange(e) {
    const {target, name} = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let {subscribed} = this.state;

    if (value) {
      subscribed.push(+name);
    } else {
      subscribed = without(subscribed, +name);
    }

    this.setState({
      subscribed
    });

    defer(::this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: true
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const {user, notifications, notificationsActions} = this.props;
    const {update} = notificationsActions;

    update(user.id, notifications.user.items, this.state.subscribed);
  }

  render() {
    const {t, notifications} = this.props;

    return (
      <div>
        <h4 className="compact">{t('profile:settings.notifications.title')}</h4>
        <Panel>

          <form className="form-horizontal" onSubmit={::this.onSubmit}>
            <fieldset disabled={!this.state.formEnabled}>

              {Object.keys(notifications.all.items).map((key, index) => {
                const item = notifications.all.items[key];

                return (
                  <div key={index} className="form-group">
                    <div className="col-xs-12">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" name={item.id} value={item.id} onChange={::this.handleInputChange}
                            checked={this.state.subscribed.indexOf(item.id) !== -1}/>
                          <span className="checkbox-icon"/>{item.name}
                        </label>
                      </div>
                      {/** <small className="text-muted">{item.description}</small> */}
                    </div>
                  </div>
                );
              })}

              {(notifications.all.items.length === 0 && notifications.all.fetching) && (
                <Spinner size={Spinner.size.MD}/>
              )}

              <div className="form-group" style={{marginBottom: -8}}>
                <div className="col-xs-12">
                  <br/>
                  <button type="submit" className="btn btn-primary"
                    disabled={!this.state.formValid || notifications.all.fetching}>{t('common:saveChanges')}</button>
                </div>
              </div>

            </fieldset>
          </form>

        </Panel>
      </div>
    );
  }
}

SettingsNotifications.propTypes = {
  user: PropTypes.object,
  notifications: PropTypes.object,
  userActions: PropTypes.object,
  notificationsActions: PropTypes.object,
  t: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(_userActions, dispatch),
    notificationsActions: bindActionCreators(_notificationsActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    user: state.user,
    notifications: state.notifications
  };
}

export default translate(['common', 'profile'], {wait: true})(connect(mapStateToProps, mapDispatchToProps)(SettingsNotifications));
