import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import AuthUtil from 'js/utils/AuthUtil';
import Avatar from 'js/components/Avatar';
import styles from './styles.sass';

const mapStateToProps = state => ({
  user: state.user
});

@withRouter
@translate(['common'], {wait: true})
@connect(mapStateToProps)
class Header extends PureComponent {
  refUserDropdown = null;

  static defaultProps = {
    user: {
      sex: 0
    }
  };

  componentDidMount() {
    this.$userDropdown = $(this.refUserDropdown);

    this.$userDropdown.on('show.bs.dropdown', () => {
      this.$userDropdown.find('.dropdown').addClass(styles.open);
    });

    this.$userDropdown.on('hide.bs.dropdown', () => {
      this.$userDropdown.find('.dropdown').removeClass(styles.open);
    });
  }

  renderCollapseButton() {
    if (!AuthUtil.hasAuthCookie()) return null;

    return (
      <button className="navbar-toggle collapsed" type='button' data-toggle="collapse"
        data-target="#navbar-main-collapsed" aria-expanded="false"
        aria-controls='navbar-main-collapsed'>
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar icon-bar-1"/>
        <span className="icon-bar icon-bar-2"/>
        <span className="icon-bar icon-bar-3"/>
      </button>
    );
  }

  renderUserMenu() {
    if (!AuthUtil.hasAuthCookie()) return null;

    const {user, t} = this.props;

    return (
      <div id="#navbar-main-collapsed" className="collapse navbar-collapse">

        <ul className={`nav navbar-nav navbar-center ${styles['navbar-center']}`}>
          <li><a href={`${CONFIG.serverURL}/dashboard`}>{t('common:header:dashboard:title')}</a></li>
          <li><NavLink to="/courses" activeClassName={styles.active}>{t('common:header:courses:title')}</NavLink></li>
          <li><a href={`${CONFIG.serverURL}/dictionary/user`}>{t('common:header:words:title')}</a></li>
          <li><a href={`${CONFIG.serverURL}/materials`}>{t('common:header:medialibrary:title')}</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right" ref={(c) => { this.refUserDropdown = c; }}>
          <li className={`dropdown ${styles['dropdown-user']}`}>
            <a data-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false" className="dropdown-toggle">
              <Avatar className={styles.avatar} sex={user.sex} avatar={user.avatar} size={Avatar.size.SM} avatarSource={user.avatarSource}/>
              <span className={`${styles.username} hidden-sm`}>{user.name || user.id}</span>
              <span className="caret caret-sm"/>
            </a>
            <ul className={`dropdown-menu ${styles['dropdown-menu']} list-group`}>
              <li className="list-group-item">
                <a href={`${CONFIG.serverURL}/user/profile`}>{t('common:header:user:profile')}</a>
              </li>
              {/** <li className="list-group-item">
                <NavLink to="/user/profile/status">{t('common:header:user:status')}</NavLink>
              </li> */}
              <li className="list-group-item">
                <a href={`${CONFIG.serverURL}/user/invitation`}>{t('common:header:user:invitation')}</a>
              </li>
              <li className="list-group-item">
                <a href={`${CONFIG.serverURL}/user/profile/settings`}>{t('common:header:user:settings')}</a>
              </li>
              <li className="list-group-item">
                <a href={`${CONFIG.serverURL}/auth/logout`}>{t('common:header:user:logout')}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.header} id="container-header">
        <div className={`navbar navbar-default ${styles.navbar} ${styles['navbar-default']}`}>
          <div className="container">

            <div className="navbar-header">
              {this.renderCollapseButton()}
              <a className={`navbar-brand ${styles['navbar-brand']}`} href={`${CONFIG.serverURL}/`}/>
            </div>

            {this.renderUserMenu()}

          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  t: PropTypes.func,
  user: PropTypes.object
};

export default Header;
