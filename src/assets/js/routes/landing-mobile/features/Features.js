import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import styles from './styles.sass';

const Features = ({t}) => (
  <div className={styles.intro}>
    <div className={`container ${styles.container}`}>
      <div className="row">
        <div className="col-md-10 col-md-offset-1 text-center">
          <div className="row">
            <div className="col-xs-12 col-lg-10 col-lg-offset-1">
              <div className="row">
                <div className="col-md-10 col-md-offset-1">
                  <h2>{t('landing-mobile:features:title')}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="row">
                {t('landing-mobile:features:points', {returnObjects: true}).map((feature, index) => (
                  <div key={index} className="col-md-3 col-sm-6">
                    <div className={`${styles.cover}`} data-bg={index + 1}/>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Features.propTypes = {
  t: PropTypes.func
};

export default translate(['landing-mobile'], {wait: true})(Features);