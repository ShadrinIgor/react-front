import React, {PureComponent} from 'react';
import {translate} from 'react-i18next';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as _uiActions from 'js/actions/ui';
import AuthUtil from 'js/utils/AuthUtil';
import {withUser} from 'js/data';
import styles from './styles.sass';

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(_uiActions, dispatch)
});

const AvailableLanguagesList = ({i18n, availableLocales, switchLanguage}) => {
  const currentLocale = i18n.language;

  return Object.keys(availableLocales).map((value, index) => (
    <li key={index}>
      <NavLink
        to="./"
        lang={value}
        activeClassName={styles.active}
        isActive={() => currentLocale === value}
        onClick={switchLanguage}>{availableLocales[value]}</NavLink>
    </li>));
};

AvailableLanguagesList.propTypes = {
  i18n: PropTypes.func.isRequired,
  availableLocales: PropTypes.object.isRequired,
  switchLanguage: PropTypes.func.isRequired
};

@connect(null, mapDispatchToProps)
@withUser
@translate(null, {wait: true})
class LanguageSwitcher extends PureComponent {
  availableLocales = {
    ru: 'Русский',
    en: 'English',
    cn: '中文'
  };

  uxLanguageMap = ['', 'en', 'cn', 'ru'];

  constructor(props) {
    super(props);
    const { i18n: {language}} = this.props;
    this.updateHTMLLang(language);
  }

  componentWillReceiveProps(nextProps) {
    return nextProps.user.uxLanguage === this.props.user.uxLanguage;
  }

  componentWillMount() {
    const { i18n: {language}, uiActions: {switchLanguage}} = this.props;
    switchLanguage(language);
  }

  switchLanguage(e) {
    e.preventDefault();
    const {
      i18n, user, uiActions: {switchLanguage}, userActions: {updateUserFields}
    } = this.props;
    const locale = e.currentTarget.getAttribute('lang');

    i18n.changeLanguage(locale);
    switchLanguage(locale);
    this.updateHTMLLang(locale);

    if (AuthUtil.hasAuthCookie()) {
      const uxLanguageMapId = this.uxLanguageMap.indexOf(locale);
      updateUserFields(user.id, {uxLanguage: uxLanguageMapId === -1 ? 1 : uxLanguageMapId}, false);
    }
  }

  updateHTMLLang(lang) {
    document.getElementsByTagName('html')[0].setAttribute('lang', lang);
  }

  render() {
    const {i18n, i18n: {language: currentLocale}} = this.props;
    const localeTitle = this.availableLocales[currentLocale];

    return (
      <div className={cx('dropup', 'pull-right', styles.dropup)}>
        <a className="dropdown-toggle" type="button" id="dropdownLanguageSwitcher" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <span className={cx(styles.icon, currentLocale)}/>
          <span className={cx(styles.language, 'hidden-xs')}>{localeTitle}</span>
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownLanguageSwitcher">
          <AvailableLanguagesList i18n={i18n} availableLocales={this.availableLocales} switchLanguage={::this.switchLanguage}/>
        </ul>
      </div>
    );
  }
}

LanguageSwitcher.propTypes = {
  i18n: PropTypes.object,
  user: PropTypes.object,
  userActions: PropTypes.object,
  uiActions: PropTypes.object,
};

export default LanguageSwitcher;