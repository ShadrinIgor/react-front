import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {translate} from 'react-i18next';
import styles from './styles.sass';

const Counter = ({t}) => (
  <div className={styles.container}>
    <div className={classNames('container', styles.map)}>
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="row">
            <div className="col-xs-12 text-center">
              <h2>{t('landing:counter:title')}</h2>
              <div className={styles.counter}>
                <span>0</span>
                <span>0</span>
                <span>0</span>
                <span>0</span>
                <span>0</span>
                <span>0</span>
              </div>
              <h2>{t('landing:counter:subtitle')}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Counter.propTypes = {
  t: PropTypes.func
};

export default translate(['landing'], {wait: true})(Counter);