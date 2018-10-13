import {throttle} from 'underscore';
import {translate} from 'react-i18next';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import DOMUtil from '../../utils/DOMUtil';
import styles from './styles.sass';
import stylesLanding from './landing.sass';

class HeaderLanding extends PureComponent {
  refContainer = null;
  refNavBar = null;
  refNavBarCollapse = null;
  refNavBarToggle = null;

  constructor(props) {
    super(props);

    this.state = {
      inverted: false
    };
  }

  componentDidMount() {
    this.$window = $(window);
    this.navBar = this.refContainer;
    this.$navBar = $(this.navBar);
    this.collapse = this.refNavBarCollapse;
    this.$collapse = $(this.collapse);
    this.collapseButton = this.refNavBarToggle;
    this.toggleStickyThrottle = throttle(() => {
      this.toggleSticky();
    }, 250);

    this.$window
      .on('scroll', this.toggleStickyThrottle)
      .on('resize', this.toggleStickyThrottle);
  }

  componentWillUnmount() {
    this.$window
      .off('scroll', this.toggleStickyThrottle)
      .off('resize', this.toggleStickyThrottle);
  }

  toggleSticky() {
    const scrollTop = this.$window.scrollTop();
    const isFixed = scrollTop >= 120;
    if ($(this.collapse).hasClass('in') && scrollTop < 6) $(this.collapseButton).click();

    this.setState({
      inverted: isFixed
    });
  }

  scrollToContent(event) {
    event.preventDefault();

    DOMUtil.scrollToElement(this.$navBar.next().next().next(), -56);
  }

  toggleMenu() {
    this.$collapse.collapse('toggle');
  }

  renderRegistration() {
    if (this.props.registration === false) return;

    const {t} = this.props;

    return (
      <div id="#navbar-main-collapsed" className="collapse navbar-collapse" ref={(c) => { this.refNavBarCollapse = c; }}>

        <ul className={`nav navbar-nav navbar-right ${styles['navbar-right']}`}>
          <li onClick={::this.scrollToContent}><Link to="/"
            onClick={e => e.preventDefault()}>{t('landing:header:ourBenefits')}</Link>
          </li>
          <li><Link to="http://rf.com/" target="_blank">{t('landing:header:blog')}</Link></li>
          <li><Link to="/auth"
            className={`btn btn-default ${styles['btn-default']} ${stylesLanding['btn-default']}`}>{`${t('landing:header:register')} / ${t('landing:header:login')}`}</Link>
          </li>
        </ul>

      </div>
    );
  }

  render() {
    return (
      <div className={`${styles.header} ${stylesLanding.header}`} id="container-header" ref={ (c) => { this.refContainer = c; }}>
        <div
          className={`navbar ${styles.navbar} navbar-default ${styles['navbar-default']} ${stylesLanding.navbar} ${stylesLanding[this.state.inverted ? 'navbar-landing-fixed-top' : 'navbar-landing']}`}>
          <div className="container">

            <div className="navbar-header">
              <button
                className={`navbar-toggle collapsed ${styles['navbar-toggle']} ${stylesLanding['icon-bar']}`}
                type='button' data-toggle="collapse"
                data-target="#navbar-main-collapsed" aria-expanded="false"
                aria-controls='navbar-main-collapsed' ref={(c) => { this.refNavBarToggle = c; }} onClick={::this.toggleMenu}>
                <span className="sr-only">Toggle navigation</span>
                <span className={`icon-bar ${styles['icon-bar']} ${stylesLanding['icon-bar']}`}/>
                <span className={`icon-bar ${styles['icon-bar']} ${stylesLanding['icon-bar']}`}/>
                <span className={`icon-bar ${styles['icon-bar']} ${stylesLanding['icon-bar']}`}/>
              </button>
              <Link
                className={`navbar-brand ${styles['navbar-brand']} ${stylesLanding['navbar-brand']}`}
                to="/"/>
            </div>

            {this.renderRegistration()}

          </div>
        </div>
      </div>
    );
  }
}

HeaderLanding.propTypes = {
  t: PropTypes.func,
  registration: PropTypes.bool
};

export default translate(['landing'], {wait: true})(HeaderLanding);