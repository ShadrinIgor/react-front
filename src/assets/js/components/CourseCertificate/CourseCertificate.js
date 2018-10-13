import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import ShareItems from 'js/components/ShareItems';
import styles from './styles.sass';

const CourseCertificate = (props) => {
  const {t} = props;

  return (
    <div className={classNames('row', styles.container)}>
      <h2>{t('courses:certificate.courseIsCompleted')}</h2>
      <div className={styles.certificate}/>
      <h4>{t('courses:certificate:yourLevel')}: {`${props.level}/${props.levelMax}`}</h4>
      <div>
        <Link to={props.url}>{t('courses:certificate:linkToCertificate')}</Link>
      </div>
      <div className={classNames('col-sm-8', 'col-md-6', 'col-sm-offset-2', 'col-md-offset-3', styles.shares)}>
        <div className="row">
          <div className={classNames('col-sm-3')}>
            <h6>{t('courses:certificate:shareOn')}</h6>
          </div>
          <div className={classNames('col-sm-9')}>
            <ShareItems link="http://google.com"/>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseCertificate.propTypes = {
  level: PropTypes.number.isRequired,
  levelMax: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

CourseCertificate.defaultProps = {
  url: '#'
};

export default CourseCertificate;