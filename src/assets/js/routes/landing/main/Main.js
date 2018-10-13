import DOMUtil from 'js/utils/DOMUtil';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {translate} from 'react-i18next';
import Content from 'js/containers/Content';
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
      <div className={`${styles['container-landing-main']}`}>
        <div className={`${styles['btn-scroll-landing']} ${styles.animate}`} onClick={::this.scrollToContent}>
          <div className={styles.icon}/>
        </div>
        <div className='container'>
          <Content className="container-table" useMinHeight={false}>
            <div className="container-table-cell">
              <div className="row">
                <div className="col-xs-12">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-8 col-xs-10">
                        <h1>{t('landing:main:title')}</h1>
                        <NavLink to="/auth"
                          className={`btn btn-lg btn-warning ${styles['btn-warning']}`}>{t('landing:main:button')}</NavLink>
                      </div>
                    </div>
                  </div>
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

export default translate(['landing'], {wait: true})(Main);