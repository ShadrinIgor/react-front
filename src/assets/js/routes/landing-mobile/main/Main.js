import DOMUtil from 'js/utils/DOMUtil';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {translate} from 'react-i18next';
import Content from 'js/containers/Content';
// import Clowds from "./Clowds";
import styles from './styles.sass';

class Main extends Component {
  componentDidMount() {
    this.$navBar = $('#container-header');
  }

  scrollToContent(event) {
    event.preventDefault();

    $(event.currentTarget).removeClass(styles.animate);
    DOMUtil.scrollToElement($(`.${styles['container-landing-main']}`).next(), -56);
  }

  render() {
    const {t} = this.props;

    return (
      <div className={`${styles.container}`}>
        <div className={`${styles['btn-scroll-landing']} ${styles.animate}`} onClick={::this.scrollToContent}>
          <div className={styles.icon}/>
        </div>
        {/** <Clowds className={styles['container-bg-clouds']}/> */}
        <div className={`container ${styles['container-bg']}`}>
          <Content className="container-table text-center" useMinHeight={false}>
            <div className={`container-table-cell ${styles['container-table-cell']}`}>
              <div className="row">
                <div className="col-xs-12">
                  <h1>{t('landing-mobile:main:title')}</h1>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-lg-12 col-lg-offset-0 col-md-10 col-md-offset-1 col-sm-12 col-sm-offset-0">
                  <div className="row">
                    <div
                      className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3">
                      <p>{t('landing-mobile:main:subtitle')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <NavLink to="http://itunes.apple.com/app/id1046826740" data-os="ios" target='_blank'
                    className={`btn ${styles['btn-appstore']}`}/>
                </div>
              </div>
            </div>
          </Content>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  t: PropTypes.func
};

export default translate(['landing-mobile'], {wait: true})(Main);