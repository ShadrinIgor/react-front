import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import styles from './styles.sass';

const Benefits = ({t}) => (
  <div className={styles.container}>
    {t('landing-mobile:benefits', {returnObjects: true}).map((benefit, index) => {
      if (index % 2) {
        return (
          <div key={index} className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-6">
                      <div
                        className={`${styles['img-benefit']} ${styles[`img-benefit-${index + 1}`]}`}/>
                    </div>
                    <div className="col-sm-6">
                      <div className={`container-table ${styles['container-table']}`}>
                        <div
                          className={`container-table-cell ${styles['container-table-cell']}`}>
                          <h2>{benefit.title}</h2>
                          <p>{benefit.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div key={index} className={styles['container-bg-grey-light']}>
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-6 col-sm-push-6">
                      <div
                        className={`${styles['img-benefit']} ${styles[`img-benefit-${index + 1}`]}`}/>
                    </div>
                    <div className="col-sm-6 col-sm-pull-6">
                      <div className={`container-table ${styles['container-table']}`}>
                        <div
                          className={`container-table-cell ${styles['container-table-cell']}`}>
                          <h2>{benefit.title}</h2>
                          <p>{benefit.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

Benefits.propTypes = {
  t: PropTypes.func
};

export default translate(['landing-mobile'], {wait: true})(Benefits);